// Performance-optimized theme initialization
// This script runs before React to prevent FOUC (Flash of Unstyled Content)
(function() {
  'use strict';
  
  const STORAGE_KEY = 'aadarsh-portfolio-theme';
  const DARK_CLASS = 'dark';
  const LIGHT_CLASS = 'light';
  
  function getTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark'; // Default fallback
    }
  }
  
  function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove(DARK_CLASS, LIGHT_CLASS);
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    
    // Update meta theme-color immediately
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#ffffff');
    }
  }
  
  // Apply theme immediately to prevent flash
  const theme = getTheme();
  applyTheme(theme);
  
  // Store for React to use
  window.__INITIAL_THEME__ = theme;
})();
