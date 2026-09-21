import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Calendar } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, ScrollProgress } from "@/components/site/scroll";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Deploy." },
      { name: "description", content: "Start a project with Deploy. Tell us about your idea and we'll be in touch within 24 hours." },
      { property: "og:title", content: "Contact — Deploy." },
      { property: "og:description", content: "Start a project with Deploy." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "hellodeployhq@gmail.com", href: "mailto:hellodeployhq@gmail.com" },
  { icon: Calendar, label: "Book a call", value: "15-min intro", href: "mailto:hellodeployhq@gmail.com?subject=Intro%20call" },
  { icon: MessageSquare, label: "Response", value: "Within 24 hours", href: "#form" },
];

const budgets = ["₹7k-₹10k", "₹10k-₹20k", "₹20k+"];
const timelines = ["ASAP", "2–4 weeks", "1–3 months", "Just exploring"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams({
      subject: `New project — ${fd.get("name") ?? ""}`,
      body: [
        `Name: ${fd.get("name") ?? ""}`,
        `Company: ${fd.get("company") ?? ""}`,
        `Budget: ${budget ?? "—"}`,
        `Timeline: ${timeline ?? "—"}`,
        ``,
        `${fd.get("message") ?? ""}`,
      ].join("\n"),
    });
    window.location.href = `mailto:hellodeployhq@gmail.com?${params.toString()}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Nav />

      <section className="relative overflow-hidden px-6 pb-16 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 0%, rgba(124,92,255,0.3), transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(25,227,162,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Contact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Tell us what you're building.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            We take on a few projects a quarter. Share the shape of yours and we'll reply within 24 hours
            with whether we're a fit — and what shipping it would look like.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                className="glass flex h-full items-center gap-4 rounded-2xl p-6 transition hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <c.icon size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">{c.label}</div>
                  <div className="mt-1 text-base font-semibold text-white">{c.value}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="form" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">The brief</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              A few details. That's all we need to start.
            </h2>
            <p className="mt-5 text-white/60">
              Don't worry about polish — a paragraph and a link to anything relevant goes a long way.
              We read every message ourselves.
            </p>
          </div>

          <form onSubmit={onSubmit} className="glass rounded-2xl p-7 md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" required placeholder="Ada Lovelace" />
              <Field label="Company" name="company" placeholder="Aurora Finance" />
            </div>
            <div className="mt-5">
              <Field label="Email" name="email" type="email" required placeholder="hello@blushnbeads.com" />
            </div>

            <div className="mt-7">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">Budget</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>{b}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">Timeline</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {timelines.map((t) => (
                  <Chip key={t} active={timeline === t} onClick={() => setTimeline(t)}>{t}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <label className="text-xs uppercase tracking-[0.25em] text-white/40">Project</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="What you're building, who it's for, and where you're stuck."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {sent ? "Opening email…" : "Send brief"} <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(45% 50% at 50% 100%, rgba(124,92,255,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Prefer the direct route?
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Or email us right away.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <a
              href="mailto:hellodeployhq@gmail.com"
              className="glass group mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 transition hover:-translate-y-0.5"
            >
              <Mail size={18} className="text-white/70 transition group-hover:text-white" />
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
                hellodeployhq@gmail.com
              </span>
              <ArrowRight
                size={18}
                className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white"
              />
            </a>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-sm text-white/40">
              We read every message ourselves — typically replying within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
      />
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-white bg-white text-black"
          : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
