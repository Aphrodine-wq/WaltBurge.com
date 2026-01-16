import React, { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight, Cpu, Terminal, Database, Cloud, Code2, Globe, Server, Box, Brain } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  isLightMode: boolean;
  onOpenChat?: () => void;
}

const FloatingIcons = React.memo(({ isLightMode }: { isLightMode: boolean }) => {
    const icons = [
        { Icon: Cpu, delay: '0s', x: '10%', y: '20%' },
        { Icon: Terminal, delay: '2s', x: '80%', y: '15%' },
        { Icon: Database, delay: '4s', x: '20%', y: '70%' },
        { Icon: Cloud, delay: '1s', x: '75%', y: '65%' },
        { Icon: Code2, delay: '3s', x: '15%', y: '40%' },
        { Icon: Globe, delay: '5s', x: '85%', y: '35%' },
        { Icon: Server, delay: '2.5s', x: '60%', y: '85%' },
        { Icon: Box, delay: '0.5s', x: '35%', y: '15%' },
    ];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className="absolute animate-float pointer-events-auto transition-all duration-500 hover:opacity-100 hover:text-brand-accent hover:text-glow scale-[1.0] md:scale-[1.5] hover:scale-[1.2] md:hover:scale-[1.7] text-brand-primary/5 opacity-10"
                    style={{
                        top: item.y,
                        left: item.x,
                        animationDelay: item.delay,
                    }}
                >
                    <item.Icon size={48} className="md:w-16 md:h-16" />
                </div>
            ))}
        </div>
    );
});

export const Hero: React.FC<HeroProps> = React.memo(({ isLightMode, onOpenChat }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Smooth Parallax Effect with Lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
       const { innerWidth, innerHeight } = window;
       targetRef.current = { 
         x: (e.clientX / innerWidth - 0.5) * 2,
         y: (e.clientY / innerHeight - 0.5) * 2
       };
    };

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

      if (parallaxRef.current) {
         const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
         layers.forEach((layer) => {
            const speed = parseFloat((layer as HTMLElement).dataset.speed || '1');
            const x = mouseRef.current.x * 20 * speed;
            const y = mouseRef.current.y * 20 * speed;
            (layer as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
         });
      }

      if (gridRef.current) {
         const tiltX = mouseRef.current.y * 5;
         const tiltY = mouseRef.current.x * 5;
         gridRef.current.style.transform = `perspective(1000px) rotateX(${60 + tiltX}deg) rotateY(${tiltY}deg) scale(2)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Canvas Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(Math.floor(width * height / 12000), 80); 

    const initNodes = (count: number) => {
        nodes.length = 0;
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1 
            });
        }
    }

    initNodes(nodeCount);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Use getComputedStyle to read current CSS variables for canvas colors
      const computedStyle = getComputedStyle(document.body);
      const isLight = document.documentElement.classList.contains('light-mode');
      
      // Manually match the variable logic for canvas since it can't use CSS vars directly
      const particleColor = isLight ? 'rgba(0, 0, 0, 0.7)' : 'rgba(34, 211, 238, 0.6)';
      const lineBaseColor = isLight ? '0, 0, 0' : '34, 211, 238';
      const maxLineOpacity = isLight ? 0.2 : 0.15; 

      const mouseX = (mouseRef.current.x / 2 + 0.5) * width;
      const mouseY = (mouseRef.current.y / 2 + 0.5) * height;

      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 250;
          const interactionRadiusSq = interactionRadius * interactionRadius;

          if (distSq < interactionRadiusSq) { 
             const dist = Math.sqrt(distSq);
             const force = (interactionRadius - dist) / interactionRadius;
             node.vx -= (dx / dist) * force * 0.8;
             node.vy -= (dy / dist) * force * 0.8;
          }

          node.vx *= 0.96;
          node.vy *= 0.96;
          
          if (Math.abs(node.vx) < 0.1) node.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(node.vy) < 0.1) node.vy += (Math.random() - 0.5) * 0.05;

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      ctx.fillStyle = particleColor;
      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
          const nodeA = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
              const nodeB = nodes[j];
              const dx = nodeA.x - nodeB.x;
              const dy = nodeA.y - nodeB.y;
              
              if (Math.abs(dx) > 100 || Math.abs(dy) > 100) continue;

              const distSq = dx*dx + dy*dy;
              if (distSq < 10000) { 
                  const dist = Math.sqrt(distSq);
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${lineBaseColor}, ${maxLineOpacity * (1 - dist / 100)})`;
                  ctx.moveTo(nodeA.x, nodeA.y);
                  ctx.lineTo(nodeB.x, nodeB.y);
                  ctx.stroke();
              }
          }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes(Math.min(Math.floor(width * height / 12000), 80));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightMode]);

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black perspective-container transition-colors duration-500 text-center">
      
      {/* Dynamic Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-10 pointer-events-none z-0"
        style={{
            backgroundImage: `
                linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2)',
            transformOrigin: 'center center',
            transition: 'opacity 0.5s ease'
        }}
      ></div>

      {/* Background Parallax Layers */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
         
         {/* Layer 1: Deep Atmosphere */}
         <div className="parallax-layer absolute inset-0" data-speed="-0.5">
            <div className="absolute inset-0 bg-radial-fade transition-opacity duration-700 opacity-30"></div>
            <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-accent/5 rounded-full blur-[80px] md:blur-[120px] transition-colors duration-700" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand-purple/5 rounded-full blur-[80px] md:blur-[100px] transition-opacity duration-700" />
         </div>

         {/* Layer 2: Geometric Shapes */}
         <div className="parallax-layer absolute inset-0" data-speed="1.0">
            <div className="absolute top-[15%] left-[10%] w-48 h-48 md:w-64 md:h-64 border border-brand-accent/5 rounded-full transition-colors duration-700" />
            <div className="absolute top-[50%] right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-brand-purple/5 rounded-full border-dashed animate-[spin_60s_linear_infinite] transition-colors duration-700" />
         </div>

         {/* Layer 3: Floating Icons */}
         <div className="parallax-layer absolute inset-0" data-speed="1.5">
            <FloatingIcons isLightMode={isLightMode} />
         </div>
      </div>

      {/* Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent z-20 transition-colors duration-700"></div>

      {/* Interactive Network Canvas */}
      <canvas 
        ref={canvasRef} 
        className={`absolute top-0 left-0 w-full h-full z-10 pointer-events-none transition-all duration-700 ${isLightMode ? '' : 'mix-blend-screen'}`}
      />
      
      {/* Foreground Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto flex flex-col items-center justify-center">
        
        {/* Status Badge */}
        <div className="animate-slide-up opacity-0 [animation-delay:0.1s] mb-6 md:mb-10 inline-flex items-center justify-center gap-3 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-colors duration-500">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </div>
            <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase font-bold">System Online</span>
        </div>

        {/* Main Title - Mobile Optimized Size */}
        <h1 className="animate-slide-up opacity-0 [animation-delay:0.3s] text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-brand-primary mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] relative z-30 select-none text-center transition-colors duration-500">
          WALT<span className="text-brand-accent">.</span>BURGE
        </h1>
        
        {/* Role Subtitles */}
        <div className="animate-slide-up opacity-0 [animation-delay:0.5s] flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-8 md:mb-12 text-brand-secondary font-mono text-xs md:text-base border-y border-brand-primary/5 py-4 md:py-6 w-full max-w-5xl bg-brand-black/20 backdrop-blur-sm text-center transition-colors duration-500">
            <div className="flex items-center gap-2">
                <Terminal size={14} className="md:w-4 md:h-4 text-brand-secondary" />
                <span className="tracking-widest uppercase">Systems Engineer</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-brand-border transition-colors duration-500"></span>
            <div className="flex items-center gap-2">
                <Brain size={14} className="md:w-4 md:h-4 text-brand-secondary" />
                <span className="tracking-widest uppercase">AI Engineering</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-brand-border transition-colors duration-500"></span>
            <div className="flex items-center gap-2">
                <Cpu size={14} className="md:w-4 md:h-4 text-brand-secondary" />
                <span className="tracking-widest uppercase">Language Designer</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-brand-border transition-colors duration-500"></span>
            <div className="flex items-center gap-2">
                <Box size={14} className="md:w-4 md:h-4 text-brand-secondary" />
                <span className="tracking-widest uppercase">Game Developer</span>
            </div>
        </div>
        
        {/* Description */}
        <p className="animate-slide-up opacity-0 [animation-delay:0.7s] text-brand-secondary max-w-2xl mx-auto text-base md:text-xl leading-relaxed mb-10 md:mb-14 font-light text-center px-4 transition-colors duration-500">
          Architecting high-performance digital ecosystems. 
          <br className="hidden md:block" />
          Merging bare-metal efficiency with AI intelligence.
        </p>

        {/* Action Buttons */}
        <div className="animate-slide-up opacity-0 [animation-delay:0.9s] flex flex-col sm:flex-row gap-4 md:gap-6 w-full justify-center items-center">
          
          <button 
            onClick={scrollToProjects}
            className="group relative px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 rounded-sm overflow-hidden min-w-[200px] w-full sm:w-auto shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] bg-brand-black border border-brand-accent text-brand-primary hover:bg-brand-accent/10"
          >
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-accent"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-accent"></div>
            
            <div className="relative z-10 flex items-center justify-center gap-2">
               <Database size={16} /> 
               <span>View Projects</span>
               <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
           <button 
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-transparent border border-brand-secondary/30 font-bold text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 rounded-sm min-w-[200px] w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-brand-secondary hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5"
          >
            Contact System
          </button>
        </div>
      </div>

      <div 
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-40" 
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary">Scroll</span>
        <ArrowDown size={16} className="text-brand-accent" />
      </div>
    </section>
  );
});
