import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Github, ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Breadcrumbs, CTA, Section } from "@/components/primitives";
import { crates, GITHUB_URL } from "@/lib/site-data";

export const Route = createFileRoute("/crates/$crate")({
  loader: ({ params }) => {
    const crate = crates.find((c) => c.slug === params.crate);
    if (!crate) throw notFound();
    return { crate };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Crate not found — RustyAI" }, { name: "robots", content: "noindex" }],
      };
    }
    const { crate } = loaderData;
    return {
      meta: [
        { title: `${crate.name} — RustyAI crates` },
        { name: "description", content: crate.description },
        { property: "og:title", content: `${crate.name} — RustyAI crates` },
        { property: "og:description", content: crate.description },
      ],
    };
  },
  component: CratePage,
});

function CratePage() {
  const { crate } = Route.useLoaderData();
  const dependents = crates.filter((c) => c.depends.includes(crate.slug));

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-5 py-14">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Crates", to: "/crates" },
              { label: crate.name },
            ]}
          />
          <h1 className="mt-6 font-mono text-3xl text-foreground md:text-4xl">{crate.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{crate.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
              {crate.level}
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground hover:border-rust/60 hover:text-foreground"
            >
              <Github className="size-3" /> Source
            </a>
          </div>
        </div>
      </header>

      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-xl font-semibold">Purpose</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{crate.description}</p>

            <h2 className="mt-10 text-xl font-semibold">Key APIs</h2>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {crate.apis.map((a) => (
                <li key={a} className="bg-surface px-4 py-3 font-mono text-[13px] text-foreground">
                  {a}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-semibold">Dependencies</h2>
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              {crate.depends.length ? crate.depends.join(" · ") : "No RustyAI dependencies — this is the foundation."}
            </p>
            {dependents.length ? (
              <p className="mt-2 font-mono text-sm text-subtle">
                used by: {dependents.map((d) => d.name).join(" · ")}
              </p>
            ) : null}
          </div>
          <div>
            <CodeBlock filename={`${crate.name}.rs`} code={crate.code} />
            <CodeBlock
              className="mt-4"
              language="toml"
              filename="Cargo.toml"
              code={`[dependencies]\n${crate.name} = "0.2"`}
            />
          </div>
        </div>
        <div className="mt-12">
          <Link
            to="/crates"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All crates
          </Link>
        </div>
      </Section>

      <CTA
        title="See it in a running system."
        description="The xbot case study shows agent-core and cognition driving a long-lived autonomous application."
      />
    </>
  );
}