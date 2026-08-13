import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Scale, BookText, Bug, Puzzle, FileText } from "lucide-react";
import { CTA, PageHeader, Section, SectionHeading } from "@/components/primitives";
import { GITHUB_URL, TWITTER_URL, TELEGRAM_URL } from "@/lib/site-data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — RustyAI" },
      {
        name: "description",
        content:
          "RustyAI is open source under MIT / Apache-2.0. Contribute bug reports, feature proposals, documentation, examples, and integrations.",
      },
      { property: "og:title", content: "Community — RustyAI" },
      {
        property: "og:description",
        content: "Open source, dual licensed MIT / Apache-2.0. Contributions welcome.",
      },
    ],
  }),
  component: CommunityPage,
});

const contribute = [
  { icon: Bug, title: "Bug reports", body: "Reproducible issues against a crate, with the version and a minimal example." },
  { icon: FileText, title: "Feature proposals", body: "Describe the agent problem first, then the API you would want to write." },
  { icon: BookText, title: "Documentation", body: "Guides, API prose, and corrections — the docs move as fast as the code." },
  { icon: Puzzle, title: "Examples & integrations", body: "Reference apps and adapters that show the framework in a real setting." },
];

function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Open source infrastructure, built in the open."
        description="RustyAI is developed publicly on GitHub and dual licensed under MIT / Apache-2.0."
      />
      <Section className="border-t-0">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-xl border border-border bg-surface p-10 transition-colors hover:border-rust/60"
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
            <div className="relative">
              <Github className="size-7 text-rust" />
              <h2 className="mt-5 text-2xl font-semibold">RustyAI on GitHub</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Source, issues, discussions, and the roadmap all live in the repository.
              </p>
              <span className="mt-6 inline-block font-mono text-[12px] text-rust">
                github.com → open repository
              </span>
            </div>
          </a>
          <div className="rounded-xl border border-border bg-surface p-8">
            <Scale className="size-6 text-rust" />
            <h2 className="mt-5 text-lg font-medium">Open Source</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              RustyAI is dual licensed under
            </p>
            <p className="mt-3 font-mono text-sm text-foreground">MIT / Apache-2.0</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Choose whichever licence fits your project. Contributions are accepted under the
              same dual terms.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Contribute" title="Where help lands best." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {contribute.map((c, i) => (
            <div key={c.title} className="rounded-lg border border-border bg-surface p-6">
              <c.icon className={i % 2 === 0 ? "size-5 text-rust" : "size-5 text-violet"} />
              <h3 className="mt-4 text-base font-medium">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Links"
          title="Where the project lives."
          description="Only channels that exist today are listed here."
        />
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          <li className="bg-surface p-6">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-rust">
              GitHub repository
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Code, issues, and releases.</p>
          </li>
          <li className="bg-surface p-6">
            <Link to="/docs" className="text-sm text-foreground hover:text-rust">
              Documentation
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">Guides, crates, and API reference.</p>
          </li>
          <li className="bg-surface p-6">
            <Link to="/ecosystem" className="text-sm text-foreground hover:text-rust">
              Ecosystem
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              The project&apos;s Solana-based community layer.
            </p>
          </li>
          <li className="bg-surface p-6">
            <Link to="/roadmap" className="text-sm text-foreground hover:text-rust">
              Roadmap
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">Current phase and direction to 1.0.</p>
          </li>
          <li className="bg-surface p-6">
            <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-violet">
              X / Twitter
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Announcements and updates.</p>
          </li>
          <li className="bg-surface p-6">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-violet">
              Telegram
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Community discussion.</p>
          </li>
        </ul>
        <p className="mt-6 text-sm text-subtle">
          Additional channels such as Discord will be listed here once they are officially
          published by the project.
        </p>
      </Section>

      <CTA
        title="Open an issue, or open a PR."
        description="Phase 2 is stabilization work — API consistency, tests, and docs are the highest-value contributions."
      />
    </>
  );
}