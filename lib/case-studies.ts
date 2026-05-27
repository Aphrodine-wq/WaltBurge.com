export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  techStack: string[];
  testimonial: string;
  relatedService: {
    href: string;
    label: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mhp-construction',
    client: 'MHP Construction',
    industry: 'Construction',
    headline:
      'AI-Powered Estimation Cut Bid Time from 3 Days to Seconds',
    challenge:
      'MHP Construction in Oxford, MS was losing bids because manual estimates took 2-3 days. Competitors with faster turnaround won jobs before MHP could even submit a number. Estimating was done by gut feel and spreadsheets — inconsistent, slow, and expensive.',
    solution:
      'Built MsHomePros, a contractor business platform with AI-powered line-item estimation. Fine-tuned a Llama 3.1 8B model (ConstructionAI) on 18,000+ real construction project examples. The model generates detailed line-item estimates with material quantities, labor hours, and market-adjusted pricing in seconds. Deployed on RunPod Serverless at $0.002 per estimate.',
    results: [
      { metric: '3 days \u2192 seconds', label: 'Estimation time' },
      { metric: '$0.002', label: 'Cost per estimate' },
      { metric: '18,000+', label: 'Training examples' },
      { metric: 'Live in production', label: 'Status' },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Python',
      'PyTorch',
      'Llama 3.1',
      'RunPod',
      'PostgreSQL',
      'Tailwind',
    ],
    testimonial: 'Testimonial pending',
    relatedService: {
      href: '/services/construction-technology',
      label: 'Construction Technology',
    },
  },
  {
    slug: 'lafayette-insurance',
    client: 'Lafayette Insurance',
    industry: 'Insurance',
    headline:
      'AI Voice System Handles Calls While Agents Focus on Closing',
    challenge:
      'Lafayette Insurance was drowning in routine phone inquiries — policy questions, claim status checks, basic quoting. Agents spent hours on calls that didn\'t require human judgment, pulling them away from high-value work like closing new policies and handling complex claims.',
    solution:
      'Built an AI-powered voice system that handles inbound calls intelligently. The system understands natural speech, answers common policy questions, routes complex issues to the right agent, and can initiate basic quoting workflows — all without the caller knowing they\'re talking to AI.',
    results: [
      { metric: '60%+', label: 'Calls handled by AI' },
      { metric: '24/7', label: 'Availability' },
      { metric: '< 2 sec', label: 'Response time' },
      { metric: 'Zero', label: 'Missed after-hours calls' },
    ],
    techStack: [
      'Python',
      'Speech-to-Text',
      'LLM Integration',
      'Telephony API',
      'Custom Voice Pipeline',
    ],
    testimonial: 'Testimonial pending',
    relatedService: {
      href: '/services/ai-automation',
      label: 'AI-Powered Business Automation',
    },
  },
  {
    slug: 'fairtradeworker',
    client: 'FairTradeWorker Platform',
    industry: 'Construction / Marketplace',
    headline:
      'Three-Sided Construction Marketplace from Zero to Production',
    challenge:
      'The construction bidding process is broken. Homeowners can\'t tell if a bid is fair. Contractors lose jobs to lowballers. Subcontractors get squeezed on rates. There was no platform that served all three sides fairly with transparent pricing and AI-powered estimation.',
    solution:
      'Built FairTradeWorker — a full three-sided construction marketplace. Homeowners post jobs, contractors bid competitively, and subcontractors handle specialty work. AI-powered instant estimates give homeowners a fair-price baseline before any bids come in. QuickBooks-native payments handle the entire financial lifecycle. Real-time bidding via WebSocket keeps everyone in sync.',
    results: [
      { metric: '3 roles', label: 'Homeowner, contractor, sub' },
      { metric: '6 revenue streams', label: 'Including white-label licensing' },
      { metric: '30+ screens', label: 'React Native mobile app' },
      { metric: 'Real-time', label: 'WebSocket bidding' },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Kotlin',
      'Spring Boot',
      'React Native',
      'PostgreSQL',
      'QuickBooks API',
      'WebSocket',
    ],
    testimonial: 'Testimonial pending',
    relatedService: {
      href: '/services/saas-development',
      label: 'SaaS Product Development',
    },
  },
  {
    slug: 'constructionai',
    client: 'ConstructionAI',
    industry: 'AI / Construction',
    headline:
      'Fine-Tuned LLM That Knows Construction Better Than Generic AI Ever Will',
    challenge:
      'Generic AI models don\'t understand construction. Ask ChatGPT to estimate a bathroom remodel and it hallucinates line items, invents prices, and has no concept of regional labor rates or material waste factors. Contractors need accurate, detailed, trade-specific estimates — not confident-sounding nonsense.',
    solution:
      'Built ConstructionAI — a Llama 3.1 8B model fine-tuned specifically for construction cost estimation. Created a custom training pipeline: distilled synthetic examples from larger models, curated aggressively against real-world estimates, and trained on 18,000+ validated examples. Currently scaling to 500K+ examples. Deployed on RunPod Serverless for production use across FairTradeWorker and MsHomePros.',
    results: [
      { metric: '18,000+', label: 'Training examples' },
      { metric: '$0.002', label: 'Per estimate' },
      { metric: '500K+', label: 'Target dataset' },
      { metric: '~88%', label: 'Accuracy on held-out jobs' },
    ],
    techStack: [
      'Python',
      'PyTorch',
      'Llama 3.1 8B',
      'RunPod Serverless',
      'Custom Training Pipeline',
    ],
    testimonial: 'Testimonial pending',
    relatedService: {
      href: '/services/custom-llm-training',
      label: 'Custom LLM Training & Fine-Tuning',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
