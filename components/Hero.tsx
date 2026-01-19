import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, ChevronRight, Cpu, Terminal, Database, Cloud, Code2, Globe, Server, Box, Brain, Zap, Layers, Network, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { SectionId } from '../types';

const FloatingIcons = React.memo(() => {
  const icons = [
    { Icon: Cpu, delay: 0, x: '10%', y: '20%', size: 48, rotation: 0 },
    { Icon: Terminal, delay: 0.2, x: '80%', y: '15%', size: 52, rotation: 45 },
    { Icon: Database, delay: 0.4, x: '20%', y: '70%', size: 44, rotation: 90 },
    { Icon: Cloud, delay: 0.1, x: '75%', y: '65%', size: 56, rotation: 135 },
    { Icon: Code2, delay: 0.3, x: '15%', y: '40%', size: 48, rotation: 180 },
    { Icon: Globe, delay: 0.5, x: '85%', y: '35%', size: 50, rotation: 225 },
    { Icon: Server, delay: 0.25, x: '60%', y: '85%', size: 46, rotation: 270 },
    { Icon: Box, delay: 0.05, x: '35%', y: '15%', size: 54, rotation: 315 },
    { Icon: Zap, delay: 0.35, x: '5%', y: '55%', size: 42, rotation: 60 },
    { Icon: Layers, delay: 0.15, x: '90%', y: '80%', size: 48, rotation: 120 },
    { Icon: Network, delay: 0.45, x: '50%', y: '10%', size: 50, rotation: 180 },
    { Icon: Activity, delay: 0.28, x: '92%', y: '50%', size: 44, rotation: 240 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.3, rotate: 0, y: 20 }}
          animate={{
            opacity: [0.08, 0.18, 0.08],
            scale: [1, 1.15, 1],
            rotate: [item.rotation, item.rotation + 15, item.rotation],
            y: [0, -25, 0]
          }}
          transition={{
            opacity: { duration: 7 + index * 0.3, repeat: Infinity, delay: item.delay },
            scale: { duration: 7 + index * 0.3, repeat: Infinity, delay: item.delay },
            rotate: { duration: 8 + index * 0.4, repeat: Infinity, delay: item.delay },
            y: { duration: 6 + index * 0.2, repeat: Infinity, delay: item.delay }
          }}
          whileHover={{
            opacity: 1,
            scale: 1.4,
            rotate: item.rotation + 180,
            color: 'rgb(34, 211, 238)',
            filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))'
          }}
          whileTap={{
            opacity: 1,
            scale: 1.6,
            rotate: item.rotation + 360,
            color: 'rgb(34, 211, 238)',
            filter: 'drop-shadow(0 0 25px rgba(34, 211, 238, 1))',
            transition: { duration: 0.4, type: 'spring', stiffness: 400, damping: 15 }
          }}
          className="absolute pointer-events-auto transition-all duration-300 scale-[1.0] md:scale-[1.5] text-brand-primary/5 cursor-pointer active:cursor-grabbing"
          style={{
            top: item.y,
            left: item.x,
          }}
        >
          <item.Icon size={item.size} className="md:w-16 md:h-16" />
        </motion.div>
      ))}
    </div>
  );
});

// Touch Ripple Effect Component
const TouchRipple = ({ x, y, id }: { x: number; y: number; id: number }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        width: 100,
        height: 100,
        marginLeft: -50,
        marginTop: -50,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-brand-accent/50 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
    </motion.div>
  );
};

export const Hero: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rippleCounter = useRef(0);

  // Mouse position with spring physics for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Touch Ripple Effect Handler
  const handleTouchRipple = (e: TouchEvent | MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = rippleCounter.current++;

    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  // Smooth Parallax Effect with Lerp - Mouse and Touch Support
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const newX = (e.clientX / innerWidth - 0.5) * 2;
      const newY = (e.clientY / innerHeight - 0.5) * 2;
      targetRef.current = { x: newX, y: newY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const newX = (touch.clientX / innerWidth - 0.5) * 2;
        const newY = (touch.clientY / innerHeight - 0.5) * 2;
        targetRef.current = { x: newX, y: newY };
        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);
      }
    };

    // Device orientation for mobile tilt effect
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null && window.innerWidth < 768) {
        targetRef.current = {
          x: Math.max(-1, Math.min(1, e.gamma / 45)),
          y: Math.max(-1, Math.min(1, (e.beta - 45) / 45))
        };
      }
    };

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.08;

      if (parallaxRef.current) {
        const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const speed = parseFloat((layer as HTMLElement).dataset.speed || '1');
          const x = mouseRef.current.x * 30 * speed;
          const y = mouseRef.current.y * 30 * speed;
          (layer as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }

      if (gridRef.current) {
        const tiltX = mouseRef.current.y * 8;
        const tiltY = mouseRef.current.x * 8;
        gridRef.current.style.transform = `perspective(1000px) rotateX(${60 + tiltX}deg) rotateY(${tiltY}deg) scale(2.2)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // Permission will be requested on first user interaction
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Touch ripple listeners
    if (heroRef.current) {
      heroRef.current.addEventListener('touchstart', handleTouchRipple, { passive: true });
      heroRef.current.addEventListener('click', handleTouchRipple);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (heroRef.current) {
        heroRef.current.removeEventListener('touchstart', handleTouchRipple);
        heroRef.current.removeEventListener('click', handleTouchRipple);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Enhanced Canvas Network Animation with Touch Support and Particle Diversity
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowIntensity: number;
      type: 'primary' | 'secondary' | 'accent';
    }

    const nodes: Node[] = [];
    const density = window.innerWidth < 768 ? 22000 : 10000;
    const maxNodes = window.innerWidth < 768 ? 40 : 100;
    const nodeCount = Math.min(Math.floor(width * height / density), maxNodes);

    // Touch tracking for canvas interaction
    let touchActive = false;
    let touchPoints: Array<{ x: number; y: number; intensity: number }> = [];

    const handleTouchStart = (e: TouchEvent) => {
      touchActive = true;
      touchPoints = [];
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (width / rect.width);
        const y = (touch.clientY - rect.top) * (height / rect.height);
        touchPoints.push({ x, y, intensity: 1 });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchPoints = [];
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (width / rect.width);
        const y = (touch.clientY - rect.top) * (height / rect.height);
        touchPoints.push({ x, y, intensity: 1 });
      }
    };

    const handleTouchEnd = () => {
      touchActive = false;
      touchPoints = [];
    };

    const initNodes = (count: number) => {
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        const type = Math.random() < 0.7 ? 'primary' : (Math.random() < 0.8 ? 'secondary' : 'accent');
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: type === 'accent' ? Math.random() * 3 + 2 : (type === 'secondary' ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 1),
          color: type === 'accent' ? 'rgba(34, 211, 238, 1)' : (type === 'secondary' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(34, 211, 238, 0.6)'),
          glowIntensity: Math.random() * 0.5 + 0.5,
          type
        });
      }
    }

    initNodes(nodeCount);

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const lineBaseColor = '34, 211, 238';
      const maxLineOpacity = 0.2;

      const mouseX = (mouseRef.current.x / 2 + 0.5) * width;
      const mouseY = (mouseRef.current.y / 2 + 0.5) * height;

      // Apply forces to nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadius = 300;
        const interactionRadiusSq = interactionRadius * interactionRadius;

        if (distSq < interactionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (interactionRadius - dist) / interactionRadius;
          node.vx -= (dx / dist) * force * 1.2;
          node.vy -= (dy / dist) * force * 1.2;
        }

        // Touch interaction (multi-touch support)
        if (touchActive && touchPoints.length > 0) {
          touchPoints.forEach(touch => {
            const tdx = touch.x - node.x;
            const tdy = touch.y - node.y;
            const tdistSq = tdx * tdx + tdy * tdy;
            const touchRadius = 350;
            const touchRadiusSq = touchRadius * touchRadius;

            if (tdistSq < touchRadiusSq) {
              const tdist = Math.sqrt(tdistSq);
              const tforce = (touchRadius - tdist) / touchRadius * touch.intensity;
              node.vx -= (tdx / tdist) * tforce * 2;
              node.vy -= (tdy / tdist) * tforce * 2;
            }
          });
        }

        // Add orbital behavior for accent nodes
        if (node.type === 'accent') {
          node.vx += Math.sin(time + i * 0.1) * 0.02;
          node.vy += Math.cos(time + i * 0.1) * 0.02;
        }

        // Velocity damping
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Add subtle noise to prevent stagnation
        if (Math.abs(node.vx) < 0.15) node.vx += (Math.random() - 0.5) * 0.08;
        if (Math.abs(node.vy) < 0.15) node.vy += (Math.random() - 0.5) * 0.08;

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with energy retention
        if (node.x < 0 || node.x > width) node.vx *= -0.9;
        if (node.y < 0 || node.y > height) node.vy *= -0.9;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Draw connections first (behind particles)
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;

          if (Math.abs(dx) > 120 || Math.abs(dy) > 120) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < 14400) {
            const dist = Math.sqrt(distSq);
            const opacity = maxLineOpacity * (1 - dist / 120);

            // Special connection for accent nodes
            if (nodeA.type === 'accent' || nodeB.type === 'accent') {
              ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity})`;
              ctx.lineWidth = 0.8;
            }

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Glow effect
        if (node.type === 'accent' || node.type === 'secondary') {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
          gradient.addColorStop(0, node.color);
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4 * node.glowIntensity, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for accent nodes
        if (node.type === 'accent') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newDensity = window.innerWidth < 768 ? 22000 : 10000;
      const newMaxNodes = window.innerWidth < 768 ? 40 : 100;
      initNodes(Math.min(Math.floor(width * height / newDensity), newMaxNodes));
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typewriter Logic
  const roles = ["Systems Engineer", "AI Engineering", "Language Designer", "Game Developer", "Full-Stack Architect"];
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
    <section
      ref={heroRef}
      id={SectionId.HERO}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-base perspective-container transition-colors duration-500 text-center"
    >

      {/* Scanline Effect */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.1) 0px, transparent 1px, transparent 2px, rgba(34, 211, 238, 0.1) 3px)',
          animation: 'scanline 8s linear infinite'
        }}></div>
      </div>

      {/* Corner Frames - Unique Design Element */}
      <div className="absolute inset-0 z-[25] pointer-events-none">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-l-2 border-t-2 border-brand-accent/40"
        >
          <div className="absolute top-0 left-0 w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-r-2 border-t-2 border-brand-accent/40"
        >
          <div className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-l-2 border-b-2 border-brand-accent/40"
        >
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-r-2 border-b-2 border-brand-accent/40"
        >
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </motion.div>
      </div>

      {/* Dynamic Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage: `
                linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.2)',
          transformOrigin: 'center center',
          transition: 'opacity 0.5s ease'
        }}
      ></div>

      {/* Background Parallax Layers */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">

        {/* Layer 1: Deep Atmosphere */}
        <div className="parallax-layer absolute inset-0" data-speed="-0.6">
          <div className="absolute inset-0 bg-radial-fade transition-opacity duration-700 opacity-40"></div>
          <div className="absolute top-[15%] -left-[5%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-brand-accent/8 rounded-full blur-[100px] md:blur-[150px] transition-colors duration-700 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[5%] right-[0%] w-[450px] h-[450px] md:w-[700px] md:h-[700px] bg-brand-purple/8 rounded-full blur-[100px] md:blur-[130px] transition-opacity duration-700 animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px] transition-opacity duration-700" />
        </div>

        {/* Layer 2: Geometric Shapes */}
        <div className="parallax-layer absolute inset-0" data-speed="0.8">
          <div className="absolute top-[15%] left-[10%] w-48 h-48 md:w-72 md:h-72 border border-brand-accent/8 rounded-full transition-colors duration-700" />
          <div className="absolute top-[50%] right-[10%] w-[300px] h-[300px] md:w-[550px] md:h-[550px] border-2 border-brand-purple/8 rounded-full border-dashed animate-[spin_80s_linear_infinite] transition-colors duration-700" />
          <div className="absolute top-[25%] right-[25%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] border border-cyan-400/5 rounded-full border-dotted animate-[spin_100s_linear_infinite_reverse] transition-colors duration-700" />

          {/* Hexagon shapes */}
          <div className="absolute top-[60%] left-[15%] w-32 h-32 md:w-48 md:h-48 border border-brand-accent/6 rotate-45 transition-colors duration-700" />
          <div className="absolute top-[35%] left-[70%] w-24 h-24 md:w-36 md:h-36 border border-brand-purple/6 rotate-12 transition-colors duration-700" />
        </div>

        {/* Layer 3: Floating Icons */}
        <div className="parallax-layer absolute inset-0" data-speed="1.2">
          <FloatingIcons />
        </div>
      </div>

      {/* Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-base via-brand-base/50 to-transparent z-20 transition-colors duration-700"></div>

      {/* Interactive Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-[15] pointer-events-auto transition-all duration-700"
      />

      {/* Touch Ripples */}
      {ripples.map(ripple => (
        <TouchRipple key={ripple.id} x={ripple.x} y={ripple.y} id={ripple.id} />
      ))}

      {/* Foreground Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen">

        {/* Profile Image with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="mb-8 md:mb-10 relative z-40"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 relative">
            <img
              src="/assets/professional_headshot.webp"
              alt="Walt Burge"
              className="w-full h-full object-cover rounded-full border-2 border-brand-accent/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            />
            <div className="absolute inset-0 rounded-full border-2 border-brand-accent/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-2 rounded-full border border-brand-purple/20 animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-6 md:mb-8 inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full border border-brand-accent/30 bg-brand-surface/50 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-brand-accent/50 group"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-success shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
          </div>
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase font-bold text-brand-primary group-hover:text-brand-accent transition-colors">System Online</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 150 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-brand-primary mb-6 leading-[0.95] md:leading-[0.9] relative z-30 select-none text-center"
        >
          WALT<span className="text-brand-accent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">.</span>BURGE
        </motion.h1>

        {/* Dynamic Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-center justify-center min-h-[50px] mb-8 md:mb-12 font-mono text-base sm:text-lg md:text-xl text-brand-gold/90"
        >
          <span className="mr-3 text-brand-accent">{'>'}</span>
          <span className="tracking-[0.1em] uppercase font-bold">{displayedText}</span>
          <span className="animate-pulse ml-2 w-2 h-5 bg-brand-accent block" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-brand-secondary max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed mb-12 font-light text-center px-4"
        >
          Architecting <span className="text-brand-primary font-medium">Scalable Solutions</span> for Enterprise Innovation.
          <br className="hidden md:block" />
          <span className="text-brand-secondary/80 text-base md:text-xl mt-2 block">Transforming complex data into strategic advantage.</span>
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md sm:max-w-none justify-center items-stretch sm:items-center px-2"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0] }}
            whileTap={{
              scale: 0.88,
              transition: { duration: 0.15, type: 'spring', stiffness: 500, damping: 20 }
            }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={scrollToProjects}
              variant="outline"
              className="relative min-w-[220px] w-full sm:w-auto overflow-hidden group active:shadow-[0_0_30px_rgba(34,211,238,0.6)] border-2 border-brand-accent/40 hover:border-brand-accent transition-all duration-300"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.0),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.0),transparent_50%)] group-hover:bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.4),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.4),transparent_50%)] group-active:bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.6),transparent_60%)] transition-all duration-500" />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 group-active:opacity-50 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                <Database size={18} />
                <span>View Projects</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 group-active:translate-x-3 transition-transform duration-200" />
              </span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, 1, -1, 0] }}
            whileTap={{
              scale: 0.88,
              transition: { duration: 0.15, type: 'spring', stiffness: 500, damping: 20 }
            }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              variant="default"
              className="min-w-[220px] w-full sm:w-auto active:shadow-[0_0_35px_rgba(34,211,238,0.8)] active:bg-brand-accent/90 transition-all duration-300 bg-gradient-to-r from-brand-accent to-cyan-500 hover:from-cyan-500 hover:to-brand-accent font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Contact System
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 12, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.6 },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ opacity: 1, scale: 1.15 }}
        whileTap={{
          scale: 0.85,
          opacity: 1,
          y: 8,
          transition: { duration: 0.15, type: 'spring', stiffness: 500 }
        }}
        className="absolute bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 transition-all cursor-pointer z-40 active:text-brand-accent group"
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-secondary group-hover:text-brand-accent transition-colors">Scroll</span>
        <div className="relative">
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-md"
          >
            <ArrowDown size={20} className="text-brand-accent" />
          </motion.div>
          <ArrowDown size={20} className="text-brand-accent relative z-10" />
        </div>
      </motion.div>
    </section>
  );
});
