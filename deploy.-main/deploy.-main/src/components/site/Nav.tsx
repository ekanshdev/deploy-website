import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-nav">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <Logo size={40} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/work" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }}>Work</Link>
          <Link to="/services" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }}>Services</Link>
          <Link to="/process" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }}>Process</Link>
          <Link to="/about" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }}>About</Link>
          <Link to="/contact" className="text-sm text-white/60 transition hover:text-white" activeProps={{ className: "text-white" }}>Contact</Link>
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Start a Project
        </Link>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-white" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/85 px-6 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            <Link to="/" onClick={close} className="text-white/80">Home</Link>
            <Link to="/work" onClick={close} className="text-white/80">Work</Link>
            <Link to="/services" onClick={close} className="text-white/80">Services</Link>
            <Link to="/process" onClick={close} className="text-white/80">Process</Link>
            <Link to="/about" onClick={close} className="text-white/80">About</Link>
            <Link to="/contact" onClick={close} className="text-white/80">Contact</Link>
            <Link to="/contact" onClick={close} className="mt-2 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
