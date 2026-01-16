import React, { useState, lazy, Suspense } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ScrollProgress } from './components/ScrollProgress';
import { Code2, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { SectionId, Project } from './types';

const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));

interface NavbarProps {
  // Removed isLightMode props
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-base/80 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div 
            onClick={() => scrollTo(SectionId.HERO)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-accent/50 transition-colors">
              <Code2 size={18} className="text-brand-accent" />
            </div>
            <span className="font-bold text-lg tracking-tight text-brand-primary">WB<span className="text-brand-accent">.SYSTEMS</span></span>
          </div>

          <div className="flex items-center gap-4 md:gap-10">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              {['ABOUT', 'PROJECTS', 'SKILLS'].map((item) => (
                <button 
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())} 
                    className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors tracking-widest uppercase"
                >
                  {item}
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              variant="default"
              size="sm"
              className="hidden md:inline-flex"
            >
              Contact
            </Button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-secondary hover:text-brand-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-base/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fade-in flex flex-col items-center gap-8">
           {['ABOUT', 'PROJECTS', 'SKILLS'].map((item) => (
                <button 
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())} 
                    className="text-2xl font-black text-brand-primary hover:text-brand-accent transition-colors tracking-tighter uppercase"
                >
                  {item}
                </button>
            ))}
            <Button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              variant="default"
              className="mt-4 w-full max-w-xs text-sm"
            >
              Contact System
            </Button>
        </div>
      )}
    </>
  );
};

function App() {
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
      <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300">
         <Suspense fallback={null}>
           <ProjectDetail 
              project={selectedProject} 
              onBack={handleBackToHome} 
              onTechClick={handleTechClickFromDetail}
           />
         </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        
        <About />

        <Suspense fallback={null}>
          <Projects 
              onProjectClick={handleProjectClick} 
              activeFilter={activeTechFilter}
              onFilterChange={setActiveTechFilter}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </main>
      <Contact />
    </div>
  );
}

export default App;
