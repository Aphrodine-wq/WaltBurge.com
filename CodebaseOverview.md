# WaltBurge.com Codebase Overview

## Project Summary

**WaltBurge.com** is a modern, high-performance portfolio website built with React 19, TypeScript, and Vite. It showcases a professional portfolio with project galleries, skills, expertise, and thought leadership content. The site features smooth animations, responsive design, and interactive elements powered by Framer Motion and Tailwind CSS.

- **Status**: Active and maintained
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Deployment**: Vercel with Web Analytics
- **Package Manager**: npm

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Data Structures & Types](#data-structures--types)
5. [Styling System](#styling-system)
6. [Component Dependencies](#component-dependencies)
7. [Data Flow](#data-flow)
8. [Key Features](#key-features)
9. [Animation & Motion Systems](#animation--motion-systems)
10. [Performance Optimizations](#performance-optimizations)
11. [Responsive Design](#responsive-design)
12. [Environment Configuration](#environment-configuration)
13. [Build & Deployment](#build--deployment)
14. [Development Guidelines](#development-guidelines)

---

## Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│              React 19 Application (flat root)        │
├─────────────────────────────────────────────────────┤
│          App.tsx (SPA, scroll-based navigation)      │
├──────────────┬──────────────┬──────────────┬─────────┤
│   Layout     │   Sections   │   Utilities  │   UI    │
├──────────────┼──────────────┼──────────────┼─────────┤
│ ArtisticNav  │ Hero         │ lib/utils.ts │ Button  │
│ Footer       │ About        │ types.ts     │ Badge   │
│ SplashScreen │ Expertise    │              │ Tooltip │
│ CustomCursor │ Projects*    │              │ Skeleton│
│ ScrollProgress│ Skills*     │              │ Content │
│              │ Marketplace  │              │ Skeleton│
│              │ ThoughtLdr   │              │         │
│              │ Contact      │              │         │
│              │ ProjectDtl*  │              │         │
├──────────────┴──────────────┴──────────────┴─────────┤
│          Framer Motion + Tailwind CSS                │
├──────────────────────────────────────────────────────┤
│          Vercel Analytics + Vite Build               │
└──────────────────────────────────────────────────────┘
* = lazy loaded
```

### Application Entry Points

- **index.tsx** - Root React entry point with React 19 and Strict Mode
- **App.tsx** - Main routing logic and application shell

---

## Directory Structure

```
WaltBurge.com/
├── components/
│   ├── ui/                              # Reusable UI components
│   │   ├── button.tsx                   # Button component with variants (CVA)
│   │   ├── badge.tsx                    # Badge component
│   │   ├── tooltip.tsx                  # Radix UI tooltip wrapper
│   │   ├── skeleton.tsx                 # Loading skeleton
│   │   └── content-skeleton.tsx         # Content-specific skeletons
│   │
│   ├── ArtisticNav.tsx                  # Main navigation component
│   ├── Footer.tsx                       # Footer section
│   ├── SplashScreen.tsx                 # Animated splash/loading screen
│   ├── CustomCursor.tsx                 # Custom cursor implementation
│   ├── ScrollProgress.tsx               # Page scroll progress indicator
│   ├── BackToTop.tsx                    # Back-to-top button (not currently used in App.tsx)
│   ├── ErrorBoundary.tsx                # Error handling wrapper
│   │
│   ├── Hero.tsx                         # Landing hero section
│   ├── About.tsx                        # About/bio section
│   ├── Expertise.tsx                    # Skills/expertise showcase
│   ├── Projects.tsx                     # Project grid with filtering (lazy loaded)
│   ├── ProjectDetail.tsx                # Project detail view (lazy loaded)
│   ├── Skills.tsx                       # Technical skills breakdown (lazy loaded)
│   ├── ThoughtLeadership.tsx            # Blog/articles section
│   ├── Marketplace.tsx                  # Marketplace/services section
│   └── Contact.tsx                      # Contact form section
│
├── lib/
│   └── utils.ts                         # Utility functions (cn for class merging)
│
├── public/
│   ├── og-image.png                     # Open Graph preview image
│   └── assets/
│       └── projects/                    # Project-specific images
│
├── App.tsx                              # Main application component
├── index.css                            # Global styles, animations, theme variables
├── index.html                           # HTML entry point
├── index.tsx                            # React DOM render entry (StrictMode)
├── types.ts                             # Core TypeScript interfaces and types
├── metadata.json                        # Project metadata
│
├── vite.config.ts                       # Vite configuration (port 3000)
├── tailwind.config.js                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── postcss.config.js                    # PostCSS configuration
├── vercel.json                          # Vercel SPA rewrite rules
├── package.json                         # Project dependencies and scripts
├── package-lock.json                    # Locked dependency versions
├── CodebaseOverview.md                  # This file
└── README.md                            # Project readme

```

---

## Core Components

### Layout Components

#### **ArtisticNav.tsx** (~4.5KB)
- Main navigation component
- Artistic styling and design
- Navigation menu for all page sections
- Responsive behavior for mobile/desktop

#### **Footer.tsx**
- Footer section with links and branding
- Contact information
- Social media links (likely)
- Copyright information

#### **SplashScreen.tsx** (~6.5KB)
- Animated splash/loading screen
- Ripple effects animation
- Initial page load animation
- Smooth fade-out transition

### Page Sections

#### **Hero.tsx** (~120 lines)
- Landing hero section
- Geometric animations
- Scroll effects and parallax
- Call-to-action buttons
- Main headline and subheading

#### **About.tsx** (~14KB)
- Biographical information
- Personal narrative and background
- Professional journey
- Achievements and milestones
- Profile image and styling

#### **Expertise.tsx** (~10KB)
- Technical expertise showcase
- Skills and competencies
- Technology highlights
- Experience summary

#### **Projects.tsx** (~26KB)
- Project grid display
- Technology-based filtering
- Project cards with images
- Click-to-view details
- Responsive grid layout
- Image lazy loading

#### **ProjectDetail.tsx** (~19KB)
- Individual project detail page
- Full project description
- Challenge and solution narrative
- Technical stack details
- Features list
- Project status (Live, Beta, Archived, Concept)
- Link to live project or repository
- Gallery of project screenshots

#### **Skills.tsx** (~35KB)
- Comprehensive technical skills breakdown
- Skill categories (Frontend, Backend, Tools, etc.)
- Proficiency levels or experience metrics
- Technology grouping
- Visual skill representation

#### **ThoughtLeadership.tsx** (~11KB)
- Blog or articles section
- Published content
- Articles, write-ups, or case studies
- Thought leadership pieces

#### **Marketplace.tsx** (~18KB)
- Marketplace or services section
- Offering showcase
- Service listings
- Call-to-action elements

#### **Contact.tsx** (~11KB)
- Contact form section
- Form validation
- Contact information display
- Call-to-action buttons

### UI Utility Components

#### **CustomCursor.tsx** (~3.5KB)
- Custom cursor implementation
- Mouse tracking
- Interactive cursor effects
- Alternative to default browser cursor

#### **ScrollProgress.tsx**
- Page scroll progress indicator
- Visual feedback during scrolling
- Progress bar or similar element

#### **BackToTop.tsx**
- Back-to-top button
- Scroll-to-top functionality
- Visibility based on scroll position
- Smooth scroll animation

#### **ErrorBoundary.tsx**
- React Error Boundary component
- Catches rendering errors
- Error fallback UI
- Prevents full page crash

### UI Component Library (`components/ui/`)

#### **button.tsx**
- Reusable button component
- Variants: default, outline, ghost
- Size variants
- Disabled state
- Built with TypeScript and CVA (Class Variance Authority)

#### **badge.tsx**
- Small badge component
- Used for tags, labels, statuses
- Multiple size variants

#### **tooltip.tsx**
- Tooltip component wrapper
- Built on Radix UI Tooltip
- Keyboard accessible
- Customizable positioning

#### **skeleton.tsx**
- Generic loading skeleton
- Placeholder for loading states
- Animated shimmer effect

#### **content-skeleton.tsx**
- Content-specific skeleton variants
- Customized skeletons for different content types

---

## Data Structures & Types

### Core Types (`types.ts`)

```typescript
interface Project {
  id: string                    // Unique project identifier
  title: string                 // Project title
  category: 'Systems' | 'Web' | 'Game Dev' | 'Tools'  // Project category
  description: string           // Short description
  techStack: string[]           // Array of technologies used
  tags: string[]                // Additional tags for filtering
  imageUrl: string              // Main project image URL
  images?: string[]             // Array of project screenshots
  link?: string                 // Link to live project
  repositoryUrl?: string        // GitHub or repository link
  fullDescription?: string      // Detailed project description
  challenge?: string            // Challenge/problem statement
  solution?: string             // Solution approach
  features?: string[]           // Key features list
  status?: 'Live' | 'Beta' | 'Archived' | 'Concept'  // Project status
  year?: string                 // Project year or date
}

enum SectionId {
  HERO = 'hero'
  ABOUT = 'about'
  PROJECTS = 'projects'
  SKILLS = 'skills'
  CONTACT = 'contact'
}
```

### SectionId Usage

The `SectionId` enum is used for:
- Navigation targeting
- Scroll-to-section functionality
- Section identification in routing
- Analytics tracking

---

## Styling System

### Global Styles (`index.css`)

#### CSS Variables (Theme System)
```css
--bg-deep: Deep background (Onyx: 18 17 19)
--bg-primary: Alias for --bg-deep
--bg-surface: Surface background (Carbon Black: 34 39 37)
--bg-nebula: Alias for --bg-surface
--bg-secondary: Alias for --bg-nebula
--text-primary: Primary text (Snow White: 249 249 249)
--text-secondary: Secondary text (Gray: 156 163 175)
--text-glow: Glow text (Snow White)
--accent-color: Accent (Snow White in default monochrome theme)
--border-color: Border (Low contrast: 60 65 60)
--aurora-teal: Aurora teal accent
--aurora-purple: Aurora purple accent
--aurora-pink: Aurora pink accent
```

#### Custom Animations
- **pulse-slow**: Slow pulsing animation
- **float**: Floating/hovering animation
- **fade-in**: Fade in animation
- **slide-up**: Slide up animation
- **scan**: Scanning effect animation

#### Special Effects
- **Film Grain**: Subtle film grain texture overlay
- **Gradient Background**: Dynamic gradient backgrounds
- **Smooth Transitions**: CSS transitions for UI interactions

### Tailwind CSS Configuration

#### Custom Theme Colors
```javascript
colors: {
  brand: {
    base: 'rgb(var(--bg-primary) / <alpha-value>)',
    surface: 'rgb(var(--bg-surface) / <alpha-value>)',
    accent: 'rgb(var(--accent-color) / <alpha-value>)',
    secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
    border: 'rgb(var(--border-color) / <alpha-value>)',
    primary: 'rgb(var(--text-primary) / <alpha-value>)',
  },
  aurora: {
    teal: 'rgb(var(--aurora-teal) / <alpha-value>)',
  },
}
```

#### Custom Animations
```javascript
keyframes: {
  'pulse-slow': { /* 3-4s pulse */ },
  'float': { /* up/down movement */ },
  'fade-in': { /* opacity animation */ },
  'slide-up': { /* slide from bottom */ },
  'scan': { /* horizontal scan effect */ },
}
```

#### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 768px (md) - 1024px (lg)
- Desktop: > 1024px (xl, 2xl)

#### Custom Fonts
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],     // Primary body font (loaded via Google Fonts)
  mono: ['JetBrains Mono', 'monospace'],  // Code/mono font
}
```

Also loads Playfair Display via Google Fonts in `index.css`.

#### Custom Background Images
```javascript
backgroundImage: {
  'grid-pattern': "linear-gradient(...)",   // Grid overlay using border-color
  'radial-fade': "radial-gradient(...)",    // Radial accent fade
}
```

### Styling Approach
- **Utility-First**: Tailwind CSS for styling
- **Component Variants**: CVA (Class Variance Authority) for component variants
- **Dynamic Theming**: CSS variables with RGB triplets for alpha support
- **Dark Mode**: Enabled via `darkMode: 'class'` in Tailwind config
- **Responsive**: Mobile-first design approach
- **Animation Ready**: Framer Motion integration with Tailwind

---

## Component Dependencies

### Dependency Graph Overview

```
App.tsx
├── ArtisticNav
├── SplashScreen
├── CustomCursor
├── ScrollProgress
├── BackToTop
├── ErrorBoundary
│   ├── Hero
│   ├── About
│   ├── Expertise
│   ├── Projects
│   │   └── ProjectDetail (modal)
│   ├── Skills
│   ├── ThoughtLeadership
│   ├── Marketplace
│   └── Contact
├── Footer
└── UI Components (button, badge, tooltip, skeleton)

Component Import Sources:
- React, React.lazy for code splitting
- Framer Motion (motion, useScroll, useTransform, useMotionValue)
- Lucide React (icons)
- Tailwind CSS (cn utility)
- Radix UI (tooltip, slot)
```

### Lazy-Loaded Components
- Projects.tsx - Lazy loaded for performance
- Skills.tsx - Lazy loaded for performance
- ProjectDetail.tsx - Lazy loaded for performance
- Suspense boundaries with skeleton loaders

---

## Data Flow

### State Management Approach

1. **Local Component State**: Each component manages its own state (useState in App.tsx for splash, selected project, tech filter)
2. **Props Drilling**: Parent-to-child data flow
3. **No Global State Library**: No Redux/Zustand/Context -- kept simple with local state and prop passing

### Data Flow Example: Project Display

```
App.tsx (contains projects data)
  ↓
Projects.tsx (displays project grid)
  ↓
  ├─→ Project Card Components (display individual projects)
  │    ↓
  │    └─→ ProjectDetail.tsx (modal with full details)
  │         ↓
  │         └─→ UI Components (buttons, badges, tooltips)
  ↓
Filtering Logic (by technology)
```

### Navigation Flow

```
App.tsx (SPA - no router library)
  ↓ (smooth scroll navigation via SectionId anchors)
  ├─→ Section Scrolls (Hero → About → Expertise → Projects → Marketplace → ThoughtLeadership → Contact)
  ├─→ ArtisticNav (navigation controls)
  └─→ ProjectDetail (full-page view, replaces main layout when a project is selected)
```

---

## Key Features

### 1. Project Showcase
- **Grid Display**: Responsive project grid
- **Filtering**: Filter projects by technology stack
- **Modal Details**: Click to view full project details
- **Images**: Project images with lazy loading
- **Links**: External links to live projects or repositories

### 2. Skills & Expertise
- **Comprehensive Breakdown**: Detailed technical skills
- **Categories**: Organized by skill type
- **Visual Representation**: Possibly progress bars or badges
- **Experience Metrics**: Proficiency or years of experience

### 3. Thought Leadership
- **Blog/Articles**: Published content showcase
- **Case Studies**: Detailed project write-ups
- **Insights**: Professional insights and expertise

### 4. Interactive Animations
- **Framer Motion**: Smooth animations throughout
- **Scroll Effects**: Parallax and scroll-triggered animations
- **Splash Screen**: Animated loading screen
- **Geometric Animations**: Hero section animations

### 5. Responsive Design
- **Mobile-First**: Mobile optimized first
- **Tablet Support**: Optimized for tablets
- **Desktop**: Full-featured desktop experience
- **Navigation**: Responsive menu (likely hamburger on mobile)

### 6. Performance
- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: Lazy-loaded images
- **Skeleton Loading**: Loading states for components
- **Suspense Boundaries**: React Suspense for async components

### 7. Analytics
- **Vercel Analytics**: Integration for tracking
- **Performance Monitoring**: Likely using Vercel Web Analytics
- **User Behavior**: Tracking interactions

### 8. Contact & Interaction
- **Contact Form**: Functional contact form
- **Call-to-Action**: Multiple CTAs throughout
- **Social Links**: Connection to social profiles

---

## Animation & Motion Systems

### Framer Motion Implementation

#### Key Hooks Used
```typescript
useScroll()         // Track scroll position
useTransform()      // Transform values based on scroll
useMotionValue()    // Create animated values
useInView()         // Detect when element enters viewport
useAnimation()      // Control animations programmatically
```

#### Common Animation Patterns

1. **Scroll-Triggered Animations**
   - Hero section geometric animations
   - Parallax effects in Hero and About
   - Fade-in as users scroll down

2. **Entrance Animations**
   - Components fade in when entering viewport
   - Staggered animations for lists
   - Slide-up animations for content

3. **Interactive Animations**
   - Hover effects on project cards
   - Button hover animations
   - Cursor animations

4. **Continuous Animations**
   - Floating animations
   - Pulsing effects
   - Background animations

### Custom CSS Animations

Located in `index.css`:
- **@keyframes pulse-slow**: 3-4 second pulse
- **@keyframes float**: Up/down floating motion
- **@keyframes fade-in**: Opacity fade-in
- **@keyframes slide-up**: Slide from bottom entrance
- **@keyframes scan**: Horizontal scan effect

---

## Performance Optimizations

### 1. Code Splitting
- Lazy-loaded page sections with React.lazy()
- Suspense boundaries with skeleton fallbacks
- Reduces initial bundle size

### 2. Image Optimization
- Lazy loading for project images
- Responsive image handling
- Image compression expected via Vercel

### 3. Component Optimization
- Memoization for expensive computations
- Efficient re-render avoidance
- Tailored Suspense boundaries

### 4. Build Optimization
- Vite for fast development and optimized builds
- Tree shaking for unused code removal
- Minification and compression

### 5. Runtime Performance
- Smooth animations with Framer Motion
- Debounced scroll listeners
- Efficient CSS transitions

---

## Responsive Design

### Breakpoints (Tailwind CSS)
```
sm: 640px   - Small devices
md: 768px   - Medium tablets
lg: 1024px  - Large tablets / small laptops
xl: 1280px  - Large screens
2xl: 1536px - Extra large screens
```

### Mobile Considerations
- Touch-friendly interactive elements
- Hamburger navigation (likely in ArtisticNav)
- Optimized font sizes and spacing
- Vertical scrolling layout

### Tablet Optimization
- Adjusted grid layouts
- Optimized navigation
- Comfortable touch targets

### Desktop Experience
- Full-featured layout
- Hover effects and interactions
- Parallel animations
- Desktop-specific UI enhancements

---

## Environment Configuration

### Environment Variables

Variables loaded via Vite's `loadEnv` in `vite.config.ts`:
```
GEMINI_API_KEY    - Gemini API key (exposed as process.env.GEMINI_API_KEY and process.env.API_KEY)
```

Note: These are NOT `VITE_` prefixed. They are loaded from a root `.env` file via `loadEnv(mode, '.', '')` and injected via Vite's `define` config.

### Configuration Files

- **vite.config.ts**: Build configuration
- **tailwind.config.js**: Tailwind customization
- **tsconfig.json**: TypeScript settings
- **package.json**: Dependencies and scripts

### Development Setup
```bash
npm install           # Install dependencies
npm run dev          # Start development server (Vite, port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Build & Deployment

### Build Process (Vite)

1. **Development**: `npm run dev`
   - Hot Module Replacement (HMR)
   - Fast refresh
   - Source maps for debugging

2. **Production Build**: `npm run build`
   - Minification and tree-shaking
   - Code splitting
   - Asset optimization
   - Output to `dist/` directory

3. **Preview**: `npm run preview`
   - Local preview of production build

### Deployment (Vercel)

- **Platform**: Vercel
- **Analytics**: Vercel Web Analytics integrated
- **Automatic Deployments**: Likely from git
- **Environment Variables**: Set in Vercel dashboard
- **Performance**: Optimized with Vercel CDN

### Build Output
- Static site deployable to any CDN
- No server-side rendering (client-side SPA)
- Pre-optimized assets via Vite

---

## Development Guidelines

### Code Organization Best Practices

1. **Components**
   - One component per file
   - Descriptive naming (PascalCase for components)
   - Functional components with hooks
   - TypeScript types for all props

2. **Styling**
   - Use Tailwind CSS utility classes
   - Component variants with CVA
   - CSS variables for theme colors
   - No inline styles (use Tailwind or CSS modules if needed)

3. **Naming Conventions**
   - Components: PascalCase (e.g., `ProjectCard.tsx`)
   - Functions/variables: camelCase (e.g., `handleScroll`)
   - Constants: UPPER_SNAKE_CASE (e.g., `MAX_PROJECTS`)
   - CSS classes: kebab-case (Tailwind default)

4. **Type Safety**
   - Define interfaces in `types.ts` for shared types
   - Use TypeScript for all components
   - Avoid `any` type usage
   - Export types from component files if needed

5. **Accessibility**
   - Semantic HTML elements
   - ARIA labels where needed
   - Keyboard navigation support
   - Screen reader friendly
   - Error boundary error handling

6. **Performance**
   - Use React.lazy() for route components
   - Implement Suspense boundaries
   - Optimize images
   - Avoid unnecessary re-renders
   - Use useCallback for event handlers when appropriate

7. **Git Workflow**
   - Create feature branches from main
   - Clear, descriptive commit messages
   - Review before merging
   - Keep commits atomic and logical

### Testing Strategy (To Be Defined)
- Unit tests for utilities and hooks
- Integration tests for components
- E2E tests for user flows
- Visual regression testing for animations

### Documentation
- Inline comments for complex logic
- Prop documentation in components
- Type documentation in types.ts
- Keep README updated

---

## Common Development Tasks

### Adding a New Project

1. Update `types.ts` if Project interface needs changes
2. Add project data to projects list (likely in App.tsx or separate data file)
3. Project cards render automatically from data
4. ProjectDetail.tsx handles modal display

### Adding a New Skill

1. Find Skills data structure (likely in Skills.tsx)
2. Add skill entry to appropriate category
3. Component renders updated data

### Creating a New Section

1. Create component file in `src/components/`
2. Add TypeScript types in `types.ts`
3. Import and add to App.tsx routing
4. Use Framer Motion for animations
5. Style with Tailwind CSS

### Updating Theme Colors

1. Modify CSS variables in `index.css`
2. Update Tailwind config in `tailwind.config.js` if needed
3. Colors automatically apply throughout site

### Deploying to Production

1. Push changes to main branch
2. Vercel automatically deploys
3. Monitor with Vercel Analytics
4. Check performance metrics

---

## Key Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| React | 19.2.3+ | UI Framework |
| React-DOM | 19.2.3+ | DOM rendering |
| TypeScript | ~5.8.2 | Type safety |
| Vite | 6.2.0+ | Build tool |
| Tailwind CSS | 3.4.17+ | Styling |
| Framer Motion | 12.27.1+ | Animations |
| Lucide React | Latest | Icon library |
| Radix UI | Latest | Accessible components |
| Class Variance Authority | Latest | Component variants |
| Vercel Analytics | Latest | Analytics |

---

## Project Statistics

- **Total Components**: 20+
- **Page Section Components**: 9
- **UI Components**: 5
- **Utility Components**: 4+
- **Total Lines of Code**: ~3,500+
- **Static Assets**: Project images, OG image
- **CSS**: Global + Tailwind + inline styles
- **TypeScript Coverage**: 100%
- **Deployment**: Vercel
- **Animations**: Framer Motion + Custom CSS

---

## Future Enhancement Areas

1. **Testing**: Add unit and E2E tests
2. **CMS Integration**: Dynamic content management
3. **Internationalization**: Multi-language support
4. **PWA Features**: Offline support, installable
5. **Performance**: Further optimization opportunities
6. **SEO**: Enhanced meta tags and structured data
7. **Backend**: Optional API for dynamic content
8. **Comments/Ratings**: User feedback system
9. **Search**: Site-wide search functionality

Note: Dark mode is already configured (`darkMode: 'class'` in Tailwind config). The default theme is a monochrome Onyx/Snow palette.

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **TypeScript**: https://www.typescriptlang.org/docs
- **Vite**: https://vitejs.dev

---

## Quick Reference

### Import Paths

The `@` alias resolves to the project root (configured in both `vite.config.ts` and `tsconfig.json`).

```typescript
// Components (relative imports used in practice)
import { Hero } from './components/Hero'
import { Button } from './components/ui/button'

// Types
import { Project, SectionId } from './types'

// Utilities
import { cn } from '@/lib/utils'

// Framer Motion
import { motion } from 'framer-motion'
```

### Common Component Structure
```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const MyComponent: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-brand-base text-brand-primary"
    >
      {prop1}
    </motion.div>
  );
};
```

---

**Last Updated**: 2026-03-29
**Maintainer**: James Walton
**Status**: Active - Maintained
