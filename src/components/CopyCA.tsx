import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { TOKEN_CA } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CopyCA({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(TOKEN_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy contract address"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-rust/60 hover:text-foreground",
        className,
      )}
    >
      <span className="uppercase tracking-[0.16em] text-subtle">CA</span>
      <span className="max-w-[9rem] truncate sm:max-w-none">{TOKEN_CA}</span>
      {copied ? <Check className="size-3 text-rust" /> : <Copy className="size-3" />}
    </button>
  );
}
