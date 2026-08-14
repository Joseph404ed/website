import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, ExternalLink } from "lucide-react";
import { CTA, PageHeader, Section } from "@/components/primitives";
import { TOKEN_CA, SOLSCAN_URL } from "@/lib/site-data";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem — RustyAI" },
      {
        name: "description",
        content:
          "RustyAI's community layer, including a Solana-based token component, presented alongside the open-source Rust framework.",
      },
      { property: "og:title", content: "Ecosystem — RustyAI" },
      {
        property: "og:description",
        content: "The RustyAI community layer, separate from the open-source framework itself.",
      },
    ],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    await navigator.clipboard.writeText(TOKEN_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Ecosystem"
        title="RustyAI Ecosystem"
        description="Alongside the open-source framework, RustyAI has a crypto-native community layer with a Solana-based token component."
      />
      <Section className="border-t-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-8">
            <h2 className="text-lg font-medium">Scope</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The framework — agent-core, cognition, messaging, patterns, runtime, and the
              rustyai facade — is an open-source Rust project under MIT / Apache-2.0. It does
              not require, depend on, or interact with any token to build or run agents.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The community layer is a separate, optional part of the project&apos;s ecosystem.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-8">
            <h2 className="text-lg font-medium">Solana component</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A Solana-based community/token component exists as part of the wider ecosystem.
              The verified contract address is published below.
            </p>
            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                Contract address
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="flex-1 truncate font-mono text-sm text-foreground">{TOKEN_CA}</p>
                <button
                  type="button"
                  onClick={copyCA}
                  aria-label="Copy contract address"
                  className="inline-flex items-center gap-1.5 rounded border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:border-rust/60 hover:text-foreground"
                >
                  {copied ? <Check className="size-3 text-rust" /> : <Copy className="size-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <a
                href={SOLSCAN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-violet hover:opacity-80"
              >
                View on Solscan <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-subtle">
          Nothing on this page is financial advice, a price expectation, or an offer. The
          project&apos;s primary identity is Rust infrastructure for autonomous agents.
        </p>
      </Section>
      <CTA
        title="The framework comes first."
        description="Read the architecture and start building agents — no ecosystem participation required."
      />
    </>
  );
}