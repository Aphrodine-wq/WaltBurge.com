import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight, Cpu, Terminal, Database, Cloud, Code2, Globe, Server, Box, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { SectionId } from '../types';

const FloatingIcons = React.memo(() => {
    const icons = [
        { Icon: Cpu, delay: 0, x: '10%', y: '20%' },
        { Icon: Terminal, delay: 0.2, x: '80%', y: '15%' },
        { Icon: Database, delay: 0.4, x: '20%', y: '70%' },
        { Icon: Cloud, delay: 0.1, x: '75%', y: '65%' },
        { Icon: Code2, delay: 0.3, x: '15%', y: '40%' },
        { Icon: Globe, delay: 0.5, x: '85%', y: '35%' },
        { Icon: Server, delay: 0.25, x: '60%', y: '85%' },
        { Icon: Box, delay: 0.05, x: '35%', y: '15%' },
    ];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.1, 1],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        opacity: { duration: 6, repeat: Infinity, delay: item.delay },
                        scale: { duration: 6, repeat: Infinity, delay: item.delay },
                        y: { duration: 6, repeat: Infinity, delay: item.delay }
                    }}
                    whileHover={{
                        opacity: 1,
                        scale: 1.3,
                        color: 'rgb(34, 211, 238)'
                    }}
                    className="absolute pointer-events-auto transition-colors duration-300 scale-[1.0] md:scale-[1.5] text-brand-primary/5"
                    style={{
                        top: item.y,
                        left: item.x,
                    }}
                >
                    <item.Icon size={48} className="md:w-16 md:h-16" />
                </motion.div>
            ))}
        </div>
    );
});

export const Hero: React.FC = React.memo(() => {
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
    // Mobile optimization: significantly reduce node count density
    const density = window.innerWidth < 768 ? 25000 : 12000;
    const maxNodes = window.innerWidth < 768 ? 30 : 80;
    const nodeCount = Math.min(Math.floor(width * height / density), maxNodes);

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
      
      const particleColor = 'rgba(34, 211, 238, 0.6)';
      const lineBaseColor = '34, 211, 238';
      const maxLineOpacity = 0.15; 

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
  }, []);

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typewriter Logic
  const roles = ["Systems Engineer", "AI Engineering", "Language Designer", "Game Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
        const fullText = roles[currentRoleIndex];
        
        if (isDeleting) {
            setDisplayedText(fullText.substring(0, displayedText.length - 1));
            setTypingSpeed(50);
        } else {
            setDisplayedText(fullText.substring(0, displayedText.length + 1));
            setTypingSpeed(150);
        }

        if (!isDeleting && displayedText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section id={SectionId.HERO} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-base perspective-container transition-colors duration-500 text-center">
      
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
            <FloatingIcons />
         </div>
      </div>

      {/* Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-base to-transparent z-20 transition-colors duration-700"></div>

      {/* Interactive Network Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none transition-all duration-700 mix-blend-screen"
      />
      
      {/* Foreground Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 md:mb-10 inline-flex items-center justify-center gap-3 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-colors duration-500"
        >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </div>
            <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase font-bold">System Online</span>
        </motion.div>

        {/* Main Title - Mobile Optimized Size */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-brand-primary mb-6 md:mb-8 leading-[0.95] md:leading-[0.9] relative z-30 select-none text-center transition-colors duration-500"
        >
          WALT<span className="text-brand-accent">.</span>BURGE
        </motion.h1>

        {/* Role Subtitles - Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center h-12 sm:h-14 mb-8 md:mb-12 text-brand-secondary font-mono text-lg sm:text-xl md:text-2xl border-y border-brand-primary/5 py-4 md:py-6 w-full max-w-5xl bg-brand-base/20 backdrop-blur-sm text-center transition-colors duration-500 px-4"
        >
            <span className="text-brand-accent mr-2">{'>'}</span>
            <span className="tracking-widest uppercase">{displayedText}</span>
            <span className="animate-pulse ml-1 w-2 h-6 bg-brand-accent block"></span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-brand-secondary max-w-2xl mx-auto text-base md:text-xl leading-relaxed mb-10 md:mb-14 font-light text-center px-2 sm:px-4 transition-colors duration-500"
        >
          Architecting high-performance digital ecosystems.
          <br className="hidden md:block" />
          Merging bare-metal efficiency with AI intelligence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md sm:max-w-none justify-center items-stretch sm:items-center px-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={scrollToProjects}
              variant="outline"
              className="relative min-w-[200px] w-full sm:w-auto overflow-hidden group"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.0),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.0),transparent_55%)] group-hover:bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.35),transparent_55%)] transition-colors duration-500" />
              <div className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 animate-orbit-glow" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Database size={16} />
                <span>View Projects</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              variant="default"
              className="min-w-[200px] w-full sm:w-auto"
            >
              Contact System
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity cursor-pointer z-40"
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary">Scroll</span>
        <ArrowDown size={16} className="text-brand-accent" />
      </motion.div>
    </section>
  );
});
