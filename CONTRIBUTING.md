# 🤝 Contributing to AI Portfolio

Thank you for your interest in contributing to this modern AI portfolio project! This guide will help you get started with contributing to the codebase.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Performance Guidelines](#performance-guidelines)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- **Be respectful** and inclusive to all contributors
- **Be constructive** in discussions and feedback
- **Focus on what's best** for the community
- **Use welcoming** and inclusive language

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn** package manager
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - TypeScript
  - Prettier
  - ESLint
  - Tailwind CSS IntelliSense

### Local Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/web-portfolio.git
cd web-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

### Environment Configuration

Create `.env` file with required variables:

```env
VITE_GOOGLE_GENAI_API_KEY=your_gemini_api_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 🔄 Development Workflow

### Branch Strategy

- **`main`** - Production-ready code
- **`develop`** - Development branch for integration
- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`performance/*`** - Performance improvements
- **`docs/*`** - Documentation updates

### Workflow Steps

1. **Create a branch** from `develop`

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**

   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit using conventional commits**

   ```bash
   git add .
   git commit -m "feat: add new chatbot feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── About/           # About section
│   ├── Chatbot/         # AI chatbot components
│   ├── Contact/         # Contact form
│   ├── Hero/            # Landing section
│   ├── Projects/        # Project showcase
│   ├── Skills/          # Skills display
│   └── Common/          # Shared components
├── hooks/               # Custom React hooks
├── services/            # API and external services
├── assets/              # Static assets (images, icons)
├── data/                # JSON data files
└── types/               # TypeScript type definitions
```

## 📝 Coding Standards

### TypeScript Guidelines

- **Use strict mode** - All TypeScript strict checks enabled
- **Explicit types** - Avoid `any`, use proper typing
- **Interface over type** - Prefer interfaces for object shapes
- **Generic constraints** - Use proper generic constraints

```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}

// ❌ Avoid
function Component(props: any) {
  // ...
}
```

### React Best Practices

- **Functional components** with hooks
- **Proper component naming** - PascalCase
- **Custom hooks** for reusable logic
- **Memoization** for performance optimization

```typescript
// ✅ Good
const ExpensiveComponent = memo(({ data }: Props) => {
  const memoizedValue = useMemo(() => heavyCalculation(data), [data]);

  return <div>{memoizedValue}</div>;
});

// ❌ Avoid
function ExpensiveComponent({ data }) {
  const value = heavyCalculation(data); // Runs on every render
  return <div>{value}</div>;
}
```

### CSS/Styling Guidelines

- **Tailwind CSS** for utility-first styling
- **CSS custom properties** for consistent theming
- **Responsive design** - Mobile-first approach
- **Performance** - Use hardware acceleration when needed

```css
/* ✅ Good - Using CSS custom properties */
.component {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-backdrop);
}

/* ✅ Good - Hardware acceleration for animations */
.animated-element {
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
}
```

### File Organization

- **Component co-location** - Keep related files together
- **Barrel exports** - Use index files for clean imports
- **Consistent naming** - kebab-case for files, PascalCase for components

```
components/
├── Chatbot/
│   ├── index.ts              # Barrel export
│   ├── ChatbotWidget.tsx     # Main component
│   ├── ChatWindow.tsx        # Sub-component
│   ├── MessageBubble.tsx     # Sub-component
│   └── Chatbot.module.css    # Component styles
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// Example test structure
import { render, screen } from "@testing-library/react";
import { ChatbotWidget } from "./ChatbotWidget";

describe("ChatbotWidget", () => {
  it("should render chat launcher", () => {
    render(<ChatbotWidget />);

    const launcher = screen.getByRole("button", {
      name: /open chat/i,
    });

    expect(launcher).toBeInTheDocument();
  });
});
```

### Performance Testing

- **Bundle size analysis** - Monitor bundle size impact
- **Lighthouse CI** - Automated performance testing
- **Core Web Vitals** - Monitor key metrics

```bash
# Analyze bundle size
npm run build
npm run analyze

# Run Lighthouse CI
npm run lighthouse
```

## ⚡ Performance Guidelines

### Code Splitting

- **Lazy load components** - Use React.lazy for route-level splitting
- **Dynamic imports** - For heavy dependencies
- **Vendor chunking** - Separate vendor libraries

```typescript
// ✅ Good - Lazy loading
const About = lazy(() => import("./components/About/About"));

// ✅ Good - Dynamic import for heavy libraries
const loadParticles = () => import("react-tsparticles");
```

### Animation Performance

- **Use transform and opacity** - Hardware accelerated properties
- **Avoid layout thrashing** - Don't animate width, height, etc.
- **Use will-change** - For elements that will be animated

```typescript
// ✅ Good - Hardware accelerated
const variants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: { opacity: 1, transform: "translateY(0)" },
};

// ❌ Avoid - Causes layout recalculation
const badVariants = {
  hidden: { height: 0 },
  visible: { height: "auto" },
};
```

### Image Optimization

- **WebP format** with fallbacks
- **Proper sizing** - Use responsive images
- **Lazy loading** - For non-critical images

```typescript
// ✅ Good - Optimized image component
<img
  src="/profile.webp"
  alt="Profile"
  loading="lazy"
  width={160}
  height={160}
  style={{ contentVisibility: "auto" }}
/>
```

## 📨 Submitting Changes

### Pull Request Guidelines

1. **Clear title** - Describe what the PR does
2. **Detailed description** - Explain the changes and why
3. **Screenshots** - For UI changes
4. **Performance impact** - Note any bundle size changes
5. **Breaking changes** - Clearly document any breaking changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Lighthouse score maintained

## Screenshots (if applicable)

[Add screenshots here]

## Performance Impact

- Bundle size change: +/- X KB
- Core Web Vitals impact: [describe]

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
```

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(chatbot): add streaming response support
fix(performance): resolve memory leak in animations
docs(readme): update installation instructions
perf(build): optimize vendor chunk splitting
```

### Types

- **feat** - New feature
- **fix** - Bug fix
- **docs** - Documentation changes
- **style** - Code style changes (formatting, etc.)
- **refactor** - Code refactoring
- **perf** - Performance improvements
- **test** - Adding or updating tests
- **chore** - Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details** (OS, Browser, Node version)
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Screenshots or error messages**
5. **Minimal reproduction** if possible

## 💡 Feature Requests

For new features, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and motivation
3. **Propose a solution** if you have ideas
4. **Consider performance impact**

## 🆘 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Email** - For private matters: hello@aadarshkumar.dev

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to this project! 🎉
