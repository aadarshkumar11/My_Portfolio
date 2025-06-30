import React, { useRef, useEffect, useState } from 'react';
import TypewriterText from './TypewriterText';
import ParticlesBg from './ParticlesBg';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import './Hero.css';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        setOffset(rect.top * 0.2); // Parallax factor
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="hero-section"
      id="hero"
    >
      {/* Parallax gradient background overlay */}
      <motion.div
        ref={bgRef}
        className="hero-bg"
        style={{ transform: `translateY(${offset}px)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      ></motion.div>
      {/* Animated floating accent */}
      <motion.div
        className="hero-floating-accent"
        initial={{ y: -30, opacity: 0.7 }}
        animate={{ y: [ -30, 10, -30 ], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="hero-particles">
        <ParticlesBg />
      </div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          tabIndex={0}
          aria-label="Hi, I'm Aadarsh, Creative Developer & Freelancer"
        >
          Hi, I'm <TypewriterText />
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Creative Developer & Freelancer
        </motion.p>
        <div className="hero-btn-group">
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hero-btn hero-hire-btn"
            whileHover={{ scale: 1.08, rotate: -2 }}
            aria-label="Contact me section"
          >
            <FaPaperPlane style={{ marginRight: 8 }} /> Hire Me
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="hero-btn hero-work-btn"
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
          >
            See My Work
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
