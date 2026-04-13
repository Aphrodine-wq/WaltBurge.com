import React, { useEffect, useRef, useCallback } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const onMove = useCallback((e: MouseEvent) => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      dotRef.current.style.opacity = '1';
    }
  }, []);

  const onLeave = useCallback(() => {
    if (dotRef.current) dotRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    if (isTouch) return;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [isTouch, onMove, onLeave]);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] opacity-0"
      style={{ willChange: 'transform' }}
    />
  );
};
