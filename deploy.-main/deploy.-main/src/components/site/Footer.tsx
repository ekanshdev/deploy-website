import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <Logo size={40} />
          <p className="mt-2 text-sm text-white/40">Premium digital craft. Shipped in days, not months.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="https://instagram.com/deployhq_" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
          <a href="mailto:hello@deploy.dev" className="transition hover:text-white">hello@deploy.dev</a>
        </div>
        <p className="text-xs text-white/30">© {new Date().getFullYear()} Deploy.</p>
      </div>
    </footer>
  );
}
