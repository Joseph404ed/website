import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Github } from "lucide-react";
import { GITHUB_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/docs", label: "Docs" },
  { to: "/architecture", label: "Architecture" },
  { to: "/crates", label: "Crates" },
  { to: "/patterns", label: "Patterns" },
  { to: "/examples", label: "Examples" },
  { to: "/community", label: "Community" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img src="/assets/r-logo.png" alt="" className="size-6 object-contain" />
      <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
        RustyAI
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-5">
        <Link to="/" aria-label="RustyAI home">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeProps={{ className: "text-foreground" }}
                className="rounded px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <Link
            to="/docs/getting-started"
            className="inline-flex items-center rounded-md bg-rust px-3 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 place-items-center rounded border border-border text-muted-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-2">
            {nav.concat([{ to: "/roadmap", label: "Roadmap" }] as never).map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-sm text-muted-foreground"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}