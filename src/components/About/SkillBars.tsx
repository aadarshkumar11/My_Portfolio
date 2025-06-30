import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { SiOpenai, SiReact, SiTailwindcss } from 'react-icons/si';
import { FaRobot, FaPython, FaCode, FaUserTie } from 'react-icons/fa';
import './SkillBars.css';

const skills = [
	{ name: 'GenAI & LLMs', level: 95, icon: <SiOpenai /> },
	{ name: 'React.js & TypeScript', level: 93, icon: <SiReact /> },
	{ name: 'Agentic AI (LangChain, AutoGen)', level: 90, icon: <FaRobot /> },
	{ name: 'Python (AI, APIs, scripting)', level: 92, icon: <FaPython /> },
	{ name: 'Machine Learning & NLP', level: 90, icon: <FaRobot /> },
	{ name: 'Full-Stack Web Development', level: 88, icon: <FaCode /> },
	{ name: 'Modern UI/UX (Tailwind, Framer Motion)', level: 91, icon: <SiTailwindcss /> },
	{ name: 'Freelance/Project Experience', level: 85, icon: <FaUserTie /> },
];

const SkillBar: React.FC<{ name: string; level: number; icon: React.ReactNode }> = ({ name, level, icon }) => {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-40px' });
	const controls = useAnimation();
	const [displayLevel, setDisplayLevel] = useState(0);
	useEffect(() => {
		if (inView) {
			controls.start({ width: `${level}%` });
			let frame: number;
			const step = () => {
				setDisplayLevel((prev) => {
					if (prev < level) {
						frame = requestAnimationFrame(step);
						return prev + 1;
					}
					return level;
				});
			};
			step();
			return () => cancelAnimationFrame(frame);
		}
	}, [inView, level, controls]);
	return (
		<div className="skill-bar" ref={ref}>
			<div className="skill-bar-label">
				<span style={{ marginRight: 8 }}>{icon}</span>
				{name}
				<span style={{ float: 'right', color: '#06b6d4' }}>{displayLevel}%</span>
			</div>
			<motion.div
				className="skill-bar-inner"
				initial={{ width: 0 }}
				animate={controls}
				transition={{ duration: 1.2, ease: 'easeInOut' }}
			/>
		</div>
	);
};

const SkillBars: React.FC = () => (
	<div className="skill-bars">
		{skills.map((skill, idx) => (
			<SkillBar key={idx} name={skill.name} level={skill.level} icon={skill.icon} />
		))}
	</div>
);

export default SkillBars;
