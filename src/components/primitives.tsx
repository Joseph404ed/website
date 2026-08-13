import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
      <span className="size-1.5 rounded-full bg-rust pulse-node" />
      {children}
    </span>
  );
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-border/70 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-5">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold text-balance-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 duo-glow" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-24">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-balance-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px]">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight className="size-3 text-subtle" /> : null}
          {item.to ? (
            <Link
              to={item.to}
              params={item.params as never}
              className="font-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-mono text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function CTA({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-10 md:p-14">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute inset-0 duo-glow" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-balance-tight md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/docs/getting-started"
              className="rounded-md bg-rust px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
            <Link
              to="/architecture"
              className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-rust/60"
            >
              Read the architecture
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}