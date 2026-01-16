import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { ChatWidget } from './components/ChatWidget';
import { Contact } from './components/Contact';
import { ProjectDetail } from './components/ProjectDetail';
import { Code2, Sun, Moon, Menu, X } from 'lucide-react';
import { SectionId, Project } from './types';

interface NavbarProps {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLightMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-border">
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
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-brand-secondary hover:text-brand-accent hover:bg-brand-primary/5 transition-colors"
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              className="hidden md:block px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-brand-primary text-brand-black hover:bg-brand-accent transition-colors rounded-sm"
            >
              Contact
            </button>

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
        <div className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fade-in flex flex-col items-center gap-8">
           {['ABOUT', 'PROJECTS', 'SKILLS'].map((item) => (
                <button 
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())} 
                    className="text-2xl font-black text-brand-primary hover:text-brand-accent transition-colors tracking-tighter uppercase"
                >
                  {item}
                </button>
            ))}
            <button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              className="mt-4 px-8 py-4 w-full max-w-xs text-sm font-bold uppercase tracking-widest bg-brand-primary text-brand-black hover:bg-brand-accent transition-colors rounded-sm"
            >
              Contact System
            </button>
        </div>
      )}
    </>
  );
};

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [isLightMode]);

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
      <div className="min-h-screen bg-brand-black text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300">
         <ProjectDetail 
            project={selectedProject} 
            onBack={handleBackToHome} 
            onTechClick={handleTechClickFromDetail}
         />
         <ChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300">
      <Navbar isLightMode={isLightMode} toggleTheme={toggleTheme} />
      <main>
        <Hero isLightMode={isLightMode} onOpenChat={() => setIsChatOpen(true)} />
        
        <section id={SectionId.ABOUT} className="py-16 md:py-32 px-4 md:px-6 bg-brand-surface relative transition-colors duration-300 overflow-hidden">
            {/* Decorative Background Elements for Detail */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-black/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
                    
                    {/* Left Column: Sticky Header */}
                    <div className="md:sticky md:top-32">
                        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block flex items-center gap-2">
                            <span className="w-8 h-px bg-brand-accent"></span>
                            01. About Me
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
                            Engineering <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary/50">From First</span> <br/>
                            Principles.
                        </h2>
                        
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 md:p-5 bg-brand-dark/50 backdrop-blur-sm rounded-xl border border-brand-primary/5 hover:border-brand-accent/20 transition-all group">
                                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1 group-hover:text-brand-accent transition-colors">5+</div>
                                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Years Experience</div>
                            </div>
                            <div className="p-4 md:p-5 bg-brand-dark/50 backdrop-blur-sm rounded-xl border border-brand-primary/5 hover:border-brand-accent/20 transition-all group">
                                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1 group-hover:text-brand-purple transition-colors">12+</div>
                                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Shipped Projects</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Content */}
                    <div className="space-y-12">
                        
                        {/* Intro Statement */}
                        <div className="glass-panel p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Code2 size={120} />
                            </div>
                            <p className="text-lg md:text-2xl leading-relaxed font-light text-brand-secondary relative z-10">
                                "I don't just use tools; I build them. My engineering philosophy is rooted in a deep understanding of the entire stack—from <span className="text-brand-primary font-medium">kernel-level memory management</span> to <span className="text-brand-primary font-medium">distributed AI architectures</span>."
                            </p>
                        </div>

                        {/* Narrative Sections */}
                        <div className="space-y-10">
                            
                            <div className="flex gap-4 md:gap-6 group">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm group-hover:bg-brand-accent group-hover:text-black transition-colors">01</div>
                                    <div className="w-px h-full bg-brand-primary/10 my-2 group-hover:bg-brand-accent/50 transition-colors"></div>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">The Systems Approach</h3>
                                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                        My journey began with a frustration: modern abstractions often obscure how computers actually work. To solve this, I built <strong>G-Rump</strong>, a compiled language, and <strong>FTWOS</strong>, a custom operating system. This "bare-metal" education gave me a unique perspective on performance optimization—knowing the cost of every cycle and allocation allows me to write high-level code that is incredibly efficient.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 md:gap-6 group">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-purple font-bold font-mono text-sm group-hover:bg-brand-purple group-hover:text-black transition-colors">02</div>
                                    <div className="w-px h-full bg-brand-primary/10 my-2 group-hover:bg-brand-purple/50 transition-colors"></div>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">AI & The Future</h3>
                                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                        Today, I apply that systems mindset to Artificial Intelligence. I'm not just integrating APIs; I'm architecting <strong>Agentic Workflows</strong> and <strong>RAG Pipelines</strong> that function as reliable system components. Whether it's optimizing inference latency or designing context-aware memory structures, I treat AI models as deterministic parts of a larger, robust machine.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 md:gap-6 group">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-green-400 font-bold font-mono text-sm group-hover:bg-green-400 group-hover:text-black transition-colors">03</div>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">Creative Engineering</h3>
                                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                        Code is ultimately a creative medium. My background in <strong>Game Development</strong> (Unreal Engine, Custom Metal Renderers) drives me to build interfaces that feel alive. I obsess over micro-interactions, frame rates, and user feedback loops. I believe software should not only work perfectly but also feel powerful to use.
                                    </p>
                                </div>
                            </div>

                        </div>
                        
                        {/* Signature/Footer of About */}
                        <div className="pt-8 border-t border-brand-primary/5 flex items-center justify-between">
                            <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                                Based in Global / Remote
                            </div>
                            <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                                Open for collaborations
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <Projects 
            onProjectClick={handleProjectClick} 
            activeFilter={activeTechFilter}
            onFilterChange={setActiveTechFilter}
        />
        <Skills />
      </main>
      <Contact />
      <ChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}

export default App;