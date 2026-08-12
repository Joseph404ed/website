"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Docs', href: '/docs' },
  { label: 'Crates', href: '/crates' },
  { label: 'Examples', href: '/examples' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Solana', href: '/solana' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-[var(--cyan)]/15 backdrop-blur-md' : ''
      }`}
      style={{
        background: isScrolled ? 'rgba(10, 10, 15, 0.92)' : 'transparent',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/r-logo.png"
              alt="RustyAI"
              width={28}
              height={28}
              className="transition-opacity opacity-80 group-hover:opacity-100"
            />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-[var(--cyan)] transition-colors">
              RustyAI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/chat"
                className="btn-cyber"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
              >
                Chat
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--cyan)]/20"
            style={{ background: 'rgba(255, 255, 255, 0.96)' }}
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--cyan)]'
                      : 'text-muted-foreground hover:text-[var(--cyan)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
