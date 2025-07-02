import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AUTO_SLIDE_INTERVAL = 6000;

type Testimonial = {
  name: string;
  title: string;
  image: string;
  quote: string;
  rating?: number;
  company?: string;
};

const TestimonialsClean: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Loading testimonials...');
    fetch('/testimonials.json')
      .then((res) => {
        console.log('Testimonials response:', res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Testimonials data loaded:', data);
        setTestimonials(data);
      })
      .catch((error) => {
        console.error('Error loading testimonials:', error);
        // Fallback sample data
        const fallbackTestimonials = [
          {
            name: "Sarah Johnson",
            title: "Product Manager",
            company: "TechFlow Inc.",
            image: "/client1.jpg",
            quote: "Aadarsh delivered exceptional AI solutions that transformed our workflow. His expertise in machine learning and attention to detail exceeded our expectations.",
            rating: 5
          },
          {
            name: "Michael Chen",
            title: "CTO",
            company: "InnovateLab",
            image: "/client2.jpg",
            quote: "Working with Aadarsh was a game-changer for our startup. He built a robust full-stack application with cutting-edge AI features that impressed our investors.",
            rating: 5
          },
          {
            name: "Emily Rodriguez",
            title: "Design Director",
            company: "CreativeSpace",
            image: "/client3.jpg",
            quote: "Aadarsh combines technical brilliance with creative problem-solving. The user interface he developed was both beautiful and highly functional.",
            rating: 5
          }
        ];
        setTestimonials(fallbackTestimonials);
      });
  }, []);

  const next = useCallback(() => {
    if (testimonials.length > 0) {
      setIndex((i) => (i + 1) % testimonials.length);
    }
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length > 0) {
      setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    }
  }, [testimonials.length]);

  // Auto-slide with pause on hover
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, AUTO_SLIDE_INTERVAL);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, testimonials.length, next]);

  // Swipe support
  useEffect(() => {
    const container = containerRef.current;
    if (!container || testimonials.length <= 1) return;
    
    let startX = 0;
    let endX = 0;
    
    const onTouchStart = (e: TouchEvent) => { 
      startX = e.touches[0].clientX; 
    };
    
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const threshold = 50;
      if (startX - endX > threshold) next();
      if (endX - startX > threshold) prev();
    };
    
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [testimonials.length, next, prev]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (testimonials.length > 1) {
      timeoutRef.current = setTimeout(next, AUTO_SLIDE_INTERVAL);
    }
  };

  return (
    <section className="section-container testimonials-section" id="testimonials" aria-labelledby="testimonials-title">
      {/* Enhanced Testimonials Background */}
      <div className="testimonials-section-bg" />
      
      {/* Floating Decorations */}
      <div className="floating-decoration-testimonials"></div>
      <div className="floating-decoration-testimonials"></div>
      <div className="floating-decoration-testimonials"></div>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Section title */}
        <motion.h2 
          id="testimonials-title"
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Client Testimonials
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            color: 'var(--text-secondary)',
            left: 0,
            right: 0,
            margin: '0 auto',
            position: 'relative',
            marginTop: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          What clients say about working with me
        </motion.p>

        {testimonials.length === 0 ? (
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
                Loading testimonials...
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              marginTop: '3rem'
            }}
          >
            {/* Navigation buttons */}
            {testimonials.length > 1 && (
              <>
                <motion.button
                  onClick={prev}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    left: '-65px',
                    top: '40%',
                    // transform: 'translateY(-50%)',
                    zIndex: 2,
                    padding: '0.75rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft size={25} />
                </motion.button>

                <motion.button
                  onClick={next}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    right: '-65px',
                    top: '40%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    padding: '0.75rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Next testimonial"
                >
                  <FaChevronRight size={25} />
                </motion.button>
              </>
            )}

            {/* Testimonial card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="glass-card testimonial-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    fontSize: '2rem',
                    color: 'var(--accent-primary)',
                    opacity: 0.2
                  }}
                >
                  <FaQuoteLeft />
                </motion.div>

                {/* Client avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    position: 'relative'
                  }}>
                    <img
                      src={testimonials[index].image}
                      alt={`${testimonials[index].name} - ${testimonials[index].title}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Quote text */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.7',
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '2rem',
                    fontWeight: '400',
                    maxWidth: '600px',
                    margin: '0 auto 2rem auto'
                  }}
                >
                  "{testimonials[index].quote}"
                </motion.blockquote>

                {/* Rating stars */}
                {testimonials[index].rating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.25rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        style={{
                          color: i < (testimonials[index].rating || 0) 
                            ? 'var(--accent-quaternary)' 
                            : 'var(--glass-border)',
                          fontSize: '1rem'
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Client info */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '1.5rem'
                  }}
                >
                  <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    {testimonials[index].name}
                  </h4>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: testimonials[index].company ? '0.25rem' : '0'
                  }}>
                    {testimonials[index].title}
                  </p>
                  
                  {testimonials[index].company && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--accent-primary)',
                      fontWeight: '500'
                    }}>
                      {testimonials[index].company}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            {testimonials.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginTop: '2.5rem'
                }}
              >
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setIndex(i)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: i === index ? '2rem' : '0.75rem',
                      height: '0.75rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      background: i === index 
                        ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))'
                        : 'var(--glass-border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: i === index ? 1 : 0.6
                    }}
                    aria-label={`Go to testimonial ${i + 1} from ${testimonials[i].name}`}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsClean;
