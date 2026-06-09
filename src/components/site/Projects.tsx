import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Project = {
  name: string;
  tagline: string;
  status: 'Live' | 'Beta' | 'Waitlist' | 'Building';
  year: string;
  href: string;
  /** og image URL — undefined for ventures without a polished cover yet. */
  og?: string;
  /** accent hex used for the typographic fallback when og is missing. */
  accent?: string;
};

const PROJECTS: Project[] = [
  { name: 'PERCH', tagline: 'The honest market for modular, manufactured & container homes.', status: 'Waitlist', year: '2026', href: 'https://ownperch.com', og: 'https://ownperch.com/og-default.png' },
  { name: 'TourReady', tagline: 'Your space in 3D in 2 minutes.', status: 'Live', year: '2025', href: 'https://tourready.ai', og: 'https://tourready.ai/og/og-default.png' },
  { name: 'ListReady', tagline: 'The AI marketing studio for real estate agents.', status: 'Live', year: '2025', href: 'https://listready.ai', og: 'https://listready.ai/og-image.png' },
  { name: 'Faith Calibrator', tagline: 'Get calibrated in Christ. Men, women, families.', status: 'Live', year: '2025', href: 'https://faithcalibrator.com', accent: '#C8A47A' },
  { name: 'Frauth', tagline: 'A family code that AI can’t fake.', status: 'Live', year: '2026', href: 'https://frauth.app', og: 'https://frauth.app/assets/og-image.png' },
  { name: 'Christian Doubles', tagline: 'For Christians who want more than Sunday small talk.', status: 'Waitlist', year: '2026', href: 'https://christiandoubles.com', og: 'https://christiandoubles-waitlist.web.app/og.png' },
  { name: 'CustodyCal', tagline: 'Upload the plan. Get the calendar.', status: 'Building', year: '2026', href: 'https://custodycal.ai', accent: '#7AA1C8' },
  { name: 'Holy Personalities', tagline: 'Find your spiritual gifts in 13 tests.', status: 'Beta', year: '2026', href: '#', accent: '#A37AC8' },
  { name: 'Aldoran', tagline: 'Federal modernization, built by hand.', status: 'Live', year: '2026', href: 'https://aldoran.us', accent: '#818CF8' },
  { name: 'Jo’van Studios', tagline: 'Skip the trial and error. Get the SOPs.', status: 'Live', year: '2025', href: 'https://jovanstudios.gumroad.com', og: 'https://jovanstudios.com/assets/og/default.png' },
];

const statusStyles: Record<Project['status'], string> = {
  Live: 'text-white/75',
  Beta: 'text-white/50',
  Waitlist: 'text-white/50',
  Building: 'text-white/40',
};

function PreviewCard({ project }: { project: Project }) {
  if (project.og) {
    return (
      <img
        src={project.og}
        alt={project.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }
  // Typographic fallback for ventures without an OG cover yet.
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between p-10"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `radial-gradient(circle at 80% 20%, ${project.accent}1a 0%, transparent 60%)`,
      }}
    >
      <p
        className="font-sans text-xs uppercase tracking-[0.28em]"
        style={{ color: project.accent }}
      >
        {project.status} &middot; {project.year}
      </p>
      <div>
        <h4 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight text-white">
          {project.name}
        </h4>
        <p className="mt-3 max-w-md font-sans text-base text-white/65">
          {project.tagline}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<number>(0);
  const current = PROJECTS[active];

  return (
    <section id="projects" className="relative bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-3 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-5xl font-black tracking-tight md:text-7xl">
              Projects.
            </h2>
          </div>
          <p className="max-w-md font-sans text-base text-white/55">
            A working portfolio across software, housing, faith, and family
            &mdash; shipped and documented in real time.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* LEFT: compact project list */}
          <ul className="border-t border-white/10">
            {PROJECTS.map((p, i) => {
              const isActive = active === i;
              return (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block border-b border-white/10"
                  >
                    <div className="flex items-baseline justify-between gap-4 py-4 md:py-5">
                      <div className="min-w-0 flex-1">
                        <div className="inline-flex items-center gap-2">
                          <h3
                            className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 md:text-2xl ${
                              isActive ? 'text-white' : 'text-white/65'
                            }`}
                          >
                            <span className="relative inline-block">
                              {p.name}
                              <span
                                className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-500 ${
                                  isActive ? 'w-full' : 'w-0'
                                }`}
                              />
                            </span>
                          </h3>
                          <ArrowUpRight
                            className={`h-4 w-4 transition-all duration-500 ${
                              isActive
                                ? 'opacity-100 translate-x-0 translate-y-0 text-white/80'
                                : 'opacity-0 -translate-x-1 translate-y-1 text-white/40'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex shrink-0 items-baseline gap-4">
                        <span
                          className={`font-sans text-[10px] uppercase tracking-[0.25em] ${statusStyles[p.status]}`}
                        >
                          {p.status}
                        </span>
                        <span className="font-mono text-xs tabular-nums text-white/30">
                          {p.year}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* RIGHT: sticky preview pane */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.name}
                    className="absolute inset-0 transition-opacity duration-500 ease-out"
                    style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? 'auto' : 'none' }}
                  >
                    <PreviewCard project={p} />
                  </div>
                ))}
              </div>

              {/* Caption beneath the preview */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold tracking-tight">
                    {current.name}
                  </p>
                  <p className="mt-1 max-w-md font-sans text-sm text-white/60">
                    {current.tagline}
                  </p>
                </div>
                <a
                  href={current.href}
                  target={current.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Visit
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
