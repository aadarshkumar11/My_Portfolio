import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  SiOpenai, SiLangchain, SiPytorch, SiTensorflow, SiReact, SiTypescript, 
  SiTailwindcss, SiFramer, SiShadcnui, SiExpress, SiPython, SiFastapi, 
  SiFlask, SiGithubactions, SiDocker, SiVite, SiPostman, SiFirebase, 
  SiSupabase, SiPandas, SiNumpy, SiPlotly,
} from 'react-icons/si';
import { 
  FaRobot, FaLightbulb, FaCommentDots, FaNetworkWired, FaNodeJs, 
  FaGitAlt, FaCogs, FaProjectDiagram, FaCubes, FaChartBar, FaDatabase,
  FaCode, FaBrain, FaTools
} from 'react-icons/fa';

const iconMap: Record<string, React.ReactElement> = {
  SiOpenai: <SiOpenai />,
  SiLangchain: <SiLangchain />,
  FaRobot: <FaRobot />,
  FaLightbulb: <FaLightbulb />,
  FaCommentDots: <FaCommentDots />,
  SiPytorch: <SiPytorch />,
  SiTensorflow: <SiTensorflow />,
  SiReact: <SiReact />,
  SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />,
  SiFramer: <SiFramer />,
  SiShadcnui: <SiShadcnui />,
  FaNetworkWired: <FaNetworkWired />,
  SiExpress: <SiExpress />,
  FaNodeJs: <FaNodeJs />,
  SiPython: <SiPython />,
  SiFastapi: <SiFastapi />,
  SiFlask: <SiFlask />,
  FaGitAlt: <FaGitAlt />,
  SiGithubactions: <SiGithubactions />,
  SiDocker: <SiDocker />,
  SiVite: <SiVite />,
  SiPostman: <SiPostman />,
  SiFirebase: <SiFirebase />,
  SiSupabase: <SiSupabase />,
  SiPandas: <SiPandas />,
  SiNumpy: <SiNumpy />,
  SiPlotly: <SiPlotly />,
  FaCogs: <FaCogs />,
  FaProjectDiagram: <FaProjectDiagram />,
  FaCubes: <FaCubes />,
  FaChartBar: <FaChartBar />,
  FaDatabase: <FaDatabase />,
};

const categoryIcons: Record<string, React.ReactElement> = {
  'AI/ML': <FaBrain />,
  'Frontend': <FaCode />,
  'Backend & APIs': <FaNetworkWired />,
  'Tooling': <FaTools />,
  'Data & ML Tools': <FaChartBar />,
  'Vector DBs & Infra': <FaDatabase />,
};

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

const SkillsClean: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    console.log('Loading skills...');
    fetch('/skills.json')
      .then((res) => {
        console.log('Skills response:', res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Skills data loaded:', data);
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error loading skills:', error);
        // Fallback sample data
        const fallbackSkills = [
          {
            category: "AI/ML",
            skills: [
              { icon: "SiOpenai", name: "OpenAI GPT", level: 95, fact: "Built 15+ AI applications" },
              { icon: "SiLangchain", name: "LangChain", level: 90, fact: "Expert in RAG systems" },
              { icon: "SiPytorch", name: "PyTorch", level: 85, fact: "Deep learning specialist" },
              { icon: "SiTensorflow", name: "TensorFlow", level: 80, fact: "Neural network architect" }
            ]
          },
          {
            category: "Frontend", 
            skills: [
              { icon: "SiReact", name: "React", level: 95, fact: "5+ years experience" },
              { icon: "SiTypescript", name: "TypeScript", level: 90, fact: "Type-safe applications" },
              { icon: "SiTailwindcss", name: "Tailwind CSS", level: 85, fact: "Rapid UI development" },
              { icon: "SiFramer", name: "Framer Motion", level: 80, fact: "Smooth animations" }
            ]
          },
          {
            category: "Backend & APIs",
            skills: [
              { icon: "FaNodeJs", name: "Node.js", level: 90, fact: "Scalable server solutions" },
              { icon: "SiPython", name: "Python", level: 95, fact: "Full-stack development" },
              { icon: "SiFastapi", name: "FastAPI", level: 85, fact: "High-performance APIs" },
              { icon: "SiExpress", name: "Express.js", level: 80, fact: "RESTful services" }
            ]
          }
        ];
        setCategories(fallbackSkills);
      });
  }, []);

  const allSkills = categories.flatMap(cat => cat.skills);
  const topSkills = allSkills.sort((a, b) => b.level - a.level).slice(0, 8);

  return (
    <section className="section-container skills-section" id="skills" aria-labelledby="skills-title">
      {/* Enhanced Skills Background */}
      <div className="skills-section-bg" />
      
      {/* Floating Decorations */}
      <div className="floating-decoration-skills"></div>
      <div className="floating-decoration-skills"></div>
      <div className="floating-decoration-skills"></div>
      <div className="floating-decoration-skills"></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Section title using global typography */}
        <motion.h2 
          id="skills-title"
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technical Expertise
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Specialized in AI/ML, full-stack development, and modern web technologies
        </motion.p>

        {categories.length === 0 ? (
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
                Loading skills...
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Top Skills Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ marginBottom: '4rem' }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Core Competencies
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                {topSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className="glass-card skill-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    style={{
                      padding: '1.5rem 1rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      minHeight: '120px'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        fontSize: '2rem',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {iconMap[skill.icon] || <FaCogs />}
                    </motion.div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                        lineHeight: '1.2'
                      }}>
                        {skill.name}
                      </h4>
                      
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--accent-primary)',
                        background: 'var(--glass-bg-strong)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--glass-border)'
                      }}>
                        {skill.level}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Skill Categories
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {categories.map((category, categoryIdx) => (
                  <motion.div
                    key={category.category}
                    className="glass-card skill-category"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -6,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      padding: '2rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Category Header */}
                    <motion.div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--glass-border)'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: categoryIdx * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                          fontSize: '1.5rem',
                          color: 'var(--accent-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {categoryIcons[category.category] || <FaCogs />}
                      </motion.div>
                      
                      <h4 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        {category.category}
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          color: 'var(--accent-primary)',
                          background: 'var(--glass-bg-strong)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--glass-border)'
                        }}>
                          {category.skills.length} skills
                        </span>
                      </h4>
                    </motion.div>

                    {/* Skills List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {category.skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: categoryIdx * 0.1 + skillIdx * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem',
                            background: 'var(--glass-bg-subtle)',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid var(--glass-border)',
                            transition: 'var(--transition-smooth)'
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            style={{
                              fontSize: '1.2rem',
                              color: 'var(--accent-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: '24px'
                            }}
                          >
                            {iconMap[skill.icon] || <FaCogs />}
                          </motion.div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.5rem'
                            }}>
                              <span style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)'
                              }}>
                                {skill.name}
                              </span>
                              
                              <span style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--accent-primary)',
                                background: 'var(--glass-bg-strong)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid var(--glass-border)'
                              }}>
                                {skill.level}%
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div 
                              className="skill-progress-bar"
                              style={{
                                width: '100%',
                                height: '6px',
                                background: 'var(--glass-bg-strong)',
                                borderRadius: '3px',
                                overflow: 'hidden',
                                marginBottom: '0.5rem'
                              }}
                            >
                              <motion.div
                                style={{
                                  height: '100%',
                                  background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))`,
                                  borderRadius: '3px'
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: categoryIdx * 0.1 + skillIdx * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                            
                            <p style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-tertiary)',
                              margin: 0,
                              lineHeight: '1.4'
                            }}>
                              {skill.fact}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default SkillsClean;
