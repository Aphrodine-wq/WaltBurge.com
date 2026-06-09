import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PracticeVertical } from '../lib/practice';

interface RevenueCalculatorProps {
  calc: PracticeVertical['calc'];
  onBook: () => void;
}

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

// A field with a label, hint, and a controlled number input. Sharp, hairline,
// refined-minimal — matches the rest of the site.
const Field: React.FC<{
  label: string; hint?: string; prefix?: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void;
}> = ({ label, hint, prefix, value, min, max, step, onChange }) => (
  <label className="block">
    <span className="block text-sm font-bold text-brand-primary">{label}</span>
    {hint && <span className="block mt-1 text-xs text-brand-secondary leading-relaxed">{hint}</span>}
    <div className="mt-2 flex items-center border border-brand-border bg-brand-base focus-within:border-brand-accent transition-colors">
      {prefix && <span className="pl-3 text-brand-secondary font-mono text-sm select-none">{prefix}</span>}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : ''}
        onChange={e => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        className="w-full bg-transparent px-3 py-3 font-mono text-brand-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  </label>
);

// Interactive "cost of doing nothing" calculator. Pure client-side estimate —
// missed calls/week × 52 × value per new client × conversion rate. Labelled an
// estimate, because it is one. Ends in the booking CTA.
export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ calc, onBook }) => {
  const [missed, setMissed] = useState(calc.defaultMissed);
  const [value, setValue] = useState(calc.defaultValue);
  const [rate, setRate] = useState(calc.defaultRate);

  const annualLost = useMemo(() => missed * 52 * value * (Math.min(100, Math.max(0, rate)) / 100), [missed, value, rate]);
  const lostPerYear = useMemo(() => missed * 52 * (Math.min(100, Math.max(0, rate)) / 100), [missed, rate]);

  return (
    <section className="border border-brand-border bg-brand-surface">
      <div className="p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight leading-tight max-w-xl">
          {calc.heading}
        </h2>

        <div className="mt-8 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-start">
          {/* Inputs */}
          <div className="space-y-6">
            <Field label={calc.unitLabel} value={missed} min={0} max={500} step={1} onChange={setMissed} />
            <Field label={calc.valueLabel} hint={calc.valueHint} prefix="$" value={value} min={0} max={1000000} step={100} onChange={setValue} />
            <Field label={calc.rateLabel} prefix="%" value={rate} min={0} max={100} step={5} onChange={setRate} />
          </div>

          {/* Result */}
          <div className="border-t md:border-t-0 md:border-l border-brand-border pt-8 md:pt-0 md:pl-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-secondary">
              Walking out the door, every year
            </span>
            <div className="mt-3 text-5xl md:text-6xl font-black text-brand-accent tracking-tighter tabular-nums break-words">
              {usd(annualLost)}
            </div>
            <p className="mt-4 text-brand-secondary leading-relaxed">
              That's about <span className="font-bold text-brand-primary">{Math.round(lostPerYear)} {calc.resultNoun}</span> a
              year going to whoever answered first. A system that catches those calls usually pays for itself in weeks.
            </p>
            <button
              onClick={onBook}
              className="group mt-6 inline-flex items-center gap-2 bg-brand-accent text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
            >
              Stop the leak — book a free call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-3 text-xs text-brand-secondary">A rough estimate from your own numbers — not a quote.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
