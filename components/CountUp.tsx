import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

// Ticks a stat up from zero when it scrolls into view. Parses a display string
// like "18K+" into the number (18) and its suffix ("K+") so the suffix holds
// steady while the digits count. Once, then it rests.
interface CountUpProps {
  value: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setN(v),
    });
    return () => controls.stop();
  }, [inView, target, match]);

  return (
    <span ref={ref} className={className}>
      {match ? Math.round(n) : value}
      {match ? suffix : ''}
    </span>
  );
};
