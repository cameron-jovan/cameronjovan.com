import { useMemo, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

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

  const staggered: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.06, type: 'spring', stiffness: 120, damping: 18 },
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
