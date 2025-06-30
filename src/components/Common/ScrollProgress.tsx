import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${scroll}%`,
      height: '4px',
      background: 'linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)',
      zIndex: 100,
      transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
      boxShadow: '0 2px 8px #6366f144',
    }} aria-hidden="true" />
  );
};

export default ScrollProgress;
