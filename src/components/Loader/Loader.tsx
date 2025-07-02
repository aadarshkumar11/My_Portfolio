import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const loaderTitle = 'Aadarsh';

const Loader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onFinish, 300); // Reduced exit delay for faster transition
          return 100;
        }
        return prev + 2.5; // Increased increment for faster progress
      });
    }, 25); // Reduced interval for smoother and faster progress

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ willChange: 'opacity' }}
    >
      {/* Glassmorphism background with gradient */}
      <div className="loader-bg-overlay" />
      <motion.div 
        className="loader-bg-gradient" 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Elegant floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`loader-particle loader-particle-${i + 1}`}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        />
      ))}

      <motion.div
        className="loader-content"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -10 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Glassmorphism progress ring */}
        <motion.div 
          className="loader-ring-container"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <div className="loader-ring-glass">
            <svg className="loader-ring" viewBox="0 0 120 120">
              {/* Background ring */}
              <circle
                className="loader-ring-bg"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />
              
              {/* Progress ring */}
              <motion.circle
                className="loader-ring-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ 
                  pathLength: progress / 100,
                  rotate: progress * 3.6
                }}
                transition={{ 
                  pathLength: { duration: 0.4, ease: 'easeOut' },
                  rotate: { duration: 0.4, ease: 'easeOut' }
                }}
                style={{
                  transformOrigin: '60px 60px'
                }}
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--accent-primary)' }} />
                  <stop offset="50%" style={{ stopColor: 'var(--accent-tertiary)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)' }} />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* Progress text with glassmorphism */}
            <motion.div 
              className="loader-progress-text"
              key={Math.floor(progress / 5)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="loader-progress-number">{Math.round(progress)}</span>
              <span className="loader-progress-percent">%</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Elegant animated title */}
        <motion.div 
          className="loader-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {loaderTitle.split('').map((char, idx) => (
            <motion.span
              key={idx}
              className="loader-title-char"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: 0.6 + idx * 0.08, 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Refined subtitle */}
        <motion.div
          className="loader-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        >
          <span>Portfolio</span>
          <motion.div 
            className="loader-subtitle-dot"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="loader-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          Loading...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
