import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';
import {
  SiOpenai, SiLangchain, SiPytorch, SiTensorflow, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiShadcnui, SiExpress, SiPython, SiFastapi, SiFlask, SiGithubactions, SiDocker, SiVite, SiPostman, SiFirebase, SiSupabase, SiPandas, SiNumpy, SiPlotly,
} from 'react-icons/si';
import { FaRobot, FaLightbulb, FaCommentDots, FaNetworkWired, FaNodeJs, FaGitAlt, FaCogs, FaProjectDiagram, FaCubes, FaChartBar, FaDatabase } from 'react-icons/fa';

const iconMap: Record<string, ReactElement> = {
  SiOpenai: <SiOpenai className={styles.skillIcon} />,
  SiLangchain: <SiLangchain className={styles.skillIcon} />,
  FaRobot: <FaRobot className={styles.skillIcon} />,
  FaLightbulb: <FaLightbulb className={styles.skillIcon} />,
  FaCommentDots: <FaCommentDots className={styles.skillIcon} />,
  SiPytorch: <SiPytorch className={styles.skillIcon} />,
  SiTensorflow: <SiTensorflow className={styles.skillIcon} />,
  SiReact: <SiReact className={styles.skillIcon} />,
  SiTypescript: <SiTypescript className={styles.skillIcon} />,
  SiTailwindcss: <SiTailwindcss className={styles.skillIcon} />,
  SiFramer: <SiFramer className={styles.skillIcon} />,
  SiShadcnui: <SiShadcnui className={styles.skillIcon} />,
  FaNetworkWired: <FaNetworkWired className={styles.skillIcon} />,
  SiExpress: <SiExpress className={styles.skillIcon} />,
  FaNodeJs: <FaNodeJs className={styles.skillIcon} />,
  SiPython: <SiPython className={styles.skillIcon} />,
  SiFastapi: <SiFastapi className={styles.skillIcon} />,
  SiFlask: <SiFlask className={styles.skillIcon} />,
  FaGitAlt: <FaGitAlt className={styles.skillIcon} />,
  SiGithubactions: <SiGithubactions className={styles.skillIcon} />,
  SiDocker: <SiDocker className={styles.skillIcon} />,
  SiVite: <SiVite className={styles.skillIcon} />,
  SiPostman: <SiPostman className={styles.skillIcon} />,
  SiFirebase: <SiFirebase className={styles.skillIcon} />,
  SiSupabase: <SiSupabase className={styles.skillIcon} />,
  SiPandas: <SiPandas className={styles.skillIcon} />,
  SiNumpy: <SiNumpy className={styles.skillIcon} />,
  SiPlotly: <SiPlotly className={styles.skillIcon} />,
  FaCogs: <FaCogs className={styles.skillIcon} />,
  FaProjectDiagram: <FaProjectDiagram className={styles.skillIcon} />,
  FaCubes: <FaCubes className={styles.skillIcon} />,
  FaChartBar: <FaChartBar className={styles.skillIcon} />,
  FaDatabase: <FaDatabase className={styles.skillIcon} />,
};

const categoryIcons: Record<string, ReactElement> = {
  'AI/ML': <SiOpenai className={styles.skillIcon} />,
  'Frontend': <SiReact className={styles.skillIcon} />,
  'Backend & APIs': <FaNodeJs className={styles.skillIcon} />,
  'Tooling': <FaGitAlt className={styles.skillIcon} />,
  'Data & ML Tools': <SiPandas className={styles.skillIcon} />,
  'Vector DBs & Infra': <FaDatabase className={styles.skillIcon} />,
};

type Skill = {
  icon: string;
  name: string;
  level: number;
  fact: string;
};
type SkillCategory = {
  category: string;
  skills: Skill[];
};

const SkillsSection: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'skills.json')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section id="skills" className="relative w-full max-w-6xl mx-auto px-2 md:px-6 py-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #c7e0fa 0%, #e0e7ff 60%, #f8fafc 100%)' }}>
      {/* Parallax/gradient background layer */}
      <div className={styles.skillsSectionBg} aria-hidden="true" />
      {/* Animated floating accent */}
      <motion.div
        className={styles['skills-floating-accent']}
        initial={{ y: 20, opacity: 0.7, rotate: 0 }}
        animate={{ y: [20, -20, 20], opacity: [0.7, 1, 0.7], rotate: [0, 60, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform, opacity' }}
      />
      <h2 className="text-4xl font-bold mb-10 text-center relative z-10">Skills</h2>
      <div className={styles.cardGrid + ' grid gap-6 relative z-10'}>
        {categories.map((cat) => (
          <motion.div
            key={cat.category}
            className={styles.card}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 48px 0 #6366f155' }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              className={styles.cardHeader}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {categoryIcons[cat.category] || <FaCogs className={styles.skillIcon} />}
              <span>{cat.category}</span>
            </motion.div>
            {cat.skills && cat.skills.length > 0 ? (
              <>
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillRow}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.04, background: 'rgba(99,102,241,0.06)' }}
                    transition={{ duration: 0.38, delay: idx * 0.06 }}
                    viewport={{ once: true }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.18, rotate: -6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={styles.skillIcon}
                    >
                      {iconMap[skill.icon] || <FaCogs className={styles.skillIcon} />}
                    </motion.span>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.1, ease: 'easeInOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className={styles.skillPercent}>{skill.level}%</span>
                  </motion.div>
                ))}
                {cat.skills.map((skill) => (
                  <div key={skill.name + '-fact'} className={styles.factText}>{skill.fact}</div>
                ))}
              </>
            ) : (
              <div className="text-gray-400">No skills found.</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
