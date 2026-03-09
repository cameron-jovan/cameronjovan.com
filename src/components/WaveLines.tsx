import { useEffect, useRef } from 'react';

interface WaveLinesProps {
  mouseX?: number;
  mouseY?: number;
}

export default function WaveLines({ mouseX = 0, mouseY = 0 }: WaveLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const paths = pathsRef.current;
    if (paths.length === 0) return;

    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for smoother animation
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        
        const width = window.innerWidth;
        const height = window.innerHeight;

        paths.forEach((path, index) => {
          const amplitude = 12 + index * 2;
          const frequency = 0.006 + index * 0.0015;
          const speed = 0.0003 + index * 0.0001;
          const phaseOffset = index * Math.PI / 2.5;
          const time = currentTime * speed;
          
          const yBase = height * (0.15 + index * 0.18);
          
          // Mouse parallax influence (subtle)
          const parallaxX = (mouseX - width / 2) * 0.008 * (index + 1);
          const parallaxY = (mouseY - height / 2) * 0.004 * (index + 1);

          // Build path with fewer points for performance
          let d = `M ${parallaxX} ${yBase + parallaxY}`;
          
          const step = 30; // Larger step = fewer points = better performance
          for (let x = 0; x <= width + step; x += step) {
            const y = yBase + 
              Math.sin(x * frequency + time + phaseOffset) * amplitude +
              Math.sin(x * frequency * 1.5 + time * 0.8) * (amplitude * 0.25) +
              parallaxY;
            d += ` L ${x + parallaxX} ${y}`;
          }

          path.setAttribute('d', d);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      preserveAspectRatio="none"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          ref={(el) => {
            if (el) pathsRef.current[i] = el;
          }}
          style={{
            stroke: 'rgba(0, 0, 0, 0.04)',
            strokeWidth: 1,
            fill: 'none',
            opacity: 0.25 - i * 0.04,
            vectorEffect: 'non-scaling-stroke',
          }}
        />
      ))}
    </svg>
  );
}
