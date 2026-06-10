// Lead capture endpoint. Validates, de-bots, persists to Postgres (when
// configured), and ALWAYS forwards to email so a lead is never lost.
//
// Persistence is intentionally optional: with POSTGRES_URL unset (e.g. before
// the Vercel Postgres store is provisioned) the route degrades to email-only
// and still returns success — a deploy never breaks waiting on infra.
//
// The `leads` table mirrors the walt-crm schema (walt-crm/lib/db.ts) column for
// column, so the site and the CRM can later share one Postgres table — the CRM
// hookup becomes a column copy, not a migration.

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzgwdzk';
const MAX = { name: 120, email: 200, phone: 40, company: 160, subject: 200, message: 5000, generic: 400 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP rate limit. In serverless this holds only within a warm
// instance — a backstop against bursts, not a hard guarantee. The honeypot
// catches the bulk of bot spam; this catches the rest of a single flood.
const HITS = new Map();
const WINDOW_MS = 60_000;
const LIMIT = 5;
function rateLimited(ip) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > LIMIT;
}

const clip = (s, n) => String(s ?? '').slice(0, n).trim();

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot — a hidden field no human fills. If it's set, smile and drop.
  if (clip(body._hp, 10)) {
    res.status(200).json({ ok: true });
    return;
  }

  const ip = String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown')
    .split(',')[0]
    .trim();
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'Too many requests — try again in a minute.' });
    return;
  }

  const name = clip(body.name, MAX.name);
  const email = clip(body.email, MAX.email);
  const message = clip(body.message, MAX.message);
  const phone = clip(body.phone, MAX.phone);
  const company = clip(body.company, MAX.company);
  const subject = clip(body.subject, MAX.subject) || 'New inquiry';
  const vertical = clip(body.vertical, MAX.generic);
  const sourcePage = clip(body.sourcePage, MAX.generic);
  const annualLoss = Number.isFinite(+body.annualLoss) ? Math.round(+body.annualLoss) : 0;
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};

  if (!name) { res.status(400).json({ ok: false, error: 'Name is required.' }); return; }
  if (!EMAIL_RE.test(email)) { res.status(400).json({ ok: false, error: 'A valid email is required.' }); return; }
  if (!message) { res.status(400).json({ ok: false, error: 'A message is required.' }); return; }

  // Context block — attached to the email and folded into the CRM notes column.
  const utmStr = Object.entries(utm).map(([k, v]) => `${k}=${clip(v, 120)}`).join(' ');
  const context = [
    vertical && `Vertical: ${vertical}`,
    annualLoss > 0 && `Calculator estimate: $${annualLoss.toLocaleString('en-US')}/yr`,
    sourcePage && `Source page: ${sourcePage}`,
    utmStr && `UTM: ${utmStr}`,
    phone && `Phone: ${phone}`,
    company && `Company: ${company}`,
  ].filter(Boolean);
  const notes = message + (context.length ? `\n\n---\n${context.join('\n')}` : '');

  // 1) Persist — best-effort, only when configured.
  let stored = false;
  if (process.env.POSTGRES_URL) {
    try {
      const { sql } = await import('@vercel/postgres');
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id           SERIAL PRIMARY KEY,
          business     TEXT NOT NULL,
          category     TEXT DEFAULT '',
          market       TEXT DEFAULT '',
          status       TEXT DEFAULT 'NEW',
          stage        TEXT DEFAULT 'New',
          phone        TEXT DEFAULT '',
          email        TEXT DEFAULT '',
          next_action  TEXT DEFAULT '',
          notes        TEXT DEFAULT '',
          created_at   TIMESTAMPTZ DEFAULT now(),
          updated_at   TIMESTAMPTZ DEFAULT now()
        );`;
      await sql`
        INSERT INTO leads (business, category, market, status, stage, phone, email, next_action, notes)
        VALUES (
          ${company || name},
          ${vertical || 'inbound'},
          ${utm.utm_campaign || 'inbound-web'},
          'NEW', 'New',
          ${phone}, ${email},
          ${'Reply to ' + name},
          ${notes}
        );`;
      stored = true;
    } catch (e) {
      console.error('[LEAD_STORE_ERROR]', e.message);
    }
  }

  // 2) Always forward to email — the guaranteed delivery path. Even if the DB
  //    write failed or isn't wired yet, the lead lands in the inbox.
  let emailed = false;
  try {
    const resp = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        message: notes,
        _subject: `[waltburge.com] ${subject}`,
      }),
    });
    emailed = resp.ok;
  } catch (e) {
    console.error('[LEAD_EMAIL_ERROR]', e.message);
  }

  if (!stored && !emailed) {
    res.status(502).json({
      ok: false,
      error: 'Could not send. Please email jamesburge.mcm@gmail.com directly.',
    });
    return;
  }

  res.status(200).json({ ok: true, stored, emailed });
}
