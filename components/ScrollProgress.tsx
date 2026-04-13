import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (barRef.current) {
          const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const pct = total > 0 ? (document.documentElement.scrollTop / total) * 100 : 0;
          barRef.current.style.width = `${pct}%`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div ref={barRef} className="h-full bg-brand-accent" style={{ width: '0%', willChange: 'width' }} />
    </div>
  );
};
