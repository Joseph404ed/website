import { useMemo, useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { crates, patterns } from "@/lib/site-data";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

type NavItem = { label: string; to: string; params?: Record<string, string> };

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", to: "/docs" },
      { label: "Getting Started", to: "/docs/getting-started" },
      { label: "Architecture", to: "/architecture" },
    ],
  },
  {
    title: "Crates",
    items: crates.map((c) => ({
      label: c.name,
      to: "/crates/$crate",
      params: { crate: c.slug },
    })),
  },
  {
    title: "Patterns",
    items: patterns.map((p) => ({ label: p.name, to: "/patterns" })),
  },
  {
    title: "Project",
    items: [
      { label: "Examples", to: "/examples" },
      { label: "xbot case study", to: "/xbot" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Community", to: "/community" },
    ],
  },
];

function DocsLayout() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s) => ({ ...s, items: s.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((s) => s.items.length > 0);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-5">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-border py-6 lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:pr-6">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs"
              aria-label="Search documentation"
              className="w-full rounded-md border border-border bg-surface py-2 pl-8 pr-3 text-[13px] text-foreground placeholder:text-subtle focus:border-rust/60 focus:outline-none"
            />
          </label>
          <nav className="mt-6 space-y-6">
            {filtered.map((s) => (
              <div key={s.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                  {s.title}
                </p>
                <ul className="mt-2.5 space-y-0.5">
                  {s.items.map((i) => (
                    <li key={`${s.title}-${i.label}`}>
                      <Link
                        to={i.to}
                        params={i.params as never}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "text-rust border-rust/60" }}
                        className="block border-l border-border py-1 pl-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {filtered.length === 0 ? (
              <p className="text-[13px] text-subtle">No matches.</p>
            ) : null}
          </nav>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}