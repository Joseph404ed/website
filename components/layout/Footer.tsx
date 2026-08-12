import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  documentation: [
    { label: 'Getting Started', href: '/docs' },
    { label: 'Architecture', href: '/docs' },
    { label: 'API Reference', href: '/docs' },
    { label: 'Examples', href: '/examples' },
  ],
  crates: [
    { label: 'agent-core', href: '/crates' },
    { label: 'messaging', href: '/crates' },
    { label: 'cognition', href: '/crates' },
    { label: 'patterns', href: '/crates' },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/rustyai', external: true },
    { label: 'Twitter / X', href: 'https://x.com/RustyAI', external: true },
    { label: 'Telegram', href: 'https://t.me/RustyAI', external: true },
    { label: 'Contributing', href: 'https://github.com/rustyai', external: true },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--cyan)]/15 mt-auto"
      style={{ background: 'rgba(10, 10, 15, 0.97)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <Image
                src="/assets/r-logo.png"
                alt="RustyAI"
                width={28}
                height={28}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-[var(--cyan)] transition-colors">
                RustyAI
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-[200px]">
              Agent-Oriented Programming for Rust. Build intelligent multi-agent systems.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/rustyai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://x.com/RustyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              >
                X / Twitter ↗
              </a>
              <a
                href="https://t.me/RustyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              >
                Telegram ↗
              </a>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--cyan)] mb-4">
              Documentation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.documentation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crates */}
          <div>
            <h3 className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--cyan)] mb-4">
              Crates
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.crates.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--cyan)] mb-4">
              Community
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors font-mono"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors font-mono"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--cyan)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="terminal-text text-[0.6rem] uppercase tracking-widest opacity-50">
            © {new Date().getFullYear()} RustyAI — MIT / Apache-2.0
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[var(--cyan)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[var(--cyan)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
