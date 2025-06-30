import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBlob: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: '-80px', left: '-80px', zIndex: 0, width: 320, height: 320, pointerEvents: 'none' }}
  >
    <defs>
      <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a5b4fc" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <motion.path
      d="M320,200Q320,280,240,320Q160,360,80,320Q0,280,0,200Q0,120,80,80Q160,40,240,80Q320,120,320,200Z"
      fill="url(#blobGradient)"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

export default AnimatedBlob;
