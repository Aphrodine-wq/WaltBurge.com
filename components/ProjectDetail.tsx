import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { TechIcon, CategoryIcon } from './Projects';
import { kindLabel } from '../lib/work';
import { NavLinks } from './NavLinks';
import { ArrowLeft, ExternalLink, Github, CheckCircle, AlertTriangle, Lightbulb, Terminal, ChevronDown, ChevronLeft, ChevronRight, Lock, Play } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onTechClick: (tech: string) => void;
  onNavigate: (id: string) => void;
}

// Click-to-play YouTube facade — real thumbnail + play button until clicked,
// so the hero never pays for an iframe/JS load it doesn't need yet.
const VideoHero: React.FC<{ videoId: string; title: string; isPlaying: boolean; onPlay: () => void }> = ({ videoId, title, isPlaying, onPlay }) => {
  const [thumbFailed, setThumbFailed] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full z-10"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={`${title} showcase video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={onPlay}
      aria-label={`Play ${title} showcase video`}
      className="absolute inset-0 w-full h-full group/video cursor-pointer"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/${thumbFailed ? 'hqdefault' : 'maxresdefault'}.jpg`}
        onError={() => setThumbFailed(true)}
        alt={`${title} showcase`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45 group-hover/video:bg-black/35 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 text-brand-primary shadow-xl group-hover/video:scale-110 transition-transform">
          <Play size={28} className="ml-1" fill="currentColor" />
        </div>
      </div>
    </button>
  );
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onTechClick, onNavigate }) => {
  const challengeRef = useRef<HTMLDivElement>(null);
  const challengeBorderRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const solutionBorderRef = useRef<HTMLDivElement>(null);

  const [isChallengeOpen, setIsChallengeOpen] = useState(true);
  const [isSolutionOpen, setIsSolutionOpen] = useState(true);

  // Carousel State — only real images. Most items have no cover; the hero
  // degrades to a clean banner rather than a broken <img>.
  const images = (project.images && project.images.length > 0
    ? project.images
    : project.imageUrl ? [project.imageUrl] : []);
  // If the cover fails to load (most items ship without one), fall back to the
  // clean cream banner instead of a broken <img>. Mirrors the card grid.
  const [heroError, setHeroError] = useState(false);
  const hasImages = images.length > 0 && !heroError;
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasVideo = !!project.videoId;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
    <div className="min-h-screen bg-brand-base text-brand-primary pt-16 md:pt-20 animate-fade-in transition-colors duration-300">
      
      {/* Navbar Overlay for Back Button */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center justify-between bg-brand-base/95 border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </button>
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Hero Banner — video showcase takes priority over the image carousel */}
      <div className="relative h-[42vh] md:h-[52vh] w-full overflow-hidden group bg-brand-muted">
        {hasVideo ? (
          <VideoHero
            videoId={project.videoId!}
            title={project.title}
            isPlaying={isVideoPlaying}
            onPlay={() => setIsVideoPlaying(true)}
          />
        ) : (
          <>
            {/* Flat scrim over images so the title stays readable — no gradient. */}
            {hasImages && <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none"></div>}

            {/* Hairline grid for the no-image case */}
            {!hasImages && (
              <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
            )}

            {/* Images */}
            {!heroError && images.map((img, index) => (
                 <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-1' : 'opacity-0 z-0'}`}
                 >
                    <img
                      src={img}
                      alt={`${project.title} - Slide ${index + 1}`}
                      onError={() => setHeroError(true)}
                      className="w-full h-full object-cover"
                    />
                 </div>
            ))}

            {/* Navigation Controls */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brand-accent/20"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 border border-white/10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brand-accent/20"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 transition-all duration-300 ${idx === currentSlide ? 'bg-brand-accent w-8' : 'bg-white/30 hover:bg-white/60 w-2'}`}
                            />
                        ))}
                    </div>
                </>
            )}
          </>
        )}

        {/* Title overlay — hidden once the video is playing so it doesn't cover the player controls */}
        {!(hasVideo && isVideoPlaying) && (
          <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-10 md:pb-14 pointer-events-none">
            <div className="max-w-7xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-brand-accent text-white text-xs font-bold uppercase tracking-wide">
                <CategoryIcon category={project.category} />
                {project.kind ? kindLabel[project.kind] : project.category}
              </div>
              <h1 className={`text-4xl md:text-7xl font-black tracking-tight mb-4 md:mb-6 ${(hasImages || hasVideo) ? 'text-white' : 'text-brand-primary'}`}>{project.title}</h1>
              <p className={`text-lg md:text-2xl max-w-3xl font-light leading-relaxed line-clamp-3 md:line-clamp-none ${(hasImages || hasVideo) ? 'text-white/85' : 'text-brand-secondary'}`}>
                {project.summary || project.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 md:gap-16">
          
          {/* Left Column: Case Study */}
          <div className="space-y-12 md:space-y-16">
            
            {/* Overview */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-brand-primary flex items-center gap-3">
                <Terminal className="text-brand-accent" /> Overview
              </h2>
              <p className="text-brand-secondary text-base md:text-lg leading-relaxed font-light">
                {project.fullDescription || `This project showcases advanced techniques in ${project.category}.`}
              </p>
            </div>

            {/* Challenge & Solution Grid — only for items with real copy; no
                stock filler standing in for a case study that wasn't written */}
            {(project.challenge || project.solution) && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
               
               {/* Challenge Card */}
               <div ref={challengeRef} className="bg-brand-surface border border-brand-border p-6 md:p-8 relative overflow-hidden pl-8 md:pl-10">
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
                            {project.challenge}
                        </p>
                    </div>
                  </div>
               </div>
               
               {/* Solution Card */}
               <div ref={solutionRef} className="bg-brand-surface border border-brand-border p-6 md:p-8 relative overflow-hidden pl-8 md:pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/10"></div>
                  <div 
                    ref={solutionBorderRef}
                    className="absolute left-0 top-0 w-1 bg-green-500 transition-height duration-100 ease-linear"
                    style={{ height: '0%', boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
                  ></div>

                  <button 
                    onClick={() => setIsSolutionOpen(!isSolutionOpen)}
                    className="flex items-center justify-between w-full mb-4 group focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                        <Lightbulb className="text-green-600" size={24} />
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
                            {project.solution}
                        </p>
                    </div>
                  </div>
               </div>
            </div>
            )}

            {/* Key Features */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-brand-primary">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-brand-surface border border-brand-border hover:border-brand-accent/20 transition-colors group">
                    <CheckCircle className="text-brand-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                    <span className="text-brand-secondary text-sm">{feature}</span>
                  </div>
                )) || <p className="text-brand-secondary">Features confidential.</p>}
              </div>
            </div>

          </div>

          {/* Right Column: Meta Data */}
          <div className="space-y-8">
            <div className="bg-brand-surface border border-brand-border p-6 md:p-8 lg:sticky lg:top-24">
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">Technologies</h3>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {project.techStack.map(tech => (
                  <button 
                    key={tech} 
                    onClick={() => onTechClick(tech)}
                    className="flex items-center gap-2 px-3 py-2 bg-brand-base border border-brand-border hover:border-brand-accent hover:bg-brand-accent/10 transition-all cursor-pointer group text-left"
                  >
                    <TechIcon tag={tech} isActive={true} />
                    <span className="text-xs font-bold text-brand-secondary group-hover:text-brand-accent transition-colors">{tech}</span>
                  </button>
                ))}
              </div>

              {/* Project meta — real catalog facts, not invented metrics. */}
              <div className="h-px w-full bg-brand-border my-8"></div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">Details</h3>
              <dl className="space-y-3 text-sm">
                {project.status && (
                  <div className="flex items-center justify-between">
                    <dt className="font-mono text-xs uppercase tracking-wide text-brand-secondary">Status</dt>
                    <dd className="font-mono font-bold text-brand-accent">{project.status}</dd>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center justify-between">
                    <dt className="font-mono text-xs uppercase tracking-wide text-brand-secondary">Year</dt>
                    <dd className="font-mono font-bold text-brand-primary">{project.year}</dd>
                  </div>
                )}
                {project.kind && (
                  <div className="flex items-center justify-between">
                    <dt className="font-mono text-xs uppercase tracking-wide text-brand-secondary">Type</dt>
                    <dd className="font-mono font-bold text-brand-primary">{kindLabel[project.kind]}</dd>
                  </div>
                )}
                {project.client && (
                  <div className="flex items-center justify-between">
                    <dt className="font-mono text-xs uppercase tracking-wide text-brand-secondary">Client</dt>
                    <dd className="font-mono font-bold text-brand-primary text-right">{project.client.name}{project.client.location ? ` · ${project.client.location}` : ''}</dd>
                  </div>
                )}
              </dl>

              <div className="h-px w-full bg-brand-border my-8"></div>

              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-secondary mb-6">Project Links</h3>
              <div className="space-y-4">
                {project.link ? (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-brand-surface text-brand-primary border border-brand-border font-bold text-sm hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-colors group"
                    >
                        <span>View Live Deployment</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <button disabled className="flex items-center justify-between w-full px-4 py-3 bg-brand-surface text-brand-secondary/50 font-bold text-sm cursor-not-allowed border border-brand-border">
                        <span>Deployment Offline</span>
                        <ExternalLink size={16} />
                    </button>
                )}
                
                {project.repositoryUrl ? (
                    <a 
                        href={project.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-brand-base border border-brand-border text-brand-primary font-bold text-sm hover:bg-brand-surface transition-colors group"
                    >
                        <span>Source Code</span>
                        <Github size={16} className="group-hover:rotate-12 transition-transform" />
                    </a>
                ) : (
                    <button disabled className="flex items-center justify-between w-full px-4 py-3 bg-brand-base border border-brand-border text-brand-secondary/50 font-bold text-sm cursor-not-allowed">
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