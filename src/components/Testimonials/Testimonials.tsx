import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const AUTO_SLIDE_INTERVAL = 5000;

type Testimonial = {
  name: string;
  title: string;
  image: string;
  quote: string;
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'testimonials.json') // Use Vite static asset path
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  // Auto-slide with pause on hover
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, AUTO_SLIDE_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, testimonials.length, next]);

  // Swipe support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startX = 0;
    let endX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) next();
      if (endX - startX > 50) prev();
    };
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchend', onTouchEnd);
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [testimonials.length, next, prev]);

  if (testimonials.length === 0) return null;

  return (
    <motion.section id="testimonials" className="testimonials-section" style={{ willChange: 'transform, opacity' }}>
      {/* Parallax/gradient background layer */}
      <div className="testimonials-bg-parallax" aria-hidden="true" />
      <div className="container mx-auto max-w-3xl">
        <div className="testimonials-container">
          <h2 className="testimonials-title">Testimonials</h2>
          <div className="testimonials-carousel" ref={containerRef} onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}>
            <button
              onClick={prev}
              className="testimonial-nav testimonial-nav-left"
              aria-label="Previous"
            >
              <span className="testimonial-arrow">&#8592;</span>
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.38 }} // Faster
                className="testimonial-card"
                style={{ willChange: 'transform, opacity' }}
              >
                <img src={testimonials[index].image} alt={`Photo of ${testimonials[index].name}, ${testimonials[index].title}`} loading="lazy" className="testimonial-avatar" style={{ willChange: 'transform, opacity' }} />
                <p className="testimonial-quote">“{testimonials[index].quote}”</p>
                <div className="testimonial-meta">
                  <span className="testimonial-author">{testimonials[index].name}</span>
                  <span className="testimonial-title">{testimonials[index].title}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={next}
              className="testimonial-nav testimonial-nav-right"
              aria-label="Next"
            >
              <span className="testimonial-arrow">&#8594;</span>
            </button>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot${i === index ? ' active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1} (${testimonials[i].name})`}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
