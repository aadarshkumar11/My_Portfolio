import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJs, FaGitAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Skills.css';

type Skill = {
	icon: string;
	name: string;
	level: number;
	fact: string;
};

const iconMap: Record<string, ReactElement> = {
	FaReact: <FaReact className="text-cyan-400" />,
	FaNodeJs: <FaNodeJs className="text-green-500" />,
	FaJs: <FaJs className="text-yellow-400" />,
	FaHtml5: <FaHtml5 className="text-orange-500" />,
	FaCss3Alt: <FaCss3Alt className="text-blue-500" />,
	FaGitAlt: <FaGitAlt className="text-red-500" />,
};

const Skills: React.FC = () => {
	const [skills, setSkills] = useState<Skill[]>([]);

	useEffect(() => {
		fetch(import.meta.env.BASE_URL + 'skills.json') // Use Vite static asset path for better caching
			.then((res) => res.json())
			.then((data) => setSkills(data));
	}, []);

	const topSkillIdx = skills.reduce((maxIdx, s, idx, arr) => (s.level > arr[maxIdx]?.level ? idx : maxIdx), 0);

	return (
		<motion.section
			id="skills"
			className="skills-section"
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }} // Faster
			viewport={{ once: true, amount: 0.2 }}
			style={{ willChange: 'transform, opacity' }}
		>
			{/* Parallax/gradient background layer */}
			<div className="skills-bg-parallax" aria-hidden="true" />
			{/* Animated floating accent */}
			<motion.div
				className="skills-floating-accent"
				initial={{ y: 20, opacity: 0.7, rotate: 0 }}
				animate={{ y: [20, -20, 20], opacity: [0.7, 1, 0.7], rotate: [0, 60, 0] }}
				transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} // Faster
				style={{ willChange: 'transform, opacity' }}
			/>
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>
				<div className="skills-grid">
					{skills.map((skill, idx) => (
						<motion.div
							key={idx}
							className={`skill-item${idx === topSkillIdx ? ' skill-item-featured' : ''}`}
							initial={{ opacity: 0, y: 40, scale: 1.12 }}
							whileInView={{ opacity: 1, y: 0, scale: 1.12 }}
							whileHover={{ scale: 1.18, boxShadow: '0 16px 64px 0 #06b6d455' }}
							transition={{ duration: 0.38, delay: idx * 0.06 }} // Faster
							viewport={{ once: true }}
							style={{ willChange: 'transform, opacity' }}
						>
							{iconMap[skill.icon]}
							<div className="skill-name">{skill.name}</div>
							<div className="skill-bar">
								<div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
							</div>
							<div className="skill-level-fact">
								<span className="skill-level">{skill.level}%</span>
								<span className="skill-fact">{skill.fact}</span>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default Skills;
