import { ArrowUpRight } from 'lucide-react';

type Playbook = {
  title: string;
  blurb: string;
  price: string;
  href: string;
};

const PLAYBOOKS: Playbook[] = [
  {
    title: 'The DVM Operating Manual',
    blurb:
      'How I run a Digital Vending Machine portfolio of 8+ ventures from one office.',
    price: 'Soon',
    href: '#',
  },
  {
    title: 'From $0 to $1M (and back)',
    blurb:
      'The tiny home playbook, the tariff crash, and what I would do differently.',
    price: 'Soon',
    href: '#',
  },
  {
    title: 'Cult OS for Solo Founders',
    blurb:
      'The blueprint I use to lock archetype, conflict, and rituals for every brand I ship.',
    price: 'Soon',
    href: '#',
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
            No fluff. No gurus.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-white/[0.06] md:grid-cols-3">
          {PLAYBOOKS.map((p) => (
            <li key={p.title} className="bg-[#0a0a0a]">
              <a
                href={p.href}
                className="group relative flex h-full min-h-[280px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-white/[0.03] md:p-9"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-[14ch] font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-8">
                  <p className="font-sans text-sm text-white/55 md:text-base">
                    {p.blurb}
                  </p>
                  <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.25em] text-white/55">
                    {p.price}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
