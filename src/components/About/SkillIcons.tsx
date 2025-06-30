import React, { useState } from 'react';
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJs, FaGitAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './SkillIcons.css';

const skills = [
  { icon: <FaReact />, name: 'React', description: 'A JavaScript library for building user interfaces.' },
  { icon: <FaNodeJs />, name: 'Node.js', description: 'JavaScript runtime built on Chrome’s V8 engine.' },
  { icon: <FaJs />, name: 'JavaScript', description: 'The language of the web.' },
  { icon: <FaHtml5 />, name: 'HTML5', description: 'Markup language for the web.' },
  { icon: <FaCss3Alt />, name: 'CSS3', description: 'Styling language for the web.' },
  { icon: <FaGitAlt />, name: 'Git', description: 'Version control system.' },
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
