import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — RustyAI',
  description: 'Privacy policy for RustyAI and rustyai.xyz.',
};

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Overview</h2>
            <p>
              RustyAI ("we", "us", "our") operates the website at rustyai.xyz. This policy explains what information
              we collect, how we use it, and your rights regarding that information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Information we collect</h2>
            <p>
              We collect minimal information necessary to operate the service:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Messages submitted through the Chat interface — used only to generate a response and not stored permanently.</li>
              <li>Standard server logs (IP address, browser type, pages visited) — retained for up to 30 days for security and debugging.</li>
            </ul>
            <p className="mt-3">
              We do not collect names, email addresses, or payment information through this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How we use information</h2>
            <p>Information collected is used solely to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Respond to chat queries via the RustyAI cognitive agent.</li>
              <li>Monitor and maintain the security and performance of the service.</li>
            </ul>
            <p className="mt-3">We do not sell, trade, or share your information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Third-party services</h2>
            <p>This website is hosted on Railway. The chat feature uses the Anthropic API to generate responses. Please review their respective privacy policies for details on how they handle data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              This website does not use tracking or advertising cookies. Session-level cookies may be set by the hosting infrastructure for load balancing purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Open source</h2>
            <p>
              RustyAI is an open-source project. The framework code is publicly available at{' '}
              <a href="https://github.com/RustyAI" target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
                github.com/RustyAI
              </a>. Contributing to the project does not subject you to additional data collection beyond what GitHub collects.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Contact</h2>
            <p>
              For privacy-related questions, reach us on{' '}
              <a href="https://t.me/RustyAI" target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
                Telegram
              </a>{' '}or{' '}
              <a href="https://x.com/RustyAI" target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
                X / Twitter
              </a>.
            </p>
          </section>

        </div>
      </div>
    </Layout>
  );
}
