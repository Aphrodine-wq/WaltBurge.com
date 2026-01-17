import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-brand-base border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-brand-black transition-all duration-300 w-12 h-12"
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
};
