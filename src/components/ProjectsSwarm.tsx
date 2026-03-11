import { useMemo, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

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

export default function ProjectsSwarm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const staggered = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, type: 'spring', stiffness: 120, damping: 18 },
      }),
    }),
    []
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 bg-white text-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-600">
            A selection of brands and tools I’ve helped build. Tap or hover to explore.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 left-1/2 w-[360px] h-[360px] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-200/40 via-indigo-200/30 to-cyan-200/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-amber-200/30 via-rose-200/20 to-blue-200/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-8 mb-8">
              <p className="max-w-[42ch] text-sm text-slate-600">
                Track each card as you scroll — the focused project lifts and blooms.
              </p>
              <p className="text-xs text-slate-400">Tip: use ⬅️ ⮕ keys or swipe to move cards.</p>
            </div>

            <div className="lg:flex lg:items-start lg:gap-6 lg:overflow-x-auto lg:px-2 lg:pb-6 lg:scroll-snap-x lg:snap-x lg:snap-mandatory">
              <AnimatePresence>
                {PROJECTS.map((project, idx) => (
                  <motion.a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex min-w-[280px] max-w-[320px] flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 lg:snap-center"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    custom={idx}
                    variants={staggered}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium tracking-wide text-slate-900">
                          {project.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{project.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
                        <span className="text-xs text-slate-500">Visit</span>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-slate-500">{project.url.replace(/https?:\/\//, '')}</div>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Open in new tab</span>
                      <span className="text-xs text-slate-400">→</span>
                    </div>

                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-slate-200 opacity-0 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline">Tip:</span>
              <span>Swipe or scroll to explore the full set.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              className="group relative w-full text-left rounded-2xl border border-slate-200 bg-white/60 px-6 py-5 backdrop-blur transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wide text-slate-900">
                    {project.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{project.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-2 w-2 rounded-full transition-colors ${
                      isActive ? 'bg-slate-900' : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-xs text-slate-500">Visit →</span>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl ring-1 ring-slate-200 pointer-events-none"
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
          className="block rounded-2xl border border-slate-200 bg-white/70 px-5 py-5 text-left backdrop-blur transition hover:bg-white"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: idx * 0.08 }}
        >
          <p className="text-sm font-medium tracking-wide text-slate-900">
            {project.title}
          </p>
          <p className="mt-1 text-xs text-slate-600">{project.subtitle}</p>
          <p className="mt-3 text-xs font-medium text-slate-600">Visit →</p>
        </motion.a>
      ))}
    </div>
  );
}

export default function ProjectsSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollActive, setScrollActive] = useState<number | null>(null);
  const [hoverActive, setHoverActive] = useState<number | null>(null);
  const [, setFocusDistance] = useState(10);

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
      className="relative w-full py-20 sm:py-24 bg-white text-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-600">
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

            <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <Canvas
                shadows={false}
                camera={{ position: [0, 0, 10], fov: 42 }}
                style={{ background: '#fafafa' }}
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
                    <p className="text-sm font-semibold tracking-wide text-slate-600">
                      {PROJECTS[activeIndex].title}
                    </p>
                    <p className="mt-2 text-base font-medium text-slate-900">
                      {PROJECTS[activeIndex].subtitle}
                    </p>
                    <a
                      href={PROJECTS[activeIndex].url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-800"
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
