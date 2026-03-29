# WaltBurge.com

Personal/company portfolio website. React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. Deployed on Vercel.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Start dev server (port 3000):
   ```
   npm run dev
   ```
3. Production build:
   ```
   npm run build
   ```
4. Preview production build:
   ```
   npm run preview
   ```

## Environment Variables

Set `GEMINI_API_KEY` in a root `.env` file (loaded via Vite's `loadEnv`, not `VITE_` prefixed).

## Deployment

Vercel with SPA rewrites (`vercel.json`). Push to main to deploy. Vercel Web Analytics enabled via `@vercel/analytics`.
