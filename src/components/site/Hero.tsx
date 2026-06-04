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
      <SilkBackground intensity={0.55} />

      {/* Soft top/bottom gradient to anchor type */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Hero stage */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-32">
        <div className="relative w-full max-w-[1400px]">
          {/* Name lockup */}
          <div className="text-center leading-[0.78] tracking-[-0.045em] font-black uppercase">
            <div
              className={`block font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] text-white transition-all duration-1000 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              CAMERON
            </div>
            <div
              className={`block font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] text-white transition-all duration-1000 delay-150 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              JO&rsquo;VAN
            </div>
          </div>

          {/* Photo cutout — sits between the two lines, perfectly centered */}
          <div
            className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="h-[20vw] w-[14vw] min-h-[130px] min-w-[90px] max-h-[260px] max-w-[180px] overflow-hidden rounded-full opacity-55 shadow-[0_30px_120px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
              <img
                src="/cameron-hero.png"
                alt="Cameron Jo'van"
                className="h-full w-full object-cover object-[center_35%]"
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`mt-10 max-w-2xl px-6 text-center font-sans text-base text-white/70 sm:text-lg md:mt-14 md:text-xl transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          Lost $1M to tariffs. Rebuilding in public.
          <br className="hidden sm:inline" />
          <span className="text-white/45">
            {' '}Christian &middot; Husband &middot; Girl Dad &middot; Idea Machine.
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
