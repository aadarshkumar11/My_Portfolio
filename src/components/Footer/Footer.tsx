import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp} from 'react-icons/fa';
import './Footer.css';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer: React.FC<{ setTheme: (t: 'light' | 'dark') => void; theme: 'light' | 'dark' }> = ({ setTheme, theme }) => (
  <motion.footer
    className="footer-section"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} // Faster
    viewport={{ once: true, amount: 0.2 }}
    style={{ willChange: 'transform, opacity' }}
  >
    {/* Parallax/gradient background layer */}
    <div className="footer-bg-parallax" aria-hidden="true" />
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <span className="footer-copyright">&copy; {new Date().getFullYear()} Aadarsh. All rights reserved.</span>
      <div className="footer-socials">
        <button
          className="footer-theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        {/* <a
          href="https://www.linkedin.com/in/aadarshkumar101/"
          className="footer-social-icon"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/aadarshkumar11"
          className="footer-social-icon"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/its_Aadarsh_"
          className="footer-social-icon"
          aria-label="X"
        >
          <FaTwitter />
        </a> */}
      </div>
      <motion.button
        className="footer-scroll-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.12, rotate: -8 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
        style={{ willChange: 'transform' }}
      >
        <FaArrowUp />
      </motion.button>
    </div>
  </motion.footer>
);

export default Footer;
