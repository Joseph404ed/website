import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use — RustyAI',
  description: 'Terms of use for RustyAI and rustyai.xyz.',
};

export default function TermsPage() {
  return (
    <Layout>
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Terms of Use</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance</h2>
            <p>
              By accessing rustyai.xyz or using any RustyAI service, you agree to these terms. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. The service</h2>
            <p>
              RustyAI provides an open-source multi-agent framework for Rust, documentation, working examples, and a chat interface powered by a cognitive agent. The service is provided as-is for educational and development purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Open-source license</h2>
            <p>
              The RustyAI framework is dual-licensed under MIT and Apache-2.0. You are free to use, modify, and distribute the code under the terms of either license. See each repository for the full license text.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the chat interface to generate harmful, illegal, or abusive content.</li>
              <li>Attempt to reverse-engineer, scrape, or overload the service infrastructure.</li>
              <li>Use the RustyAI name or branding to misrepresent your own products or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Token disclaimer</h2>
            <p>
              The rAI token is a community token deployed on Solana via Pump.fun. It is not a security, does not represent equity or ownership in RustyAI, and carries no guarantee of value. Participation in any token activity is at your own risk. This is not financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Disclaimer of warranties</h2>
            <p>
              The RustyAI framework and website are provided "as is" without warranties of any kind. We make no guarantees regarding uptime, correctness, or fitness for any particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, RustyAI and its contributors shall not be liable for any indirect, incidental, or consequential damages arising from your use of the framework or website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact</h2>
            <p>
              Questions? Reach us on{' '}
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
