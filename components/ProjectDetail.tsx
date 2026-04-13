import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { TechIcon, CategoryIcon } from './Projects';
import { ArrowLeft, ExternalLink, Github, CheckCircle, AlertTriangle, Lightbulb, Terminal, ChevronDown, Activity, GitCommit, FileCode, ChevronLeft, ChevronRight, Lock, Zap, Code } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onTechClick: (tech: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onTechClick }) => {
  const challengeRef = useRef<HTMLDivElement>(null);
  const challengeBorderRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const solutionBorderRef = useRef<HTMLDivElement>(null);

  const [isChallengeOpen, setIsChallengeOpen] = useState(true);
  const [isSolutionOpen, setIsSolutionOpen] = useState(true);

  // Carousel State
  const images = project.images && project.images.length > 0 ? project.images : [project.imageUrl];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder stats
  const stats = {
    loc: '24.5k',
    commits: '1,240',
    performance: '98ms'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Preload Images
  useEffect(() => {
      images.forEach((src) => {
          const img = new Image();
          img.src = src;
      });
  }, [images]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleScroll = () => {
        const calculateProgress = (element: HTMLElement | null) => {
            if (!element) return 0;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.9;
            const end = windowHeight * 0.3;
            const progress = (start - rect.top) / (start - end);
            return Math.min(Math.max(progress, 0), 1);
        };

        if (challengeBorderRef.current && challengeRef.current) {
            const p = calculateProgress(challengeRef.current);
            challengeBorderRef.current.style.height = `${p * 100}%`;
            challengeBorderRef.current.style.opacity = `${0.5 + (p * 0.5)}`;
        }

        if (solutionBorderRef.current && solutionRef.current) {
            const p = calculateProgress(solutionRef.current);
            solutionBorderRef.current.style.height = `${p * 100}%`;
            solutionBorderRef.current.style.opacity = `${0.5 + (p * 0.5)}`;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    const timeout = setTimeout(handleScroll, 350);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeout);
    };
  }, [isChallengeOpen, isSolutionOpen]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-primary pt-16 md:pt-20 animate-fade-in transition-colors duration-300">
      
      {/* Navbar Overlay for Back Button */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center bg-brand-black/95 border-b border-brand-border">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to System
        </button>
      </div>

      {/* Hero Banner Carousel */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden group bg-brand-dark">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Images */}
        {images.map((img, index) => (
             <div 
                key={index} 
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-1' : 'opacity-0 z-0'}`}
             >
                <img 
                  src={img} 
                  alt={`${project.title} - Slide ${index + 1}`} 
                  className="w-full h-full object-cover filter grayscale opacity-60"
                />
             </div>
        ))}

        {/* Navigation Controls */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brand-accent/20"
                >
                    <ChevronLeft size={20} className="md:w-6 md:h-6" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brand-accent/20"
                >
                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-brand-accent w-8' : 'bg-white/30 hover:bg-white/60 w-2'}`}
                        />
                    ))}
                </div>
            </>
        )}

        <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-12 md:pb-16 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wide">
              <CategoryIcon category={project.category} />
              {project.category}
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 md:mb-6 text-brand-primary">{project.title}</h1>
            <p className="text-lg md:text-2xl text-brand-secondary max-w-3xl font-light leading-relaxed line-clamp-3 md:line-clamp-none">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 md:gap-16">
          
          {/* Left Column: Case Study */}
          <div className="space-y-12 md:space-y-16">
            
            {/* Overview */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-brand-primary flex items-center gap-3">
                <Terminal className="text-brand-accent" /> System Overview
              </h2>
              <p className="text-brand-secondary text-base md:text-lg leading-relaxed font-light">
                {project.fullDescription || `This project showcases advanced techniques in ${project.category}.`}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
               
               {/* Challenge Card */}
               <div ref={challengeRef} className="bg-brand-surface/50 border border-brand-border p-6 md:p-8 rounded-xl relative overflow-hidden pl-8 md:pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/10"></div>
                  <div 
                    ref={challengeBorderRef}
                    className="absolute left-0 top-0 w-1 bg-orange-500 transition-height duration-100 ease-linear"
                    style={{ height: '0%', boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}
                  ></div>

                  <button 
                    onClick={() => setIsChallengeOpen(!isChallengeOpen)}
                    className="flex items-center justify-between w-full mb-4 group focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-orange-500" size={24} />
                        <h3 className="text-lg md:text-xl font-bold text-brand-primary">The Challenge</h3>
                    </div>
                    <ChevronDown 
                        className={`text-brand-secondary transition-transform duration-300 ${isChallengeOpen ? 'rotate-180' : ''}`} 
                        size={20} 
                    />
                  </button>
                  
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isChallengeOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="text-brand-secondary leading-relaxed text-sm">
                            {project.challenge || "Optimizing system performance under heavy load while maintaining data integrity."}
                        </p>
                    </div>
                  </div>
               </div>
               
               {/* Solution Card */}
               <div ref={solutionRef} className="bg-brand-surface/50 border border-brand-border p-6 md:p-8 rounded-xl relative overflow-hidden pl-8 md:pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-success/10"></div>
                  <div 
                    ref={solutionBorderRef}
                    className="absolute left-0 top-0 w-1 bg-brand-success transition-height duration-100 ease-linear"
                    style={{ height: '0%', boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
                  ></div>

                  <button 
                    onClick={() => setIsSolutionOpen(!isSolutionOpen)}
                    className="flex items-center justify-between w-full mb-4 group focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                        <Lightbulb className="text-brand-success" size={24} />
                        <h3 className="text-lg md:text-xl font-bold text-brand-primary">The Solution</h3>
                    </div>
                    <ChevronDown 
                        className={`text-brand-secondary transition-transform duration-300 ${isSolutionOpen ? 'rotate-180' : ''}`} 
                        size={20} 
                    />
                  </button>

                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isSolutionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="text-brand-secondary leading-relaxed text-sm">
                            {project.solution || "Implemented custom architecture to bypass standard bottlenecks."}
                        </p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-brand-primary">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-brand-surface border border-brand-primary/5 rounded-lg hover:border-brand-accent/20 transition-colors group">
                    <CheckCircle className="text-brand-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                    <span className="text-brand-secondary text-sm">{feature}</span>
                  </div>
                )) || <p className="text-brand-secondary">Features confidential.</p>}
              </div>
            </div>

          </div>

          {/* Right Column: Meta Data */}
          <div className="space-y-8">
            <div className="bg-brand-surface/50 border border-brand-border p-6 md:p-8 rounded-xl lg:sticky lg:top-24">
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">Technologies</h3>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {project.techStack.map(tech => (
                  <button 
                    key={tech} 
                    onClick={() => onTechClick(tech)}
                    className="flex items-center gap-2 px-3 py-2 bg-brand-black border border-brand-primary/10 rounded-lg hover:border-brand-accent hover:bg-brand-accent/10 transition-all cursor-pointer group text-left"
                  >
                    <TechIcon tag={tech} isActive={true} />
                    <span className="text-xs font-bold text-brand-secondary group-hover:text-brand-accent transition-colors">{tech}</span>
                  </button>
                ))}
              </div>

              {/* Project Metrics / Statistics */}
              <div className="h-px w-full bg-brand-primary/10 my-8"></div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">System Metrics</h3>
              <div className="grid grid-cols-1 gap-4">
                
                {/* Lines of Code */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/20 transition-colors group">
                   <div className="flex items-center gap-3 text-brand-secondary group-hover:text-brand-primary transition-colors">
                      <div className="p-2 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                        <Code size={18} />
                      </div>
                      <span className="text-xs font-mono tracking-wide">Lines of Code</span>
                   </div>
                   <span className="font-mono font-bold text-brand-accent">{stats.loc}</span>
                </div>

                {/* Commits */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/20 transition-colors group">
                   <div className="flex items-center gap-3 text-brand-secondary group-hover:text-brand-primary transition-colors">
                      <div className="p-2 rounded-md bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                        <GitCommit size={18} />
                      </div>
                      <span className="text-xs font-mono tracking-wide">Total Commits</span>
                   </div>
                   <span className="font-mono font-bold text-brand-purple">{stats.commits}</span>
                </div>

                {/* Performance */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/20 transition-colors group">
                   <div className="flex items-center gap-3 text-brand-secondary group-hover:text-brand-primary transition-colors">
                      <div className="p-2 rounded-md bg-green-500/10 text-green-400 border border-green-500/20">
                        <Zap size={18} />
                      </div>
                      <span className="text-xs font-mono tracking-wide">Runtime Perf</span>
                   </div>
                   <span className="font-mono font-bold text-green-400">{stats.performance}</span>
                </div>

              </div>

              <div className="h-px w-full bg-brand-primary/10 my-8"></div>

              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">Project Links</h3>
              <div className="space-y-4">
                {project.link ? (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-brand-surface text-brand-primary border border-brand-primary/10 font-bold text-sm rounded hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-colors group"
                    >
                        <span>View Live Deployment</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <button disabled className="flex items-center justify-between w-full px-4 py-3 bg-brand-surface/50 text-brand-secondary/50 font-bold text-sm rounded cursor-not-allowed border border-brand-primary/5">
                        <span>Deployment Offline</span>
                        <ExternalLink size={16} />
                    </button>
                )}
                
                {project.repositoryUrl ? (
                    <a 
                        href={project.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-brand-black border border-brand-primary/10 text-brand-primary font-bold text-sm rounded hover:bg-brand-surface transition-colors group"
                    >
                        <span>Source Code</span>
                        <Github size={16} className="group-hover:rotate-12 transition-transform" />
                    </a>
                ) : (
                    <button disabled className="flex items-center justify-between w-full px-4 py-3 bg-brand-black border border-brand-primary/5 text-brand-secondary/50 font-bold text-sm rounded cursor-not-allowed">
                        <span>Source Private</span>
                        <Lock size={16} />
                    </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};