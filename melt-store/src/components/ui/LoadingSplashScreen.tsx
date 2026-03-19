'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-melt-bg"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Wordmark */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-melt-text">
                MELT
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-melt-text-muted mt-2 text-center">
                Solid Perfume
              </p>
            </motion.div>

            {/* Premium Loading Bar Container */}
            <div className="w-48 h-[1px] bg-melt-border relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-melt-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
            
            {/* Percentage Indicator */}
            <motion.span 
              className="mt-4 font-sans text-[10px] tracking-tighter text-melt-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Decorative Background Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-melt-accent) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSplashScreen;
