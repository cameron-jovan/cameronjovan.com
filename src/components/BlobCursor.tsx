import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlobCursorProps {
  onBlobMove?: (x: number, y: number) => void;
}

export default function BlobCursor({ onBlobMove }: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainBlobRef = useRef<HTMLDivElement>(null);
  const trailsContainerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const blobPos = useRef({ x: -200, y: -200 });
  const trailIdCounter = useRef(0);
  const isMoving = useRef(false);
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // GSAP quickTo for ultra-smooth following
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  // Check if touch device
  const isTouchDevice = typeof window !== 'undefined' && 
    (window.matchMedia('(pointer: coarse)').matches || 
     'ontouchstart' in window);

  useEffect(() => {
    if (isTouchDevice || !mainBlobRef.current) return;

    // Initialize GSAP quickTo for smooth, performant animation
    xTo.current = gsap.quickTo(mainBlobRef.current, 'x', { 
      duration: 0.15, 
      ease: 'power2.out',
    });
    yTo.current = gsap.quickTo(mainBlobRef.current, 'y', { 
      duration: 0.15, 
      ease: 'power2.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update blob position with GSAP quickTo
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
      
      // Notify parent
      onBlobMove?.(e.clientX, e.clientY);

      // Track movement for trail effect
      isMoving.current = true;
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 50);
    };

    // Trail creation loop
    const createTrail = () => {
      if (isMoving.current && trailsContainerRef.current) {
        // Compare the current mouse position to the last trail position.
        // We intentionally keep `blobPos` as the last recorded trail point so we
        // can detect movement and create a trail behind the cursor.
        const dx = mousePos.current.x - blobPos.current.x;
        const dy = mousePos.current.y - blobPos.current.y;
        const speed = Math.abs(dx) + Math.abs(dy);

        if (speed > 10) {
          // Create trail at the last known blob position (behind the cursor)
          createTrailBlob(blobPos.current.x, blobPos.current.y, speed);

          // Update the last trail position to the current mouse position
          blobPos.current = { ...mousePos.current };
        }
      }
      requestAnimationFrame(createTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const rafId = requestAnimationFrame(createTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [isTouchDevice, onBlobMove]);

  const createTrailBlob = (x: number, y: number, speed: number) => {
    if (!trailsContainerRef.current) return;
    
    const size = Math.max(20, Math.min(60, 50 - speed * 0.3));
    const id = trailIdCounter.current++;
    
    const trailEl = document.createElement('div');
    trailEl.className = 'trail-blob';
    trailEl.dataset.id = String(id);
    trailEl.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 60%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      will-change: transform, opacity;
    `;
    
    trailsContainerRef.current.appendChild(trailEl);

    // Animate trail fade out with GSAP
    gsap.to(trailEl, {
      opacity: 0,
      scale: 0.3,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        trailEl.remove();
      },
    });
  };

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'normal' }}
    >
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Trail blobs container */}
      <div 
        ref={trailsContainerRef} 
        className="absolute inset-0"
        style={{ filter: 'url(#gooey)' }}
      />

      {/* Main blob - Simple center pointer */}
      <div
        ref={mainBlobRef}
        className="fixed"
        style={{
          left: 0,
          top: 0,
          width: '180px',
          height: '180px',
          marginLeft: '-90px',
          marginTop: '-90px',
          willChange: 'transform',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {/* Center dot indicator for precise cursor position */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: '8px',
            height: '8px',
            marginLeft: '-4px',
            marginTop: '-4px',
            backgroundColor: '#111111',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
