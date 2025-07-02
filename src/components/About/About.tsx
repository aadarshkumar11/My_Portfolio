import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaNetworkWired, FaNodeJs, FaGitAlt, FaLightbulb, FaCommentDots, FaCogs, FaProjectDiagram, FaChartBar, FaDatabase } from 'react-icons/fa';
import { SiOpenai, SiLangchain, SiPytorch, SiTensorflow, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiShadcnui, SiExpress, SiPython, SiFastapi, SiFlask, SiGithubactions, SiDocker, SiVite, SiPostman, SiFirebase, SiSupabase, SiPandas, SiNumpy } from 'react-icons/si';
import ParticlesBg from '../Hero/ParticlesBg';
import Timeline from './Timeline';
import { Typewriter } from 'react-simple-typewriter';
import styles from './About.module.css';

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

const About: React.FC = () => {
  // Parallax effect for background (ref removed, not used)
  useEffect(() => {
    // No-op: offset and bgRef logic removed as they were not used
  }, []);

  return (
    <section
      className={`${styles.section} relative w-full min-h-screen flex flex-col items-center justify-center py-8 px-6 md:py-12 md:px-8 lg:py-16 lg:px-12 overflow-hidden`}
      id="about"
      // NOTE: Do not add external margins (mt-*, mb-*) to sections as it creates gaps
      // Use internal padding instead to maintain seamless section flow
    >
      {/* Parallax/gradient background layer */}
      <div className={styles.sectionBg} aria-hidden="true" />
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
      {/* <AnimatedBlob /> */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start relative z-10">
        {/* Left: About & Skills */}
        <div className="space-y-8 md:space-y-10 lg:space-y-12 p-4 md:p-6 lg:p-8">
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
          <div className={`${styles.underlineAccent} dark:${styles.underlineAccentDark} mb-8`}> {/* underline accent dark mode */}
            <motion.div
              initial={{ scaleX: 50 }}
              whileInView={{ scaleX: 100 }}
              transition={{ duration: 10, ease: 'easeInOut' , repeat: Infinity, repeatType: 'reverse'}}
              viewport={{ once: true }}
              style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)', borderRadius: 2, transformOrigin: 'left' }}
            />
          </div>
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <motion.img
              src="/profile.jpg"
              alt="Portrait of Aadarsh, Creative Developer"
              className="rounded-full shadow-lg dark:ring-2 dark:ring-indigo-500 dark:ring-offset-2 dark:ring-offset-[#232336] mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{ width: 160, height: 160, objectFit: 'cover', boxShadow: '0 0 32px 8px #a78bfa55' }}
            />
            <motion.p
              className={`${styles.aboutBody} text-center md:text-left px-2 md:px-0`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              I'm building at the edge of <span className={styles.textAccent}>GenAI</span> — crafting intelligent, production-ready apps with LLMs, agentic workflows, and modern web tech. From <strong>React</strong> and <strong>TypeScript</strong> to <strong>LangChain</strong> and <strong>AutoGen</strong>, I turn cutting-edge ideas into scalable, user-first products.
            </motion.p>
          </div>

          {/* Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-start py-4"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-download-btn"
              whileHover={{ 
                scale: 1.05, 
                y: -3
              }}
              whileTap={{ scale: 0.98 }}
              aria-label="Download my resume (opens in new tab)"
            >
              <motion.span
                className="resume-btn-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                📄
              </motion.span>
              Download Resume
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="resume-btn-arrow"
                animate={{ y: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </motion.svg>
            </motion.a>
          </motion.div>
          
          <div className="space-y-6 md:space-y-8 pt-4">
            <motion.h1
              className={styles.aboutHeading}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Typewriter
                words={["Core Skills", "What I Do", "Tech Stack"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.h1>
            <div className={`${styles.skillsGrid} px-2 md:px-0`}>
              {skills.slice(0, 12).map((skill, idx) => (
                <motion.div
                  key={skill.label}
                  whileHover={{ scale: 1.18, rotate: 360, boxShadow: '0 0 24px 4px #6366f155' }}
                  whileTap={{ scale: 1.08, rotate: 360 }}
                  animate={{ rotate: [0, 1] }}
                  transition={{ type: 'spring', stiffness: 300, repeat: Infinity, repeatType: 'reverse', duration: 2, delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center p-3 md:p-4"
                >
                  {skill.icon}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-1">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Timeline only */}
        <div className="flex flex-col items-center w-full p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Experience & Education
          </motion.h3>
          <div className="w-full">
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
