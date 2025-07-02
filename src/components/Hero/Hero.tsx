import React, { memo } from 'react';
import TypewriterText from './TypewriterText';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEye } from 'react-icons/fa';
import './Hero.css';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Hero: React.FC = memo(() => {
  return (
    <section
      className="hero-section"
      id="hero"
      aria-label="Hero section"
    >
      {/* Subtle animated background overlay */}
      <motion.div
        className="hero-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Main content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.6, -0.05, 0.01, 0.99]
        }}
      >
        {/* Intro text */}
        <motion.div
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-intro-text">👋 Welcome to my portfolio</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          tabIndex={0}
          aria-label="Hi, I'm Aadarsh Kumar, an AI Engineer and Problem Solver"
        >
          Hi, I'm <TypewriterText />
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          an AI Engineer & Problem Solver
        </motion.p>

        {/* Enhanced description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Crafting intelligent solutions with cutting-edge AI technology and modern web development
        </motion.p>

        <motion.div 
          className="hero-btn-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hero-btn hero-hire-btn"
            whileHover={{ 
              scale: 1.02, 
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Navigate to contact section to hire me"
          >
            <FaPaperPlane style={{ marginRight: 8 }} /> 
            Hire Me
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('projects')}
            className="hero-btn hero-work-btn"
            whileHover={{ 
              scale: 1.02, 
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Navigate to projects section to see my work"
          >
            <FaEye style={{ marginRight: 8 }} />
            See My Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - positioned relative to hero-section, not hero-content */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={() => scrollToSection('about')}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection('about');
          }
        }}
        aria-label="Scroll to about section"
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
        <span className="scroll-text">Scroll to explore</span>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
