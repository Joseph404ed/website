# RustyAI Website

The official documentation and landing page for RustyAI - a comprehensive Rust framework for building intelligent, autonomous multi-agent systems.

## 🎯 Overview

This website serves as the primary resource for developers exploring RustyAI, featuring:

- **Landing Page** - Introduction to agent-oriented programming with RustyAI
- **Documentation** - Comprehensive guides, tutorials, and API references
- **Examples** - Interactive code samples and real-world use cases
- **Crate Documentation** - Detailed docs for all 10 crates
- **Use Cases** - Industry applications (blockchain, trading, IoT, enterprise)
- **Getting Started Guide** - Quick-start tutorials for new developers

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (optional)
- **Syntax Highlighting**: Prism.js or Shiki
- **Deployment**: Vercel (recommended)
- **Analytics**: (optional - Vercel Analytics, Google Analytics)

## 📁 Project Structure
```
rustyai-website/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── docs/
│   │   ├── page.tsx            # Docs homepage
│   │   ├── getting-started/    # Getting started guide
│   │   ├── core/               # agent-core docs
│   │   ├── messaging/          # messaging docs
│   │   ├── cognition/          # cognition docs
│   │   ├── patterns/           # patterns docs
│   │   ├── runtime/            # runtime docs
│   │   └── ...
│   ├── examples/
│   │   └── page.tsx            # Code examples
│   ├── use-cases/
│   │   └── page.tsx            # Industry use cases
│   ├── roadmap/
│   │   └── page.tsx            # Project roadmap
│   └── api/                    # API routes (if needed)
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── docs/
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── TOC.tsx             # Table of contents
│   │   └── Breadcrumbs.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── Examples.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   └── markdown.ts             # Markdown processing
├── content/
│   └── docs/                   # Markdown documentation files
│       ├── getting-started.md
│       ├── core/
│       ├── messaging/
│       └── ...
├── public/
│   ├── logo.svg                # RustyAI logo
│   ├── images/
│   └── favicons/
├── styles/
│   └── globals.css             # Global styles
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/rustyai/rustyai-website.git
cd rustyai-website

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development
```bash
# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build
```bash
# Create production build
npm run build

# Start production server
npm run start
```

## 📝 Content Management

### Adding Documentation

1. Create a new Markdown file in `content/docs/`
2. Add frontmatter:
```markdown
   ---
   title: "Your Page Title"
   description: "Page description"
   order: 1
   ---
   
   # Your Content Here
```
3. The page will be automatically rendered

### Adding Code Examples

Use the `CodeBlock` component:
```tsx
<CodeBlock language="rust">
{`
use rustyai::prelude::*;

fn main() {
    let agent = Agent::new("example");
}
`}
</CodeBlock>
```

### Navigation Structure

Edit `lib/navigation.ts` to modify the sidebar navigation:
```ts
export const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Agents', href: '/docs/core/agents' },
      { title: 'Messages', href: '/docs/messaging' },
      // ...
    ],
  },
];
```

## 🎨 Styling

### Tailwind CSS

The site uses Tailwind CSS for styling. Key design tokens:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#CE422B',    // Rust orange
        secondary: '#2C3E50',  // Dark gray
        background: '#F5F7FA', // Light neutral
        grid: '#E8ECEF',       // Subtle grid lines
      },
    },
  },
};
```

### Design System

- **Font**: Inter or Poppins for headings, System font stack for body
- **Code Font**: JetBrains Mono or Fira Code
- **Background**: Subtle grid pattern overlay
- **Theme**: Light mode default, dark mode toggle

## 🔍 SEO & Meta

Each page includes proper meta tags:
```tsx
export const metadata = {
  title: 'RustyAI - Agent-Oriented Programming in Rust',
  description: 'Build intelligent, autonomous multi-agent systems...',
  openGraph: {
    title: 'RustyAI',
    description: '...',
    images: ['/og-image.png'],
  },
};
```

## 📊 Features

### Implemented

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Syntax-highlighted code blocks
- ✅ Dark/light mode toggle
- ✅ Search functionality (Algolia DocSearch or custom)
- ✅ Table of contents for docs
- ✅ Breadcrumb navigation
- ✅ Copy-to-clipboard for code
- ✅ Mobile hamburger menu

### Planned

- 🔲 Interactive code playground
- 🔲 API documentation integration (docs.rs)
- 🔲 Blog for announcements
- 🔲 Newsletter signup
- 🔲 GitHub integration (star count, latest release)

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically on push to `main`
```bash
# Or deploy via CLI
vercel --prod
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://rustyai.dev
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
```

## 📚 Documentation Content

### Required Pages

- **Home** - Landing page with hero, features, examples
- **Getting Started** - Installation, quick start, first agent
- **Documentation Hub** - Overview of all crates
- **agent-core** - Agent primitives, identity, lifecycle
- **messaging** - Communication protocols, FIPA ACL
- **cognition** - BDI architecture, planning, reasoning
- **patterns** - 8 organizational patterns
- **runtime** - Execution, scheduling, supervision
- **Examples** - Real-world code samples
- **Use Cases** - Blockchain, trading, IoT, enterprise
- **Roadmap** - Project status and future plans
- **Contributing** - How to contribute

## 🎯 Content Strategy

### Homepage Sections

1. **Hero** - Tagline + CTA (Get Started, View Docs)
2. **What is RustyAI** - Brief introduction
3. **Key Features** - 4-6 feature cards
4. **Code Example** - Show vs tell (before/after)
5. **Use Cases** - Industry applications
6. **Crate Overview** - Quick intro to all 10 crates
7. **Stats** - 10 crates, 50% complete, open source
8. **CTA** - Get started today

### Documentation Structure
```
Getting Started
├── Introduction
├── Installation
├── Quick Start
└── Core Concepts

Crates
├── agent-core
├── messaging
├── cognition
├── patterns
├── runtime
├── rustyai-deploy
├── rustyai-tools
├── rustyai (facade)
├── examples
└── docs

Guides
├── Building Your First Agent
├── Multi-Agent Communication
├── BDI Architecture
├── Swarm Coordination
└── Production Deployment

Examples
├── Trading Bot
├── IoT Sensor Network
├── Blockchain Monitor
└── Supply Chain

API Reference
└── (Links to docs.rs for each crate)
```

## 🔗 External Links

- **GitHub**: https://github.com/rustyai
- **Crates.io**: https://crates.io/crates/rustyai
- **Docs.rs**: https://docs.rs/rustyai

## 🤝 Contributing

Contributions to the website are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License

This website code is licensed under MIT.

The RustyAI framework is licensed under MIT/Apache-2.0.

---

## 🚀 Quick Commands
```bash
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run format        # Format with Prettier

# Content
npm run new-doc       # Generate new doc page (if script exists)
npm run check-links   # Validate internal links (if script exists)
```

---

*Built with Rusted-Mind for the RustyAI community*