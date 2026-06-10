import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SilkBackground from './SilkBackground';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070707] text-white">
      <SilkBackground intensity={0.62} />

      {/* Soft top/bottom gradient to anchor type */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Hero stage */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-32">
        <div className="relative w-full max-w-[1400px]">
          {/* Name lockup — the photo IS the O in CAMERON */}
          <div className="text-center leading-[0.78] tracking-[-0.045em] font-black uppercase">
            <div
              className={`flex items-center justify-center font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] text-white transition-all duration-1000 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span>CAMERON</span>
            </div>
            <div
              className={`block font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] text-white transition-all duration-1000 delay-150 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              JO&rsquo;VAN
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`mt-10 max-w-2xl px-6 text-center font-sans text-base text-white/85 sm:text-lg md:mt-14 md:text-xl transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          Faith Builder
          <br className="hidden sm:inline" />
          <span className="text-white/55">
            {' '}I show the work. He shows the way.
          </span>
        </p>

        {/* Email capture */}
        <form
          className={`mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to Resend/Firestore — see project's email infra
          }}
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-white/90"
          >
            Follow the rebuild
          </button>
        </form>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white/80"
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronDown className="h-7 w-7" />
      </button>
    </section>
  );
}
