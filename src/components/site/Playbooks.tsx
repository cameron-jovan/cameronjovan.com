import { ArrowUpRight, ArrowRight } from 'lucide-react';

type Playbook = {
  title: string;
  blurb: string;
  format: string;
  slug: string;
};

const STORE_URL = 'https://jovanstudios.gumroad.com';
const pdp = (slug: string) => `${STORE_URL}/l/${slug}`;

// Featured 6 from the live Jo'van Studios catalog. Outcome-first copy.
const PLAYBOOKS: Playbook[] = [
  {
    title: 'The Jo’van Studios Founder Pass',
    blurb:
      'One pass. Every playbook. Lifetime access to everything I ship.',
    format: 'Lifetime · Bundle',
    slug: 'jovan-studios-founder-pass',
  },
  {
    title: 'The 2026 AI Income Pack',
    blurb:
      'Seven playbooks for solo operators. The full 2026 stack in one drop.',
    format: '7 PDFs · Bundle',
    slug: 'ai-income-pack-2026',
  },
  {
    title: 'AI Chatbot for Local Business in 60 Minutes',
    blurb:
      'Build the bot, install it, charge the local biz $99/mo. Sales script inside.',
    format: '14-page PDF',
    slug: 'ai-chatbot-local',
  },
  {
    title: 'Google Veo for Creators',
    blurb:
      'Cinematic AI video without a studio. 10 prompt recipes that ship.',
    format: '14-page PDF',
    slug: 'veo-ai-video-guide',
  },
  {
    title: 'Nano Banana (Imagen 3) for Operators',
    blurb:
      'On-brand AI images at $0.04 each. No Midjourney Discord tax.',
    format: '12-page PDF',
    slug: 'nano-banana-guide',
  },
  {
    title: 'AI Debt Killer',
    blurb:
      'Thirty prompts and ten negotiation scripts to clear credit card debt.',
    format: '40-page PDF · PWYW',
    slug: 'ai-debt-killer',
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
            Skip the trial and error. Get the SOPs I run my own ventures
            on. Shipped through Jo&rsquo;van Studios.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {PLAYBOOKS.map((p) => (
            <li key={p.slug} className="bg-[#0a0a0a]">
              <a
                href={pdp(p.slug)}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full min-h-[260px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-white/[0.03] md:p-9"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-[18ch] font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-8">
                  <p className="font-sans text-sm text-white/65 md:text-[15px]">
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
