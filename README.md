# 🚀 Aadarsh Kumar - Modern AI Portfolio

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen.svg)](https://aadarshkumar.dev)
[![Performance](https://img.shields.io/badge/performance-A%2B-brightgreen.svg)](#performance)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)

A blazing-fast, modern portfolio showcasing AI engineering expertise and full-stack development. Built with cutting-edge technologies, featuring glassmorphism design, AI-powered chatbot, and performance optimizations achieving sub-second load times.

## ✨ Features

### 🎯 **Performance Excellence**

- **⚡ Sub-second loading** - Optimized to load in under 800ms
- **🔧 Advanced lazy loading** - Components load only when needed
- **📦 Smart code splitting** - Optimized vendor bundles for parallel loading
- **🖼️ Image optimization** - WebP/AVIF with intelligent fallbacks
- **🚀 Service Worker** - Aggressive caching for offline performance
- **💾 Resource preloading** - Critical assets loaded instantly

### 🎨 **Modern Design System**

- **✨ Glassmorphism UI** - Elegant backdrop-filter effects throughout
- **🌈 Unified color palette** - CSS custom properties for consistency
- **🌓 Smart theme system** - Auto dark/light mode with no flash (FOUC prevention)
- **📱 Mobile-first responsive** - Fluid design across all devices
- **🎭 Framer Motion animations** - 60FPS hardware-accelerated animations
- **🎪 Particle backgrounds** - Interactive particle systems

### 🤖 **AI-Powered Features**

- **💬 Intelligent chatbot** - LangChain + Google GenAI integration
- **🧠 Context-aware responses** - RAG (Retrieval Augmented Generation)
- **📝 Portfolio knowledge base** - AI understands your background
- **⚡ Real-time streaming** - Fast response generation
- **🎯 Glassmorphism chat UI** - Seamlessly integrated design

### ♿ **Accessibility & SEO**

- **🎯 WCAG 2.1 AA compliant** - Full accessibility support
- **⌨️ Keyboard navigation** - Complete keyboard accessibility
- **📱 Screen reader optimized** - Comprehensive ARIA implementation
- **🔍 SEO optimized** - Perfect Core Web Vitals scores
- **🌐 Meta tags & Schema** - Rich social media previews

## 🛠️ Tech Stack

### Frontend Core

- **⚛️ React 18.3** - Latest concurrent features
- **📘 TypeScript 5.7** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling
- **🎭 Framer Motion 12** - Advanced animations
- **⚡ Vite 7** - Lightning-fast build tool

### Backend & APIs

- **🟢 Node.js + Express** - RESTful API server
- **🤖 LangChain 0.3** - AI workflow orchestration
- **🧠 Google GenAI** - Large language model integration
- **📧 EmailJS** - Contact form handling
- **🔒 Environment security** - Proper secrets management

### Performance & DevOps

- **📦 Advanced bundling** - Optimized chunk splitting
- **🗜️ Terser compression** - Multi-pass minification
- **🎯 Resource hints** - DNS prefetch, preload, prefetch
- **💾 Service Worker** - Background caching
- **📊 Bundle analysis** - Optimized asset delivery

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/aadarshkumar11/web-portfolio.git
cd web-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# Open http://localhost:5174
```

### Environment Variables

```env
# Required for AI chatbot
VITE_GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Required for contact form
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir dist
```

## 🎯 Performance Metrics

Our optimization efforts have achieved exceptional performance:

- **First Contentful Paint**: < 0.8s
- **Largest Contentful Paint**: < 1.2s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 1.5s
- **Bundle Size (gzipped)**:
  - Main chunk: 6.37KB
  - React vendor: 44.82KB
  - Animations: 36.84KB
  - Total critical path: ~88KB

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── About/           # About section with timeline
│   ├── Chatbot/         # AI chatbot integration
│   ├── Contact/         # Contact form
│   ├── Hero/            # Landing section
│   ├── Projects/        # Project showcase
│   ├── Skills/          # Skills display
│   └── Common/          # Shared components
├── hooks/               # Custom React hooks
├── services/            # API services
├── assets/              # Static assets
└── data/                # JSON data files
```

## 🤖 AI Chatbot Features

- **Context-aware conversations** about portfolio content
- **Real-time streaming responses** for better UX
- **Glassmorphism chat interface** matching site design
- **Mobile-optimized** chat experience
- **Error handling** with graceful fallbacks
- **Rate limiting** and security measures

## 🎨 Design System

### Color Palette

```css
--primary-bg: #0a0a0f
--accent-primary: #6366f1    /* Indigo */
--accent-secondary: #8b5cf6  /* Purple */
--accent-tertiary: #06b6d4   /* Cyan */
--glass-bg: rgba(255, 255, 255, 0.02)
--glass-border: rgba(255, 255, 255, 0.06)
```

### Typography

- **Primary**: Inter (Variable font for performance)
- **Display**: Optimized for readability
- **Font loading**: font-display: swap for performance

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Development Features

- **Hot Module Replacement** - Instant updates
- **TypeScript strict mode** - Enhanced type safety
- **ESLint + Prettier** - Code formatting
- **Pre-commit hooks** - Code quality enforcement

## 📈 Recent Updates

### v2.0.0 - January 2025

- **🚀 Performance overhaul** - 40% faster loading
- **🤖 AI chatbot integration** - LangChain + GenAI
- **✨ Glassmorphism redesign** - Modern UI refresh
- **⚡ Advanced optimizations** - Service Worker, preloading
- **🔧 Build improvements** - Better chunk splitting

### Key Improvements

- Reduced initial load time from 1.2s to 0.8s
- Implemented AI-powered chatbot with streaming
- Added glassmorphism design system
- Enhanced mobile experience
- Improved accessibility compliance
- Added comprehensive performance monitoring

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

Progressive enhancement ensures basic functionality on older browsers.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Aadarsh Kumar** - AI Engineer & Full-Stack Developer

- 🌐 Website: [aadarshkumar.dev](https://aadarshkumar.dev)
- 💼 LinkedIn: [aadarshkumar](https://linkedin.com/in/aadarshkumar)
- 🐙 GitHub: [aadarshkumar11](https://github.com/aadarshkumar11)
- 📧 Email: hello@aadarshkumar.dev

---

<div align="center">

**Built with ❤️ using React, TypeScript, and modern web technologies**

[⭐ Star this repository](https://github.com/aadarshkumar11/web-portfolio) if you found it helpful!

</div>
