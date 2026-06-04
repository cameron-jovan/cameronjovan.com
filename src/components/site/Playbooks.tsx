import { ArrowUpRight, ArrowRight } from 'lucide-react';

type Playbook = {
  title: string;
  blurb: string;
  format: string;
  href: string;
};

const STORE_URL = 'https://jovanstudios.gumroad.com';

// Featured selection from the Jo'van Studios catalog.
// Full catalog lives at jovanstudios.gumroad.com — link out at the bottom.
const PLAYBOOKS: Playbook[] = [
  {
    title: 'AI Chatbot for Local Business in 60 Minutes',
    blurb:
      'No-code playbook. Build the chatbot, hand it to a local biz, charge $99/mo. Sales script included.',
    format: '14-page PDF',
    href: STORE_URL,
  },
  {
    title: 'Veo 3.1 for Creators',
    blurb:
      'The 6 prompting rules that decide 8-second quality. 10 paste-and-tweak recipes. Cost math vs Sora.',
    format: '14-page PDF',
    href: STORE_URL,
  },
  {
    title: 'Claude Skills for Operators',
    blurb:
      '10 production-ready skills + the 4-rule framework for writing your own. Replace a $50/hr VA.',
    format: '14-page PDF',
    href: STORE_URL,
  },
  {
    title: 'Faceless YouTube Map 2026',
    blurb:
      '20 niches scored on RPM, saturation, and AI-feasibility. The 5 graveyards to avoid.',
    format: '20-page PDF',
    href: STORE_URL,
  },
  {
    title: 'Nano Banana (Imagen 3) for Operators',
    blurb:
      '$0.04 / image on Vertex. Prompt formula + 12 brand-ready recipes. The Midjourney crossover math.',
    format: '12-page PDF',
    href: STORE_URL,
  },
  {
    title: 'AI Debt Killer',
    blurb:
      '30 prompts + 10 negotiation scripts to eliminate credit card debt. Pay what you want.',
    format: '40-page PDF',
    href: STORE_URL,
  },
];

export default function Playbooks() {
  return (
    <section id="playbooks" className="relative bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <header className="mb-16 flex flex-col gap-3 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40">
              The Drops
            </p>
            <h2 className="mt-3 font-display text-5xl font-black tracking-tight md:text-7xl">
              Playbooks.
            </h2>
          </div>
          <p className="max-w-md font-sans text-base text-white/55">
            Receipts, frameworks, and the SOPs I run my own ventures on.
            Shipped through Jo&rsquo;van Studios. No fluff, no gurus.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {PLAYBOOKS.map((p) => (
            <li key={p.title} className="bg-[#0a0a0a]">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full min-h-[260px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-white/[0.03] md:p-9"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-[16ch] font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-8">
                  <p className="font-sans text-sm text-white/55 md:text-[15px]">
                    {p.blurb}
                  </p>
                  <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.25em] text-white/55">
                    {p.format}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            See the full catalog at Jo&rsquo;van Studios
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
