import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Import EmailJS test utility for debugging
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  import('./utils/emailjsTest');
}

// Performance optimizations
const root = createRoot(document.getElementById('root')!);

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register service worker for performance caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
