import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Linkedin, MessageCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, ScrollProgress } from "@/components/site/scroll";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Deploy." },
      { name: "description", content: "A focused studio building websites that help businesses grow." },
      { property: "og:title", content: "About — Deploy." },
      { property: "og:description", content: "The people behind Deploy." },
    ],
  }),
  component: AboutPage,
});

const founders = [
  {
    name: "Ekansh Swarnkar",
    role: "Founder",
    bio: "Designs and builds the studio's craft — from first concept to the last shipped pixel.",
    initials: "ES",
    accent: "#7c5cff",
    linkedin: "https://www.linkedin.com/in/ekansh-swarnkar",
    whatsapp: "https://wa.me/918368549302",
  },
  {
    name: "Pranshu Srivastava",
    role: "Co-Founder",
    bio: "Runs partnerships and product strategy — makes sure every project ships and lands.",
    initials: "PS",
    accent: "#19e3a2",
    linkedin: "https://www.linkedin.com/in/pranshu-srivastava/",
    whatsapp: "https://wa.me/919999999998",
  },
];

function AboutPage() {
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
              "radial-gradient(50% 40% at 50% 0%, rgba(124,92,255,0.3), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">About</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            A focused studio building websites that help businesses grow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Deploy is an independent web studio focused on creating modern, high-performance websites for businesses of every size. 
            We combine thoughtful design with clean development to build experiences that look exceptional and launch — in days, not months.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">The team</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
            Built by two founders who ship.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 100}>
                <div className="glass group relative flex h-full flex-col gap-6 rounded-2xl p-7 sm:flex-row sm:items-center">
                  <div className="relative shrink-0">
                    <div
                      className="absolute -inset-4 rounded-[24px] opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                      style={{
                        background: `radial-gradient(circle at center, ${f.accent}40, transparent 70%)`,
                      }}
                    />
                    <div
                      className="animate-avatar-float relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-2xl border border-white/[0.12] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:border-white/25"
                      style={{
                        background: `linear-gradient(135deg, ${f.accent}15, rgba(255,255,255,0.03))`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px -10px ${f.accent}18`,
                        animationDelay: `${i * 0.7}s`,
                      }}
                    >
                      <span className="text-[28px] font-extrabold tracking-tight text-white">
                        {f.initials}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/40">
                      {f.role}
                    </div>
                    <h3 className="mt-1 text-2xl font-semibold text-white">{f.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{f.bio}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a
                        href={f.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Message ${f.name} on WhatsApp`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-emerald-500/20 hover:text-emerald-300"
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">By the numbers</p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["72h", "Avg. first ship"],
                ["2", "Products launched"],
                ["1", "Senior partner"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="text-3xl font-bold text-white">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/40">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass flex flex-col justify-between rounded-2xl p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Ready when you are</p>
              <p className="mt-4 text-2xl font-semibold leading-snug">
                Have an idea you want shipped this quarter? Let's see if we're a fit.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@deploy.dev"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                hello@deploy.dev <ArrowRight size={16} />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                What we do
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
