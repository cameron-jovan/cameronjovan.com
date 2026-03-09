import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import BlobCursor from '../components/BlobCursor';
import WaveLines from '../components/WaveLines';

// Social Icons as SVG components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width="24" 
    height="24"
    style={{ 
      transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms ease',
    }}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width="24" 
    height="24"
    style={{ 
      transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms ease',
    }}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width="24" 
    height="24"
    style={{ 
      transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms ease',
    }}
  >
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.802-1.063-.689-1.685-1.74-1.752-2.96-.065-1.18.408-2.256 1.33-3.026.795-.66 1.86-1.013 3.1-1.052.933-.03 1.833.12 2.593.443-.091-.533-.329-1.098-.835-1.502-.58-.464-1.391-.696-2.41-.69l-.003-.002zm1.903 7.227c1.042-.044 1.834-.418 2.357-1.113.442-.586.66-1.408.648-2.44-.015-1.064-.28-1.9-.788-2.485-.514-.592-1.265-.9-2.231-.916-1.045-.017-1.92.297-2.53.909-.604.606-.898 1.418-.873 2.413.023.955.328 1.753.88 2.321.55.566 1.32.872 2.227.895.104.003.207.004.31.004v.412z"/>
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);
  
  const [blobPos, setBlobPos] = useState({ x: -200, y: -200 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [invertedElements, setInvertedElements] = useState<Set<string>>(new Set());

  // GSAP quickTo for parallax
  const parallaxXTo = useRef<((value: number) => void) | null>(null);
  const parallaxYTo = useRef<((value: number) => void) | null>(null);

  // Check if element is under blob
  const checkElementUnderBlob = useCallback((blobX: number, blobY: number, element: HTMLElement | null) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    
    // Check if blob center is within element bounds (with generous padding)
    const padding = 40;
    return (
      blobX >= rect.left - padding &&
      blobX <= rect.right + padding &&
      blobY >= rect.top - padding &&
      blobY <= rect.bottom + padding
    );
  }, []);

  // Handle blob movement
  const handleBlobMove = useCallback((x: number, y: number) => {
    setBlobPos({ x, y });

    // Check which elements are under blob
    const newInverted = new Set<string>();
    
    if (checkElementUnderBlob(x, y, nameRef.current)) {
      newInverted.add('name');
    }
    if (checkElementUnderBlob(x, y, portfolioRef.current)) {
      newInverted.add('portfolio');
    }
    if (checkElementUnderBlob(x, y, socialsRef.current)) {
      newInverted.add('socials');
    }

    setInvertedElements(newInverted);
  }, [checkElementUnderBlob]);

  // Initialize parallax animations
  useEffect(() => {
    if (nameRef.current) {
      parallaxXTo.current = gsap.quickTo(nameRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
      parallaxYTo.current = gsap.quickTo(nameRef.current, 'y', { duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      // Apply parallax to elements with GSAP
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: offsetX * -12,
          y: offsetY * -8,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      if (portfolioRef.current) {
        gsap.to(portfolioRef.current, {
          x: offsetX * -18,
          y: offsetY * -10,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      if (socialsRef.current) {
        gsap.to(socialsRef.current, {
          x: offsetX * -22,
          y: offsetY * -12,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Subtle parallax on base image
      if (baseLayerRef.current) {
        gsap.to(baseLayerRef.current, {
          x: offsetX * 8,
          y: offsetY * 5,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isInverted = (element: string) => invertedElements.has(element);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      {/* Base layer - Image 1 */}
      <div 
        ref={baseLayerRef}
        className="absolute inset-[-20px] z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      />

      {/* Wave Lines Background */}
      <WaveLines mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Reveal layer - Image 2 (shown through blob mask) */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/hero-reveal.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: `circle(130px at ${blobPos.x}px ${blobPos.y}px)`,
          willChange: 'clip-path',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full">
        {/* Name - Top Left */}
        <div
          ref={nameRef}
          className="absolute left-8 sm:left-10 top-8 sm:top-10"
          style={{ willChange: 'transform' }}
        >
          <h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            style={{
              color: isInverted('name') ? '#FFFFFF' : '#111111',
              textShadow: isInverted('name') ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), text-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span className="block">Cameron</span>
            <span className="block">Jo&apos;van</span>
          </h1>
        </div>

        {/* Portfolio Link - Top Right */}
        <a
          ref={portfolioRef}
          href="#projects"
          onClick={scrollToProjects}
          className="absolute right-8 sm:right-10 top-8 sm:top-10 font-sans text-sm font-medium tracking-wide portfolio-link"
          style={{ 
            willChange: 'transform',
            color: isInverted('portfolio') ? '#FFFFFF' : '#111111',
            textShadow: isInverted('portfolio') ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
            transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), text-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Portfolio
        </a>

        {/* Social Icons - Bottom Right */}
        <div
          ref={socialsRef}
          className="absolute right-8 sm:right-10 bottom-8 sm:bottom-10 flex items-center gap-5"
          style={{ willChange: 'transform' }}
        >
          <a
            href="https://instagram.com/camjovan"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
            style={{
              color: isInverted('socials') ? '#FFFFFF' : '#111111',
              filter: isInverted('socials') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
              transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), filter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://linkedin.com/in/cameronjovan"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
            style={{
              color: isInverted('socials') ? '#FFFFFF' : '#111111',
              filter: isInverted('socials') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
              transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), filter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://threads.net/camjovan"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Threads"
            style={{
              color: isInverted('socials') ? '#FFFFFF' : '#111111',
              filter: isInverted('socials') ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
              transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), filter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <ThreadsIcon />
          </a>
        </div>
      </div>

      {/* Blob Cursor */}
      <BlobCursor onBlobMove={handleBlobMove} />
    </section>
  );
}
