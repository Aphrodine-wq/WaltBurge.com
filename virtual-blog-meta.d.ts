// Types for the virtual:blog-meta module emitted by blogMetaPlugin in
// vite.config.ts — frontmatter-only view of content/blog/*.md.
declare module 'virtual:blog-meta' {
  const entries: Array<{
    file: string;
    header: string;
    readTime: string;
    hasBody: boolean;
  }>;
  export default entries;
}
