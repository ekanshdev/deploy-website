import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSectionProgress } from "./scroll";

/* ───────── Reality Check - stacking cards on scroll ───────── */

const PROBLEMS = [
  {
    n: "01",
    t: "You have no website",
    d: "Not having a digital presence in 2026 doesn't mean you're old-school. It means you don't exist to 5 billion people online.",
  },
  {
    n: "02",
    t: "Your site looks outdated",
    d: "First impressions take 0.05 seconds. An outdated site signals an outdated business - before a single word is read.",
  },
  {
    n: "03",
    t: "Leads fall through the cracks",
    d: "No capture system. No follow-up flow. Potential customers find you, can't figure out the next step, and leave - silently.",
  },
  {
    n: "04",
    t: "Manual processes kill growth",
    d: "Hours spent on tasks that should run automatically. Your team's energy goes to repetitive work instead of what actually moves the needle.",
  },
  {
    n: "05",
    t: "Losing to faster competitors",
    d: "While you're planning, others are shipping. Speed is the new competitive advantage, and the gap widens every quarter you wait.",
  },
];

export function RealityCheck() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const STEP = 1 / PROBLEMS.length;

  return (
    <section ref={ref} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden border-t border-white/10 px-6">
        <p className="absolute left-6 top-8 text-xs uppercase tracking-[0.25em] text-white/40 md:left-12">
          The Reality Check
        </p>

        <div className="relative h-[360px] w-full max-w-[560px]">
          {PROBLEMS.map((p, i) => {
            const arrival = i === 0 ? 0 : (i - 1) * STEP;
            const local = Math.min(1, Math.max(0, (progress - arrival) / STEP));
            const arrived = i === 0 ? 1 : local;
            const arrivedCount = Math.min(
              PROBLEMS.length,
              Math.floor(progress / STEP) + 1,
            );
            const isTop = i === arrivedCount - 1;
            const depth = arrivedCount - 1 - i;
            const ty = i === 0 && progress === 0 ? 0 : depth >= 0 ? depth * 10 : 120 * (1 - arrived);
            const scale = depth >= 0 ? 1 - depth * 0.025 : 0.92;
            const opacity = i === 0 ? 1 : arrived;

            return (
              <div
                key={p.n}
                className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 p-10"
                style={{
                  background: `rgb(${18 - i * 2}, ${18 - i * 2}, ${20 - i * 2})`,
                  transform: `translate3d(0, ${ty}px, 0) scale(${scale})`,
                  opacity,
                  zIndex: 5 - i + (isTop ? 10 : 0),
                  transition: "transform 200ms linear, opacity 200ms linear",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full w-[3px] rounded-l-[20px] bg-[#2563ff] transition-opacity duration-300"
                  style={{ opacity: isTop ? 1 : 0 }}
                />
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {p.n} / 05
                </div>
                <div>
                  <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                    {p.t}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{p.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Speed Bars ───────── */

export function SpeedSection() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const reveal = progress > 0.05;

  return (
    <section ref={ref} className="relative border-t border-white/10" style={{ height: "180vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <p className="absolute left-6 top-8 text-xs uppercase tracking-[0.25em] text-white/40 md:left-12">
          Speed to Market
        </p>
        <h2 className="max-w-3xl text-center text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          Traditional agencies take months.{" "}
          <em className="not-italic text-[#7c5cff]">Deploy takes weeks.</em>
        </h2>

        <div className="mt-16 flex w-full max-w-[680px] flex-col gap-8">
          {[
            { who: "Traditional Agency", dur: "3 – 6 months", w: 88, blue: false },
            { who: "Deploy", dur: "2 – 4 weeks", w: 22, blue: true },
          ].map((row) => (
            <div key={row.who}>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] uppercase tracking-[0.15em] ${row.blue ? "text-[#7c5cff]" : "text-white/60"}`}
                >
                  {row.who}
                </span>
                <span className={`text-xs ${row.blue ? "text-[#7c5cff]" : "text-white/60"}`}>
                  {row.dur}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: reveal ? `${row.w}%` : "0%",
                    background: row.blue ? "#7c5cff" : "rgba(255,255,255,0.45)",
                    transition: "width 1200ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Final CTA bloom ───────── */

const FINAL_WORDS = ["BUILD.", "SHIP.", "LIVE."];

export function FinalCTA() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const [hover, setHover] = useState(false);

  // Stagger words across progress 0 → 0.6, then sub & btn
  const wordReveal = (i: number) => {
    const start = 0.05 + i * 0.18;
    const local = Math.min(1, Math.max(0, (progress - start) / 0.18));
    return local;
  };
  const subReveal = Math.min(1, Math.max(0, (progress - 0.55) / 0.15));
  const btnReveal = Math.min(1, Math.max(0, (progress - 0.65) / 0.15));
  const bloomScale = Math.min(80, Math.max(0, (progress - 0.7) / 0.25) * 80);
  const bloomOpacity = bloomScale > 0 ? 0.08 : 0;

  return (
    <section ref={ref} className="relative border-t border-white/10" style={{ height: "220vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
        {/* Bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]"
          style={{
            transform: `translate(-50%, -50%) scale(${bloomScale})`,
            opacity: bloomOpacity,
            transition: "transform 300ms linear, opacity 300ms linear",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-9 text-center">
          <div className="flex flex-wrap items-center justify-center gap-5">
            {FINAL_WORDS.map((w, i) => {
              const r = wordReveal(i);
              return (
                <div key={w} className="flex items-center gap-5">
                  <span
                    className="font-black tracking-[-0.05em] text-white"
                    style={{
                      fontSize: "clamp(52px, 12vw, 160px)",
                      lineHeight: 0.9,
                      opacity: r,
                      transform: `translateY(${(1 - r) * 50}px) skewY(${(1 - r) * 3}deg)`,
                      willChange: "transform, opacity",
                    }}
                  >
                    {w}
                  </span>
                  {i < FINAL_WORDS.length - 1 && (
                    <span
                      className="block h-2.5 w-2.5 rounded-full bg-[#7c5cff]"
                      style={{
                        opacity: wordReveal(i) > 0.6 ? 1 : 0,
                        transform: `scale(${wordReveal(i) > 0.6 ? 1 : 0})`,
                        transition: "transform 200ms ease-out, opacity 200ms ease-out",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <p
            className="text-base text-white/60"
            style={{
              opacity: subReveal,
              transform: `translateY(${(1 - subReveal) * 16}px)`,
            }}
          >
            Your idea. Our execution. Launched.
          </p>

          <a
            href="/contact"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-semibold text-black"
            style={{
              opacity: btnReveal,
              transform: `translateY(${(1 - btnReveal) * 16}px)`,
              boxShadow: hover ? "0 20px 60px rgba(255,255,255,0.18)" : "0 0 0 rgba(0,0,0,0)",
              transition: "box-shadow 300ms ease",
            }}
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Cycling hero word ─────────
   Optional helper if you want the BUILD/SHIP/LIVE cycle look. */
export function CyclingWord({ words, intervalMs = 1800 }: { words: string[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.05em" }}>
      {words.map((w, k) => (
        <span
          key={w}
          className="block text-white"
          style={{
            transform: `translateY(${(k - i) * 100}%)`,
            transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
