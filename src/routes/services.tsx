import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Layers, Code2, Rocket, LineChart, Wand2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, ScrollProgress } from "@/components/site/scroll";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Deploy." },
      { name: "description", content: "Brand, product design, engineering, launch and growth — handled end-to-end by Deploy." },
      { property: "og:title", content: "Services — Deploy." },
      { property: "og:description", content: "A small independent studio. The whole stack." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Wand2, title: "Brand & Identity", desc: "Sharp visual systems and verbal direction that ship with your product, not after it." },
  { icon: Layers, title: "Product Design", desc: "End-to-end interface design, from first whiteboard to pixel-perfect handoff." },
  { icon: Code2, title: "Engineering", desc: "Modern, typed, animated React. We write the codebase we'd want to inherit." },
  { icon: Rocket, title: "Launch & Go-to-Market", desc: "Landing pages, narrative, and motion built to convert from the first scroll." },
  { icon: LineChart, title: "Growth Systems", desc: "Analytics, experimentation, and lifecycle loops wired into your product." },
  { icon: Sparkles, title: "Motion & 3D", desc: "Cinematic micro-interactions and WebGL that make people stop scrolling." },
];

function ServicesPage() {
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
              "radial-gradient(50% 40% at 30% 0%, rgba(124,92,255,0.3), transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(25,227,162,0.15), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Services</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            A small studio.<br />The whole stack.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Six disciplines, one team. We embed with founders and platform leads
            and own the work end-to-end — no handoffs, no agencies-of-agencies.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div
                  className="group glass relative h-full overflow-hidden rounded-2xl p-7 transition duration-500 hover:-translate-y-2"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 0% 0%, rgba(255,255,255,0.08), transparent 60%)",
                    }}
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-3">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              See selected work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              How we work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
