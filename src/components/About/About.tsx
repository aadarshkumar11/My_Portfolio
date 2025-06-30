import React from 'react';
import Timeline from './Timeline';
import SkillBars from './SkillBars';
import SkillIcons from './SkillIcons';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import './About.css';

const About: React.FC = () => (
  <motion.section
    id="about"
    className="about-section"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }} // Reduced for snappier UX
    viewport={{ once: true, amount: 0.2 }}
    style={{ willChange: 'transform, opacity' }} // Performance hint
  >
    {/* Parallax/gradient background layer */}
    <div className="about-bg-parallax" aria-hidden="true" />
    {/* Animated floating accent */}
    <motion.div
      className="about-floating-accent"
      initial={{ y: -20, opacity: 0.7 }}
      animate={{ y: [ -20, 20, -20 ], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} // Slightly faster
      style={{ willChange: 'transform, opacity' }}
    />
    <a
      href="/resume.pdf"
      download
      className="about-resume-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaDownload style={{ marginRight: 8, marginBottom: -2 }} />
      Download Resume
    </a>
    <div className="about-content">
      <h2 className="about-title">About Me</h2>
      <div className="about-subtitle">Creative, Passionate, and Always Learning <span className="about-underline"></span></div>
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <motion.div className="about-profile relative flex items-center justify-center mb-6 md:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} // Faster
          viewport={{ once: true }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-60 animate-pulse-slow"></span>
          <motion.img
            src="/profile.jpg"
            alt="Portrait of Aadarsh, Creative Developer"
            loading="lazy"
            className="about-profile"
            style={{ objectFit: 'cover', width: '100%', height: '100%', maxWidth: 180, maxHeight: 180, willChange: 'transform, opacity' }}
          />
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} // Faster
          viewport={{ once: true }}
          style={{ willChange: 'transform, opacity' }}
        >
          <p className="mb-4 max-w-xl text-center md:text-left mx-auto md:mx-0">I'm a passionate developer with a love for building beautiful, performant web experiences. I specialize in React, TypeScript, and modern UI/UX. Let's build something amazing together!</p>
          <SkillBars />
          <SkillIcons />
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-800 rounded-full font-semibold">React</span>
            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-800 rounded-full font-semibold">TypeScript</span>
            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-800 rounded-full font-semibold">Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Experience & Education</h3>
        <Timeline />
      </div>
    </div>
  </motion.section>
);

export default About;
