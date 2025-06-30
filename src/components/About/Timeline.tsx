import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const timeline = [
	{
		year: '2026',
		title: 'Graduating',
		company: 'VNIT Nagpur',
		description: 'Graduation in Progress....'
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
