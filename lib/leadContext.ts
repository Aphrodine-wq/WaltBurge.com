// Cross-view lead context. The SPA resets to "/" on navigation (App.goToSection
// pushState), so funnel context — which vertical the visitor came from, the
// calculator's own number, the original UTM source — can't ride React props to
// the Contact section. sessionStorage carries it across that reset; the Contact
// form reads it on submit and folds it into the lead payload, so a lead arrives
// with the context that earned it instead of as a bare name + message.
export interface LeadContext {
  vertical?: string;     // 'doctors' | 'lawyers' | industry slug
  sourcePage?: string;   // pathname where the visitor hit "book a call"
  annualLoss?: number;   // the calculator's own estimate, if they used it
  missed?: number;
  value?: number;
  rate?: number;
}

const KEY = 'wb_lead_ctx';
const UTM_KEY = 'wb_utm';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

function session(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

export function setLeadContext(patch: LeadContext): void {
  const s = session();
  if (!s) return;
  try {
    s.setItem(KEY, JSON.stringify({ ...getLeadContext(), ...patch }));
  } catch {
    /* storage full / blocked — context is a nicety, not load-bearing */
  }
}

export function getLeadContext(): LeadContext {
  const s = session();
  if (!s) return {};
  try {
    return JSON.parse(s.getItem(KEY) || '{}') as LeadContext;
  } catch {
    return {};
  }
}

export function clearLeadContext(): void {
  try {
    session()?.removeItem(KEY);
  } catch {
    /* noop */
  }
}

// Capture UTM params off the URL once and persist them for the session, so a
// lead submitted three pages after landing still carries its original
// attribution. Call once on app mount.
export function captureUtm(): void {
  const s = session();
  if (!s) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hit: Record<string, string> = {};
    for (const f of UTM_FIELDS) {
      const v = params.get(f);
      if (v) hit[f] = v.slice(0, 120);
    }
    if (Object.keys(hit).length) {
      const cur = JSON.parse(s.getItem(UTM_KEY) || '{}');
      s.setItem(UTM_KEY, JSON.stringify({ ...cur, ...hit }));
    }
  } catch {
    /* noop */
  }
}

export function getUtm(): Record<string, string> {
  const s = session();
  if (!s) return {};
  try {
    return JSON.parse(s.getItem(UTM_KEY) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}
