import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Specialties } from './components/Specialties';
import { Expertise } from './components/Expertise';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ArtisticNav } from './components/ArtisticNav';
import { Marketplace } from './components/Marketplace';
import { TooltipProvider } from './components/ui/tooltip';
import { ContentSkeleton } from './components/ui/content-skeleton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SplashScreen } from './components/SplashScreen';
import { getPostBySlug } from './lib/blog';
import { SectionId, Project, BlogPost } from './types';

const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
// Blog routes carry the markdown + syntax-highlight + giscus weight — split them
// into their own chunks so the homepage bundle stays light.
const BlogPostDetail = lazy(() => import('./components/BlogPostDetail').then(module => ({ default: module.BlogPostDetail })));
const BlogIndex = lazy(() => import('./components/BlogIndex').then(module => ({ default: module.BlogIndex })));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showBlogIndex, setShowBlogIndex] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // URL routing for a static SPA. The vercel.json rewrite serves index.html for
  // any non-/api path, so history.pushState gives us real, indexable URLs:
  //   /blog/<slug> → an open post   ·   /blog → the full index   ·   else → home.
  useEffect(() => {
    const syncFromPath = () => {
      const path = window.location.pathname;
      const slugMatch = path.match(/^\/blog\/(.+?)\/?$/);
      if (slugMatch) {
        setSelectedPost(getPostBySlug(slugMatch[1]) ?? null);
        setShowBlogIndex(false);
      } else if (/^\/blog\/?$/.test(path)) {
        setShowBlogIndex(true);
        setSelectedPost(null);
      } else {
        setShowBlogIndex(false);
        setSelectedPost(null);
      }
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowBlogIndex(false);
    window.history.pushState(null, '', `/blog/${post.id}`);
    window.scrollTo(0, 0);
  };

  const openBlogIndex = () => {
    setSelectedPost(null);
    setShowBlogIndex(true);
    window.history.pushState(null, '', '/blog');
    window.scrollTo(0, 0);
  };

  // A post returns up one level to the blog index.
  const handlePostBack = () => {
    setSelectedPost(null);
    setShowBlogIndex(true);
    window.history.pushState(null, '', '/blog');
  };

  const handleBlogIndexBack = () => {
    setShowBlogIndex(false);
    window.history.pushState(null, '', '/');
  };

  const handleProjectClick = (project: Project) => setSelectedProject(project);
  const handleBackToHome = () => setSelectedProject(null);

  const handleTechClickFromDetail = (tech: string) => {
    setActiveTechFilter(tech);
    setSelectedProject(null);
    setTimeout(() => {
      document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Global nav: works from any view. Blog routes to the full index; every other
  // item returns to the homepage and scrolls to its section (after the home view
  // mounts, when coming from a sub-page).
  const goToSection = (id: string) => {
    if (id === SectionId.BLOG) { openBlogIndex(); return; }
    const wasHome = !selectedProject && !selectedPost && !showBlogIndex;
    setSelectedProject(null);
    setSelectedPost(null);
    setShowBlogIndex(false);
    if (!wasHome) window.history.pushState(null, '', '/');
    const scrollToSection = () => {
      if (id === SectionId.HERO) window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (wasHome) scrollToSection();
    else requestAnimationFrame(() => setTimeout(scrollToSection, 80));
  };

  const goHome = () => goToSection(SectionId.HERO);

  if (selectedProject) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToHome}
              onTechClick={handleTechClickFromDetail}
              onNavigate={goToSection}
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
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <BlogPostDetail
              post={selectedPost}
              onBack={handlePostBack}
              onPostClick={handlePostClick}
              onTagClick={openBlogIndex}
              onNavigate={goToSection}
            />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (showBlogIndex) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <BlogIndex onPostClick={handlePostClick} onBack={handleBlogIndexBack} onNavigate={goToSection} />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        {!showSplash && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <ArtisticNav onNavigate={goToSection} onHome={goHome} />

            <main className="relative z-10 w-full overflow-x-hidden">
              <Hero />
              <About />
              <Specialties />
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
              <Blog onPostClick={handlePostClick} onViewAll={openBlogIndex} />
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
