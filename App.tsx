import React, { useState, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { ThoughtLeadership } from './components/ThoughtLeadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ArtisticNav } from './components/ArtisticNav';
import { Marketplace } from './components/Marketplace';
import { TooltipProvider } from './components/ui/tooltip';
import { ContentSkeleton } from './components/ui/content-skeleton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Code2, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { SectionId, Project } from './types';

const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
import { SplashScreen } from './components/SplashScreen';

// MobileBar removed by user request (cleaner UI)
const MobileBar: React.FC = () => null;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

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
            <div className="film-grain" />
            {/* Global Ambient Background - Seamless */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-brand-accent/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
              <div className="absolute bottom-[10%] right-[0%] w-[30vw] h-[30vw] bg-brand-purple/5 rounded-full blur-[100px] mix-blend-screen animate-float-delayed" />
            </div>

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
              <ThoughtLeadership />
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
