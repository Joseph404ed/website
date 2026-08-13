import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar";
import { GITHUB_URL, TWITTER_URL, TELEGRAM_URL } from "@/lib/site-data";

const cols = [
  {
    title: "Product",
    links: [
      { to: "/architecture", label: "Architecture" },
      { to: "/crates", label: "Crates" },
      { to: "/patterns", label: "Patterns" },
      { to: "/examples", label: "Examples" },
    ],
  },
  {
    title: "Developers",
    links: [
      { to: "/docs", label: "Documentation" },
      { to: "/docs/getting-started", label: "Getting Started" },
      { href: GITHUB_URL, label: "GitHub" },
    ],
  },
  {
    title: "Community",
    links: [
      { to: "/community", label: "Community" },
      { to: "/ecosystem", label: "Ecosystem" },
      { to: "/xbot", label: "xbot" },
      { href: TWITTER_URL, label: "X / Twitter" },
      { href: TELEGRAM_URL, label: "Telegram" },
    ],
  },
  {
    title: "Project",
    links: [
      { to: "/roadmap", label: "Roadmap" },
      { to: "/community", label: "License" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-56 text-sm text-muted-foreground">
            Build autonomous systems in Rust.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              {c.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  {"href" in l ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 RustyAI</span>
          <span>MIT / Apache-2.0</span>
        </div>
      </div>
    </footer>
  );
}