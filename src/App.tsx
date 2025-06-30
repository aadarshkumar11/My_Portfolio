import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import './App.css'

// Modern theme hook
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen to system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return [theme, setTheme] as const;
}

function App() {
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader will auto-finish after 1.6s, but fallback in case
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for sliding sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Aadarsh | Creative Developer Portfolio</title>
        <meta name="description" content="Aadarsh's modern, animated portfolio. React, TypeScript, Tailwind, Framer Motion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Aadarsh | Creative Developer Portfolio" />
        <meta property="og:description" content="Aadarsh's modern, animated portfolio. React, TypeScript, Tailwind, Framer Motion." />
        <meta property="og:type" content="website" />
      </Helmet>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <Router>
          <div>
            <Navbar setTheme={setTheme} theme={theme} />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={
                  <>
                    {[Hero, About, Projects, Skills, Testimonials, Contact].map((Section) => (
                      <motion.div
                        key={Section.name}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        style={{ zIndex: 1, position: 'relative' }}
                      >
                        <Section />
                      </motion.div>
                    ))}
                  </>
                } />
                {/* Add more routes for individual sections/pages if needed */}
              </Routes>
            </main>
            <Footer setTheme={setTheme} theme={theme} />
          </div>
        </Router>
      )}
    </HelmetProvider>
  );
}

export default App;
