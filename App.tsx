import React, { useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Blog, posts as blogPosts } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ArtisticNav } from './components/ArtisticNav';
import { Marketplace } from './components/Marketplace';
import { BlogPostDetail } from './components/BlogPostDetail';
import { TooltipProvider } from './components/ui/tooltip';
import { ContentSkeleton } from './components/ui/content-skeleton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Code2, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { SectionId, Project, BlogPost } from './types';

const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
import { SplashScreen } from './components/SplashScreen';

// MobileBar removed by user request (cleaner UI)
const MobileBar: React.FC = () => null;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // Blog post deep-linking: /blog/<slug> maps to an open post. Real, indexable
  // URLs (Google ignores hash fragments) — the vercel.json rewrite serves the
  // SPA for any non-/api path, so history.pushState routing works in prod.
  useEffect(() => {
    const syncFromPath = () => {
      const match = window.location.pathname.match(/^\/blog\/(.+?)\/?$/);
      const post = match ? blogPosts.find(p => p.id === match[1]) : undefined;
      setSelectedPost(post ?? null);
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.history.pushState(null, '', `/blog/${post.id}`);
  };

  const handlePostBack = () => {
    setSelectedPost(null);
    window.history.pushState(null, '', '/');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToHome = () => {
    setSelectedProject(null);
  };

  const handleTechClickFromDetail = (tech: string) => {
    setActiveTechFilter(tech);
    setSelectedProject(null);
    setTimeout(() => {
      document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (selectedProject) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300 font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToHome}
              onTechClick={handleTechClickFromDetail}
            />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (selectedPost) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300 font-sans">
          <CustomCursor />
          <BlogPostDetail post={selectedPost} onBack={handlePostBack} />
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300 font-sans cursor-none-on-desktop">
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        {!showSplash && (
          <>
            <CustomCursor />
            <ScrollProgress />
            {/* Navigation */}
            <MobileBar />
            <ArtisticNav />

            <main className="relative z-10 w-full overflow-x-hidden">
              <Hero />
              <About />
              <Expertise />

              <ErrorBoundary>
                <Suspense fallback={<div className="py-24 md:py-32 px-6 max-w-7xl mx-auto"><ContentSkeleton count={3} variant="grid" /></div>}>
                  <Projects
                    onProjectClick={handleProjectClick}
                    activeFilter={activeTechFilter}
                    onFilterChange={setActiveTechFilter}
                  />
                </Suspense>
              </ErrorBoundary>

              <Marketplace />
              <Blog onPostClick={handlePostClick} />
            </main>
            <Contact />
            <Footer />
            <Analytics />

          </>
        )}
      </div>
    </TooltipProvider>
  );
}

export default App;
