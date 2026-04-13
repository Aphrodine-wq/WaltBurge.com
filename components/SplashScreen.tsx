import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </motion.div>
  );
};
