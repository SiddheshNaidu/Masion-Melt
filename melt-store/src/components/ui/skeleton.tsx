'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-melt-bg-alt rounded-lg ${className}`}>
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
}
