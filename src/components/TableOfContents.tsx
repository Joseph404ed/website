export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          On this page
        </p>
        <ul className="mt-3 space-y-1.5">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className="block text-[13px] text-muted-foreground transition-colors hover:text-rust"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}