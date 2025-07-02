import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const timeline = [
	{
		year: '2028',
		title: 'Graduating',
		company: 'VNIT Nagpur',
		description: 'Graduation in Progress....',
		isCurrent: true
	},
	{
		year: '2025',
		title: 'Internship',
		company: 'Genpact',
		description: 'Worked on GenAI projects, gaining hands-on experience with large language models and AI-driven applications.',
		isCurrent: false
	},
	{
		year: '2024',
		title: 'Freelance Developer',
		company: 'Self-Employed',
		description: 'Data-driven web solutions for startups and trained machine learning models.',
		isCurrent: false
	},
];

const Timeline: React.FC = () => (
	<ol className="timeline">
		{timeline.map((item, idx) => (
			<motion.li
				key={idx}
				className={`timeline-item ${item.isCurrent ? 'timeline-item-current' : ''}`}
				initial={{ opacity: 0, x: 40 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.7, delay: idx * 0.2 }}
				viewport={{ once: true }}
			>
				<div className={`timeline-dot ${item.isCurrent ? 'timeline-dot-current' : ''}`}>
					{item.year}
				</div>
				<div className="timeline-content glass-card">
					<div className="timeline-card-header">
						<h3 className="timeline-title">
							{item.title}
						</h3>
						<span className="timeline-company">@ {item.company}</span>
					</div>
					<p className="timeline-description">
						{item.description}
					</p>
					{item.isCurrent && (
						<div className="timeline-current-badge">
							<span className="timeline-current-text">Present</span>
							<div className="timeline-current-pulse"></div>
						</div>
					)}
				</div>
			</motion.li>
		))}
	</ol>
);

export default Timeline;
