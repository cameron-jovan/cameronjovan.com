import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, Group, MathUtils, Points, Vector3 } from 'three';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'tinyhome',
    title: 'My Tiny Home Hub',
    subtitle: 'Carvana for Tiny Homes',
    url: 'https://mytinyhomehub.com',
  },
  {
    id: 'faith',
    title: 'Faith Calibrator',
    subtitle: 'Faith Workbooks + Media',
    url: 'https://faithcalibrator.com',
  },
  {
    id: 'skin',
    title: 'Soft Edit Skin',
    subtitle: 'Skincare E‑commerce',
    url: 'https://softeditskin.com',
  },
  {
    id: 'listready',
    title: 'ListReady',
    subtitle: 'AI for Real Estate',
    url: 'https://listready.ai',
  },
  {
    id: 'open-source',
    title: 'Open Source Work',
    subtitle: 'Libraries & tooling I maintain',
    url: 'https://github.com/cameronjovan',
  },
];

const PARTICLE_COUNT = 2000;
const PARTICLE_SIZE = 0.8;
const BASE_COLOR = new Color('#f0f0f0');

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handle = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, [query]);

  return matches;
}

function hslShiftedColor(base: Color, hue: number, saturation = 0.12, lightness = 0.9) {
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  hsl.h = (hue % 360) / 360;
  hsl.s = saturation;
  hsl.l = lightness;
  const out = new Color();
  out.setHSL(hsl.h, hsl.s, hsl.l);
  return out;
}

function useClusterScrollTriggers(
  containerRef: React.RefObject<HTMLDivElement>,
  setScrollActive: (idx: number | null) => void
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: gsap.core.Tween[] = [];

    PROJECTS.forEach((project, idx) => {
      const triggerEl = container.querySelector(`#project-trigger-${project.id}`);
      if (!triggerEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setScrollActive(idx),
          onEnterBack: () => setScrollActive(idx),
          onLeave: () => setScrollActive(null),
          onLeaveBack: () => setScrollActive(null),
        },
      });

      triggers.push(tl);
    });

    return () => {
      triggers.forEach((tl) => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      });
    };
  }, [containerRef, setScrollActive]);
}

function Particles({
  activeIndex,
  nonActiveDim = 0.15,
  focusDistance,
  setFocusDistance,
}: {
  activeIndex: number | null;
  nonActiveDim?: number;
  focusDistance?: number;
  setFocusDistance?: (distance: number) => void;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Points>(null);
  const { camera, size } = useThree();
  const weightsRef = useRef<number[]>(Array(PROJECTS.length).fill(0));
  const focusDistanceRef = useRef<number>(0);

  const mouseNorm = useRef({ x: 0, y: 0 });

  const clusterCenters = useMemo(() => {
    const centers: Vector3[] = [];
    const radius = 3.6;

    for (let i = 0; i < PROJECTS.length; i += 1) {
      const angle = (i / PROJECTS.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 0.7) * 1.3;
      centers.push(new Vector3(x, y, z));
    }

    return centers;
  }, []);

  const { positions, basePositions, clusterIds, offsets, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const clusterIds = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const maxRadius = 3.4;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const idx = i * 3;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.cbrt(Math.random()) * maxRadius;

      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(phi) * radius;

      basePositions[idx] = x;
      basePositions[idx + 1] = y;
      basePositions[idx + 2] = z;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      const clusterId = Math.floor((i / PARTICLE_COUNT) * PROJECTS.length);
      clusterIds[i] = clusterId;

      const offsetRadius = 0.9 + Math.random() * 0.8;
      const offsetPhi = Math.acos(2 * Math.random() - 1);
      const offsetTheta = Math.random() * Math.PI * 2;

      offsets[idx] = Math.sin(offsetPhi) * Math.cos(offsetTheta) * offsetRadius;
      offsets[idx + 1] = Math.sin(offsetPhi) * Math.sin(offsetTheta) * offsetRadius;
      offsets[idx + 2] = Math.cos(offsetPhi) * offsetRadius;

      const rgb = BASE_COLOR.clone().toArray();
      colors[idx] = rgb[0];
      colors[idx + 1] = rgb[1];
      colors[idx + 2] = rgb[2];
    }

    return { positions, basePositions, clusterIds, offsets, colors };
  }, []);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  const setActiveIndex = useCallback(
    (idx: number | null) => {
      const target = idx === null ? 0 : 1;

      PROJECTS.forEach((_, clusterIdx) => {
        const newWeight = clusterIdx === idx ? target : 0;
        gsap.to(weightsRef.current, {
          [clusterIdx]: newWeight,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      const defaultDistance = camera.position.length();
      const distance = idx === null ? defaultDistance : camera.position.distanceTo(clusterCenters[idx]);

      gsap.to(focusDistanceRef, {
        current: distance,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          setFocusDistance?.(focusDistanceRef.current);
        },
      });
    },
    [camera.position, clusterCenters, setFocusDistance]
  );

  useEffect(() => {
    const defaultDistance = camera.position.length();
    focusDistanceRef.current = defaultDistance;
    setFocusDistance?.(defaultDistance);
  }, [camera.position, setFocusDistance]);

  useEffect(() => {
    setActiveIndex(activeIndex);
  }, [activeIndex, setActiveIndex]);

  useFrame(() => {
    if (!meshRef.current) return;

    const pos = meshRef.current.geometry.getAttribute('position') as BufferAttribute;
    const colorAttr = meshRef.current.geometry.getAttribute('color') as BufferAttribute;

    const activeHue = 220 + Math.sin(Date.now() * 0.0003) * 10;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const idx = i * 3;
      const clusterId = clusterIds[i];
      const weight = MathUtils.clamp(weightsRef.current[clusterId] ?? 0, 0, 1);

      const baseX = basePositions[idx];
      const baseY = basePositions[idx + 1];
      const baseZ = basePositions[idx + 2];

      const center = clusterCenters[clusterId];
      const offsetX = offsets[idx];
      const offsetY = offsets[idx + 1];
      const offsetZ = offsets[idx + 2];

      const targetX = center.x + offsetX;
      const targetY = center.y + offsetY;
      const targetZ = center.z + offsetZ;

      pos.array[idx] = MathUtils.lerp(baseX, targetX, weight);
      pos.array[idx + 1] = MathUtils.lerp(baseY, targetY, weight);
      pos.array[idx + 2] = MathUtils.lerp(baseZ, targetZ, weight);

      const baseRgb = BASE_COLOR.clone().toArray();
      const activeRgb = hslShiftedColor(BASE_COLOR, activeHue).toArray();

      const dim = activeIndex === null ? 1 : clusterId === activeIndex ? 1 : nonActiveDim;
      const mix = clusterId === activeIndex ? 1 : 0;

      colorAttr.array[idx] = MathUtils.lerp(baseRgb[0], activeRgb[0], mix) * dim;
      colorAttr.array[idx + 1] = MathUtils.lerp(baseRgb[1], activeRgb[1], mix) * dim;
      colorAttr.array[idx + 2] = MathUtils.lerp(baseRgb[2], activeRgb[2], mix) * dim;
    }

    pos.needsUpdate = true;
    colorAttr.needsUpdate = true;

    // Parallax rotation
    const targetRotX = MathUtils.lerp(groupRef.current!.rotation.x, mouseNorm.current.y * 0.005, 0.08);
    const targetRotY = MathUtils.lerp(groupRef.current!.rotation.y, mouseNorm.current.x * 0.005, 0.08);
    groupRef.current!.rotation.set(targetRotX, targetRotY, 0);
  });

  const handlePointerMove = (event: React.PointerEvent) => {
    const x = (event.clientX / size.width) * 2 - 1;
    const y = (event.clientY / size.height) * 2 - 1;
    mouseNorm.current.x = x;
    mouseNorm.current.y = y;
  };

  const handlePointerLeave = () => {
    mouseNorm.current.x = 0;
    mouseNorm.current.y = 0;
  };

  return (
    <group ref={groupRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <points ref={meshRef} geometry={geometry}>
        <pointsMaterial
          vertexColors
          size={PARTICLE_SIZE}
          sizeAttenuation={true}
          transparent
          opacity={1}
          depthWrite={false}
        />
      </points>

      <EffectComposer multisampling={4}>
        <DepthOfField
          focusDistance={focusDistance ?? focusDistanceRef.current}
          focalLength={0.05}
          bokehScale={2}
          height={480}
        />
      </EffectComposer>
    </group>
  );
}

function ProjectList({ activeIndex, onHover, onLeave }: { activeIndex: number | null; onHover: (idx: number) => void; onLeave: () => void; }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="grid gap-6">
        {PROJECTS.map((project, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              type="button"
              key={project.id}
              id={`project-trigger-${project.id}`}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={onLeave}
              className="group relative w-full text-left rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wide text-white/80">
                    {project.title}
                  </p>
                  <p className="mt-1 text-xs text-white/60">{project.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-2 w-2 rounded-full transition-colors ${
                      isActive ? 'bg-white' : 'bg-white/25'
                    }`}
                  />
                  <span className="text-xs text-white/50">Visit →</span>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileProjectList() {
  return (
    <div className="grid gap-4">
      {PROJECTS.map((project, idx) => (
        <motion.a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-left backdrop-blur transition hover:bg-white/10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: idx * 0.08 }}
        >
          <p className="text-sm font-medium tracking-wide text-white/80">
            {project.title}
          </p>
          <p className="mt-1 text-xs text-white/60">{project.subtitle}</p>
          <p className="mt-3 text-xs font-medium text-white/60">Visit →</p>
        </motion.a>
      ))}
    </div>
  );
}

export default function ProjectsSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollActive, setScrollActive] = useState<number | null>(null);
  const [hoverActive, setHoverActive] = useState<number | null>(null);
  const [focusDistance, setFocusDistance] = useState(10);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const activeIndex = hoverActive ?? scrollActive;

  useClusterScrollTriggers(containerRef, setScrollActive);

  const handleHover = useCallback((idx: number) => {
    setHoverActive(idx);
  }, []);
  const handleLeave = useCallback(() => {
    setHoverActive(null);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full py-20 sm:py-24 bg-[#050505] text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-white/70">
            Hover or scroll to explore each project.
          </p>
        </div>

        {isMobile ? (
          <MobileProjectList />
        ) : (
          <div className="relative grid grid-cols-1 lg:grid-cols-[44%_56%] gap-10">
            <div className="relative z-10">
              <ProjectList activeIndex={activeIndex} onHover={handleHover} onLeave={handleLeave} />
            </div>

            <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <Canvas
                shadows={false}
                camera={{ position: [0, 0, 10], fov: 42 }}
                style={{ background: '#050505' }}
              >
                <ambientLight intensity={0.25} />
                <directionalLight position={[4, 5, 5]} intensity={0.6} />

                <Particles activeIndex={activeIndex} setFocusDistance={setFocusDistance} />
              </Canvas>

              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.div
                    key={activeIndex}
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold tracking-wide text-white/60">
                      {PROJECTS[activeIndex].title}
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      {PROJECTS[activeIndex].subtitle}
                    </p>
                    <a
                      href={PROJECTS[activeIndex].url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white"
                    >
                      Visit <span aria-hidden>→</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
