export default function About() {
  return (
    <section id="about" className="relative bg-[#070707] text-white">
      <div className="mx-auto max-w-3xl px-6 py-28 md:py-36">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/40">
          The Model
        </p>
        <h2 className="mt-3 font-display text-5xl font-black tracking-tight md:text-7xl">
          How I build.
        </h2>

        <div className="mt-12 space-y-7 font-sans text-lg leading-relaxed text-white/75 md:text-xl">
          <p>
            I run a portfolio of eight ventures &mdash; software, housing,
            faith, family. The principle is simple. Build one thing well.
            Then ship the next.
          </p>
          <p>
            The model came from impact. In 2024 I built a tiny home
            company that cleared roughly $1M in ten months. Tariffs took
            it apart in weeks. What I kept was the playbook.
          </p>
          <p>
            The portfolio is how I run that playbook with no single point
            of failure. Each venture earns its own room. No vanity
            launches.
          </p>
          <p>
            I document the build in public so other operators can pull the
            receipts &mdash; the good takes and the bad ones &mdash; and
            move faster than I did.
          </p>
        </div>
      </div>
    </section>
  );
}
