import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        right: '2.5rem',
        zIndex: 100,
        background: 'linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: 48,
        height: 48,
        boxShadow: '0 4px 24px #6366f144',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        transition: 'transform 0.2s',
        outline: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12) rotate(-8deg)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <FaArrowUp />
    </button>
  ) : null;
};

export default ScrollToTop;
