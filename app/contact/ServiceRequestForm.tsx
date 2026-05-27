'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BrainCircuit,
  Wrench,
  Layout,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Clock,
  DollarSign,
  Layers,
  Target,
  Github,
  Copy,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type ServiceType =
  | 'custom-software'
  | 'ai-ml'
  | 'construction-tech'
  | 'web-design'
  | 'other';

type TimelineOption = 'asap' | 'standard' | 'flexible' | 'no-rush';
type BudgetOption = 'starter' | 'growth' | 'scale' | 'enterprise' | 'unsure';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SERVICE_OPTIONS: {
  id: ServiceType;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: 'custom-software', label: 'Custom Software', icon: Code2 },
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: BrainCircuit },
  { id: 'construction-tech', label: 'Construction Technology', icon: Wrench },
  { id: 'web-design', label: 'Web Design & Development', icon: Layout },
  { id: 'other', label: 'Other', icon: Sparkles },
];

const FEATURE_MAP: Record<ServiceType, string[]> = {
  'custom-software': [
    'User authentication',
    'Dashboard / admin panel',
    'API integrations',
    'Real-time features',
    'Mobile app',
    'Payment processing',
    'Database design',
    'File uploads / storage',
  ],
  'ai-ml': [
    'Chatbot / assistant',
    'Custom model training',
    'Data pipeline',
    'Automation workflows',
    'AI-powered search',
    'Document processing',
    'Recommendation engine',
  ],
  'construction-tech': [
    'AI estimation',
    'Contractor management',
    'Job tracking',
    'Proposal generation',
    'Client portal',
    'Scheduling',
    'Invoicing',
  ],
  'web-design': [
    'Responsive design',
    'CMS / blog',
    'E-commerce',
    'SEO optimization',
    'Contact forms',
    'Analytics',
    'Custom animations',
  ],
  other: [
    'Custom integrations',
    'Consulting',
    'Code audit',
    'Performance optimization',
    'Migration',
  ],
};

const TIMELINE_OPTIONS: { id: TimelineOption; label: string; sub: string }[] = [
  { id: 'asap', label: 'ASAP', sub: '< 1 month' },
  { id: 'standard', label: 'Standard', sub: '1-3 months' },
  { id: 'flexible', label: 'Flexible', sub: '3-6 months' },
  { id: 'no-rush', label: 'No Rush', sub: '6+ months' },
];

const BUDGET_OPTIONS: { id: BudgetOption; label: string; sub: string }[] = [
  { id: 'starter', label: 'Starter', sub: '$1K - $5K' },
  { id: 'growth', label: 'Growth', sub: '$5K - $15K' },
  { id: 'scale', label: 'Scale', sub: '$15K - $50K' },
  { id: 'enterprise', label: 'Enterprise', sub: '$50K+' },
  { id: 'unsure', label: 'Not Sure', sub: "Let's talk" },
];

const REFERRAL_OPTIONS = [
  'Google',
  'Referral',
  'Social Media',
  'Other',
];

/* Scope calculation constants */
const BASE_COSTS: Record<ServiceType, { min: number; max: number }> = {
  'custom-software': { min: 5000, max: 15000 },
  'ai-ml': { min: 8000, max: 25000 },
  'construction-tech': { min: 10000, max: 30000 },
  'web-design': { min: 2000, max: 8000 },
  other: { min: 3000, max: 10000 },
};

const FEATURE_COST = { min: 500, max: 2000 };

const COMPLEXITY_MULTIPLIER: Record<ServiceType, number> = {
  'custom-software': 1.0,
  'ai-ml': 1.4,
  'construction-tech': 1.3,
  'web-design': 0.7,
  other: 0.9,
};

const BASE_WEEKS: Record<ServiceType, { min: number; max: number }> = {
  'custom-software': { min: 3, max: 6 },
  'ai-ml': { min: 4, max: 8 },
  'construction-tech': { min: 5, max: 10 },
  'web-design': { min: 2, max: 4 },
  other: { min: 2, max: 5 },
};

const TIMELINE_FACTOR: Record<TimelineOption, number> = {
  asap: 0.75,
  standard: 1.0,
  flexible: 1.2,
  'no-rush': 1.5,
};

const STACK_SUGGESTIONS: Record<
  ServiceType,
  { base: string[]; conditional: Record<string, string[]> }
> = {
  'custom-software': {
    base: ['Next.js', 'TypeScript', 'PostgreSQL'],
    conditional: {
      'User authentication': ['Auth.js'],
      'Payment processing': ['Stripe'],
      'Real-time features': ['WebSockets'],
      'Mobile app': ['React Native'],
      'File uploads / storage': ['AWS S3'],
      'API integrations': ['REST / GraphQL'],
    },
  },
  'ai-ml': {
    base: ['Python', 'TypeScript', 'FastAPI'],
    conditional: {
      'Chatbot / assistant': ['OpenAI', 'LangChain'],
      'Custom model training': ['PyTorch', 'HuggingFace'],
      'Data pipeline': ['Apache Airflow'],
      'Automation workflows': ['Celery', 'Redis'],
      'AI-powered search': ['Pinecone', 'pgvector'],
      'Document processing': ['Tesseract', 'LlamaIndex'],
      'Recommendation engine': ['scikit-learn'],
    },
  },
  'construction-tech': {
    base: ['Next.js', 'TypeScript', 'PostgreSQL'],
    conditional: {
      'AI estimation': ['Python', 'Custom ML Model'],
      'Client portal': ['Auth.js'],
      'Invoicing': ['Stripe'],
      'Scheduling': ['Calendar API'],
      'Contractor management': ['Real-time Dashboard'],
    },
  },
  'web-design': {
    base: ['Next.js', 'Tailwind CSS'],
    conditional: {
      'CMS / blog': ['Sanity', 'MDX'],
      'E-commerce': ['Shopify', 'Stripe'],
      'SEO optimization': ['Schema.org', 'Sitemap'],
      'Custom animations': ['Framer Motion'],
      Analytics: ['Vercel Analytics'],
    },
  },
  other: {
    base: ['TypeScript', 'Node.js'],
    conditional: {
      'Custom integrations': ['REST APIs', 'Webhooks'],
      'Performance optimization': ['Lighthouse', 'CDN'],
      Migration: ['Docker', 'CI/CD'],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Animated number component                                          */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const duration = 400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    prev.current = to;
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Circular progress ring                                             */
/* ------------------------------------------------------------------ */

function ProjectScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgb(var(--border-color))"
          strokeWidth="6"
          fill="none"
          opacity="0.3"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgb(var(--accent-color))"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedNumber
          value={score}
          className="text-3xl font-black text-brand-primary font-mono"
        />
        <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-widest mt-0.5">
          / 100
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Complexity meter                                                   */
/* ------------------------------------------------------------------ */

const COMPLEXITY_LABELS = [
  { label: 'Simple', color: 'bg-green-500' },
  { label: 'Moderate', color: 'bg-yellow-500' },
  { label: 'Complex', color: 'bg-orange-500' },
  { label: 'Enterprise', color: 'bg-red-500' },
];

function ComplexityMeter({ level }: { level: number }) {
  // level 0-3
  const clampedLevel = Math.max(0, Math.min(3, level));
  return (
    <div>
      <div className="flex gap-1.5 mb-2">
        {COMPLEXITY_LABELS.map((seg, i) => (
          <div
            key={seg.label}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              i <= clampedLevel ? seg.color : 'bg-brand-border/30'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-brand-primary font-medium">
        {clampedLevel === 0 && 'Straightforward build'}
        {clampedLevel === 1 && 'Moderate complexity'}
        {clampedLevel === 2 && 'Complex system'}
        {clampedLevel === 3 && 'Enterprise-scale project'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main form component                                                */
/* ------------------------------------------------------------------ */

export default function ServiceRequestForm() {
  /* ---- State ---- */
  const [services, setServices] = useState<ServiceType[]>([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<TimelineOption | null>(null);
  const [budget, setBudget] = useState<BudgetOption | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);
  const prevDataRef = useRef('');

  /* ---- Derived: available features ---- */
  const availableFeatures = useMemo(() => {
    const all = new Set<string>();
    services.forEach((s) => FEATURE_MAP[s]?.forEach((f) => all.add(f)));
    return Array.from(all);
  }, [services]);

  // Clean up features when service types change
  useEffect(() => {
    setFeatures((prev) => prev.filter((f) => availableFeatures.includes(f)));
  }, [availableFeatures]);

  /* ---- Scope calculations ---- */
  const scopeData = useMemo(() => {
    const hasServices = services.length > 0;
    const featureCount = features.length;
    const maxFeatures = availableFeatures.length || 1;

    // Complexity level 0-3
    let complexityScore = 0;
    if (hasServices) {
      const featureRatio = featureCount / maxFeatures;
      const avgMultiplier =
        services.reduce((sum, s) => sum + COMPLEXITY_MULTIPLIER[s], 0) /
        services.length;
      complexityScore = featureRatio * avgMultiplier + (services.length - 1) * 0.3;
      if (budget === 'enterprise') complexityScore += 0.5;
    }
    const complexityLevel = Math.min(
      3,
      Math.floor(complexityScore * 3)
    );

    // Budget estimate
    let budgetMin = 0;
    let budgetMax = 0;
    if (hasServices) {
      services.forEach((s) => {
        budgetMin += BASE_COSTS[s].min;
        budgetMax += BASE_COSTS[s].max;
      });
      budgetMin += featureCount * FEATURE_COST.min;
      budgetMax += featureCount * FEATURE_COST.max;
      const cMultiplier = 1 + complexityLevel * 0.15;
      budgetMin = Math.round(budgetMin * cMultiplier / 500) * 500;
      budgetMax = Math.round(budgetMax * cMultiplier / 500) * 500;
    }

    // Timeline estimate (weeks)
    let timelineMin = 0;
    let timelineMax = 0;
    if (hasServices) {
      services.forEach((s) => {
        timelineMin += BASE_WEEKS[s].min;
        timelineMax += BASE_WEEKS[s].max;
      });
      timelineMin += Math.round(featureCount * 0.5);
      timelineMax += featureCount;
      const tFactor = timeline ? TIMELINE_FACTOR[timeline] : 1;
      timelineMin = Math.max(1, Math.round(timelineMin * tFactor));
      timelineMax = Math.max(timelineMin + 1, Math.round(timelineMax * tFactor));
    }

    // Recommended stack
    const stackSet = new Set<string>();
    if (hasServices) {
      services.forEach((s) => {
        STACK_SUGGESTIONS[s].base.forEach((t) => stackSet.add(t));
        features.forEach((f) => {
          STACK_SUGGESTIONS[s].conditional[f]?.forEach((t) => stackSet.add(t));
        });
      });
    }

    // Project clarity score 0-100
    let score = 0;
    if (services.length > 0) score += 20;
    if (description.trim().length > 20) score += 20;
    else if (description.trim().length > 0) score += 10;
    if (featureCount > 0) score += 15;
    if (featureCount >= 3) score += 5;
    if (timeline) score += 10;
    if (budget) score += 10;
    if (name.trim()) score += 8;
    if (email.trim()) score += 7;
    if (projectName.trim()) score += 3;
    if (industry.trim()) score += 2;
    score = Math.min(100, score);

    return {
      complexityLevel,
      budgetMin,
      budgetMax,
      timelineMin,
      timelineMax,
      stack: Array.from(stackSet),
      score,
      hasData: hasServices || description.trim().length > 0,
    };
  }, [services, features, availableFeatures, timeline, budget, description, name, email, projectName, industry]);

  // Glow pulse when data changes
  useEffect(() => {
    const key = JSON.stringify(scopeData);
    if (key !== prevDataRef.current && scopeData.hasData) {
      setGlowPulse(true);
      const t = setTimeout(() => setGlowPulse(false), 600);
      prevDataRef.current = key;
      return () => clearTimeout(t);
    }
  }, [scopeData]);

  /* ---- Helpers ---- */
  const toggleService = useCallback((id: ServiceType) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const toggleFeature = useCallback((f: string) => {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('jamesburge.mcm@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatBudget = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n}`;
  };

  /* ---- Submit ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormStatus('error');
      setErrorMessage('Name is required.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus('error');
      setErrorMessage('A valid email is required.');
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');

    const payload = {
      name,
      email,
      phone: phone || undefined,
      referral: referral || undefined,
      services: services.join(', '),
      projectName: projectName || undefined,
      description: description || undefined,
      industry: industry || undefined,
      features: features.join(', '),
      timeline: timeline || undefined,
      budget: budget || undefined,
      scopeEstimate: scopeData.hasData
        ? `Complexity: ${COMPLEXITY_LABELS[scopeData.complexityLevel].label}, Timeline: ${scopeData.timelineMin}-${scopeData.timelineMax} weeks, Budget: ${formatBudget(scopeData.budgetMin)}-${formatBudget(scopeData.budgetMax)}, Stack: ${scopeData.stack.join(', ')}, Clarity: ${scopeData.score}/100`
        : 'No scope data',
    };

    try {
      const response = await fetch('https://formspree.io/f/xyzgwdzk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage(
        'Failed to send your brief. Please try again or email jamesburge.mcm@gmail.com directly.'
      );
    }
  };

  /* ---- Section label component ---- */
  const SectionLabel = ({
    number,
    label,
  }: {
    number: string;
    label: string;
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent font-mono text-xs font-bold">
        {number}
      </div>
      <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  /* ---- Input classes ---- */
  const inputCls =
    'w-full bg-brand-base border border-brand-border rounded-lg px-4 py-3 text-brand-primary placeholder-brand-secondary/50 focus:outline-none focus:border-brand-accent transition-colors text-sm';

  /* ---- Scope Preview Panel ---- */
  const ScopePreview = ({ mobile = false }: { mobile?: boolean }) => {
    if (formStatus === 'success') {
      return (
        <div className="space-y-6 text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-2">
              Brief Sent!
            </h3>
            <p className="text-sm text-brand-secondary leading-relaxed">
              Your project brief has been received. I will review it and get
              back to you within 24 hours.
            </p>
          </div>

          {/* Summary */}
          <div className="text-left space-y-3 p-4 rounded-xl bg-brand-base border border-brand-border">
            <div className="font-mono text-[10px] text-brand-accent uppercase tracking-widest mb-3">
              Submission Summary
            </div>
            {services.length > 0 && (
              <div className="text-xs text-brand-secondary">
                <span className="text-brand-primary font-medium">Services:</span>{' '}
                {services
                  .map(
                    (s) =>
                      SERVICE_OPTIONS.find((o) => o.id === s)?.label ?? s
                  )
                  .join(', ')}
              </div>
            )}
            {features.length > 0 && (
              <div className="text-xs text-brand-secondary">
                <span className="text-brand-primary font-medium">Features:</span>{' '}
                {features.join(', ')}
              </div>
            )}
            {scopeData.score > 0 && (
              <div className="text-xs text-brand-secondary">
                <span className="text-brand-primary font-medium">Clarity:</span>{' '}
                {scopeData.score}/100
              </div>
            )}
          </div>

          <a
            href="mailto:jamesburge.mcm@gmail.com?subject=Book%20a%20Call%20-%20Project%20Discussion"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-lg hover:bg-brand-accent/90 transition-colors text-sm"
          >
            Book a Call <ArrowRight size={16} />
          </a>
        </div>
      );
    }

    if (!scopeData.hasData) {
      return (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-base border border-brand-border flex items-center justify-center">
            <Target className="w-7 h-7 text-brand-secondary/40" />
          </div>
          <p className="text-sm text-brand-secondary/60 leading-relaxed max-w-[240px] mx-auto">
            Start filling out the form to see your project scope come alive.
          </p>
          {/* Skeleton placeholders */}
          <div className="space-y-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div
                  className="h-2 rounded-full bg-brand-border/20"
                  style={{ width: `${40 + i * 12}%` }}
                />
                <div
                  className="h-6 rounded-lg bg-brand-border/10"
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
            <Layers size={12} /> Complexity
          </div>
          <ComplexityMeter level={scopeData.complexityLevel} />
        </motion.div>

        {/* Timeline */}
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
              <Clock size={12} /> Estimated Timeline
            </div>
            <div className="text-2xl font-black text-brand-primary tracking-tighter">
              <AnimatedNumber value={scopeData.timelineMin} /> -{' '}
              <AnimatedNumber value={scopeData.timelineMax} />{' '}
              <span className="text-base font-normal text-brand-secondary">
                weeks
              </span>
            </div>
          </motion.div>
        )}

        {/* Budget */}
        {services.length > 0 && !budget && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
              <DollarSign size={12} /> Suggested Budget
            </div>
            <div className="text-2xl font-black text-brand-primary tracking-tighter">
              {formatBudget(scopeData.budgetMin)} -{' '}
              {formatBudget(scopeData.budgetMax)}
            </div>
          </motion.div>
        )}

        {/* Stack */}
        {scopeData.stack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap size={12} /> Recommended Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence mode="popLayout">
                {scopeData.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="px-2.5 py-1 text-xs font-mono bg-brand-base border border-brand-border rounded-md text-brand-primary"
                  >
                    {tech}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="pt-2"
        >
          <div className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target size={12} /> Project Clarity
          </div>
          <ProjectScoreRing score={scopeData.score} />
          <p className="text-xs text-brand-secondary text-center mt-3 leading-relaxed">
            The more detail you provide, the faster we can start.
          </p>
        </motion.div>
      </div>
    );
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* ==================== LEFT COLUMN: FORM ==================== */}
        <div className="w-full lg:w-[58%]">
          {/* Header */}
          <div className="space-y-4 mb-12">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-brand-accent" />
              Request a Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
              Build Your Project Brief
            </h1>
            <p className="text-brand-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Tell me about your project and watch the scope estimate update in
              real time. The more detail you provide, the more accurate the
              preview becomes.
            </p>
            <div className="h-1 w-24 bg-brand-accent rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* ---- Section 1: Service type ---- */}
            <section>
              <SectionLabel number="01" label="What do you need?" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = services.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleService(opt.id)}
                      className={`relative p-5 rounded-xl border text-left transition-all duration-200 ${
                        selected
                          ? 'border-brand-accent bg-brand-accent/5'
                          : 'border-brand-border/40 bg-brand-surface/30 hover:border-brand-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selected
                              ? 'bg-brand-accent/10 text-brand-accent'
                              : 'bg-brand-base text-brand-secondary'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <span
                          className={`font-bold text-sm ${
                            selected
                              ? 'text-brand-primary'
                              : 'text-brand-secondary'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      {selected && (
                        <motion.div
                          layoutId={`check-${opt.id}`}
                          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center"
                        >
                          <CheckCircle size={12} className="text-brand-base" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* ---- Section 2: Project details ---- */}
            <section>
              <SectionLabel number="02" label="Tell us about your project" />
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                    Project Name{' '}
                    <span className="text-brand-secondary/40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., ContractorHub Pro"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                    Project Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project, the problem you're solving, or the vision you have..."
                    rows={5}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                    Industry / Vertical{' '}
                    <span className="text-brand-secondary/40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Construction, Healthcare, SaaS..."
                    className={inputCls}
                  />
                </div>
              </div>
            </section>

            {/* ---- Section 3: Features ---- */}
            <AnimatePresence>
              {services.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionLabel number="03" label="Features & Scope" />
                  <div className="flex flex-wrap gap-2">
                    {availableFeatures.map((f) => {
                      const selected = features.includes(f);
                      return (
                        <motion.button
                          key={f}
                          type="button"
                          layout
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFeature(f)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                            selected
                              ? 'bg-brand-accent/10 border-brand-accent text-brand-primary'
                              : 'bg-brand-surface/30 border-brand-border/40 text-brand-secondary hover:border-brand-border'
                          }`}
                        >
                          {f}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* ---- Section 4: Timeline & Budget ---- */}
            <section>
              <SectionLabel
                number={services.length > 0 ? '04' : '03'}
                label="Timeline & Budget"
              />

              {/* Timeline */}
              <div className="mb-6">
                <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-3 block">
                  Ideal Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINE_OPTIONS.map((opt) => {
                    const selected = timeline === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setTimeline(selected ? null : opt.id)
                        }
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          selected
                            ? 'border-brand-accent bg-brand-accent/5'
                            : 'border-brand-border/40 bg-brand-surface/30 hover:border-brand-border'
                        }`}
                      >
                        <div
                          className={`text-sm font-bold ${
                            selected
                              ? 'text-brand-primary'
                              : 'text-brand-secondary'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-[10px] font-mono text-brand-secondary/60 mt-0.5">
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-3 block">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BUDGET_OPTIONS.map((opt) => {
                    const selected = budget === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setBudget(selected ? null : opt.id)
                        }
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          selected
                            ? 'border-brand-accent bg-brand-accent/5'
                            : 'border-brand-border/40 bg-brand-surface/30 hover:border-brand-border'
                        }`}
                      >
                        <div
                          className={`text-sm font-bold ${
                            selected
                              ? 'text-brand-primary'
                              : 'text-brand-secondary'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-[10px] font-mono text-brand-secondary/60 mt-0.5">
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ---- Section 5: Contact info ---- */}
            <section>
              <SectionLabel
                number={services.length > 0 ? '05' : '04'}
                label="Contact Info"
              />
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                      Phone{' '}
                      <span className="text-brand-secondary/40">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 555-5555"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1.5 block">
                      How did you find me?{' '}
                      <span className="text-brand-secondary/40">(optional)</span>
                    </label>
                    <select
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      <option value="">Select...</option>
                      {REFERRAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* ---- Mobile scope preview (collapsed) ---- */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-brand-border bg-brand-surface/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                    Project Scope Preview
                  </span>
                </div>
                {mobilePreviewOpen ? (
                  <ChevronUp size={16} className="text-brand-secondary" />
                ) : (
                  <ChevronDown size={16} className="text-brand-secondary" />
                )}
              </button>
              <AnimatePresence>
                {mobilePreviewOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border border-t-0 border-brand-border rounded-b-xl bg-brand-surface/50">
                      <ScopePreview mobile />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---- Error / Status ---- */}
            <AnimatePresence>
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                >
                  <AlertCircle size={18} />
                  <span className="text-sm">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
              >
                <CheckCircle size={18} />
                <span className="text-sm font-medium">
                  Your project brief has been sent! Check your inbox for a
                  confirmation.
                </span>
              </motion.div>
            ) : (
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/50 text-brand-base font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
              >
                {formStatus === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-base/30 border-t-brand-base rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Project Brief
                  </>
                )}
              </button>
            )}

            {/* Alt contact */}
            <div className="pt-4 border-t border-brand-border/30">
              <p className="text-brand-secondary text-xs font-mono uppercase tracking-widest mb-3">
                Or reach out directly
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex-1 p-3 bg-brand-surface/30 border border-brand-border/40 rounded-lg hover:border-brand-accent transition-colors text-brand-primary font-mono text-xs text-center"
                >
                  {copied ? (
                    <span className="text-brand-accent">Copied!</span>
                  ) : (
                    'jamesburge.mcm@gmail.com'
                  )}
                </button>
                <a
                  href="https://github.com/Aphrodine-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-surface/30 border border-brand-border/40 rounded-lg hover:border-brand-accent transition-colors text-brand-secondary hover:text-brand-accent"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </form>
        </div>

        {/* ==================== RIGHT COLUMN: SCOPE PREVIEW ==================== */}
        <div className="hidden lg:block lg:w-[42%] lg:sticky lg:top-24">
          <motion.div
            className={`p-6 xl:p-8 rounded-2xl border bg-brand-surface/50 transition-shadow duration-500 ${
              glowPulse
                ? 'border-brand-accent/40 shadow-[0_0_30px_rgba(var(--accent-color),0.08)]'
                : 'border-brand-border'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border/30">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h2 className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                  Project Scope Preview
                </h2>
              </div>
              {scopeData.hasData && (
                <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">
                  Live
                </span>
              )}
            </div>

            <ScopePreview />
          </motion.div>
        </div>
      </div>

      {/* ==================== BOOK A CALL CTA ==================== */}
      {formStatus !== 'success' && (
        <section className="mt-20 md:mt-28 pt-12 border-t border-brand-border/20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-4 block">
              Prefer a conversation?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
              Book a Call
            </h2>
            <p className="text-brand-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Skip the form and schedule a free 30-minute discovery call. We
              will talk through your project, scope, and timeline -- no
              obligation.
            </p>
            <a
              href="mailto:jamesburge.mcm@gmail.com?subject=Book%20a%20Call%20-%20Project%20Discussion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-xl hover:bg-brand-accent/90 transition-colors"
            >
              Schedule a Call <ArrowRight size={18} />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
