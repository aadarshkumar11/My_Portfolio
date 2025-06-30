import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const loaderTitle = 'Aadarsh';

const Loader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1200); // Reduced to 1.2 seconds for faster load
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="loader-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }} // Faster fade out
      style={{ willChange: 'opacity' }}
    >
      {/* Floating particles */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className={`loader-particle loader-particle-${i+1}`} />
      ))}
      <motion.div
        className="loader-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }} // Faster
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="loader-glow" />
        <div className="loader-ring" />
        <span className="loader-title">
          {loaderTitle.split('').map((char, idx) => (
            <motion.span
              key={idx}
              className="loader-title-char"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.09 + idx * 0.05, duration: 0.28, type: 'spring', stiffness: 180 }} // Faster
              style={{ willChange: 'transform, opacity' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        <motion.span
          className="loader-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.38, type: 'spring', stiffness: 120 }} // Faster
          style={{ willChange: 'transform, opacity' }}
        >
          Creative Developer
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
