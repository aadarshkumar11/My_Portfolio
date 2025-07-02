import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5174',
    },
    host: true,
    port: 5174
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-animations': ['framer-motion'],
          'vendor-icons': ['react-icons/fa', 'react-icons/si', 'react-icons/ai'],
          'vendor-email': ['@emailjs/browser'],
          'vendor-utils': ['react-helmet-async', 'react-simple-typewriter'],
          'vendor-particles': ['react-tsparticles', 'tsparticles']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      },
    },
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      }
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react/jsx-runtime',
      'framer-motion',
      'react-router-dom',
      '@emailjs/browser',
      'react-helmet-async',
      'react-simple-typewriter'
    ],
    exclude: ['@langchain/google-genai', 'langchain'], // Exclude heavy AI dependencies from pre-bundling
    force: true // Force re-optimization on startup
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: ['console', 'debugger'],
    legalComments: 'none', // Remove legal comments for smaller bundles
    treeShaking: true
  },
  css: {
    devSourcemap: false
  },
  define: {
    // Define global constants at build time
    __DEV__: process.env.NODE_ENV === 'development',
  }
})
