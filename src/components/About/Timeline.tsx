import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const timeline = [
	{
		year: '2025',
		title: 'Lead Frontend Developer',
		company: 'AwesomeTech',
		description: 'Led a team to build scalable web apps.',
	},
	{
		year: '2023',
		title: 'Freelance Developer',
		company: 'Self-Employed',
		description: 'Delivered high-impact projects for global clients.',
	},
	{
		year: '2021',
		title: 'B.Tech in Computer Science',
		company: 'Top University',
		description: 'Graduated with honors.',
	},
];

const Timeline: React.FC = () => (
	<ol className="timeline">
		{timeline.map((item, idx) => (
			<motion.li
				key={idx}
				className="timeline-item"
				initial={{ opacity: 0, x: 40 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.7, delay: idx * 0.2 }}
				viewport={{ once: true }}
			>
				<span className="timeline-dot">{item.year}</span>
				<div className="timeline-content">
					<h3 className="text-xl font-semibold">
						{item.title}{' '}
						<span className="text-indigo-500">@ {item.company}</span>
					</h3>
					<p className="text-gray-600 dark:text-gray-300">
						{item.description}
					</p>
				</div>
			</motion.li>
		))}
	</ol>
);

export default Timeline;
