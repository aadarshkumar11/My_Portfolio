import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

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
    console.log('Loading projects...');
    fetch('/projects.json')
      .then((res) => {
        console.log('Projects response:', res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Projects data loaded:', data);
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        // Fallback sample data for testing
        const fallbackProjects = [
          {
            title: "IntelliWrite Pro",
            image: "/project1.jpg",
            description: "Custom AI writing assistant leveraging multiple LLMs for technical documentation, blog posts, and creative content with advanced context awareness.",
            tech: ["React", "TypeScript", "OpenAI GPT-4", "LangChain"],
            details: "Developed a specialized content creation platform that combines multiple language models for diverse writing tasks. Features include context-aware suggestions, industry-specific templates, plagiarism detection, and collaborative editing."
          },
          {
            title: "DataViz Studio", 
            image: "/project2.jpg",
            description: "Interactive business intelligence platform with machine learning-powered insights, automated anomaly detection, and customizable visualization components.",
            tech: ["React", "D3.js", "Python", "FastAPI"],
            details: "Built a comprehensive analytics platform featuring interactive visualizations, predictive modeling, and automated insight generation. Includes real-time data streaming and custom dashboard builder."
          },
          {
            title: "DocuSmart AI",
            image: "/project3.jpg", 
            description: "Intelligent document processing system using computer vision and NLP for automated data extraction, classification, and workflow integration.",
            tech: ["Python", "OpenCV", "Transformers", "React"],
            details: "Created an end-to-end document processing pipeline utilizing advanced OCR, named entity recognition, and document classification with 92% accuracy in data extraction."
          }
        ];
        setProjects(fallbackProjects);
      });
  }, []);

  const allTech = [
    'All',
    ...Array.from(new Set(projects.flatMap((p) => p.tech)))
  ];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <section className="section-container projects-section" id="projects" aria-labelledby="projects-title">
      {/* Enhanced Projects Background */}
      <div className="projects-section-bg" />
      
      {/* Floating Decorations */}
      <div className="floating-decoration-projects"></div>
      <div className="floating-decoration-projects"></div>
      <div className="floating-decoration-projects"></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Section title using global typography */}
        <motion.h2 
          id="projects-title"
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          Showcasing innovative solutions built with cutting-edge technology and modern development practices
        </motion.p>
        
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card"
            style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem',
              marginTop: '2rem'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div className="loading-spinner" />
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Loading projects...
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Filter buttons using global button styles */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              role="tablist"
              aria-label="Filter projects by technology"
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center', 
                marginBottom: '4rem', 
                flexWrap: 'wrap' 
              }}
            >
              {allTech.map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={filter === tech ? 'btn-primary' : 'btn-secondary'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="tab"
                  aria-selected={filter === tech}
                  aria-controls="projects-grid"
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {tech}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Projects grid */}
            <motion.div 
              id="projects-grid"
              layout
              role="tabpanel"
              aria-label="Projects showcase"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                width: '100%'
              }}
            >
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    className="glass-card project-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    style={{ 
                      padding: '2rem',
                      minHeight: '450px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Featured badge for first project */}
                    {idx === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          top: '1rem',
                          right: '1rem',
                          display: 'overflow',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, var(--accent-quaternary), #f97316)',
                          borderRadius: 'var(--border-radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#ffffff',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                        }}
                      >
                        <FaStar size={12} />
                        Featured
                      </motion.div>
                    )}
                    
                    {/* Project image */}
                    <motion.div
                      style={{ 
                        width: '100%',
                        height: '200px',
                        borderRadius: 'var(--border-radius-sm)',
                        overflow: 'hidden',
                        marginBottom: '1.5rem',
                        position: 'relative'
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading="lazy"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'var(--transition-smooth)'
                        }}
                      />
                      {/* Gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                        opacity: 0,
                        transition: 'var(--transition-smooth)'
                      }} className="project-overlay" />
                    </motion.div>
                    
                    {/* Project content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        marginBottom: '1rem',
                        color: 'var(--text-primary)',
                        lineHeight: '1.3'
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        marginBottom: '1.5rem',
                        lineHeight: '1.6',
                        fontSize: '0.95rem',
                        flex: 1
                      }}>
                        {project.description}
                      </p>
                      
                      {/* Tech stack */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '2rem'
                      }}>
                        {project.tech.map((tech: string) => (
                          <span 
                            key={tech} 
                            className="skill-tag"
                            style={{
                              padding: '0.4rem 0.8rem',
                              background: 'var(--glass-bg-strong)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--text-primary)',
                              borderRadius: 'var(--border-radius-sm)',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              backdropFilter: 'var(--glass-backdrop)',
                              position: 'relative',
                              transition: 'var(--transition-smooth)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                        <motion.button 
                          onClick={() => setSelected(idx)}
                          className="btn-primary"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            flex: 1,
                            padding: '0.875rem 1.5rem',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <FaExternalLinkAlt size={14} />
                          View Details
                        </motion.button>
                        
                        <motion.button 
                          className="btn-secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <FaGithub size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
        
        {/* Modal using global glass morphism styles */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 'var(--z-modal)',
                padding: '2rem'
              }}
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="glass-card"
                style={{
                  maxWidth: '600px',
                  width: '100%',
                  position: 'relative',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '2.5rem'
                }}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontSize: '1.2rem'
                  }}
                  whileHover={{ scale: 1.1, background: 'var(--glass-bg-strong)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(null)}
                >
                  ×
                </motion.button>
                
                {/* Modal content */}
                <img 
                  src={projects[selected].image} 
                  alt={`${projects[selected].title} detailed view`} 
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: 'var(--border-radius-sm)',
                    marginBottom: '2rem'
                  }}
                />
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>
                  {projects[selected].title}
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {projects[selected].tech.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="skill-tag"
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: 'var(--glass-bg-strong)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        position: 'relative',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {projects[selected].details}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
