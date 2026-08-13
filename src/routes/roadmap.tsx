import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHeader, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — RustyAI" },
      {
        name: "description",
        content:
          "RustyAI is in Phase 2 — Stabilization: API consistency, test coverage, and documentation on the way to a 1.0 release.",
      },
      { property: "og:title", content: "Roadmap — RustyAI" },
      {
        property: "og:description",
        content: "Foundation → Stabilization (current) → 1.0 Release → Ecosystem.",
      },
    ],
  }),
  component: RoadmapPage,
});

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    state: "done",
    body: "Core framework complete. Compilation and core functionality established across the crate graph.",
  },
  {
    phase: "Phase 2",
    title: "Stabilization",
    state: "current",
    body: "API consistency work, test coverage, and documentation — preparation toward 1.0.",
  },
  {
    phase: "Phase 3",
    title: "1.0 Release",
    state: "next",
    body: "A stable, versioned public API for the framework.",
  },
  {
    phase: "Phase 4",
    title: "Ecosystem",
    state: "next",
    body: "Growth of the surrounding ecosystem around a stable core.",
  },
];

function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="Phase 2 — Stabilization."
        description="The core framework exists and compiles. The work now is making the API consistent, well tested, and well documented before committing to 1.0."
      />
      <Section className="border-t-0">
        <ol className="relative">
          {phases.map((p, i) => (
            <li key={p.phase} className="relative pl-10 pb-10 last:pb-0">
              {i < phases.length - 1 ? (
                <span className="absolute left-[7px] top-5 h-full w-px bg-border" />
              ) : null}
              <span
                className={cn(
                  "absolute left-0 top-2 size-4 rounded-full border-2",
                  p.state === "current"
                    ? "border-rust bg-rust/30 pulse-node"
                    : p.state === "done"
                      ? "border-rust bg-rust"
                      : "border-border bg-background",
                )}
              />
              <div
                className={cn(
                  "rounded-lg border bg-surface p-6",
                  p.state === "current" ? "border-rust/50" : "border-border",
                )}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    {p.phase}
                  </span>
                  {p.state === "current" ? (
                    <span className="rounded-full border border-rust/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-rust">
                      Current
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm text-subtle">
          Phases describe direction, not a dated commitment. Specific future features are not
          listed until they are planned in the repository.
        </p>
      </Section>
      <CTA
        title="Help stabilize the API."
        description="Tests, docs, and API-consistency feedback are the most useful contributions in Phase 2."
      />
    </>
  );
}