import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, BookText } from "lucide-react";
import { ArchitectureGraph } from "@/components/ArchitectureGraph";
import { CTA, PageHeader, Section } from "@/components/primitives";
import { crates, GITHUB_URL } from "@/lib/site-data";

export const Route = createFileRoute("/crates/")({
  head: () => ({
    meta: [
      { title: "Crates — RustyAI" },
      {
        name: "description",
        content:
          "Explore the RustyAI crates: agent-core, cognition, messaging, patterns, runtime, and the rustyai facade.",
      },
      { property: "og:title", content: "Crates — RustyAI" },
      {
        property: "og:description",
        content: "Small crates, composable architecture. Use the whole framework or only what you need.",
      },
    ],
  }),
  component: CratesPage,
});

function CratesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Crates"
        title="Small crates. Composable architecture."
        description="Use the entire framework or take only the pieces you need."
      />
      <Section className="border-t-0">
        <ArchitectureGraph />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {crates.map((c) => (
            <article
              key={c.slug}
              className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-rust/50"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-sm text-foreground">{c.name}</h2>
                <span className="font-mono text-[11px] text-subtle">{c.level}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{c.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <p className="mt-4 font-mono text-[11px] text-subtle">
                key APIs: {c.apis.join(" · ")}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-[13px]">
                <Link
                  to="/crates/$crate"
                  params={{ crate: c.slug }}
                  className="inline-flex items-center gap-1.5 text-rust hover:opacity-80"
                >
                  Details <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <BookText className="size-3.5" /> Documentation
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Github className="size-3.5" /> GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CTA
        title="Add the facade and start building."
        description="cargo add rustyai gets you the prelude, runtime, cognition, and coordination patterns."
      />
    </>
  );
}