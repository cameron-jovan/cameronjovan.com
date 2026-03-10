const RedfinLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 sm:h-7 w-auto" aria-hidden="true">
    <text x="0" y="22" className="fill-current font-sans font-bold text-lg">Redfin</text>
  </svg>
);

const VoyageATLLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 sm:h-7 w-auto" aria-hidden="true">
    <text x="0" y="22" className="fill-current font-serif font-semibold text-lg">VoyageATL</text>
  </svg>
);

const CanvasRebelLogo = () => (
  <svg viewBox="0 0 140 30" className="h-6 sm:h-7 w-auto" aria-hidden="true">
    <text x="0" y="22" className="fill-current font-sans font-medium text-lg tracking-wide">
      CANVAS REBEL
    </text>
  </svg>
);

const FoundersFutureLogo = () => (
  <svg viewBox="0 0 170 30" className="h-6 sm:h-7 w-auto" aria-hidden="true">
    <text x="0" y="22" className="fill-current font-sans font-medium text-lg tracking-wide">
      Founders Future
    </text>
  </svg>
);

const BuiltAmericaLogo = () => (
  <svg viewBox="0 0 170 30" className="h-6 sm:h-7 w-auto" aria-hidden="true">
    <text x="0" y="22" className="fill-current font-sans font-medium text-lg tracking-wide">
      Built America
    </text>
  </svg>
);

export default function FeaturedIn({ className }: { className?: string }) {
  const items = [
    {
      href: 'https://redfin.com',
      label: 'Redfin',
      Logo: RedfinLogo,
    },
    {
      href: 'https://voyageatl.com',
      label: 'VoyageATL',
      Logo: VoyageATLLogo,
    },
    {
      href: 'https://canvasrebel.com',
      label: 'Canvas Rebel',
      Logo: CanvasRebelLogo,
    },
    {
      href: 'https://foundersfuture.com',
      label: 'Founders Future (podcast)',
      Logo: FoundersFutureLogo,
    },
    {
      href: 'https://builtamerica.com',
      label: 'Built America (editorial)',
      Logo: BuiltAmericaLogo,
    },
  ];

  return (
    <div className={className}>
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#666666] mb-4">
        Featured In
      </p>
      <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-[#999999]">
        {items.map(({ href, label, Logo }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors duration-200"
            aria-label={label}
          >
            <Logo />
          </a>
        ))}
      </div>
    </div>
  );
}
