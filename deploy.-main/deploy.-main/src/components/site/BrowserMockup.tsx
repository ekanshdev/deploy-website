type Props = {
  accent?: string;
  bg?: string;
  title?: string;
  url?: string;
  children?: React.ReactNode;
};

export function BrowserMockup({
  accent = "#7c5cff",
  bg = "#0b0b10",
  title = "orbit.studio",
  url = "orbit.studio/projects/aurora",
  children,
}: Props) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex max-w-xs flex-1 items-center justify-center rounded-md bg-white/5 px-3 py-1 text-xs text-white/50">
          {url}
        </div>
        <span className="w-12" />
      </div>
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 80% at 80% 0%, ${accent}55, transparent 60%), ${bg}`,
        }}
      >
        {children ?? (
          <div className="absolute inset-0 grid grid-rows-[auto_1fr] p-6">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-semibold tracking-widest uppercase">{title}</span>
              <span className="flex gap-4">
                <span>Work</span><span>About</span><span>Contact</span>
              </span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-xl bg-white/5 p-5">
                <div className="text-3xl font-black text-white">Make it move.</div>
                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/20" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
                <div
                  className="mt-4 inline-block rounded-full px-4 py-2 text-xs font-semibold text-black"
                  style={{ background: accent }}
                >
                  Explore →
                </div>
              </div>
              <div className="rounded-xl" style={{ background: `${accent}33` }} />
              <div className="rounded-xl bg-white/5" />
              <div className="rounded-xl bg-white/5" />
              <div className="rounded-xl" style={{ background: `${accent}22` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
