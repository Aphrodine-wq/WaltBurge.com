'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { About } from '../components/About';
import { Expertise } from '../components/Expertise';
import { Blog, posts as blogPosts } from '../components/Blog';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ScrollProgress } from '../components/ScrollProgress';
import { CustomCursor } from '../components/CustomCursor';
import { ArtisticNav } from '../components/ArtisticNav';
import { Marketplace } from '../components/Marketplace';
import { LeadMagnet } from '../components/LeadMagnet';
import { BlogPostDetail } from '../components/BlogPostDetail';
import { TooltipProvider } from '../components/ui/tooltip';
import { ContentSkeleton } from '../components/ui/content-skeleton';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SplashScreen } from '../components/SplashScreen';
import { SectionId, Project, BlogPost } from '../types';

const Projects = lazy(() =>
  import('../components/Projects').then((module) => ({
    default: module.Projects,
  }))
);
const ProjectDetail = lazy(() =>
  import('../components/ProjectDetail').then((module) => ({
    default: module.ProjectDetail,
  }))
);

// MobileBar removed by user request (cleaner UI)
const MobileBar: React.FC = () => null;

export default function HomeClient() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // Blog post deep-linking: /blog/<slug> maps to an open post
  useEffect(() => {
    const syncFromPath = () => {
      const match = window.location.pathname.match(/^\/blog\/(.+?)\/?$/);
      const post = match ? blogPosts.find((p) => p.id === match[1]) : undefined;
      setSelectedPost(post ?? null);
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    router.push(`/blog/${post.id}`);
  };

  const handlePostBack = () => {
    setSelectedPost(null);
    router.push('/');
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
      document
        .getElementById(SectionId.PROJECTS)
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (selectedProject) {
    return (
      <TooltipProvider>
        <CustomCursor />
        <Suspense fallback={null}>
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToHome}
            onTechClick={handleTechClickFromDetail}
          />
        </Suspense>
      </TooltipProvider>
    );
  }

  if (selectedPost) {
    return (
      <TooltipProvider>
        <CustomCursor />
        <BlogPostDetail post={selectedPost} onBack={handlePostBack} />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
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
            <SocialProof />
            <About />
            <Expertise />

            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
                    <ContentSkeleton count={3} variant="grid" />
                  </div>
                }
              >
                <Projects
                  onProjectClick={handleProjectClick}
                  activeFilter={activeTechFilter}
                  onFilterChange={setActiveTechFilter}
                />
              </Suspense>
            </ErrorBoundary>

            <Marketplace />
            <Blog onPostClick={handlePostClick} />
            <LeadMagnet />
          </main>
          <Contact />
          <Footer />
        </>
      )}
    </TooltipProvider>
  );
}
