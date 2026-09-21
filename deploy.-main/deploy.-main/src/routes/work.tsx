import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { projects } from "@/lib/projects";
import { ScrollProgress } from "@/components/site/scroll";
import { CaseStudyScroll, BLUSH_CASE, DAYAMED_CASE } from "@/components/site/CaseStudyScroll";

const CASES: Record<string, typeof BLUSH_CASE> = {
  "blush-and-beads": BLUSH_CASE,
  "dayamed-life-sciences": DAYAMED_CASE,
};

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work | Deploy." },
      {
        name: "description",
        content:
          "Selected work from Deploy. — handcrafted websites built with care.",
      },
      { property: "og:title", content: "Work — Deploy." },
      {
        property: "og:description",
        content: "Selected work from Deploy. — handcrafted websites built with care.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <Nav />

      <main className="relative z-10">
        <div className="px-6 pt-40 md:pt-44">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Selected work
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Real projects.{" "}
              <span className="text-white/50">Shipped with care.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/60">
              A small but growing portfolio. Every site here is live, hand-built,
              and made for a real person or brand.
            </p>
          </div>
        </div>

        {projects.map((p) => (
          <div key={p.slug}>
            <div className="px-6 pt-16">
              <div className="mx-auto max-w-6xl">
                <ProjectCard project={p} />
              </div>
            </div>
            {CASES[p.slug] && (
              <div className="mt-16">
                <CaseStudyScroll config={CASES[p.slug]} />
              </div>
            )}
          </div>
        ))}
      </main>


      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-6xl">


          <div className="mt-24 rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center md:p-16">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              More on the way
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Want to be the next one?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              I'm taking on a handful of projects this quarter. If you have an
              idea worth shipping, let's talk.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProjectCard({ project: p }: { project: (typeof projects)[number] }) {
  return (
    <article
      className="group relative grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:grid-cols-2"
      style={{
        boxShadow: `0 30px 80px -40px ${p.accent}40`,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
        <img
          src={p.image}
          alt={`${p.name} preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 60%, ${p.bg}cc 100%)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: p.accent }}
            />
            {p.industry}
          </div>
          <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            {p.name}
          </h3>
          <p className="mt-3 text-white/60">{p.description}</p>

          <p className="mt-6 text-sm leading-relaxed text-white/55">
            {p.solution}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="text-lg font-semibold"
                  style={{ color: p.accent }}
                >
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-xs text-white/40">{p.url}</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3"
            >
              Work with me
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
