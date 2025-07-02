# 🚀 Deployment Guide

Complete guide for deploying your portfolio to various platforms with optimal performance.

## Quick Deploy Options

### 🟣 Vercel (Recommended)

Vercel provides the best performance for React applications with edge functions.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or use GitHub integration
# 1. Connect your repo to Vercel
# 2. Auto-deploy on push to main
```

**Environment Variables in Vercel:**

```
VITE_GOOGLE_GENAI_API_KEY=your_gemini_api_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 🟢 Netlify

Great alternative with excellent build optimization.

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir dist
```

**Netlify Configuration** (`netlify.toml`):

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 🔵 GitHub Pages

Free hosting for open-source projects.

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## Performance Optimization for Production

### Build Configuration

Our optimized Vite configuration ensures maximum performance:

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-animations": ["framer-motion"],
          "vendor-icons": ["react-icons/fa", "react-icons/si"],
          "vendor-particles": ["react-tsparticles", "tsparticles"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
    },
  },
});
```

### Environment Variables

Create production environment files:

**`.env.production`**:

```env
VITE_GOOGLE_GENAI_API_KEY=your_production_genai_key
VITE_EMAILJS_SERVICE_ID=your_production_service_id
VITE_EMAILJS_TEMPLATE_ID=your_production_template_id
VITE_EMAILJS_PUBLIC_KEY=your_production_public_key
```

### Security Headers

Add security headers for production:

```nginx
# Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Performance Monitoring

### Core Web Vitals

Monitor these metrics in production:

- **First Contentful Paint (FCP)**: Target < 1.8s
- **Largest Contentful Paint (LCP)**: Target < 2.5s
- **First Input Delay (FID)**: Target < 100ms
- **Cumulative Layout Shift (CLS)**: Target < 0.1

### Tools for Monitoring

1. **Google PageSpeed Insights**
2. **Lighthouse CI**
3. **Web Vitals Chrome Extension**
4. **Vercel Analytics** (if using Vercel)

## CDN and Caching

### Asset Optimization

Ensure these caching headers are set:

```
# Static assets (JS, CSS, Images)
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: public, max-age=0, must-revalidate

# Service Worker
Cache-Control: public, max-age=0
```

### Font Optimization

Our font preloading strategy:

```html
<link
  rel="preload"
  as="font"
  href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
  type="font/woff2"
  crossorigin
/>
```

## Domain Configuration

### Custom Domain Setup

1. **Purchase domain** (recommended: Namecheap, Google Domains)
2. **Configure DNS** to point to your hosting provider
3. **Enable HTTPS** (automatic with Vercel/Netlify)
4. **Set up redirects** from www to non-www (or vice versa)

### SSL Certificate

Both Vercel and Netlify provide automatic SSL certificates. For other platforms:

```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## CI/CD Pipeline

### GitHub Actions

Automate deployment with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_GOOGLE_GENAI_API_KEY: ${{ secrets.VITE_GOOGLE_GENAI_API_KEY }}
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

## Troubleshooting

### Common Issues

**Build fails with memory error:**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Fonts not loading:**

- Check CORS headers for font files
- Verify preload links in HTML
- Ensure font-display: swap is set

**Chatbot not working:**

- Verify API keys are set correctly
- Check CORS configuration for API endpoints
- Ensure environment variables are prefixed with VITE\_

**Images not optimizing:**

- Use WebP format with fallbacks
- Implement lazy loading for non-critical images
- Set proper image dimensions to prevent CLS

### Performance Issues

**Slow initial load:**

1. Check bundle sizes with `npm run build`
2. Verify code splitting is working
3. Enable compression on your server
4. Use a CDN for static assets

**Poor Core Web Vitals:**

1. Optimize largest images (LCP)
2. Minimize layout shifts (CLS)
3. Reduce JavaScript execution time (FID)
4. Preload critical resources

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Security audit
npm audit
npm audit fix
```

### Performance Monitoring

Set up regular monitoring:

- Weekly Lighthouse CI runs
- Monthly dependency updates
- Quarterly performance reviews

---

**Need help?** Open an issue on GitHub or contact me directly.
