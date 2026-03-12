import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  tint: string;
}

const projects: Project[] = [
  {
    id: 'tinyhome',
    title: 'My Tiny Home Hub',
    subtitle: 'Carvana for Tiny Homes',
    url: 'https://mytinyhomehub.com',
    tint: '#E8F4F8',
  },
  {
    id: 'faith',
    title: 'Faith Calibrator',
    subtitle: 'Faith Workbooks + Media',
    url: 'https://faithcalibrator.com',
    tint: '#F8F0E8',
  },
  {
    id: 'skin',
    title: 'Soft Edit Skin',
    subtitle: 'Skincare Ecom',
    url: 'https://softeditskin.com',
    tint: '#F8E8F0',
  },
  {
    id: 'listready',
    title: 'ListReady',
    subtitle: 'AI for Real Estate',
    url: 'https://listready.ai',
    tint: '#E8F0F8',
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  shape: 'circle' | 'triangle' | 'square';
  color: string;
  opacity: number;
  floatOffset: { x: number; y: number };
  floatDuration: number;
}

function generateParticles(tint: string): Particle[] {
  const shapes: Array<'circle' | 'triangle' | 'square'> = ['circle', 'triangle', 'square'];
  const particles: Particle[] = [];
  
  for (let i = 0; i < 18; i++) {
    const baseOpacity = 0.3 + Math.random() * 0.4;
    particles.push({
      id: i,
      x: 20 + Math.random() * 60, // Percentage within card
      y: 20 + Math.random() * 60,
      size: 8 + Math.random() * 16,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: tint,
      opacity: baseOpacity,
      floatOffset: {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
      },
      floatDuration: 3 + Math.random() * 2,
    });
  }
  
  return particles;
}

function ParticleShape({ particle, isHovered }: { particle: Particle; isHovered: boolean }) {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shapeRef.current || isHovered) return;

    // Floating animation when not hovered
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(shapeRef.current, {
      x: particle.floatOffset.x,
      y: particle.floatOffset.y,
      duration: particle.floatDuration,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [particle, isHovered]);

  const renderShape = () => {
    const baseStyle = {
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: particle.opacity,
    };

    switch (particle.shape) {
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              opacity: particle.opacity,
            }}
          />
        );
      case 'square':
        return <div style={{ ...baseStyle, borderRadius: 2 }} />;
      default:
        return <div style={{ ...baseStyle, borderRadius: '50%' }} />;
    }
  };

  return (
    <div
      ref={shapeRef}
      className="absolute transition-all duration-600 ease-spring"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {renderShape()}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles] = useState(() => generateParticles(project.tint));

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Animate glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Fade out glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: 'white' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-[-30px] rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${project.tint} 0%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: 0,
        }}
      />

      {/* Card border/shadow */}
      <div 
        className="absolute inset-0 rounded-2xl transition-shadow duration-400"
        style={{
          boxShadow: isHovered 
            ? '0 12px 48px rgba(0,0,0,0.15)' 
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${project.tint}`,
        }}
      />

      {/* Particles layer */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {!isHovered && particles.map((particle) => (
            <ParticleShape key={particle.id} particle={particle} isHovered={isHovered} />
          ))}
        </AnimatePresence>
      </div>

      {/* Card content (shows on hover) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo placeholder */}
        <div 
          className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center"
          style={{ backgroundColor: project.tint }}
        >
          <span className="font-serif text-2xl font-bold text-[#111111]">
            {project.title.charAt(0)}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111] mb-1">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-[#666666] mb-4">
          {project.subtitle}
        </p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-full transition-all duration-200 hover:bg-[#333333] hover:scale-105"
          onClick={(e) => e.stopPropagation()}
        >
          Visit
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
            Projects
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-[#666666]">
            Hover to explore my work
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
