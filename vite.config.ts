import path from 'path';
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// virtual:blog-meta — frontmatter-only view of content/blog/*.md, so the entry
// bundle ships post METADATA without inlining 388KB of post bodies (bodies load
// lazily per-post via the non-eager glob in lib/blog.ts). Parsing stays in
// lib/blog.ts; this module only splits the frontmatter block from the body and
// precomputes readTime (which needs the body text lib/blog.ts no longer has).
function blogMetaPlugin(): Plugin {
  const VIRTUAL = 'virtual:blog-meta';
  const RESOLVED = '\0' + VIRTUAL;
  const DIR = path.resolve(__dirname, 'content/blog');
  return {
    name: 'blog-meta',
    resolveId(id) {
      return id === VIRTUAL ? RESOLVED : undefined;
    },
    load(id) {
      if (id !== RESOLVED) return;
      const entries = readdirSync(DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
          const raw = readFileSync(path.join(DIR, f), 'utf8');
          const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
          const header = match ? `---\n${match[1]}\n---\n` : '';
          const body = (match ? match[2] : raw).trim();
          const words = body.split(/\s+/).filter(Boolean).length;
          const readTime = body ? `${Math.max(1, Math.round(words / 220))} min` : '';
          return { file: f, header, readTime, hasBody: body.length > 0 };
        });
      return `export default ${JSON.stringify(entries)};`;
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), blogMetaPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            // No manualChunks: the markdown/comments stack and framer-motion are
            // both kept off the homepage by dynamic imports alone (React.lazy
            // routes + LazyMotion async features in index.tsx). Pinning them to
            // named chunks looked tidy but made Rollup wire the 'blog' chunk as
            // a STATIC import of the entry (execution-order safety), which
            // shipped 105KB of markdown libs to every homepage visitor.
          },
        },
      }
    };
});
