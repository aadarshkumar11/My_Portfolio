import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import {
	SiOpenai,
	SiLangchain,
	SiPytorch,
	SiTensorflow,
	SiReact,
	SiTypescript,
	SiTailwindcss,
	SiFramer,
	SiShadcnui,
	SiExpress,
	SiPython,
	SiFastapi,
	SiFlask,
	SiGithubactions,
	SiDocker,
	SiVite,
	SiPostman,
	SiFirebase,
	SiSupabase,
	SiPandas,
	SiNumpy,
	SiPlotly,
} from 'react-icons/si';
import { FaRobot, FaLightbulb, FaCommentDots, FaNetworkWired, FaNodeJs, FaGitAlt, FaCogs, FaProjectDiagram, FaCubes, FaChartBar, FaDatabase } from 'react-icons/fa';
import './SkillsSection.module.css';

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

const iconMap: Record<string, ReactElement> = {
	SiOpenai: <SiOpenai className="text-green-500" />,
	SiLangchain: <SiLangchain className="text-blue-400" />,
	FaRobot: <FaRobot className="text-gray-500" />,
	FaLightbulb: <FaLightbulb className="text-yellow-400" />,
	FaCommentDots: <FaCommentDots className="text-blue-400" />,
	SiPytorch: <SiPytorch className="text-orange-600" />,
	SiTensorflow: <SiTensorflow className="text-yellow-500" />,
	SiReact: <SiReact className="text-cyan-400" />,
	SiTypescript: <SiTypescript className="text-blue-500" />,
	SiTailwindcss: <SiTailwindcss className="text-sky-400" />,
	SiFramer: <SiFramer className="text-pink-400" />,
	SiShadcnui: <SiShadcnui className="text-gray-700" />,
	FaNetworkWired: <FaNetworkWired className="text-indigo-500" />,
	SiExpress: <SiExpress className="text-gray-700" />,
	FaNodeJs: <FaNodeJs className="text-green-500" />,
	SiPython: <SiPython className="text-blue-400" />,
	SiFastapi: <SiFastapi className="text-green-400" />,
	SiFlask: <SiFlask className="text-gray-400" />,
	FaGitAlt: <FaGitAlt className="text-red-500" />,
	SiGithubactions: <SiGithubactions className="text-gray-700" />,
	SiDocker: <SiDocker className="text-blue-400" />,
	SiVite: <SiVite className="text-yellow-400" />,
	SiPostman: <SiPostman className="text-orange-500" />,
	SiFirebase: <SiFirebase className="text-yellow-400" />,
	SiSupabase: <SiSupabase className="text-green-500" />,
	SiPandas: <SiPandas className="text-green-700" />,
	SiNumpy: <SiNumpy className="text-blue-700" />,
	SiPlotly: <SiPlotly className="text-pink-500" />,
	// Fallbacks for missing icons:
	FaCogs: <FaCogs className="text-gray-500" />,
	FaProjectDiagram: <FaProjectDiagram className="text-blue-500" />,
	FaCubes: <FaCubes className="text-purple-500" />,
	FaChartBar: <FaChartBar className="text-green-500" />,
	FaDatabase: <FaDatabase className="text-indigo-500" />,
};

const SkillsSection: React.FC = () => {
	const [categories, setCategories] = useState<SkillCategory[]>([]);

	useEffect(() => {
		fetch(import.meta.env.BASE_URL + 'skills.json')
			.then((res) => res.json())
			.then((data) => setCategories(data));
	}, []);

	return (
		<motion.section
			id="skills"
			className="skills-section"
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
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
				transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
				style={{ willChange: 'transform, opacity' }}
			/>
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100">Skills</h2>
				<div className="skills-grid">
					{categories.map((cat, cidx) => (
						<div key={cidx} className="skills-category">
							<h3 className="text-2xl font-bold mb-4 text-center md:text-left text-gray-800 dark:text-gray-200">{cat.category}</h3>
							<div className="skills-category-grid">
								{Array.isArray(cat.skills) && cat.skills.length > 0 ? (
									cat.skills.map((skill, idx) => (
										<motion.div
											key={idx}
											className={`skill-item ${'card'} dark:cardDark`}
											initial={{ opacity: 0, y: 40, scale: 1.12 }}
											whileInView={{ opacity: 1, y: 0, scale: 1.12 }}
											whileHover={{ scale: 1.18, boxShadow: '0 16px 64px 0 #06b6d455' }}
											transition={{ duration: 0.38, delay: idx * 0.06 }}
											viewport={{ once: true }}
											style={{ willChange: 'transform, opacity' }}
										>
											{iconMap[skill.icon] || iconMap.FaCogs}
											<div className={`skill-name ${'skillName'} dark:skillNameDark`}>{skill.name}</div>
											<div className={`skill-bar ${'progressBar'} dark:progressBarDark`}>
												<div className={`skill-bar-fill ${'progressFill'} dark:progressFillDark`} style={{ width: `${skill.level}%` }} />
											</div>
											<div className="skill-level-fact">
												<span className="skill-level text-gray-700 dark:text-gray-200">{skill.level}%</span>
												<span className="skill-fact text-gray-500 dark:text-gray-400">{skill.fact}</span>
											</div>
										</motion.div>
									))
								) : (
									<div className="text-gray-400 dark:text-gray-500">No skills found.</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default SkillsSection;
