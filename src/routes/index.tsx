import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Layers, Code2, Rocket, LineChart, Wand2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, ScrollProgress, useParallax } from "@/components/site/scroll";
import { RealityCheck, SpeedSection, FinalCTA } from "@/components/site/sections";
import { CinematicScroll } from "@/components/site/CinematicScroll";
import { HeroWorkShowcase } from "@/components/site/HeroWorkShowcase";
import faviconUrl from "@/assets/favicon.jpg"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deploy." },
      { name: "description", content: "An independent studio shipping premium brand, web, and product experiences in days." },
      { property: "og:title", content: "Deploy. Premium digital craft" },
      { property: "og:description", content: "We design, build, and launch product experiences. In days, not months." },
    ],
    links: [
      { rel: "icon", type: "image/png", href: faviconUrl },
    ],
  }),
  component: Home,
});

const words = ["BUILD", "SHIP", "LIVE"];

const services = [
  { icon: Wand2, title: "Brand & Identity", desc: "Sharp visual systems and verbal direction that ship with your product, not after it." },
  { icon: Layers, title: "Product Design", desc: "End-to-end interface design, from first whiteboard to pixel-perfect handoff." },
  { icon: Code2, title: "Engineering", desc: "Modern, typed, animated React. We write the codebase we'd want to inherit." },
  { icon: Rocket, title: "Launch & Go-to-Market", desc: "Landing pages, narrative, and motion built to convert from the first scroll." },
  { icon: LineChart, title: "Growth Systems", desc: "Analytics, experimentation, and lifecycle loops wired into your product." },
  { icon: Sparkles, title: "Motion & 3D", desc: "Cinematic micro-interactions and WebGL that make people stop scrolling." },
];

const steps = [
  { n: "01", t: "Discover", d: "One week to map the product, the audience, and the moves that actually matter." },
  { n: "02", t: "Design", d: "Two weeks of fast, opinionated direction. You see real screens, not mood boards." },
  { n: "03", t: "Build", d: "Production-grade React, shipped in tight, reviewable slices." },
  { n: "04", t: "Launch", d: "We ship it with you and stay on for the first month of iteration." },
];

function Home() {
  const parallax = useParallax<HTMLDivElement>(0.18);
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.35), transparent 60%), radial-gradient(40% 40% at 80% 30%, rgba(25,227,162,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                NOW BUILDING.
              </span>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                <span className="block text-white/60">We</span>
                <span className="relative mt-2 block h-[1.05em] overflow-hidden">
                  <span
                    className="block will-change-transform"
                    style={{ animation: "word-cycle 4.8s var(--ease-out-quint) infinite" }}
                  >
                    {[...words, words[0]].map((w, i) => (
                      <span key={i} className="block h-[1.05em] leading-[1.05] text-white">
                        {w}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="mt-2 block text-white">premium products.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-white/60 md:text-xl">
                Deploy. is an independent product studio. We partner with founders and businesses to ship brand, 
                web, and product experiences that feel inevitable. In days, not months.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  View Our Work
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Start a Project
                </Link>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
                {[
                  ["72h", "Avg. first ship"],
                  ["2", "Products launched"],
                  ["1", "Builder"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <div className="text-2xl font-bold text-white">{k}</div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={parallax.ref}
              className="relative animate-fade-up [animation-delay:120ms]"
              style={{ transform: `translate3d(0, ${parallax.y}px, 0)`, willChange: "transform" }}
            >
              <div className="absolute -inset-16 -z-10 rounded-[40px] bg-gradient-to-br from-[#7c5cff]/40 via-transparent to-[#19e3a2]/15 blur-3xl" />
              <div className="animate-float">
                <HeroWorkShowcase />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC SCROLL — pinned 7-scene build sequence */}
      <CinematicScroll />

      {/* SERVICES TEASER */}
      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Services</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
                A small studio. The whole stack.
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/60">
                Brand, product design, engineering, launch and growth — six disciplines, one team.
              </p>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <Link
                  to="/services"
                  className="group glass relative block h-full overflow-hidden rounded-2xl p-7 transition duration-500 hover:-translate-y-2"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REALITY CHECK — stacking cards */}
      <RealityCheck />

      {/* PROCESS TEASER */}
      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Process</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
                Four weeks from first call to launch.
              </h2>
            </div>
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              See full process
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="glass h-full rounded-2xl p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/40">{s.n}</div>
                  <div className="mt-3 text-xl font-semibold">{s.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEED COMPARISON */}
      <SpeedSection />

      {/* FINAL CTA — bloom */}
      <FinalCTA />

      <Footer />
    </div>
  );
}
