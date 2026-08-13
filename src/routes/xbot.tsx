import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/CodeBlock";
import { CTA, PageHeader, Section, SectionHeading } from "@/components/primitives";

export const Route = createFileRoute("/xbot")({
  head: () => ({
    meta: [
      { title: "xbot — A RustyAI agent in production" },
      {
        name: "description",
        content:
          "xbot is an autonomous Twitter/X application built with RustyAI's agent-core and cognition crates: scheduled posting, content generation, and safety filtering.",
      },
      { property: "og:title", content: "xbot — A RustyAI agent in production" },
      {
        property: "og:description",
        content: "A long-lived autonomous agent built on RustyAI, not a toy simulation.",
      },
    ],
  }),
  component: XbotPage,
});

const pipeline = [
  { label: "Scheduler", note: "4 scheduled posts per day" },
  { label: "xbot Agent", note: "lifecycle, state, long-lived execution" },
  { label: "Cognition", note: "beliefs about topics and recent output" },
  { label: "Content Generation", note: "5 content categories, AI-generated" },
  { label: "Safety Filter", note: "content screened before publication" },
  { label: "Twitter / X", note: "publish" },
];

const facts = [
  { k: "4", v: "scheduled posts / day" },
  { k: "5", v: "content categories" },
  { k: "2", v: "crates: agent-core, cognition" },
  { k: "24/7", v: "long-lived runtime behaviour" },
];

function XbotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case study"
        title="A real autonomous agent, running in production."
        description="xbot is an autonomous Twitter/X application built using RustyAI's agent-core and cognition crates."
      />
      <Section className="border-t-0">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.v} className="bg-surface px-5 py-6">
              <p className="font-mono text-2xl text-foreground">{f.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Pipeline"
              title="Scheduler → agent → cognition → content → safety → publish."
            />
            <ol className="mt-8 rounded-xl border border-border bg-surface p-6">
              {pipeline.map((s, i) => (
                <li key={s.label} className="relative pl-8">
                  <span className="absolute left-0 top-1.5 size-2 rounded-full bg-rust" />
                  {i < pipeline.length - 1 ? (
                    <span className="absolute left-[3.5px] top-4 h-full w-px bg-border" />
                  ) : null}
                  <p className="font-mono text-sm text-foreground">{s.label}</p>
                  <p className="pb-6 pt-1 text-sm text-muted-foreground">{s.note}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <CodeBlock
              filename="xbot.rs"
              code={`use rustyai::prelude::*;

#[tokio::main]
async fn main() -> Result<()> {
    let xbot = AgentBuilder::new("xbot")
        .with_belief("audience_prefers_technical")
        .with_goal("post_daily")
        .schedule(Cron::daily_at(&["08:00", "12:00", "16:00", "20:00"]))
        .build();

    Runtime::builder()
        .supervisor(RestartPolicy::exponential_backoff())
        .spawn(xbot)
        .run()
        .await
}`}
            />
            <div className="mt-6 rounded-lg border border-border bg-surface p-6">
              <h3 className="text-base font-medium">Why it matters</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                xbot exercises the parts of an agent framework that only surface over time:
                lifecycle management across restarts, belief state that has to stay coherent
                between runs, scheduled autonomous execution, and a safety boundary between
                generation and publication.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <CTA
        title="Build your own long-lived agent."
        description="Start from the same primitives xbot uses: agent-core for lifecycle, cognition for beliefs and goals."
      />
    </>
  );
}