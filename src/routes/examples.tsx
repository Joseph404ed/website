import { createFileRoute, Link } from "@tanstack/react-router";
import { CTA, PageHeader, Section } from "@/components/primitives";
import { examples } from "@/lib/site-data";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Examples — RustyAI" },
      {
        name: "description",
        content:
          "Reference architectures for RustyAI: trading agents, self-healing services, robotics swarms, reasoning chatbots, enterprise automation, and game AI.",
      },
      { property: "og:title", content: "Examples — RustyAI" },
      {
        property: "og:description",
        content: "Reference architectures for autonomous, cognitive, and multi-agent Rust systems.",
      },
    ],
  }),
  component: ExamplesPage,
});

function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-4">
      <div className="flex min-w-max items-center gap-2">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span className="rounded border border-border bg-elevated px-2.5 py-1.5 font-mono text-[11px] text-foreground">
              {n}
            </span>
            {i < nodes.length - 1 ? (
              <svg width="26" height="8" aria-hidden="true">
                <path d="M0 4 H26" stroke="var(--rust)" strokeWidth="1" className="flow-line" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamplesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Examples"
        title="What people build with agents."
        description="Reference architectures showing how the crates combine for different classes of autonomous system."
      />
      <Section className="border-t-0">
        <div className="grid gap-4 md:grid-cols-2">
          {examples.map((e) => (
            <article
              key={e.slug}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-rust/50"
            >
              <h2 className="text-lg font-medium text-foreground">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
              <div className="mt-5">
                <Flow nodes={e.nodes} />
              </div>
              <p className="mt-4 font-mono text-[11px] text-subtle">
                crates: {e.stack.join(" · ")}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-subtle">
          These are architectural illustrations of how the framework is intended to be used.
          The one production deployment documented on this site is{" "}
          <Link to="/xbot" className="text-rust hover:opacity-80">
            xbot
          </Link>
          .
        </p>
      </Section>
      <CTA
        title="Pick an architecture and start."
        description="Getting Started walks through beliefs, goals, messaging, and running an agent inside the runtime."
      />
    </>
  );
}