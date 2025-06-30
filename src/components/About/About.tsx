import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaNetworkWired, FaNodeJs, FaGitAlt, FaLightbulb, FaCommentDots, FaCogs, FaProjectDiagram, FaChartBar, FaDatabase } from 'react-icons/fa';
import { SiOpenai, SiLangchain, SiPytorch, SiTensorflow, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiShadcnui, SiExpress, SiPython, SiFastapi, SiFlask, SiGithubactions, SiDocker, SiVite, SiPostman, SiFirebase, SiSupabase, SiPandas, SiNumpy } from 'react-icons/si';
import ParticlesBg from '../Hero/ParticlesBg';
import { Typewriter } from 'react-simple-typewriter';
import styles from './About.module.css';
import AnimatedBlob from './AnimatedBlob';

const skills = [
  { icon: <SiOpenai className={styles.skillIcon} />, label: 'GenAI' },
  { icon: <SiOpenai className={styles.skillIcon} />, label: 'LLMs' },
  { icon: <FaRobot className={styles.skillIcon} />, label: 'Agentic AI' },
  { icon: <SiLangchain className={styles.skillIcon} />, label: 'LangChain' },
  { icon: <FaCogs className={styles.skillIcon} />, label: 'AutoGen' },
  { icon: <FaCogs className={styles.skillIcon} />, label: 'Transformers' },
  { icon: <FaLightbulb className={styles.skillIcon} />, label: 'Prompt Eng.' },
  { icon: <FaCommentDots className={styles.skillIcon} />, label: 'NLP' },
  { icon: <SiPytorch className={styles.skillIcon} />, label: 'PyTorch' },
  { icon: <SiTensorflow className={styles.skillIcon} />, label: 'TensorFlow' },
  { icon: <SiReact className={styles.skillIcon} />, label: 'React.js' },
  { icon: <SiTypescript className={styles.skillIcon} />, label: 'TypeScript' },
  { icon: <SiTailwindcss className={styles.skillIcon} />, label: 'Tailwind' },
  { icon: <SiFramer className={styles.skillIcon} />, label: 'Framer Motion' },
  { icon: <SiShadcnui className={styles.skillIcon} />, label: 'shadcn/ui' },
  { icon: <FaNetworkWired className={styles.skillIcon} />, label: 'React Router' },
  { icon: <FaNodeJs className={styles.skillIcon} />, label: 'Node.js' },
  { icon: <SiExpress className={styles.skillIcon} />, label: 'Express' },
  { icon: <SiPython className={styles.skillIcon} />, label: 'Python' },
  { icon: <SiFastapi className={styles.skillIcon} />, label: 'FastAPI' },
  { icon: <SiFlask className={styles.skillIcon} />, label: 'Flask' },
  { icon: <FaGitAlt className={styles.skillIcon} />, label: 'Git' },
  { icon: <SiGithubactions className={styles.skillIcon} />, label: 'GitHub Actions' },
  { icon: <SiDocker className={styles.skillIcon} />, label: 'Docker' },
  { icon: <SiVite className={styles.skillIcon} />, label: 'Vite' },
  { icon: <SiPostman className={styles.skillIcon} />, label: 'Postman' },
  { icon: <SiFirebase className={styles.skillIcon} />, label: 'Firebase' },
  { icon: <SiSupabase className={styles.skillIcon} />, label: 'Supabase' },
  { icon: <SiPandas className={styles.skillIcon} />, label: 'Pandas' },
  { icon: <SiNumpy className={styles.skillIcon} />, label: 'NumPy' },
  { icon: <FaChartBar className={styles.skillIcon} />, label: 'Matplotlib' },
  { icon: <FaDatabase className={styles.skillIcon} />, label: 'Pinecone' },
  { icon: <FaProjectDiagram className={styles.skillIcon} />, label: 'FAISS' },
  { icon: <FaCogs className={styles.skillIcon} />, label: 'Chroma' },
];

const timeline = [
  {
    year: '2026',
    title: 'Graduating',
    company: 'VNIT Nagpur',
    description: 'Graduation in Progress....',
  },
  {
    year: '2025',
    title: 'Internship',
    company: 'Genpact',
    description: 'Worked on GenAI projects, gaining hands-on experience with large language models and AI-driven applications.',
  },
  {
    year: '2024',
    title: 'Freelance Developer',
    company: 'Self-Employed',
    description: 'Data-driven web solutions for startups and trained machine learning models.',
  },
];

const About: React.FC = () => {
  // Parallax effect for background (ref removed, not used)
  useEffect(() => {
    // No-op: offset and bgRef logic removed as they were not used
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 overflow-hidden dark:bg-gradient-to-br dark:from-[#181a29] dark:via-[#232336] dark:to-[#232336]"
      id="about"
      style={{ background: 'linear-gradient(135deg, #b7bdfb 0%, #a5b4fc 60%, #c7d2fe 100%)' }}
    >
      {/* Parallax/gradient background layer */}
      <div className={`${styles.aboutBg} dark:${styles.aboutBgDark}`} aria-hidden="true" />
      {/* Animated floating accent */}
      <motion.div
        className={`${styles.aboutFloatingAccent} dark:${styles.aboutFloatingAccentDark}`}
        initial={{ y: -20, opacity: 0.7 }}
        animate={{ y: [ -20, 20, -20 ], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform, opacity' }}
      />
      {/* Particles background */}
      <div className={styles.aboutParticles}><ParticlesBg /></div>
      {/* Animated SVG Blob background */}
      <AnimatedBlob />
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left: About & Skills */}
        <div>
          <motion.h2
            className={styles.aboutHeading}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typewriter
              words={["About Me", "Who am I?", "My Story"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>
          <div className={`${styles.underlineAccent} dark:${styles.underlineAccentDark}`}> {/* underline accent dark mode */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              viewport={{ once: true }}
              style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)', borderRadius: 2, transformOrigin: 'left' }}
            />
          </div>
          <motion.img
            src="/profile.jpg"
            alt="Portrait of Aadarsh, Creative Developer"
            className="rounded-full shadow-lg mb-6 dark:ring-2 dark:ring-indigo-500 dark:ring-offset-2 dark:ring-offset-[#232336] mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ width: 160, height: 160, objectFit: 'cover', boxShadow: '0 0 32px 8px #a78bfa55' }}
          />
          <motion.p
            className={styles.aboutBody}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            I'm building at the edge of <span className={styles.textAccent}>GenAI</span> — crafting intelligent, production-ready apps with LLMs, agentic workflows, and modern web tech. From <strong>React</strong> and <strong>TypeScript</strong> to <strong>LangChain</strong> and <strong>AutoGen</strong>, I turn cutting-edge ideas into scalable, user-first products.
          </motion.p>
          <motion.h3
            className={styles.aboutSubHeading}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Core Skills
          </motion.h3>
          <div className={styles.skillsGrid}>
            {skills.slice(0, 12).map((skill, idx) => (
              <motion.div
                key={skill.label}
                whileHover={{ scale: 1.18, rotate: 360, boxShadow: '0 0 24px 4px #6366f155' }}
                whileTap={{ scale: 1.08, rotate: 360 }}
                animate={{ rotate: [0, 1] }}
                transition={{ type: 'spring', stiffness: 300, repeat: Infinity, repeatType: 'reverse', duration: 2, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                {skill.icon}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-1">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Right: Timeline only */}
        <div className="flex flex-col items-center w-full">
          <motion.h3
            className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Experience & Education
          </motion.h3>
          <div className={styles.timeline} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '2rem 0', borderLeft: '4px solid', borderImage: 'linear-gradient(to bottom, #6366f1, #a5b4fc, #f472b6) 1', marginLeft: '1rem', boxShadow: '0 2px 24px 0 rgba(99, 102, 241, 0.07)' }}>
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                className={styles.timelineCard}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.045, rotate: -1, boxShadow: '0 16px 48px 0 #6366f144' }}
                transition={{ duration: 0.7, delay: idx * 0.2, type: 'spring', stiffness: 120 }}
                viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', marginBottom: '2.5rem', marginLeft: '1.5rem', minWidth: 0 }}
              >
                <span className={styles.timelineYear}>{item.year}</span>
                <div style={{ flex: 1 }}>
                  <div className={styles.timelineTitle} style={{ fontSize: '1.08rem', fontWeight: 900, marginBottom: 0, letterSpacing: '0.01em' }}>{item.title} <span className={styles.timelineCompany} style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.01rem', marginLeft: 4, textDecoration: 'underline', background: 'linear-gradient(90deg, #e0e7ff 0%, #a5b4fc 100%)', padding: '0.12rem 0.5rem', borderRadius: 999, boxShadow: '0 1px 6px #a5b4fc22' }}>@ {item.company}</span></div>
                  <div className={styles.timelineDesc} style={{ color: '#232336', fontSize: '0.98rem', opacity: 0.92, fontWeight: 500, marginTop: 6, marginBottom: 4, lineHeight: 1.5 }}>{item.description}</div>
                  <a
                    href={
                      item.company === 'VNIT Nagpur'
                        ? 'https://vnit.ac.in/'
                        : item.company === 'Genpact'
                        ? 'https://genpact.com/'
                        : item.company === 'Self-Employed'
                        ? 'https://aadarshk.com/'
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.timelineBtn}
                    style={{ fontSize: '0.93rem', padding: '0.38rem 1rem', marginTop: 8 }}
                  >
                    View Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
