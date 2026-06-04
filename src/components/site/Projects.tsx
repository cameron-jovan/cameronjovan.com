import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Project = {
  name: string;
  tagline: string;
  status: 'Live' | 'Beta' | 'Waitlist' | 'Building';
  year: string;
  href: string;
};

const PROJECTS: Project[] = [
  { name: 'TourReady', tagline: 'Your space in 3D in 2 minutes.', status: 'Live', year: '2025', href: 'https://tourready.ai' },
  { name: 'ListReady', tagline: 'The AI marketing studio for real estate agents. v2 soon.', status: 'Live', year: '2025', href: 'https://listready.ai' },
  { name: 'Faith Calibrator', tagline: 'Get calibrated in Christ. Men, women, families.', status: 'Live', year: '2025', href: 'https://faithcalibrator.com' },
  { name: 'CustodyCal', tagline: 'Upload the plan. Get the calendar.', status: 'Building', year: '2026', href: 'https://custodycal.ai' },
  { name: 'Christian Doubles', tagline: 'For Christians who want more than Sunday small talk.', status: 'Waitlist', year: '2026', href: 'https://christiandoubles.com' },
  { name: 'Holy Personalities', tagline: 'Find your spiritual gifts in 13 tests.', status: 'Beta', year: '2026', href: '#' },
  { name: 'Frauth', tagline: 'A family code that AI can’t fake.', status: 'Live', year: '2026', href: 'https://frauth.app' },
  { name: 'Perch', tagline: 'Affordable housing. Waitlist only.', status: 'Waitlist', year: '2026', href: '#' },
  { name: 'Jo’van Studios', tagline: 'Skip the trial and error. Get the SOPs.', status: 'Live', year: '2025', href: 'https://jovanstudios.gumroad.com' },
];

const statusStyles: Record<Project['status'], string> = {
  Live: 'text-white/75',
  Beta: 'text-white/50',
  Waitlist: 'text-white/50',
  Building: 'text-white/40',
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Lerp-driven cursor-follow for the floating preview.
  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let smooth = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const tick = () => {
      smooth = {
        x: smooth.x + (mouse.x - smooth.x) * 0.15,
        y: smooth.y + (mouse.y - smooth.y) * 0.15,
      };
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${smooth.x + 28}px, ${smooth.y - 90}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const node = containerRef.current;
    node?.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      node?.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects" className="relative bg-[#070707] text-white">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-36">
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

        <div ref={containerRef} className="relative">
          {/* Cursor-following typographic preview card */}
          <div
            ref={previewRef}
            className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 320ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="relative h-[200px] w-[300px] overflow-hidden rounded-lg border border-white/10 bg-[#0f0f0f] shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.name}
                  className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? 'scale(1)' : 'scale(1.04)',
                  }}
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/50">
                    {p.status} &middot; {p.year}
                  </p>
                  <div>
                    <h4 className="font-display text-2xl font-black leading-[1.05] tracking-tight">
                      {p.name}
                    </h4>
                    <p className="mt-2 font-sans text-[13px] leading-snug text-white/60">
                      {p.tagline}
                    </p>
                  </div>
                </div>
              ))}
              {/* Subtle vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Project list */}
          <ul className="border-t border-white/10">
            {PROJECTS.map((p, i) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target={p.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => {
                    setHovered(i);
                    setVisible(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setVisible(false);
                  }}
                  className="group relative block border-b border-white/10"
                >
                  <div className="relative flex items-start justify-between gap-4 py-7 transition-colors duration-500">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2">
                        <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                          <span className="relative inline-block">
                            {p.name}
                            <span
                              className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-500 ${
                                hovered === i ? 'w-full' : 'w-0'
                              }`}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          className={`h-5 w-5 text-white/40 transition-all duration-500 ${
                            hovered === i
                              ? 'opacity-100 translate-x-0 translate-y-0'
                              : 'opacity-0 -translate-x-2 translate-y-2'
                          }`}
                        />
                      </div>
                      <p
                        className={`mt-2 font-sans text-sm transition-colors duration-500 md:text-base ${
                          hovered === i ? 'text-white/80' : 'text-white/55'
                        }`}
                      >
                        {p.tagline}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 pl-4">
                      <span
                        className={`font-sans text-[11px] uppercase tracking-[0.25em] ${statusStyles[p.status]}`}
                      >
                        {p.status}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-white/35">
                        {p.year}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
