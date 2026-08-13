import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const KEYWORDS =
  /\b(use|let|mut|fn|pub|struct|impl|enum|async|await|match|if|else|for|in|while|return|self|Self|crate|mod|const|static|type|where|move|dyn|trait|as|true|false)\b/;
const TYPES = /\b([A-Z][A-Za-z0-9_]*)\b/;

function highlight(line: string, key: number) {
  const tokens = line.split(/(\s+|[(){}\[\];,.:<>&?=|+\-*/!]|"[^"]*")/g);
  return (
    <span key={key}>
      {tokens.map((t, i) => {
        let cls = "";
        if (t.startsWith('"')) cls = "text-emerald-400/90";
        else if (KEYWORDS.test(t) && t.trim() === t) cls = "text-rust";
        else if (TYPES.test(t) && t.trim() === t) cls = "text-amber-200/80";
        else if (/^\d+$/.test(t)) cls = "text-sky-300/80";
        else if (/^[(){}\[\];,.:<>&?=|+\-*/!]$/.test(t)) cls = "text-subtle";
        return cls ? (
          <span key={i} className={cls}>
            {t}
          </span>
        ) : (
          <span key={i}>{t}</span>
        );
      })}
    </span>
  );
}

export function CodeBlock({
  code,
  language = "rust",
  filename,
  className,
}: {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n+$/, "").split("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {filename ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-rust/60 hover:text-foreground"
        >
          {copied ? <Check className="size-3 text-rust" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre">
              {l.trimStart().startsWith("//") ? (
                <span className="text-subtle">{l}</span>
              ) : (
                highlight(l, i)
              )}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}