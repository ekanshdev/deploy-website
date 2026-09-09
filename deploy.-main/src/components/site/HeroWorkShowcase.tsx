import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";
import { projects } from "@/lib/projects";

const slides = projects.map((p) => ({
  url: p.image,
  label: p.name,
  accent: p.accent,
  bg: p.bg,
  siteUrl: p.url,
}));

export function HeroWorkShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const go = (n: number) => setI(((n % slides.length) + slides.length) % slides.length);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const d = touchDeltaX.current;
    if (Math.abs(d) > 40) {
      if (d < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const current = slides[i];
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BrowserMockup
        accent={current.accent}
        bg={current.bg}
        title={current.label}
        url={current.siteUrl}
      >
        <div
          className="absolute inset-0 touch-pan-y select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((s, idx) => (
            <img
              key={s.url}
              src={s.url}
              alt={s.label}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{
                opacity: idx === i ? 1 : 0,
                transform: idx === i ? "scale(1)" : "scale(1.04)",
                transition:
                  "opacity 1400ms cubic-bezier(0.22,1,0.36,1), transform 5000ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Prev / Next — visible on md+ (hover-capable) */}
          <button
            type="button"
            aria-label="Previous work"
            onClick={prev}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/60 hover:scale-105 md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next work"
            onClick={next}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/60 hover:scale-105 md:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
            <span className="rounded-full bg-black/50 px-3 py-1 backdrop-blur">
              {current.label}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to ${s.label}`}
                  onClick={() => go(idx)}
                  className="h-2.5 rounded-full bg-white/70 transition-all duration-500 hover:bg-white"
                  style={{
                    width: idx === i ? 20 : 8,
                    opacity: idx === i ? 1 : 0.45,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </BrowserMockup>
    </div>
  );
}
