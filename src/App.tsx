import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Loader from './components/Loader/Loader';
import ScrollProgress from './components/Common/ScrollProgress';
import ScrollToTop from './components/Common/ScrollToTop';
import './App.css'

// Lazy load components with proper error handling
const About = lazy(() => import('./components/About/About'));
const Projects = lazy(() => import('./components/Projects/ProjectsClean'));
const SkillsSection = lazy(() => import('./components/Skills/SkillsClean'));
const Testimonials = lazy(() => import('./components/Testimonials/TestimonialsClean'));
const Contact = lazy(() => import('./components/Contact/ContactClean'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const ChatbotWidget = lazy(() => import('./components/Chatbot/ChatbotWidget'));

// Optimized loading component
const SectionLoader = memo(() => (
  <div className="flex items-center justify-center py-12" role="status" aria-label="Loading content">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
  </div>
));

SectionLoader.displayName = 'SectionLoader';

// Performance-optimized theme hook
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Use pre-initialized theme to prevent flash
    if (typeof window !== 'undefined' && (window as unknown as { __INITIAL_THEME__?: string }).__INITIAL_THEME__) {
      return (window as unknown as { __INITIAL_THEME__: 'light' | 'dark' }).__INITIAL_THEME__;
    }
    
    if (typeof window === 'undefined') return 'dark';
    
    const stored = localStorage.getItem('aadarsh-portfolio-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem('aadarsh-portfolio-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f23' : '#ffffff');
    }
  }, [theme]);

  // Optimized system theme listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('aadarsh-portfolio-theme');
      if (!stored) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return [theme, setTheme] as const;
}

// Main App component
const App = memo(() => {
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Critical resource preloading - optimized for speed
    const criticalImages = ['/profile.jpg'];
    const preloadImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };

    // Preload critical images immediately
    criticalImages.forEach(preloadImage);

    // Much faster loading - reduced time significantly
    const timer = setTimeout(() => setLoading(false), 800); // Reduced from 1200ms to 800ms
    return () => clearTimeout(timer);
  }, []);

  // Optimized page metadata
  const pageMetadata = {
    title: "Aadarsh Kumar | Portfolio",
    description: "Experienced AI Engineer & Full-Stack Developer specializing in GenAI, LLMs, React, TypeScript, and modern web technologies. Building innovative solutions with cutting-edge AI technology.",
    keywords: "AI Engineer, Full Stack Developer, React, TypeScript, GenAI, LLM, Machine Learning, Web Development, Portfolio",
    author: "Aadarsh Kumar",
    canonicalUrl: "https://aadarshkumar.dev"
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
        <meta name="keywords" content={pageMetadata.keywords} />
        <meta name="author" content={pageMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content={theme === 'dark' ? '#0f0f23' : '#ffffff'} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageMetadata.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageMetadata.title} />
        <meta property="og:description" content={pageMetadata.description} />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content={pageMetadata.canonicalUrl} />
        <meta property="og:site_name" content="Aadarsh Kumar Portfolio" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMetadata.title} />
        <meta name="twitter:description" content={pageMetadata.description} />
        <meta name="twitter:image" content="/profile.jpg" />
        <meta name="twitter:creator" content="@aadarshkumar" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        
        {/* Critical resource preloads - optimized */}
        <link rel="preload" as="image" href="/profile.jpg" fetchPriority="high" />
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" type="font/woff2" crossOrigin="" fetchPriority="high" />
        
        {/* Critical CSS preloads */}
        <link rel="preload" as="style" href="/src/index.css" />
        <link rel="preload" as="script" href="/src/main.tsx" />
        
        {/* Resource hints for better performance */}
        <link rel="prefetch" as="image" href="/project1.jpg" />
        <link rel="prefetch" as="image" href="/project2.jpg" />
        <link rel="prefetch" as="image" href="/project3.jpg" />
        
        {/* PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aadarsh Portfolio" />
      </Helmet>
      
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
            <Navbar setTheme={setTheme} theme={theme} />
            <main className="pt-16 md:pt-20">
              <Routes>
                <Route path="/" element={
                  <>
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="relative z-10"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <Hero />
                    </motion.section>
                    
                    <Suspense fallback={<SectionLoader />}>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative z-10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <About />
                      </motion.section>
                    </Suspense>
                    
                    <Suspense fallback={<SectionLoader />}>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative z-10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <Projects />
                      </motion.section>
                    </Suspense>
                    
                    <Suspense fallback={<SectionLoader />}>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative z-10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <SkillsSection />
                      </motion.section>
                    </Suspense>
                    
                    <Suspense fallback={<SectionLoader />}>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative z-10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <Testimonials />
                      </motion.section>
                    </Suspense>
                    
                    <Suspense fallback={<SectionLoader />}>
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative z-10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <Contact />
                      </motion.section>
                    </Suspense>
                  </>
                } />
              </Routes>
            </main>
            
            <Suspense fallback={null}>
              <Footer setTheme={setTheme} theme={theme} />
              <ScrollProgress />
              <ScrollToTop />
            </Suspense>
          </div>
        </Router>
      )}
      
      {/* GLOBAL CHATBOT - ALWAYS VISIBLE AND FLOATING */}
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </HelmetProvider>
  );
});

App.displayName = 'App';

export default App;
