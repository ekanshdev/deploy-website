import { useSectionProgress } from "./scroll";
import { ArrowRight, Layers, Code2, Database, FormInput, BarChart3, Workflow } from "lucide-react";

/* ───────────────────────────────────────────────────────────────────────────
   CINEMATIC SCROLL — 7 scenes pinned, scroll-linked timeline.
   Pure CSS transforms driven by section progress. No GSAP needed.
   ─────────────────────────────────────────────────────────────────────────── */

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

// 7 scenes, with the final reveal locking and holding through the tail
const SCENES = [
  { start: 0.00, end: 0.11 }, // 0 idea
  { start: 0.11, end: 0.23 }, // 1 wireframe
  { start: 0.23, end: 0.36 }, // 2 design
  { start: 0.36, end: 0.50 }, // 3 development
  { start: 0.50, end: 0.62 }, // 4 deployment
  { start: 0.62, end: 0.74 }, // 5 launch
  { start: 0.74, end: 0.86 }, // 6 deploy reveal (locks at end; holds 0.86 → 1.00)
];
                  
function sceneProgress(p: number, i: number) {
  const s = SCENES[i];
  return clamp((p - s.start) / (s.end - s.start));
}

function activeIndex(p: number) {
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (p >= SCENES[i].start) return i;
  }
  return 0;
}

export function CinematicScroll() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const idx = activeIndex(progress);

  const p0 = sceneProgress(progress, 0);
  const p1 = sceneProgress(progress, 1);
  const p2 = sceneProgress(progress, 2);
  const p3 = sceneProgress(progress, 3);
  const p4 = sceneProgress(progress, 4);
  const p5 = sceneProgress(progress, 5);
  const p6 = sceneProgress(progress, 6);

  return (
    <section
      ref={ref}
      className="relative border-t border-white/10"
      style={{ height: "520vh" }}
      aria-label="How Deploy turns an idea into a live product"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        style={{ perspective: "1400px" }}
      >
        {/* Section label */}
        <div className="pointer-events-none absolute left-6 top-6 z-50 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 md:left-12 md:top-8">
          <span>The Build Sequence</span>
          <span className="h-px w-12 bg-white/20" />
          <span className="text-white/60">
            {String(idx + 1).padStart(2, "0")} / 07
          </span>
        </div>

        {/* Animated grid backdrop */}
        <Grid p0={p0} p1={p1} p6={p6} />

        {/* Scene 1 — IDEA: glowing dot */}
        <SceneIdea p={p0} active={idx === 0} />

        {/* Scene 2 — WIREFRAME */}
        <SceneWireframe p={p1} active={idx === 1} />

        {/* Scene 3 — DESIGN */}
        <SceneDesign p={p2} active={idx === 2} />

        {/* Scene 4 — DEVELOPMENT exploded layers */}
        <SceneDev p={p3} active={idx === 3} />

        {/* Scene 5 — DEPLOYMENT reassembly */}
        <SceneDeploy p={p4} active={idx === 4} />

        {/* Scene 6 — LAUNCH metrics */}
        <SceneLaunch p={p5} active={idx === 5} />

        {/* Scene 7 — DEPLOY REVEAL */}
        <SceneReveal p={p6} active={idx === 6} />

        {/* Scene caption */}
        <Caption idx={idx} progress={progress} />

        {/* Progress rail */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className="h-[2px] w-8 rounded-full transition-colors duration-500"
              style={{ background: i <= idx ? "#7c5cff" : "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Subcomponents ──────────────── */

function Grid({ p0, p1, p6 }: { p0: number; p1: number; p6: number }) {
  // Grid fades in across scene 0 → 1, fades out at the end
  const opacity = clamp(ease(p0) * 0.5 + ease(p1) * 0.3) * (1 - p6 * 0.8);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        backgroundPosition: "center center",
        transform: `scale(${1 + p1 * 0.1})`,
        transition: "opacity 200ms linear",
        maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)",
      }}
    />
  );
}

function SceneIdea({ p, active }: { p: number; active: boolean }) {
  // Dot grows from tiny to large, then fades as it morphs into the wireframe
  const size = 6 + ease(p) * 220;
  const glow = 20 + ease(p) * 180;
  const opacity = active ? 1 : Math.max(0, 1 - p * 1.8);
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="rounded-full bg-white"
        style={{
          width: size,
          height: size,
          opacity,
          boxShadow: `0 0 ${glow}px ${glow / 3}px rgba(255,255,255,${0.4 - p * 0.3})`,
          transition: "opacity 200ms linear",
        }}
      />
    </div>
  );
}

function SceneWireframe({ p, active }: { p: number; active: boolean }) {
  const visible = active || (p > 0 && p < 1.2);
  const scale = 0.7 + ease(p) * 0.3;
  const opacity = !visible ? 0 : p < 0.1 ? p * 10 : p > 0.85 ? (1 - p) * 6.6 : 1;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="w-[min(620px,82vw)] rounded-xl border border-white/20"
        style={{
          opacity: clamp(opacity),
          transform: `scale(${scale})`,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* nav bar */}
        <div className="flex items-center gap-2 border-b border-white/15 p-3">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="ml-3 h-2 w-24 rounded-full bg-white/20" />
          <span className="ml-auto h-2 w-12 rounded-full bg-white/20" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-4 w-2/3 rounded bg-white/20" />
          <div className="h-2 w-1/2 rounded bg-white/15" />
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="h-20 rounded bg-white/10" />
            <div className="h-20 rounded bg-white/10" />
            <div className="h-20 rounded bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneDesign({ p, active }: { p: number; active: boolean }) {
  const visible = active || (p > 0 && p < 1.2);
  const color = ease(p); // 0 → 1 mono → color
  const opacity = !visible ? 0 : p < 0.1 ? p * 10 : p > 0.85 ? (1 - p) * 6.6 : 1;
  const scale = 0.85 + ease(p) * 0.18;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="w-[min(680px,86vw)] overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
        style={{
          opacity: clamp(opacity),
          transform: `scale(${scale})`,
          background: `linear-gradient(180deg, rgba(${24 - color * 8}, ${20 - color * 4}, ${48 + color * 20}, 1), rgba(8,8,16,1))`,
          boxShadow: `0 40px 120px -20px rgba(124,92,255,${0.15 + color * 0.35})`,
        }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${255}, ${95 + (1 - color) * 100}, ${95 + (1 - color) * 100})` }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${255}, ${189 + (1 - color) * 50}, ${46 + (1 - color) * 150})` }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${39 + (1 - color) * 150}, ${201 + (1 - color) * 50}, ${63 + (1 - color) * 150})` }} />
          <span className="ml-4 text-[10px] uppercase tracking-widest" style={{ color: `rgba(255,255,255,${0.4 + color * 0.3})` }}>
            blushnbeads
          </span>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 p-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: `rgba(124,92,255,${color})` }}>
              Treasury · v4
            </div>
            <div className="mt-2 text-2xl font-bold leading-tight text-white">
              Liquidity that <span style={{ color: `rgba(124,92,255,${color})` }}>moves with you.</span>
            </div>
            <div className="mt-2 text-xs text-white/50">
              Allocate, rebalance, and report across 17 chains from one console.
            </div>
            <div className="mt-4 flex gap-2">
              <span
                className="inline-flex h-8 items-center rounded-full px-4 text-[11px] font-semibold"
                style={{
                  background: `rgba(255,255,255,${0.95 - color * 0.05})`,
                  color: "#000",
                }}
              >
                Open app
              </span>
              <span className="inline-flex h-8 items-center rounded-full border border-white/15 px-4 text-[11px] font-semibold text-white/80">
                Docs
              </span>
            </div>
          </div>
          <div
            className="rounded-xl border border-white/10 p-3"
            style={{
              background: `linear-gradient(135deg, rgba(124,92,255,${color * 0.4}), rgba(25,227,162,${color * 0.2}))`,
            }}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/60">TVL</div>
            <div className="mt-1 text-xl font-bold text-white">$48.2M</div>
            <div className="mt-3 h-16 w-full overflow-hidden rounded">
              <svg viewBox="0 0 100 40" className="h-full w-full">
                <polyline
                  fill="none"
                  stroke={`rgba(124,92,255,${0.4 + color * 0.6})`}
                  strokeWidth="1.6"
                  points="0,30 12,28 22,22 34,24 46,16 58,18 70,10 82,12 100,4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LAYERS = [
  { icon: Layers, label: "Frontend", color: "#7c5cff", angle: -90 },
  { icon: Code2, label: "Backend", color: "#19e3a2", angle: -30 },
  { icon: Database, label: "Database", color: "#ff7ab6", angle: 30 },
  { icon: FormInput, label: "Forms", color: "#ffd166", angle: 90 },
  { icon: BarChart3, label: "Analytics", color: "#7cd9ff", angle: 150 },
  { icon: Workflow, label: "Automation", color: "#c084fc", angle: 210 },
];

function SceneDev({ p, active }: { p: number; active: boolean }) {
  const visible = active || (p > 0 && p < 1.2);
  // explode 0→1 then implode 1→ deployment scene takes over
  const explode = ease(clamp(p / 0.7));
  const opacity = !visible ? 0 : p < 0.1 ? p * 10 : p > 0.9 ? (1 - p) * 10 : 1;
  const radius = 60 + explode * 220;
  const rotate = explode * 60;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="relative h-[420px] w-[420px]"
        style={{
          opacity: clamp(opacity),
          transform: `rotate(${rotate}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* central core */}
        <div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/30 bg-white/5 backdrop-blur"
          style={{ boxShadow: "0 0 60px rgba(124,92,255,0.4)" }}
        />
        {LAYERS.map((l, i) => {
          const rad = (l.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const Icon = l.icon;
          return (
            <div
              key={l.label}
              className="absolute left-1/2 top-1/2 flex h-20 w-32 items-center gap-2 rounded-xl border border-white/15 bg-black/60 px-3 backdrop-blur-md"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotate}deg)`,
                boxShadow: `0 20px 60px -10px ${l.color}40, inset 0 0 0 1px ${l.color}30`,
                transition: "box-shadow 300ms ease",
                opacity: 0.4 + explode * 0.6,
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${l.color}25`, color: l.color }}
              >
                <Icon size={16} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-xs font-semibold text-white">{l.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneDeploy({ p, active }: { p: number; active: boolean }) {
  // reassembly: layers fly in to form a browser
  const visible = active || (p > 0 && p < 1.2);
  const assemble = ease(clamp(p / 0.6));
  const loaded = clamp((p - 0.55) / 0.3);
  const opacity = !visible ? 0 : p < 0.05 ? p * 20 : p > 0.92 ? (1 - p) * 12.5 : 1;
  const scale = 0.85 + assemble * 0.15;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="relative w-[min(680px,86vw)] overflow-hidden rounded-2xl border border-white/15 bg-[#0c0a1f]"
        style={{
          opacity: clamp(opacity),
          transform: `scale(${scale})`,
          boxShadow: "0 40px 120px -20px rgba(25,227,162,0.35)",
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] text-white/60">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: loaded > 0.9 ? "#19e3a2" : "#ffd166",
                boxShadow: loaded > 0.9 ? "0 0 10px #19e3a2" : "none",
              }}
            />
            blushnbeads
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-widest" style={{ color: loaded > 0.9 ? "#19e3a2" : "rgba(255,255,255,0.4)" }}>
            {loaded > 0.95 ? "LIVE" : loaded > 0.5 ? "DEPLOYING…" : "BUILD"}
          </span>
        </div>
        {/* progress bar */}
        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-full"
            style={{
              width: `${Math.min(100, assemble * 100 + loaded * 30)}%`,
              background: "linear-gradient(90deg, #7c5cff, #19e3a2)",
              transition: "width 120ms linear",
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          {LAYERS.slice(0, 6).map((l, i) => {
            const delay = i * 0.08;
            const local = clamp((assemble - delay) / 0.3);
            return (
              <div
                key={l.label}
                className="rounded-lg border border-white/10 p-3"
                style={{
                  opacity: local,
                  transform: `translateY(${(1 - local) * 30}px)`,
                  background: `linear-gradient(135deg, ${l.color}18, transparent)`,
                  transition: "opacity 200ms linear, transform 200ms linear",
                }}
              >
                <div className="text-[9px] uppercase tracking-widest" style={{ color: l.color }}>
                  {l.label}
                </div>
                <div className="mt-1 text-[10px] text-white/50">
                  {local > 0.9 ? "✓ ready" : "compiling…"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SceneLaunch({ p, active }: { p: number; active: boolean }) {
  const visible = active || (p > 0 && p < 1.2);
  const opacity = !visible ? 0 : p < 0.05 ? p * 20 : p > 0.9 ? (1 - p) * 10 : 1;
  const scale = 0.9 + ease(p) * 0.15;
  const stats = [
    { k: "Visitors", v: Math.round(p * 12480).toLocaleString(), accent: "#7c5cff" },
    { k: "Leads", v: Math.round(p * 348).toString(), accent: "#19e3a2" },
    { k: "Conv. rate", v: `${(2.1 + p * 3.4).toFixed(1)}%`, accent: "#ffd166" },
    { k: "Revenue", v: `$${Math.round(p * 84200).toLocaleString()}`, accent: "#ff7ab6" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="w-[min(820px,90vw)]"
        style={{ opacity: clamp(opacity), transform: `scale(${scale})` }}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s, i) => {
            const delay = i * 0.1;
            const local = clamp((p - delay) / 0.4);
            return (
              <div
                key={s.k}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
                style={{
                  opacity: local,
                  transform: `translateY(${(1 - local) * 24}px)`,
                  boxShadow: `0 20px 60px -20px ${s.accent}40`,
                }}
              >
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.k}</div>
                <div className="mt-2 text-3xl font-bold tracking-tight text-white">{s.v}</div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full"
                    style={{
                      width: `${local * 100}%`,
                      background: s.accent,
                      transition: "width 200ms linear",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)",
            opacity: ease(p),
          }}
        />
      </div>
    </div>
  );
}

function SceneReveal({ p, active }: { p: number; active: boolean }) {
  const visible = active || p > 0;
  const opacity = !visible ? 0 : clamp(p * 1.6);
  const logoScale = 0.5 + ease(clamp(p / 0.4)) * 0.5;
  const wordReveal = (i: number) => clamp((p - 0.25 - i * 0.1) / 0.15);
  const ctaReveal = clamp((p - 0.7) / 0.2);
  const WORDS = ["BUILD.", "SHIP.", "LIVE."];
  return (
    <div
      className="absolute inset-0 grid place-items-center text-center"
      style={{ opacity }}
    >
      {/* assembled bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.25), rgba(25,227,162,0.08) 40%, transparent 70%)",
          opacity: ease(p),
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <div
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
          style={{
            opacity: clamp(p / 0.2),
            transform: `scale(${logoScale})`,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#19e3a2]" />
          Deploy.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {WORDS.map((w, i) => {
            const r = wordReveal(i);
            return (
              <span
                key={w}
                className="font-black tracking-[-0.05em] text-white"
                style={{
                  fontSize: "clamp(48px, 11vw, 144px)",
                  lineHeight: 0.9,
                  opacity: r,
                  transform: `translateY(${(1 - r) * 60}px) skewY(${(1 - r) * 4}deg)`,
                  willChange: "transform, opacity",
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        <a
          href="/contact"
          className="group inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(255,255,255,0.18)] transition hover:scale-[1.02]"
          style={{
            opacity: ctaReveal,
            transform: `translateY(${(1 - ctaReveal) * 20}px)`,
          }}
        >
          Start Your Project
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

const CAPTIONS = [
  "Every project starts as an idea.",
  "Ideas need structure.",
  "Design creates clarity.",
  "Every system has moving parts.",
  "Built. Tested. Deployed.",
  "Live in days, not months.",
  "",
];

function Caption({ idx, progress }: { idx: number; progress: number }) {
  const text = CAPTIONS[idx] ?? "";
  const sp = sceneProgress(progress, idx);
  // fade in early, fade out late within each scene
  const fade =
    idx === 6
      ? 0
      : sp < 0.15
        ? sp / 0.15
        : sp > 0.85
          ? (1 - sp) / 0.15
          : 1;
  return (
    <div
      key={idx}
      className="pointer-events-none absolute inset-x-0 bottom-24 z-40 flex justify-center px-6 text-center"
    >
      <p
        className="max-w-2xl text-2xl font-medium tracking-tight text-white md:text-4xl"
        style={{
          opacity: clamp(fade),
          transform: `translateY(${(1 - clamp(fade)) * 14}px)`,
          transition: "opacity 200ms linear, transform 200ms linear",
        }}
      >
        {text}
      </p>
    </div>
  );
}
