// Conversion-focused landing pages for the two priority verticals — doctors and
// lawyers in private practice. Unlike the SEO geo pages (content/local), these
// are built to sell: pain → quantified cost → proof → process → booking. They
// live at /for-doctors and /for-lawyers and are the destination for outreach
// and ads. Config here, rendered by components/PrivatePracticePage.tsx.

export interface PracticeVertical {
  slug: 'for-doctors' | 'for-lawyers';
  eyebrow: string;
  h1: string;
  intro: string;
  // The cost of doing nothing — the pain that makes the calculator land.
  painPoints: { stat: string; label: string }[];
  // Lost-revenue calculator copy + sensible starting numbers.
  calc: {
    heading: string;
    unitLabel: string;     // "unanswered calls a week"
    valueLabel: string;    // "average value of a new patient"
    rateLabel: string;     // "...that would have booked"
    resultNoun: string;    // "patients" | "clients"
    defaultMissed: number;
    defaultValue: number;
    defaultRate: number;   // percent
    valueHint: string;
  };
  systemSlugs: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  servicesSlug: string;
}

export const verticals: PracticeVertical[] = [
  {
    slug: 'for-doctors',
    eyebrow: 'For Doctors in Private Practice',
    h1: 'Stop losing patients to a busy front desk',
    intro: "Every call your front desk can't pick up is a patient calling the next clinic down the road. I build AI front-desk systems for private practices that answer every call, book around the clock, and work your recall list — HIPAA-aware, installed for you, and owned by you. No call center, no per-seat software you rent forever.",
    painPoints: [
      { stat: 'After-hours', label: 'when most patients call — and most practices send them to voicemail' },
      { stat: '1 missed call', label: 'is one patient who books with whoever answers first' },
      { stat: 'Your staff', label: 'is chairside, not on the phone — so the phone wins or loses on its own' },
    ],
    calc: {
      heading: 'What is your front desk actually costing you?',
      unitLabel: 'calls a week that go unanswered or to voicemail',
      valueLabel: 'average value of a new patient (first year)',
      rateLabel: 'percent of those callers who would have booked',
      resultNoun: 'patients',
      defaultMissed: 15,
      defaultValue: 1500,
      defaultRate: 30,
      valueHint: 'A new patient is worth far more than one visit — count the first year of care.',
    },
    systemSlugs: ['patient-engine', 'ai-voice-receptionist', 'ai-appointment-scheduler', 'ai-review-responder'],
    faqs: [
      { q: 'Is this HIPAA-compliant?', a: "Yes — built HIPAA-aware from the first line of code, with BAAs in place. The system captures, books, and routes. It never gives medical advice — that line stays with you and your providers." },
      { q: 'Will this replace my front-desk staff?', a: "No. It covers what they can't — after-hours, lunch, overflow, and the calls that hit voicemail while they're with a patient. Your people stop chasing the phone and do the work only a human can." },
      { q: "What does it cost, and is it another monthly subscription?", a: "The first call and the estimate are free. You own what I build — no per-seat SaaS bill that climbs forever. I scope it to your practice and your budget." },
      { q: "I'm not technical. Is this hard to run?", a: "No. I build it and install it for you, tuned to how your practice already works. The person who writes the code is the person who answers your call — there's no account rep and no help-desk maze." },
      { q: 'Where does my patient data live?', a: "In your control. I build owned systems that keep your data in your environment, not fed into someone else's product. Private by design." },
    ],
    seoTitle: 'AI for Doctors in Private Practice — Never Miss a Patient Call',
    seoDescription: 'AI front-desk systems for private medical practices: 24/7 call answering, patient booking, and recall. HIPAA-aware, owned by you. Built by Walt Burge, Oxford MS.',
    servicesSlug: 'healthcare',
  },
  {
    slug: 'for-lawyers',
    eyebrow: 'For Lawyers in Private Practice',
    h1: 'Stop letting good cases walk after hours',
    intro: "The client with a real case calls three firms and signs with whoever answers first — and that call usually comes in after five. I build AI intake systems for private-practice attorneys that answer every call, qualify it, and book the consult around the clock — bar-aware, installed for you, and owned by you. No answering service reading off a script, no software you rent forever.",
    painPoints: [
      { stat: 'After 5 p.m.', label: 'when most legal calls come in — and most firms miss them' },
      { stat: '3 firms', label: 'a serious client calls — they sign with the first one that answers' },
      { stat: 'Voicemail', label: "is where good cases go to die over a weekend" },
    ],
    calc: {
      heading: 'What are missed calls costing your firm?',
      unitLabel: 'calls a week that go unanswered or to voicemail',
      valueLabel: 'average value of a signed case',
      rateLabel: 'percent of those callers who had a real case',
      resultNoun: 'cases',
      defaultMissed: 10,
      defaultValue: 3500,
      defaultRate: 25,
      valueHint: 'Use your average fee per matter — one signed case usually pays for the whole system.',
    },
    systemSlugs: ['intake-engine', 'ai-intake-triage', 'ai-document-drafting', 'ai-phone-agent'],
    faqs: [
      { q: 'Is this bar-compliant? Does it give legal advice?', a: "It never gives legal advice. It captures intake and conflict-check details and routes the matter — the judgment stays with your attorneys. Built bar-aware from the start." },
      { q: 'Will this replace my paralegal or intake staff?', a: "No. It covers the after-hours and overflow calls your staff can't — the ones that currently hit voicemail and walk to another firm. Your team handles the cases it books." },
      { q: 'What does it cost, and is it another subscription?', a: "The first call and the estimate are free. You own what I build — not a per-seat tool you rent forever. One signed case usually covers the whole system." },
      { q: "I'm not technical. Is this hard to run?", a: "No. I build and install it for you, tuned to how your firm already intakes. The person who writes the code answers your call — no account rep, no ticket queue." },
      { q: 'Is client information kept confidential?', a: "Yes. I build owned systems that keep your client data in your control, never fed into someone else's product. Confidential by design." },
    ],
    seoTitle: 'AI for Lawyers in Private Practice — Never Miss a Case Again',
    seoDescription: 'AI intake systems for private-practice attorneys: 24/7 call answering, case triage, and booked consults. Bar-aware, owned by you. Built by Walt Burge, Oxford MS.',
    servicesSlug: 'legal-business',
  },
];

export const practiceSlugs = verticals.map(v => v.slug);

export function getVertical(slug: string): PracticeVertical | undefined {
  return verticals.find(v => v.slug === slug);
}
