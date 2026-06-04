import { ArrowUpRight } from 'lucide-react';

type Project = {
  name: string;
  tagline: string;
  status: 'Live' | 'Beta' | 'Waitlist' | 'Building';
  href: string;
};

const PROJECTS: Project[] = [
  {
    name: 'TourReady',
    tagline: 'Your space in 3D in 2 minutes.',
    status: 'Live',
    href: 'https://tourready.ai',
  },
  {
    name: 'ListReady',
    tagline: 'The AI marketing studio for real estate agents. v2 soon.',
    status: 'Live',
    href: 'https://listready.ai',
  },
  {
    name: 'Faith Calibrator',
    tagline: 'Get calibrated in Christ. Men, women, families.',
    status: 'Live',
    href: 'https://faithcalibrator.com',
  },
  {
    name: 'CustodyCal',
    tagline: 'Upload the plan. Get the calendar.',
    status: 'Building',
    href: 'https://custodycal.ai',
  },
  {
    name: 'Christian Doubles',
    tagline: 'For Christians who want more than Sunday small talk.',
    status: 'Waitlist',
    href: 'https://christiandoubles.com',
  },
  {
    name: 'Holy Personalities',
    tagline: 'Find your spiritual gifts in 13 tests.',
    status: 'Beta',
    href: '#',
  },
  {
    name: 'Frauth',
    tagline: 'A family code that AI can’t fake.',
    status: 'Live',
    href: 'https://frauth.app',
  },
  {
    name: 'Perch',
    tagline: 'Affordable housing. Waitlist only.',
    status: 'Waitlist',
    href: '#',
  },
  {
    name: 'Jo’van Studios',
    tagline: 'Skip the trial and error. Get the SOPs.',
    status: 'Live',
    href: 'https://jovanstudios.gumroad.com',
  },
];

const statusStyles: Record<Project['status'], string> = {
  Live: 'text-white/80',
  Beta: 'text-white/55',
  Waitlist: 'text-white/55',
  Building: 'text-white/40',
};

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <header className="mb-16 flex flex-col gap-3 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40">
              The Build
            </p>
            <h2 className="mt-3 font-display text-5xl font-black tracking-tight md:text-7xl">
              Projects.
            </h2>
          </div>
          <p className="max-w-md font-sans text-base text-white/55">
            A working portfolio across software, housing, faith, and family
            &mdash; shipped and documented in real time.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p) => (
            <li key={p.name} className="bg-[#070707]">
              <a
                href={p.href}
                target={p.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group relative flex h-full min-h-[220px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-white/[0.03] md:p-9"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {p.name}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-10">
                  <p className="font-sans text-sm text-white/65 md:text-base">
                    {p.tagline}
                  </p>
                  <p
                    className={`mt-4 font-sans text-[11px] uppercase tracking-[0.25em] ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </p>
                </div>
              </a>
            </li>
          ))}
          {/* Fill empty cells in the last row so they paint black, not the divider gray */}
          {Array.from({ length: (4 - (PROJECTS.length % 4)) % 4 }).map((_, i) => (
            <li key={`filler-${i}`} aria-hidden className="hidden bg-[#070707] lg:block" />
          ))}
          {Array.from({ length: (2 - (PROJECTS.length % 2)) % 2 }).map((_, i) => (
            <li key={`filler-sm-${i}`} aria-hidden className="hidden bg-[#070707] sm:block lg:hidden" />
          ))}
        </ul>
      </div>
    </section>
  );
}
