import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Breadcrumbs } from "@/components/primitives";
import { TableOfContents } from "@/components/TableOfContents";
import { crates } from "@/lib/site-data";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Documentation — RustyAI" },
      {
        name: "description",
        content:
          "RustyAI documentation: concepts, crates, coordination patterns, and the runtime model for building agents in Rust.",
      },
      { property: "og:title", content: "Documentation — RustyAI" },
      {
        property: "og:description",
        content: "Learn the RustyAI agent model, crate layout, and runtime.",
      },
    ],
  }),
  component: DocsIndex,
});

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "mental-model", label: "Mental model" },
  { id: "crate-map", label: "Crate map" },
  { id: "first-look", label: "First look" },
  { id: "next", label: "Next steps" },
];

function DocsIndex() {
  return (
    <div className="grid gap-10 py-10 xl:grid-cols-[minmax(0,1fr)_180px]">
      <article className="max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Docs" }]} />
        <h1 id="introduction" className="mt-6 scroll-mt-24 text-3xl font-semibold text-balance-tight md:text-4xl">
          RustyAI documentation
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          RustyAI is an agent-oriented programming framework for Rust — batteries-included
          tooling for building autonomous, cognitive, and multi-agent systems.
        </p>

        <h2 id="mental-model" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Mental model
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          An agent is a long-lived, addressable unit with its own state and lifecycle. It
          perceives through messages, updates beliefs, selects goals, plans, commits to
          intentions, and acts. A runtime supervises populations of agents; patterns describe
          how those populations organise.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-mono text-rust">agent</span> — identity, state, lifecycle
          </li>
          <li>
            <span className="font-mono text-rust">cognition</span> — beliefs, desires,
            intentions
          </li>
          <li>
            <span className="font-mono text-rust">messaging</span> — typed, FIPA-inspired ACL
          </li>
          <li>
            <span className="font-mono text-rust">patterns</span> — coordination topologies
          </li>
          <li>
            <span className="font-mono text-rust">runtime</span> — execution and supervision
          </li>
        </ul>

        <h2 id="crate-map" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Crate map
        </h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {crates.map((c) => (
            <Link
              key={c.slug}
              to="/crates/$crate"
              params={{ crate: c.slug }}
              className="bg-surface p-4 transition-colors hover:bg-elevated"
            >
              <p className="font-mono text-[13px] text-foreground">{c.name}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{c.tagline}</p>
            </Link>
          ))}
        </div>

        <h2 id="first-look" className="mt-12 scroll-mt-24 text-xl font-semibold">
          First look
        </h2>
        <CodeBlock
          className="mt-4"
          filename="main.rs"
          code={`use rustyai::prelude::*;

#[tokio::main]
async fn main() -> Result<()> {
    let agent = AgentBuilder::new("researcher")
        .with_belief("rust_is_fast")
        .with_goal("find_solution")
        .build();

    Runtime::new().spawn(agent).run().await
}`}
        />

        <h2 id="next" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Next steps
        </h2>
        <nav className="mt-4 flex justify-end border-t border-border pt-6">
          <Link
            to="/docs/getting-started"
            className="group text-right"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              Next
            </span>
            <span className="mt-1 flex items-center gap-2 text-sm text-foreground group-hover:text-rust">
              Getting Started <ArrowRight className="size-4" />
            </span>
          </Link>
        </nav>
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}