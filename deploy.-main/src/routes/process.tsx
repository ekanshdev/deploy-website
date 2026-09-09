import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, ScrollProgress } from "@/components/site/scroll";
import { RealityCheck, SpeedSection } from "@/components/site/sections";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Deploy." },
      { name: "description", content: "Four weeks from first call to launch. Discover, design, build, deploy, grow." },
      { property: "og:title", content: "Process — Deploy." },
      { property: "og:description", content: "How Deploy ships premium products in weeks, not months." },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  { n: "01", t: "Discover", d: "One week to map the product, the audience, and the moves that actually matter. We leave with a one-page brief everyone agrees on." },
  { n: "02", t: "Design", d: "Two weeks of fast, opinionated direction. You see real screens, not mood boards. Daily reviews, weekly milestones." },
  { n: "03", t: "Build", d: "Production-grade React shipped in tight, reviewable slices. Every PR runs in a preview environment you can click through." },
  { n: "04", t: "Launch", d: "We ship it with you. Monitoring, analytics, and a full handover. We stay on for the first month of iteration." },
  { n: "05", t: "Grow", d: "Optional retainer. Experimentation, lifecycle, and growth systems that compound as your business scales." },
];

function ProcessPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Nav />

      <section className="relative overflow-hidden px-6 pb-16 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(50% 40% at 70% 0%, rgba(124,92,255,0.3), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Process</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Four weeks from first call to launch.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            A repeatable five-stage process that bias toward shipping every single week.
            No black boxes — you see progress in real time, in a shared Linear and Slack.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="glass h-full rounded-2xl p-7">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/40">{s.n}</div>
                  <div className="mt-3 text-2xl font-semibold">{s.t}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RealityCheck />
      <SpeedSection />

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            See it in action
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Meet the team
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
