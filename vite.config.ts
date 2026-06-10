import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
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
            // Keep the markdown/syntax-highlight/comments stack and framer-motion
            // out of the homepage bundle. Blog routes are already React.lazy, so
            // these only load when a post is opened.
            manualChunks(id) {
              if (!id.includes('node_modules')) return;
              if (/react-markdown|remark|rehype|micromark|mdast|hast|unist|unified|vfile|property-information|character-entit|@giscus|lowlight|highlight\.js|web-namespaces|space-separated|comma-separated|html-void/.test(id)) return 'blog';
              if (id.includes('framer-motion')) return 'motion';
              // react/react-dom are left to Rollup's default chunking — forcing
              // them into their own chunk creates a vendor↔blog circular import.
            },
          },
        },
      }
    };
});
