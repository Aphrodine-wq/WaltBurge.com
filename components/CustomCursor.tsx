import React, { useEffect, useRef } from 'react';

/**
 * Cobalt-dot cursor. The native cursor is hidden only AFTER the dot is alive
 * and positioned (html.wb-cursor, added on the first mousemove) — so there is
 * never a moment with no cursor at all. Detection uses (pointer: fine) rather
 * than touch sniffing: maxTouchPoints is nonzero on plenty of desktops.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const hasFinePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    if (!hasFinePointer) return;
    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      dotRef.current.style.opacity = '1';
      root.classList.add('wb-cursor'); // native cursor off only once the dot is placed
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      root.classList.remove('wb-cursor');
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] opacity-0"
      style={{ willChange: 'transform', transition: 'opacity 0.2s ease' }}
    />
  );
};
