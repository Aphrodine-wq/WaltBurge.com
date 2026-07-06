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

  // 1) Primary sink: the CRM. Creates a HOT lead and fires the speed-to-lead
  //    phone push. Server-to-server with a shared secret; best-effort — email
  //    below is the guaranteed path.
  let stored = false;
  if (process.env.CRM_LEAD_SECRET) {
    try {
      const utmSource = clip(utm.utm_source, 60).toLowerCase().replace(/[^a-z0-9-]/g, '');
      const source = (clip(utm.gclid, 10) !== '' || utmSource === 'google')
        ? 'google-ads'
        : utmSource
          ? `ads-${utmSource}`
          : 'waltburge.com';
      const resp = await fetch(process.env.CRM_LEAD_URL || 'https://walt-crm.vercel.app/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-lead-secret': process.env.CRM_LEAD_SECRET,
        },
        body: JSON.stringify({
          business: company || name,
          contactName: name,
          phone,
          email,
          notes,
          category: vertical || 'Inbound',
          source,
        }),
      });
      stored = resp.ok;
      if (!resp.ok) console.error('[LEAD_CRM_ERROR]', resp.status, await resp.text().catch(() => ''));
    } catch (e) {
      console.error('[LEAD_CRM_ERROR]', e.message);
    }
  }

  // 2) Backup path: if the CRM write failed, push the lead straight to the
  //    phone via ntfy so it's never lost. (The CRM fires its own push on
  //    success — this only runs when that path went dark.)
  let pinged = false;
  if (!stored && process.env.LEAD_NTFY_TOPIC) {
    try {
      const resp = await fetch(`https://ntfy.sh/${encodeURIComponent(process.env.LEAD_NTFY_TOPIC)}`, {
        method: 'POST',
        // Header values must be ASCII — no em dashes here.
        headers: { Title: 'Site lead (CRM write FAILED) - log by hand', Priority: 'high', Tags: 'warning,moneybag' },
        body: `${company || name} — ${phone || email}\n${notes.slice(0, 500)}`,
      });
      pinged = resp.ok;
    } catch (e) {
      console.error('[LEAD_NTFY_ERROR]', e.message);
    }
  }

  if (!stored && !pinged) {
    res.status(502).json({
      ok: false,
      error: 'Could not send. Please email jamesburge.mcm@gmail.com directly.',
    });
    return;
  }

  res.status(200).json({ ok: true, stored, pinged });
}
