import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureGraph } from "@/components/ArchitectureGraph";
import { CTA, PageHeader, Section, SectionHeading } from "@/components/primitives";
import { crates } from "@/lib/site-data";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — RustyAI" },
      {
        name: "description",
        content:
          "How RustyAI is layered: agent-core, messaging, cognition, patterns, runtime, and the rustyai facade crate.",
      },
      { property: "og:title", content: "Architecture — RustyAI" },
      {
        property: "og:description",
        content: "A layered, independently usable crate architecture for Rust agent systems.",
      },
    ],
  }),
  component: ArchitecturePage,
});

const rationale = [
  {
    title: "Composability over monoliths",
    body: "A service that only needs typed agent messaging should not compile a planner. Each crate is usable on its own with a minimal dependency surface.",
  },
  {
    title: "Layered dependencies",
    body: "Dependencies only ever point downward: coordination depends on transport, transport depends on the agent foundation. No cycles, no surprise coupling.",
  },
  {
    title: "Stable foundation, evolving edges",
    body: "agent-core changes slowly and deliberately. Higher layers such as patterns and cognition can iterate without destabilising everything below.",
  },
  {
    title: "One facade when you want it",
    body: "The rustyai crate re-exports the whole stack behind a single prelude for applications that would rather not manage six dependencies.",
  },
];

function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="A layered agent stack, split into crates you can adopt one at a time."
        description="RustyAI is organised as a dependency graph rather than a framework blob. Hover any crate below to trace what it depends on and the role it plays in the API."
      />
      <Section className="border-t-0">
        <ArchitectureGraph />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {rationale.map((r) => (
            <div key={r.title} className="rounded-lg border border-border bg-surface p-6">
              <h3 className="text-base font-medium text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Layers"
          title="What lives where."
        />
        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-elevated font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              <tr>
                <th className="px-5 py-3">Crate</th>
                <th className="px-5 py-3">Layer</th>
                <th className="px-5 py-3">Depends on</th>
                <th className="px-5 py-3">Key APIs</th>
              </tr>
            </thead>
            <tbody>
              {crates.map((c) => (
                <tr key={c.slug} className="border-t border-border bg-surface">
                  <td className="px-5 py-4 font-mono text-foreground">{c.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.level}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-subtle">
                    {c.depends.join(", ") || "—"}
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] text-muted-foreground">
                    {c.apis.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CTA
        title="Explore the crates."
        description="Every crate has its own page with purpose, dependency level, and a code sketch."
      />
    </>
  );
}