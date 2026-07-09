// Instant self-serve audit — same-origin proxy to walt-crm's /api/audit.
// The CRM endpoint stores the lead FIRST (speed-to-lead push included), then
// runs the checks (PageSpeed Insights + a guarded fetch of the visitor's
// homepage) and returns { ok, scores, gaps } for the page to render live.
// Secret stays server-side here, same pattern as api/lead.js.
//
// Response contract for the client:
//   { ok:true, scores, gaps, url }   → render instant results
//   { ok:true, queued:true }         → lead captured, checks unavailable —
//                                      show the classic "I'll send it" message
//   { ok:false, error }              → validation/limit error, show it

const MAX = { business: 160, website: 300, industry: 80, name: 120, email: 200, phone: 40 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP limit (warm-instance only, same caveat as api/lead.js).
// Tighter than the lead form — each audit burns a ~30s CRM function run.
const HITS = new Map();
const WINDOW_MS = 60_000;
const LIMIT = 3;
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

  // Honeypot — pretend success, capture nothing.
  if (clip(body._hp, 10)) {
    res.status(200).json({ ok: true, queued: true });
    return;
  }

  const ip = String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown')
    .split(',')[0]
    .trim();
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'Too many requests — try again in a minute.' });
    return;
  }

  const business = clip(body.business, MAX.business);
  const website = clip(body.website, MAX.website);
  const industry = clip(body.industry, MAX.industry);
  const name = clip(body.name, MAX.name);
  const email = clip(body.email, MAX.email);
  const phone = clip(body.phone, MAX.phone);

  if (!business || !website) { res.status(400).json({ ok: false, error: 'Business name and website are required.' }); return; }
  if (!name || !EMAIL_RE.test(email)) { res.status(400).json({ ok: false, error: 'Your name and a valid email are required.' }); return; }

  if (!process.env.CRM_LEAD_SECRET) {
    // Misconfigured deploy — don't lose the visitor silently.
    res.status(502).json({ ok: false, error: 'Could not run the audit. Please email jamesburge.mcm@gmail.com directly.' });
    return;
  }

  try {
    const resp = await fetch(process.env.CRM_AUDIT_URL || 'https://walt-crm.vercel.app/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lead-secret': process.env.CRM_LEAD_SECRET,
      },
      body: JSON.stringify({ business, website, industry, name, email, phone }),
      signal: AbortSignal.timeout(55_000),
    });
    const data = await resp.json().catch(() => ({}));

    if (resp.status === 400 || resp.status === 429) {
      res.status(resp.status).json({ ok: false, error: data.error || 'Could not run the audit.' });
      return;
    }
    if (resp.ok && data.ok) {
      res.status(200).json({ ok: true, scores: data.scores, gaps: data.gaps, url: data.url });
      return;
    }
    if (resp.ok) {
      // CRM stored the lead but the checks came up empty — classic flow.
      res.status(200).json({ ok: true, queued: true });
      return;
    }
    throw new Error(`CRM ${resp.status}`);
  } catch (e) {
    console.error('[AUDIT_CRM_ERROR]', e.message);
  }

  // CRM path went dark — push the request to the phone so it's never lost,
  // then tell the visitor the classic "I'll send it" story.
  if (process.env.LEAD_NTFY_TOPIC) {
    try {
      const resp = await fetch(`https://ntfy.sh/${encodeURIComponent(process.env.LEAD_NTFY_TOPIC)}`, {
        method: 'POST',
        // Header values must be ASCII — no em dashes here.
        headers: { Title: 'Audit request (CRM write FAILED) - log by hand', Priority: 'high', Tags: 'warning,moneybag' },
        body: `${business} (${name}) — ${phone || email}\nSite: ${website}${industry ? `\nIndustry: ${industry}` : ''}`,
      });
      if (resp.ok) {
        res.status(200).json({ ok: true, queued: true });
        return;
      }
    } catch (e) {
      console.error('[AUDIT_NTFY_ERROR]', e.message);
    }
  }

  res.status(502).json({ ok: false, error: 'Could not run the audit. Please email jamesburge.mcm@gmail.com directly.' });
}
