// QR Code Scan Tracker
// Logs incoming scans via Vercel's structured logging + Vercel IP-geolocation headers
// Visible in Vercel dashboard: Project → Logs → filter by "[QR_SCAN]"
//
// Upgrade path (when scan volume justifies persistent storage):
//   1. Add Supabase / Upstash Redis env vars in Vercel
//   2. Uncomment the storeScan() block below

export default async function handler(req, res) {
    const slug = (req.query.slug || 'unknown').toLowerCase();

    // Vercel attaches geolocation headers automatically (free, no extra setup)
    const event = {
        type: 'qr_scan',
        slug,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        referer: req.headers['referer'] || 'direct',
        country: req.headers['x-vercel-ip-country'] || 'unknown',
        region: req.headers['x-vercel-ip-country-region'] || 'unknown',
        city: req.headers['x-vercel-ip-city'] || 'unknown',
        latitude: req.headers['x-vercel-ip-latitude'] || 'unknown',
        longitude: req.headers['x-vercel-ip-longitude'] || 'unknown',
    };

    // Structured log entry — Vercel captures this, filterable in dashboard
    console.log('[QR_SCAN]', JSON.stringify(event));

    // OPTIONAL persistent storage (uncomment when you set up Supabase/Upstash)
    // try {
    //     await storeScan(event);
    // } catch (e) {
    //     console.error('[QR_SCAN_STORE_ERROR]', e.message);
    // }

    // Redirect to homepage with UTM params preserved
    const params = new URLSearchParams({
        utm_source: 'qr',
        utm_medium: 'print',
        utm_campaign: 'walt-builds-menu',
        utm_content: slug,
    });

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.redirect(302, `/?${params.toString()}`);
}

// Uncomment + set SUPABASE_URL / SUPABASE_SERVICE_KEY (or UPSTASH_*) env vars in Vercel
// to enable persistent scan history queryable from a dashboard.
//
// async function storeScan(event) {
//     const SUPABASE_URL = process.env.SUPABASE_URL;
//     const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
//     if (!SUPABASE_URL || !SUPABASE_KEY) return;
//     await fetch(`${SUPABASE_URL}/rest/v1/qr_scans`, {
//         method: 'POST',
//         headers: {
//             'apikey': SUPABASE_KEY,
//             'Authorization': `Bearer ${SUPABASE_KEY}`,
//             'Content-Type': 'application/json',
//             'Prefer': 'return=minimal',
//         },
//         body: JSON.stringify(event),
//     });
// }
