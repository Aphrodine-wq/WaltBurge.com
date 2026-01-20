import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { ThoughtLeadership } from './components/ThoughtLeadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
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

const MobileBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string, offset = 0) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const navItems = ['Shop', 'About', 'Skills', 'Projects'];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 md:hidden bg-brand-base/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-6 transition-all duration-300">
        <div
          onClick={() => scrollTo(SectionId.HERO)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10">
            <Code2 size={18} className="text-brand-accent" />
          </div>
          <span className="font-bold text-lg tracking-tight text-brand-primary">WB<span className="text-brand-accent">.SYS</span></span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-secondary hover:text-brand-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav >

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {
          isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-brand-base/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col items-center justify-center gap-8"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                  whileHover={{ scale: 1.1, color: 'rgb(34, 211, 238)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(item === 'Shop' ? 'marketplace' : item === 'Skills' ? SectionId.SKILLS : item.toLowerCase())}
                  className="text-4xl md:text-5xl font-black text-brand-primary transition-colors tracking-tighter uppercase"
                >
                  {item}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full max-w-xs"
              >
                <Button
                  onClick={() => scrollTo(SectionId.CONTACT)}
                  variant="default"
                  className="mt-4 w-full text-lg py-6 bg-brand-accent text-brand-base"
                >
                  Contact System
                </Button>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

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
            <main>
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
            <BackToTop />
          </>
        )}
      </div>
    </TooltipProvider>
  );
}

export default App;
