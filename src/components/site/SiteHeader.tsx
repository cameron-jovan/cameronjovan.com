import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'PROJECTS', href: '#projects' },
  { label: 'PLAYBOOKS', href: '#playbooks' },
  { label: 'THE ROAD', href: '#about' },
  { label: 'CONTACT', href: 'mailto:cam@jovanconsulting.xyz' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
            className="p-2 text-white/70 transition-colors hover:text-white"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>

          {open && (
            <div
              ref={menuRef}
              className="absolute left-0 top-full mt-3 min-w-[220px] rounded-xl border border-white/10 bg-black/85 p-2 shadow-2xl backdrop-blur-lg"
            >
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-4 py-3 font-display text-lg font-bold tracking-tight text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Monogram */}
        <a
          href="#"
          className="font-display text-xl font-black tracking-tight text-white"
          aria-label="Home"
        >
          CJ
        </a>

        <a
          href="mailto:cam@jovanconsulting.xyz"
          className="hidden rounded-full border border-white/20 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-white/60 hover:text-white sm:inline-block"
        >
          Email
        </a>
      </nav>
    </header>
  );
}
