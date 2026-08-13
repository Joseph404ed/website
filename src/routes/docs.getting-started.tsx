import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Breadcrumbs } from "@/components/primitives";
import { TableOfContents } from "@/components/TableOfContents";

export const Route = createFileRoute("/docs/getting-started")({
  head: () => ({
    meta: [
      { title: "Getting Started — RustyAI" },
      {
        name: "description",
        content:
          "Install RustyAI with cargo add rustyai and build your first agent: beliefs, goals, messaging, and running inside the runtime.",
      },
      { property: "og:title", content: "Getting Started — RustyAI" },
      {
        property: "og:description",
        content: "Your first Rust agent in a few minutes.",
      },
    ],
  }),
  component: GettingStarted,
});

const toc = [
  { id: "install", label: "Install" },
  { id: "create", label: "Create an agent" },
  { id: "beliefs", label: "Give it beliefs" },
  { id: "goals", label: "Define goals" },
  { id: "messages", label: "Send messages" },
  { id: "run", label: "Run it" },
];

function GettingStarted() {
  return (
    <div className="grid gap-10 py-10 xl:grid-cols-[minmax(0,1fr)_180px]">
      <article className="max-w-3xl">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Docs", to: "/docs" }, { label: "Getting Started" }]}
        />
        <h1 className="mt-6 text-3xl font-semibold text-balance-tight md:text-4xl">
          Your first agent.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Five short steps: install the facade crate, define an agent, give it beliefs and a
          goal, let it talk to other agents, and run it under the runtime.
        </p>

        <h2 id="install" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Install
        </h2>
        <CodeBlock className="mt-4" language="bash" filename="shell" code={`cargo add rustyai`} />

        <h2 id="create" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Create an agent
        </h2>
        <CodeBlock
          className="mt-4"
          filename="main.rs"
          code={`use rustyai::prelude::*;

#[tokio::main]
async fn main() {
    // Create and run your first agent
    let agent = AgentBuilder::new("researcher").build();
}`}
        />

        <h2 id="beliefs" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Give it beliefs
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Beliefs are what the agent currently holds to be true, each with a certainty score
          that can be revised as new evidence arrives.
        </p>
        <CodeBlock
          className="mt-4"
          filename="beliefs.rs"
          code={`let agent = AgentBuilder::new("researcher")
    .with_belief("rust_is_fast")
    .with_belief_certainty("index_is_stale", 0.6)
    .build();`}
        />

        <h2 id="goals" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Define goals
        </h2>
        <CodeBlock
          className="mt-4"
          filename="goals.rs"
          code={`let agent = AgentBuilder::new("researcher")
    .with_belief("rust_is_fast")
    .with_goal("find_solution")
    .build();`}
        />

        <h2 id="messages" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Send messages
        </h2>
        <CodeBlock
          className="mt-4"
          filename="messaging.rs"
          code={`let msg = AclMessage::new(Performative::Request)
    .to("agent://indexer")
    .content("reindex shard 7");

ctx.send(msg).await?;`}
        />

        <h2 id="run" className="mt-12 scroll-mt-24 text-xl font-semibold">
          Run it inside the runtime
        </h2>
        <CodeBlock
          className="mt-4"
          filename="main.rs"
          code={`#[tokio::main]
async fn main() -> Result<()> {
    Runtime::builder()
        .supervisor(RestartPolicy::exponential_backoff())
        .spawn(agent)
        .run()
        .await
}`}
        />

        <nav className="mt-12 flex justify-between border-t border-border pt-6">
          <Link to="/docs" className="group">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              Previous
            </span>
            <span className="mt-1 flex items-center gap-2 text-sm text-foreground group-hover:text-rust">
              <ArrowLeft className="size-4" /> Introduction
            </span>
          </Link>
        </nav>
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}