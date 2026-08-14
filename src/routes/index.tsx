import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";
import { AgentGraph } from "@/components/AgentGraph";
import { ArchitectureGraph } from "@/components/ArchitectureGraph";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyCA } from "@/components/CopyCA";
import { CTA, Section, SectionHeading, StatusBadge } from "@/components/primitives";
import { crates, patterns, GITHUB_URL } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RustyAI — Autonomous Agents, Built in Rust" },
      {
        name: "description",
        content:
          "RustyAI is an agent-oriented programming framework for Rust for building autonomous, cognitive, and multi-agent systems.",
      },
      { property: "og:title", content: "RustyAI — Autonomous Agents, Built in Rust" },
      {
        property: "og:description",
        content:
          "Batteries-included Rust tooling for agents that think, communicate, coordinate, and execute.",
      },
    ],
  }),
  component: Index,
});

const bdi = [
  { label: "Beliefs", note: "belief base · certainty scoring · revision" },
  { label: "Reasoning", note: "forward-chaining inference" },
  { label: "Desires / Goals", note: "utility functions · goal selection" },
  { label: "Planning", note: "STRIPS-style planning" },
  { label: "Intentions", note: "intention stack · commitment" },
  { label: "Actions", note: "effects executed on the runtime" },
];

const targets = [
  { value: "< 1 ms", label: "agent spawn latency" },
  { value: "< 10 µs", label: "message passing" },
  { value: "100k+/s", label: "message throughput" },
  { value: "~50 KB", label: "baseline memory per agent" },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.4]" />
        <div className="pointer-events-none absolute inset-0 duo-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge>Phase 2 · Stabilization</StatusBadge>
              <CopyCA />
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-balance-tight md:text-6xl">
              Build Autonomous Systems in Rust.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              RustyAI gives developers the primitives to build agents that think,
              communicate, coordinate, and execute — with Rust&apos;s memory safety and
              high-performance async runtime.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/docs/getting-started"
                className="inline-flex items-center gap-2 rounded-md bg-rust px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Started <ArrowRight className="size-4" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-rust/60"
              >
                <Github className="size-4" /> View on GitHub
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              Rust · Tokio · Open Source · MIT / Apache-2.0
            </p>
          </div>
          <AgentGraph />
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The stack"
          title="One framework. Every layer of the agent stack."
          description="Six independently usable crates, composed into a single facade when you want the whole thing."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crates.map((c) => (
            <Link
              key={c.slug}
              to="/crates/$crate"
              params={{ crate: c.slug }}
              className="group rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-rust/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-foreground">{c.name}</span>
                <ArrowRight className="size-4 text-subtle transition-colors group-hover:text-rust" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{c.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <p className="mt-4 font-mono text-[11px] text-subtle">{c.level}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Cognition"
          title="Agents that don't just respond. They reason."
          description="The cognition crate implements a BDI loop: beliefs are asserted and revised, inference derives new facts, goals are ranked by utility, plans are synthesised, and intentions are committed to and executed."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="rounded-xl border border-border bg-surface p-6">
            {bdi.map((s, i) => (
              <li key={s.label} className="relative pl-8">
                <span className="absolute left-0 top-1.5 size-2 rounded-full bg-rust" />
                {i < bdi.length - 1 ? (
                  <span className="absolute left-[3.5px] top-4 h-full w-px bg-border" />
                ) : null}
                <p className="font-mono text-sm text-foreground">{s.label}</p>
                <p className="pb-6 pt-1 text-sm text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ol>
          <CodeBlock
            filename="cognition.rs"
            code={`use rustyai::prelude::*;

let mut mind = Cognition::new();

mind.beliefs.assert("shard_hot", 0.86);
mind.beliefs.revise("shard_hot", Evidence::Observed);

mind.desires.push(Goal::new("rebalance").utility(|b| {
    b.certainty("shard_hot") * 0.8
});

let plan = mind.plan()?;
mind.intentions.commit(plan);`}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Coordination"
          title="From one agent to an entire society."
          description="Eight coordination patterns, each a topology you can drop onto a population of agents instead of hand-rolling orchestration."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {patterns.map((p, i) => (
            <Link
              key={p.slug}
              to="/patterns"
              hash={p.slug}
              className="group bg-surface p-6 transition-colors hover:bg-elevated"
            >
              <svg viewBox="0 0 60 40" className="h-10 w-16" aria-hidden="true">
                <g stroke="var(--border)" fill="none" strokeWidth="1">
                  <path d="M30 8 L12 32 M30 8 L48 32 M12 32 L48 32" />
                </g>
                <circle cx="30" cy="8" r="3" fill={i % 2 === 0 ? "var(--rust)" : "var(--violet)"} />
                <circle cx="12" cy="32" r="3" fill="var(--subtle)" />
                <circle cx="48" cy="32" r="3" fill="var(--subtle)" />
              </svg>
              <p className="mt-4 font-mono text-sm text-foreground">{p.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Built for Rust"
          title="The agent stack, without the overhead."
          description="Agent systems are long-lived, concurrent, and failure-prone. Rust removes an entire class of runtime surprises before the first agent spawns."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {[
              "Memory safety",
              "Compile-time concurrency",
              "Zero-cost abstractions",
              "Native async",
              "Low overhead",
              "Predictable execution",
            ].map((f) => (
              <li key={f} className="bg-surface px-5 py-6 text-sm text-foreground">
                <span className="mr-2 font-mono text-rust">›</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust">
              Design targets
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {targets.map((t) => (
                <div key={t.label}>
                  <p className="font-mono text-2xl text-foreground">{t.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-subtle">
              These are design targets that guide the framework&apos;s implementation, not
              independently verified benchmark results.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Architecture"
          title="Deliberately split into independently usable crates."
          description="Take the facade, or depend only on the layer you need."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ArchitectureGraph />
          <CodeBlock
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
        </div>
      </Section>

      <CTA
        title="Start with one agent."
        description="Install the facade crate, spawn an agent, and grow into a full society when you need it."
      />
    </>
  );
}
