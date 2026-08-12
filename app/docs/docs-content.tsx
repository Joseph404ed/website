import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronRight, Code, Cpu, Network, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { MotionDiv } from '@/components/framer/motion';

const docSections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn the basics and build your first agent in minutes.',
    href: '/docs/getting-started',
    external: false,
  },
  {
    icon: Cpu,
    title: 'Architecture',
    description: 'Understand the modular polyrepo design and how components work together.',
    href: '/crates',
    external: false,
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Complete API documentation for all public interfaces.',
    href: '/examples',
    external: false,
  },
  {
    icon: Network,
    title: 'Patterns',
    description: 'Explore organizational patterns like hierarchy, swarm, and market.',
    href: '/examples',
    external: false,
  },
];

export default function Docs() {
  return (
    <Layout>
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Documentation</span>
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to build multi-agent systems with RustyAI.
          </p>
        </MotionDiv>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
          {docSections.map((section, i) => {
            const inner = (
              <>
                <div
                  className="h-14 w-14 flex items-center justify-center mb-5 rounded-lg"
                  style={{ background: 'rgba(232,71,28,0.15)', border: '1px solid rgba(232,71,28,0.25)' }}
                >
                  <section.icon className="h-6 w-6 text-[var(--cyan)]" />
                </div>
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {section.description}
                </p>
                <span className="text-sm font-medium flex items-center gap-1 text-[var(--cyan)]">
                  {section.external ? (
                    <>Open GitHub <ExternalLink className="h-3.5 w-3.5" /></>
                  ) : (
                    <>Read more <ArrowRight className="h-3.5 w-3.5" /></>
                  )}
                </span>
              </>
            );

            return (
              <MotionDiv
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {section.external ? (
                  <a
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="holo-frame feature-card flex flex-col h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={section.href} className="holo-frame feature-card flex flex-col h-full">
                    {inner}
                  </Link>
                )}
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
