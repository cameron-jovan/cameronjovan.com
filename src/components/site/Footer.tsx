const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/camjovan' },
  { label: 'Threads', href: 'https://threads.net/@camjovan' },
  { label: 'X', href: 'https://x.com/camjovan' },
  { label: 'YouTube', href: 'https://youtube.com/@cameronjovan' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-black tracking-tight">
              Cameron Jo&rsquo;van
            </p>
            <p className="mt-2 font-sans text-sm text-white/40">
              &copy; {new Date().getFullYear()} &middot; Built in the open.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-sm uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
