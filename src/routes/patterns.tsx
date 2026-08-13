import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/CodeBlock";
import { CTA, PageHeader, Section } from "@/components/primitives";
import { patterns } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Coordination Patterns — RustyAI" },
      {
        name: "description",
        content:
          "Eight coordination patterns for Rust multi-agent systems: Hierarchy, Swarm, Market, Coalition, Holarchy, Federation, Blackboard, and Team.",
      },
      { property: "og:title", content: "Coordination Patterns — RustyAI" },
      {
        property: "og:description",
        content: "Reusable agent coordination topologies, from a single team to an entire society.",
      },
    ],
  }),
  component: PatternsPage,
});

function PatternDiagram({ slug }: { slug: string }) {
  const dot = (x: number, y: number, hot = false, key?: string) => (
    <circle key={key ?? `${x}-${y}`} cx={x} cy={y} r="3.4" fill={hot ? "var(--rust)" : "var(--subtle)"} />
  );
  const line = (d: string, key: string) => (
    <path key={key} d={d} stroke="var(--border)" strokeWidth="1" fill="none" />
  );
  const shapes: Record<string, React.ReactNode> = {
    hierarchy: (
      <>
        {line("M60 16 L26 60 M60 16 L94 60 M26 60 L14 92 M26 60 L38 92 M94 60 L82 92 M94 60 L106 92", "h")}
        {dot(60, 16, true)}
        {[26, 94].map((x) => dot(x, 60, false, `m${x}`))}
        {[14, 38, 82, 106].map((x) => dot(x, 92, false, `l${x}`))}
      </>
    ),
    swarm: (
      <>
        {line("M24 40 L52 24 M52 24 L86 36 M86 36 L96 70 M96 70 L62 86 M62 86 L28 74 M28 74 L24 40 M52 24 L62 86", "s")}
        {[[24, 40], [52, 24], [86, 36], [96, 70], [62, 86], [28, 74]].map(([x, y], i) =>
          dot(x!, y!, i === 2, `s${i}`),
        )}
      </>
    ),
    market: (
      <>
        {line("M60 22 L22 84 M60 22 L60 84 M60 22 L98 84", "m")}
        {dot(60, 22, true)}
        {[22, 60, 98].map((x) => dot(x, 84, false, `b${x}`))}
      </>
    ),
    coalition: (
      <>
        <ellipse cx="45" cy="55" rx="34" ry="26" stroke="var(--rust)" strokeOpacity="0.45" fill="none" />
        {line("M28 46 L58 44 M58 44 L44 68 M44 68 L28 46 M92 70 L58 44", "c")}
        {[[28, 46], [58, 44], [44, 68]].map(([x, y], i) => dot(x!, y!, true, `c${i}`))}
        {dot(92, 70)}
      </>
    ),
    holarchy: (
      <>
        <rect x="12" y="18" width="96" height="74" rx="6" stroke="var(--border)" fill="none" />
        <rect x="22" y="30" width="38" height="34" rx="4" stroke="var(--rust)" strokeOpacity="0.5" fill="none" />
        <rect x="66" y="46" width="34" height="34" rx="4" stroke="var(--border)" fill="none" />
        {dot(41, 47, true)}
        {dot(83, 63)}
      </>
    ),
    federation: (
      <>
        {line("M28 34 L92 34 M28 34 L28 78 M92 34 L92 78 M28 78 L92 78 M28 34 L92 78 M92 34 L28 78", "f")}
        {[[28, 34], [92, 34], [28, 78], [92, 78]].map(([x, y], i) => dot(x!, y!, i === 0, `f${i}`))}
      </>
    ),
    blackboard: (
      <>
        <rect x="30" y="40" width="60" height="30" rx="4" fill="var(--elevated)" stroke="var(--rust)" strokeOpacity="0.45" />
        {line("M20 22 L46 40 M100 22 L76 40 M20 88 L46 70 M100 88 L76 70", "bb")}
        {[[20, 22], [100, 22], [20, 88], [100, 88]].map(([x, y], i) => dot(x!, y!, false, `bb${i}`))}
      </>
    ),
    team: (
      <>
        {line("M32 36 L88 36 M32 36 L60 82 M88 36 L60 82", "t")}
        {[[32, 36], [88, 36], [60, 82]].map(([x, y], i) => dot(x!, y!, i === 0, `t${i}`))}
      </>
    ),
  };
  return (
    <svg viewBox="0 0 120 108" className="h-24 w-full" aria-hidden="true">
      {shapes[slug]}
    </svg>
  );
}

function PatternsPage() {
  const [active, setActive] = useState(patterns[0]!.slug);
  const current = patterns.find((p) => p.slug === active)!;

  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="From one agent to an entire society."
        description="Coordination is the hard part of multi-agent systems. RustyAI ships eight topologies as first-class, composable patterns."
      />
      <Section className="border-t-0">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {patterns.map((p) => (
              <button
                key={p.slug}
                id={p.slug}
                type="button"
                onClick={() => setActive(p.slug)}
                className={cn(
                  "scroll-mt-24 bg-surface p-5 text-left transition-colors hover:bg-elevated",
                  active === p.slug && "bg-elevated",
                )}
              >
                <PatternDiagram slug={p.slug} />
                <p
                  className={cn(
                    "mt-3 font-mono text-sm",
                    active === p.slug ? "text-rust" : "text-foreground",
                  )}
                >
                  {p.name}
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">{p.short}</p>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-20 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust">
              pattern
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{current.name}</h2>
            <div className="mt-4 rounded-lg border border-border bg-background p-4">
              <PatternDiagram slug={current.slug} />
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{current.description}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  Ideal use case
                </dt>
                <dd className="mt-1 text-muted-foreground">{current.useCase}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  Example scenario
                </dt>
                <dd className="mt-1 text-muted-foreground">{current.scenario}</dd>
              </div>
            </dl>
            <CodeBlock className="mt-6" filename={`${current.slug}.rs`} code={current.code} />
          </div>
        </div>
      </Section>
      <CTA
        title="Coordinate your first population."
        description="Patterns compose with the runtime's supervision and the messaging layer's typed ACL."
      />
    </>
  );
}