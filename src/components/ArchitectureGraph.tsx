import { useState } from "react";
import { crates } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const positions: Record<string, { x: number; y: number } | undefined> = {
  rustyai: { x: 300, y: 40 },
  patterns: { x: 120, y: 150 },
  runtime: { x: 300, y: 150 },
  cognition: { x: 480, y: 150 },
  messaging: { x: 200, y: 270 },
  "agent-core": { x: 400, y: 270 },
};

const W = 130;
const H = 46;

export function ArchitectureGraph() {
  const [active, setActive] = useState<string | null>(null);
  const activeCrate = crates.find((c) => c.slug === active);
  const highlighted = new Set(
    activeCrate ? [activeCrate.slug, ...activeCrate.depends] : [],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
        crate graph · hover to trace dependencies
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
        <svg viewBox="0 0 600 350" className="relative h-auto w-full">
          {crates.flatMap((c) =>
            c.depends
              .filter((d) => positions[d])
              .map((d) => {
                const from = positions[c.slug]!;
                const to = positions[d]!;
                const on = active === c.slug;
                return (
                  <path
                    key={`${c.slug}-${d}`}
                    d={`M${from.x} ${from.y + H / 2} C ${from.x} ${from.y + 90}, ${to.x} ${to.y - 60}, ${to.x} ${to.y - H / 2}`}
                    fill="none"
                    stroke={on ? "var(--rust)" : "var(--border)"}
                    strokeWidth={on ? 1.6 : 1}
                    className={cn("transition-all", on && "flow-line")}
                  />
                );
              }),
          )}
          {crates.map((c) => {
            const p = positions[c.slug]!;
            const dim = active !== null && !highlighted.has(c.slug);
            const on = highlighted.has(c.slug);
            return (
              <g
                key={c.slug}
                transform={`translate(${p.x - W / 2}, ${p.y - H / 2})`}
                onMouseEnter={() => setActive(c.slug)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <rect
                  width={W}
                  height={H}
                  rx="6"
                  fill="var(--elevated)"
                  stroke={on ? "var(--rust)" : "var(--border)"}
                  opacity={dim ? 0.4 : 1}
                  className="transition-all"
                />
                <text
                  x={W / 2}
                  y={20}
                  textAnchor="middle"
                  fontSize="12"
                  className="fill-[var(--foreground)] font-mono"
                  opacity={dim ? 0.4 : 1}
                >
                  {c.name}
                </text>
                <text
                  x={W / 2}
                  y={34}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-[var(--muted-foreground)] font-mono"
                  opacity={dim ? 0.4 : 1}
                >
                  {c.level.split("—")[1]?.trim() ?? ""}
                </text>
              </g>
            );
          })}
          <text x="300" y="330" textAnchor="middle" fontSize="10" className="fill-[var(--muted-foreground)] font-mono">
            Foundation
          </text>
        </svg>
      </div>
      <div className="min-h-[76px] border-t border-border px-4 py-3">
        {activeCrate ? (
          <div>
            <p className="font-mono text-[12px] text-rust">{activeCrate.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{activeCrate.tagline}</p>
            <p className="mt-1 font-mono text-[11px] text-subtle">
              depends on: {activeCrate.depends.join(", ") || "—"} · API:{" "}
              {activeCrate.apis.slice(0, 3).join(", ")}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Hover a crate to highlight its dependencies and API role.
          </p>
        )}
      </div>
    </div>
  );
}