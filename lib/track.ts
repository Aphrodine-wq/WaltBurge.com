import { track } from '@vercel/analytics';

// Thin wrapper around Vercel Analytics custom events. Centralizes the event
// names so the funnel is consistent, and never lets a tracking failure throw
// into a click handler — analytics is fire-and-forget, the CTA still works.
export type TrackProps = Record<string, string | number | boolean | null>;

export function trackEvent(name: string, props?: TrackProps): void {
  try {
    track(name, props);
  } catch {
    /* analytics is best-effort; swallow */
  }
}
