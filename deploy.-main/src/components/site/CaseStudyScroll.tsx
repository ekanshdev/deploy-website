import { useCallback, useState } from "react";
import { useSectionProgress } from "./scroll";
import bbProducts from "@/assets/bb-products.png";
import bbAbout from "@/assets/bb-about.png";
import bbProduct from "@/assets/bb-product.png";
import dayamedHome from "@/assets/dayamed-home.png";
import dayamedProducts from "@/assets/dayamed-products.png";
import dayamedContact from "@/assets/dayamed-contact.png";
import dayamedAbout from "@/assets/dayamed-about.png";

export type CaseFrame = {
  src: string;
  eyebrow: string;
  title: string;
  body: string;
};

export type CaseStudyConfig = {
  brand: string;
  url: string;
  accent: string;
  bg: string;
  browserBg: string;
  browserText: string;
  frames: CaseFrame[];
};

export const BLUSH_CASE: CaseStudyConfig = {
  brand: "Blush & Beads Creation",
  url: "blushandbeads.com",
  accent: "#c9a26b",
  bg: "#0a0708",
  browserBg: "#f6efe6",
  browserText: "#4a2a36",
  frames: [
    {
      src: bbProducts,
      eyebrow: "01 — Catalog",
      title: "A storefront that feels handmade.",
      body: "Every product photographed in natural light, laid out on a calm canvas so the jewelry — not the UI — does the talking.",
    },
    {
      src: bbAbout,
      eyebrow: "02 — Story",
      title: "Where tradition meets tenderness.",
      body: "An About page written like a letter. Soft serif headlines, generous space, a single image that anchors the brand's heritage.",
    },
    {
      src: bbProduct,
      eyebrow: "03 — Product",
      title: "Details that earn the sale.",
      body: "Variant pickers, stock state, soft urgency. A buy flow tuned for handmade pieces — slow, considered, confident.",
    },
  ],
};

export const DAYAMED_CASE: CaseStudyConfig = {
  brand: "DAYAMED LIFE SCIENCES",
  url: "dayamed.com",
  accent: "#2563ff",
  bg: "#050a1a",
  browserBg: "#eaf3ff",
  browserText: "#0a1633",
  frames: [
    {
      src: dayamedHome,
      eyebrow: "01 — Home",
      title: "Trust, engineered in pixels.",
      body: "A calm, clinical hero that leads with GMP certification and 200+ formulations — the credibility signals hospitals and distributors look for first.",
    },
    {
      src: dayamedProducts,
      eyebrow: "02 — Products",
      title: "Featured formulations, front and centre.",
      body: "Flagship SKUs surfaced as editorial cards — category chips, quantities, and a clear enquire path built for B2B healthcare buyers.",
    },
    {
      src: dayamedAbout,
      eyebrow: "03 — About",
      title: "Built on trust. Driven by healthcare.",
      body: "A brand story told with generous whitespace and confident typography — anchoring 200+ trusted formulations to a real Dehradun-based operation.",
    },
    {
      src: dayamedContact,
      eyebrow: "04 — Contact",
      title: "One handshake away.",
      body: "A dual-column contact experience — enquiry form on one side, visit and call details on the other. Zero friction for partners ready to move.",
    },
  ],
};

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

export function CaseStudyScroll({ config }: { config: CaseStudyConfig }) {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const FRAMES = config.frames;
  const N = FRAMES.length;

  const scaled = progress * N;
  const scrollActive = Math.min(N - 1, Math.floor(scaled));

  const jumpTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const total = rect.height - window.innerHeight;
      const targetProgress = (i + 0.15) / N;
      window.scrollTo({
        top: sectionTop + targetProgress * total,
        behavior: "smooth",
      });
    },
    [ref, N],
  );

  return (
    <>
      <section
        ref={ref}
        aria-label={`${config.brand} case study`}
        className="relative"
        style={{ height: `${100 + N * 90}vh` }}
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: config.bg }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(60% 50% at 50% 0%, ${config.accent}2e, transparent 70%), radial-gradient(50% 40% at 80% 100%, ${config.accent}22, transparent 70%)`,
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-10 md:px-12 md:pt-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span>Case Study · {config.brand}</span>
              <span className="text-white/60">
                {String(scrollActive + 1).padStart(2, "0")} /{" "}
                {String(N).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="absolute inset-0 grid place-items-center px-6 pb-24 pt-28 md:grid-cols-[1.3fr_1fr] md:gap-10 md:px-12 md:pb-20 md:pt-32">
            <div className="relative h-full w-full">
              {FRAMES.map((f, i) => {
                const local = clamp(scaled - i);
                const inP = i === 0 ? 1 : clamp((scaled - (i - 0.35)) / 0.35);
                const outP =
                  i === N - 1 ? 0 : clamp((scaled - (i + 0.65)) / 0.35);
                const opacity = clamp(inP - outP);
                const e = ease(local);
                const scale = 0.94 + e * 0.06 - outP * 0.04;
                const translateY = (1 - inP) * 40 - outP * 30;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity,
                      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                      transition: "opacity 250ms linear, transform 250ms linear",
                      willChange: "opacity, transform",
                    }}
                  >
                    <FrameCard
                      src={f.src}
                      alt={f.title}
                      eager={i === 0}
                      url={config.url}
                      chromeBg={config.browserBg}
                      chromeText={config.browserText}
                    />
                  </div>
                );
              })}
            </div>

            <div className="relative hidden h-full w-full md:block">
              {FRAMES.map((f, i) => {
                const inP = i === 0 ? 1 : clamp((scaled - (i - 0.3)) / 0.3);
                const outP =
                  i === N - 1 ? 0 : clamp((scaled - (i + 0.7)) / 0.3);
                const opacity = clamp(inP - outP);
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity,
                      transform: `translate3d(0, ${(1 - inP) * 24 - outP * 18}px, 0)`,
                      transition: "opacity 300ms linear, transform 300ms linear",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: config.accent }}
                    >
                      {f.eyebrow}
                    </div>
                    <h3 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white">
                      {f.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                      {f.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 px-6 text-center md:hidden">
            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: config.accent }}
            >
              {FRAMES[scrollActive].eyebrow}
            </div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              {FRAMES[scrollActive].title}
            </h3>
          </div>

          <div className="absolute inset-x-0 bottom-6 z-40 flex justify-center gap-2">
            {FRAMES.map((f, i) => {
              const isActive = i === scrollActive;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Jump to frame ${i + 1}: ${f.title}`}
                  className="group relative h-6 px-1"
                >
                  <span
                    className="block h-[2px] w-10 rounded-full transition-all duration-500"
                    style={{
                      background:
                        i <= scrollActive ? config.accent : "rgba(255,255,255,0.18)",
                      transform: isActive ? "scaleY(2)" : "scaleY(1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <InteractiveGallery config={config} />
    </>
  );
}

function FrameCard({
  src,
  alt,
  eager,
  url,
  chromeBg,
  chromeText,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  url: string;
  chromeBg: string;
  chromeText: string;
}) {
  return (
    <div
      className="relative w-full max-w-[860px] overflow-hidden rounded-[18px] border border-white/10"
      style={{
        boxShadow:
          "0 60px 140px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      <div
        className="flex items-center gap-1.5 border-b border-black/10 px-4 py-2.5"
        style={{ background: chromeBg }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span
          className="ml-4 rounded-full bg-white/60 px-3 py-0.5 font-mono text-[10px]"
          style={{ color: chromeText }}
        >
          {url}
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="block w-full"
      />
    </div>
  );
}

function InteractiveGallery({ config }: { config: CaseStudyConfig }) {
  const [active, setActive] = useState(0);
  const FRAMES = config.frames;
  const f = FRAMES[active];

  return (
    <section
      aria-label={`Explore the ${config.brand} case study`}
      className="relative overflow-hidden px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24"
      style={{ background: config.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(40% 30% at 20% 0%, ${config.accent}1a, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Explore at your own pace
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              Every screen, on your terms.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55">
            Tap any thumbnail to jump straight to that screen. The scroll story
            is over — this is the museum.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div
            key={active}
            className="animate-fade-in"
            style={{ animationDuration: "500ms" }}
          >
            <FrameCard
              src={f.src}
              alt={f.title}
              url={config.url}
              chromeBg={config.browserBg}
              chromeText={config.browserText}
            />
          </div>

          <div>
            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: config.accent }}
            >
              {f.eyebrow}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl">
              {f.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{f.body}</p>

            <div className="mt-8 flex flex-col gap-3">
              {FRAMES.map((frame, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex items-center gap-4 rounded-2xl border p-3 text-left transition-all"
                    style={{
                      borderColor: isActive
                        ? `${config.accent}99`
                        : "rgba(255,255,255,0.08)",
                      background: isActive
                        ? `${config.accent}14`
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div
                      className="h-14 w-24 shrink-0 overflow-hidden rounded-md border border-white/10"
                      style={{
                        boxShadow: isActive
                          ? `0 0 0 1px ${config.accent}66`
                          : "none",
                      }}
                    >
                      <img
                        src={frame.src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-[10px] uppercase tracking-[0.25em] transition-colors"
                        style={{
                          color: isActive ? config.accent : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {frame.eyebrow}
                      </div>
                      <div className="mt-1 truncate text-sm font-semibold text-white">
                        {frame.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {FRAMES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show frame ${i + 1}`}
                  className="h-6 px-1"
                >
                  <span
                    className="block h-[2px] w-10 rounded-full transition-all"
                    style={{
                      background:
                        i === active ? config.accent : "rgba(255,255,255,0.18)",
                      transform: i === active ? "scaleY(2)" : "scaleY(1)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
