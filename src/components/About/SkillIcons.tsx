import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiOpenai, SiReact, SiTailwindcss } from 'react-icons/si';
import { FaRobot, FaPython, FaCode, FaUserTie } from 'react-icons/fa';
import './SkillIcons.css';

const skills = [
  { icon: <SiOpenai />, name: 'GenAI & LLMs', description: 'Generative AI, LLMs, OpenAI, and related tools.' },
  { icon: <SiReact />, name: 'React.js & TypeScript', description: 'Modern frontend with React and TypeScript.' },
  { icon: <FaRobot />, name: 'Agentic AI (LangChain, AutoGen)', description: 'Agent frameworks for advanced AI workflows.' },
  { icon: <FaPython />, name: 'Python (AI, APIs, scripting)', description: 'Python for AI, APIs, and automation.' },
  { icon: <FaRobot />, name: 'Machine Learning & NLP', description: 'ML, NLP, and data-driven solutions.' },
  { icon: <FaCode />, name: 'Full-Stack Web Development', description: 'Building robust web apps end-to-end.' },
  { icon: <SiTailwindcss />, name: 'Modern UI/UX (Tailwind, Framer Motion)', description: 'UI/UX with Tailwind CSS and Framer Motion.' },
  { icon: <FaUserTie />, name: 'Freelance/Project Experience', description: 'Real-world freelance and project delivery.' },
];

const SkillIcons: React.FC = () => {
  const [tooltip, setTooltip] = useState<number | null>(null);

  return (
    <div className="skill-icons">
      {skills.map((skill, idx) => (
        <motion.div
          key={idx}
          className="skill-icon group relative"
          onMouseEnter={() => setTooltip(idx)}
          onMouseLeave={() => setTooltip(null)}
          tabIndex={0}
          onFocus={() => setTooltip(idx)}
          onBlur={() => setTooltip(null)}
          whileHover={{ scale: 1.15, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="text-5xl"
            animate={tooltip === idx ? { scale: 1.2, rotate: 12 } : { scale: 1, rotate: 0 }}
          >
            {skill.icon}
          </motion.div>
          <span className="skill-icon-label mt-2">{skill.name}</span>
          {tooltip === idx && (
            <motion.div
              className="skill-tooltip-bubble"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18, type: 'spring', stiffness: 260, damping: 18 }}
            >
              {skill.description}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SkillIcons;
