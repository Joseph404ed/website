import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_URL, GITHUB_URL, TWITTER_URL, TELEGRAM_URL, TWITTER_HANDLE, TELEGRAM_HANDLE } from "@/lib/site-data";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
          404 · route not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          This path isn&apos;t in the routing table.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-rust px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
          <Link
            to="/docs"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-rust/60"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RustyAI — Autonomous Agents, Built in Rust" },
      {
        name: "description",
        content:
          "RustyAI is an agent-oriented programming framework for Rust for building autonomous, cognitive, and multi-agent systems.",
      },
      { name: "author", content: "RustyAI" },
      { property: "og:title", content: "RustyAI — Autonomous Agents, Built in Rust" },
      {
        property: "og:description",
        content:
          "Agent-oriented programming framework for Rust: cognition, messaging, coordination patterns, and a Tokio-powered runtime.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RustyAI" },
      { property: "og:image", content: `${SITE_URL}/assets/r-logo.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { name: "twitter:image", content: `${SITE_URL}/assets/r-logo.png` },
      { property: "telegram:channel", content: TELEGRAM_HANDLE },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/assets/r-logo.png", type: "image/png", sizes: "any" },
      { rel: "apple-touch-icon", href: "/assets/r-logo.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "RustyAI",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              description:
                "RustyAI is an agent-oriented programming framework for Rust for building autonomous, cognitive, and multi-agent systems.",
              url: `${SITE_URL}/`,
              author: { "@type": "Organization", name: "RustyAI" },
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              programmingLanguage: "Rust",
              image: `${SITE_URL}/assets/r-logo.png`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RustyAI",
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/assets/r-logo.png`,
              description: "Open-source Rust framework for building intelligent multi-agent systems",
              sameAs: [TWITTER_URL, TELEGRAM_URL, GITHUB_URL],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
