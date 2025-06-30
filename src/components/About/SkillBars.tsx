import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './SkillBars.css';

const skills = [
	{ name: 'React', level: 95 },
	{ name: 'TypeScript', level: 90 },
	{ name: 'Tailwind CSS', level: 92 },
	{ name: 'Node.js', level: 85 },
];

const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => {
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
				{name}{' '}
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
			<SkillBar key={idx} name={skill.name} level={skill.level} />
		))}
	</div>
);

export default SkillBars;
