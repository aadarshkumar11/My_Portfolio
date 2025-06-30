import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import './Projects.css';

type Project = {
  title: string;
  image: string;
  description: string;
  tech: string[];
  details: string;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'projects.json') // Use Vite static asset path
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const allTech = [
    'All',
    ...Array.from(new Set(projects.flatMap((p) => p.tech)))
  ];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <motion.section
      id="projects"
      className="projects-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }} // Faster
      viewport={{ once: true, amount: 0.2 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Parallax/gradient background layer */}
      <div className="projects-bg-parallax" aria-hidden="true" />
      {/* Animated floating accent */}
      <motion.div
        className="projects-floating-accent"
        initial={{ y: 30, opacity: 0.7, rotate: 0 }}
        animate={{ y: [30, -30, 30], opacity: [0.7, 1, 0.7], rotate: [0, 45, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} // Faster
        style={{ willChange: 'transform, opacity' }}
      />
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
        <motion.div layout className="projects-filter-bar">
          {allTech.map((tech) => (
            <motion.button
              key={tech}
              layout
              className={`projects-filter-btn${filter === tech ? ' active' : ''}`}
              onClick={() => setFilter(tech)}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filter projects by ${tech}`}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 48px 0 #6366f155' }}
                transition={{ duration: 0.38, delay: idx * 0.07 }} // Faster
                viewport={{ once: true }}
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Featured badge for first project */}
                {idx === 0 && (
                  <span className="project-featured-badge">
                    <FaStar className="featured-star" />
                    Featured
                  </span>
                )}
                <motion.img
                  src={project.image}
                  alt={project.title + ' project screenshot'}
                  loading="lazy"
                  className="project-card-img"
                  whileHover={{ scale: 1.08 }}
                  style={{ willChange: 'transform, opacity' }}
                />
                <div className="project-card-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t: string) => (
                      <span key={t} className="project-tech-badge">{t}</span>
                    ))}
                  </div>
                  <button className="project-view-btn" tabIndex={0} aria-label={`View details for ${project.title}`}>View Details</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Modal Popup */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-indigo-500 text-2xl"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <img src={projects[selected].image} alt={projects[selected].title + ' project screenshot'} loading="lazy" className="w-full h-40 object-cover rounded-lg mb-4" style={{ willChange: 'transform, opacity' }} />
                <h3 className="text-2xl font-bold mb-2">{projects[selected].title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projects[selected!].tech.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-indigo-200 dark:bg-indigo-700 rounded text-xs font-bold">{t}</span>
                  ))}
                </div>
                <p className="mb-2">{projects[selected].details}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Projects;
