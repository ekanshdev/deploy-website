import logo from "@/assets/deploy-logo.png";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export function Logo({
  size = 28,
  showWordmark = true,
  className = "",
}: LogoProps) {
  return (
    <span className={`group inline-flex items-center gap-2.5 text-white ${className}`}>
      <span
        className="relative inline-block overflow-hidden rounded-md"
        style={{ width: size, height: size }}
      >
        <img
          src={logo}
          alt="Deploy logo"
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            filter: "brightness(0) invert(1)",
          }}
          draggable={false}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)",
            mixBlendMode: "screen",
            transform: "translateX(-120%)",
            animation: "logo-shine 3.6s ease-in-out infinite",
          }}
        />
      </span>

      {showWordmark && (
        <span className="text-lg font-black tracking-tight leading-none">
          DEPLOY<span className="text-white/80">.</span>
        </span>
      )}
    </span>
  );
}