"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Zap, Shield, RefreshCw, ArrowRight, ExternalLink, ChevronRight,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

// ─── Terminal animation ───────────────────────────────────────────────────────

const DEMO_LINES = [
  { text: '╔══════════════════════════════════════════════════╗', delay: 0,    color: 'text-cyan-400' },
  { text: '║  RustyAI × Solana - Autonomous Trading Swarm  ║', delay: 80,   color: 'text-cyan-400' },
  { text: '║  6 agents · BDI reasoning · Supervision         ║', delay: 160,  color: 'text-cyan-400' },
  { text: '╚══════════════════════════════════════════════════╝', delay: 240,  color: 'text-cyan-400' },
  { text: '', delay: 320, color: '' },
  { text: '  Spawning 6 agents...', delay: 400, color: 'text-zinc-400' },
  { text: '  ✓ 6 agents registered with Supervisor', delay: 700, color: 'text-emerald-400' },
  { text: '', delay: 850, color: '' },
  { text: '━━━ Round 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 950,  color: 'text-zinc-500' },
  { text: '  [PriceOracle]  SOL/USDC: $142.50  (+0.00%)', delay: 1050, color: 'text-zinc-300' },
  { text: '  [TraderGamma]  ⚡ Crash #1 - Supervisor restarting...', delay: 1200, color: 'text-amber-400' },
  { text: '  [TraderGamma]  ⚡ Crash #2 - Supervisor restarting...', delay: 1500, color: 'text-amber-400' },
  { text: '', delay: 1700, color: '' },
  { text: '━━━ Round 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 1800, color: 'text-zinc-500' },
  { text: '  [PriceOracle]  SOL/USDC: $145.20  (+1.89%)', delay: 1900, color: 'text-zinc-300' },
  { text: '  [TraderAlpha]  sol_price=142.50  →  BUY  @ $143.24', delay: 2050, color: 'text-emerald-400' },
  { text: '  [TraderBeta]   sol_price=142.50  →  BUY  @ $145.15', delay: 2200, color: 'text-emerald-400' },
  { text: '  [RiskMonitor]  trend=BULLISH ↑', delay: 2350, color: 'text-blue-400' },
  { text: '  [Auctioneer]   ✓ Accept → TraderBeta wins @ $145.15', delay: 2550, color: 'text-cyan-400' },
  { text: '', delay: 2700, color: '' },
  { text: '━━━ Round 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 2800, color: 'text-zinc-500' },
  { text: '  [PriceOracle]  SOL/USDC: $143.80  (-0.96%)', delay: 2900, color: 'text-zinc-300' },
  { text: '  [TraderAlpha]  sol_price=145.20  →  HOLD (target $144.00)', delay: 3050, color: 'text-zinc-400' },
  { text: '  [TraderBeta]   sol_price=145.20  →  BUY  @ $146.57', delay: 3200, color: 'text-emerald-400' },
  { text: '  [TraderGamma]  ✓ Recovered after 2 crash(es) - running stable', delay: 3400, color: 'text-emerald-500' },
  { text: '  [RiskMonitor]  trend=BEARISH ↓', delay: 3600, color: 'text-blue-400' },
  { text: '  [Auctioneer]   ✓ Accept → TraderBeta wins @ $146.57', delay: 3800, color: 'text-cyan-400' },
  { text: '', delay: 3950, color: '' },
  { text: '━━━ Round 5 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 4050, color: 'text-zinc-500' },
  { text: '  [PriceOracle]  SOL/USDC: $148.60  (too high)', delay: 4150, color: 'text-zinc-300' },
  { text: '  [TraderAlpha]  sol_price=148.60  →  HOLD (target $144.00)', delay: 4300, color: 'text-zinc-400' },
  { text: '  [TraderBeta]   sol_price=148.60  →  HOLD (target $148.00)', delay: 4450, color: 'text-zinc-400' },
  { text: '  [TraderGamma]  sol_price=148.60  →  HOLD (target $146.00)', delay: 4600, color: 'text-zinc-400' },
  { text: '', delay: 4750, color: '' },
  { text: '━━━ Session Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 4850, color: 'text-zinc-500' },
  { text: '  Price rounds:    5   (SOL/USDC simulated feed)', delay: 4950, color: 'text-zinc-300' },
  { text: '  Trades settled:  3', delay: 5050, color: 'text-emerald-400' },
  { text: '  Crashes handled: 2   (auto-recovered by Supervisor)', delay: 5150, color: 'text-emerald-400' },
  { text: '  Framework:       RustyAI v0.1 · github.com/RustyAI', delay: 5300, color: 'text-cyan-400' },
  { text: '', delay: 5400, color: '' },
  { text: '  ✓ Demo complete. Zero human intervention.', delay: 5500, color: 'text-emerald-500' },
];

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    DEMO_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, line.delay));
    });
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <div ref={containerRef} className="relative rounded-xl border border-zinc-700 bg-zinc-950 overflow-hidden shadow-2xl">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-zinc-500 font-mono">
          examples - cargo run --example solana_swarm
        </span>
        {!started && (
          <button
            onClick={() => setStarted(true)}
            className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
          >
            ▶ run
          </button>
        )}
        {started && visibleLines >= DEMO_LINES.length && (
          <button
            onClick={() => { setVisibleLines(0); setStarted(false); setTimeout(() => setStarted(true), 100); }}
            className="ml-auto text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> replay
          </button>
        )}
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed h-80 overflow-y-auto">
        {DEMO_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color || 'text-zinc-300'} whitespace-pre`}>
            {line.text || ' '}
          </div>
        ))}
        {started && visibleLines < DEMO_LINES.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ─── Use-case cards ───────────────────────────────────────────────────────────

const useCases = [
  {
    icon: TrendingUp,
    title: 'DeFi Trading Bots',
    description: 'Deploy a swarm of trader agents that watch on-chain prices, deliberate with BDI reasoning, and submit sealed bids in a coordinated auction - all in Rust. No Python glue, no race conditions.',
    tags: ['BDI reasoning', 'Market pattern', 'Sealed-bid auction'],
    example: 'solana_swarm',
  },
  {
    icon: Zap,
    title: 'MEV & Jito Automation',
    description: 'Spin up autonomous bundle-building agents that monitor the mempool, reason about arbitrage opportunities, and submit bundles via Jito. Agents coordinate without a central controller.',
    tags: ['Swarm pattern', 'FIPA messaging', 'Parallel execution'],
    example: 'swarm_pattern',
  },
  {
    icon: RefreshCw,
    title: 'Self-Healing RPC Nodes',
    description: 'Agent monitors your RPC health, detects failures with CircuitBreaker, and spins up backup nodes automatically. Four restart strategies: Never, Always, OnFailure, ExponentialBackoff.',
    tags: ['Supervisor', 'CircuitBreaker', 'ExponentialBackoff'],
    example: 'supervised_agents',
  },
  {
    icon: Shield,
    title: 'On-Chain Risk Monitor',
    description: 'Persistent agents watch wallet balances, liquidity pool ratios, and price feeds. Subscribe to events, update beliefs, and fire alerts or transactions when thresholds are crossed.',
    tags: ['BeliefBase', 'CognitiveAgent', 'Subscribe performative'],
    example: 'cognitive_agent',
  },
];

// ─── Why Rust section ─────────────────────────────────────────────────────────

const rustPoints = [
  {
    heading: 'Same language as your programs',
    body: 'Solana programs are Rust. Your agents are Rust. No FFI, no marshalling, no context switching between Python and on-chain logic.',
  },
  {
    heading: 'Memory safety without GC pauses',
    body: 'Tokio async runtime, zero-cost abstractions, no garbage collector. Critical for latency-sensitive MEV and trading bots where milliseconds matter.',
  },
  {
    heading: 'Compile-time agent contracts',
    body: 'The Agent trait is enforced at compile time. If your agent compiles, it satisfies the framework\'s lifecycle contract. No runtime surprises.',
  },
];

// ─── Code snippet ─────────────────────────────────────────────────────────────

const traderSnippet = `// BDI deliberation inside your trader agent
fn deliberate(&self, price: f64) -> Intention {
    let margin = (self.target_price - price) / self.target_price;

    if margin > 0.005 && self.budget > price {
        // Belief: price is below target
        // Desire: profit
        // Intention: BUY and bid
        Intention::Buy(price * (1.0 + margin * 0.5))
    } else {
        Intention::Hold
    }
}`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolanaPage() {
  return (
    <Layout>
      <div>
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">For Solana Builders</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Autonomous agents for Solana {' '}
              <span className="text-primary">in Rust</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              RustyAI lets you build trading bots, MEV agents, and self-healing infrastructure
              as a swarm of autonomous Rust programs that coordinate, reason, and recover - without a central controller.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/RustyAI/examples" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Run the demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/docs/getting-started">
                <Button variant="outline" size="lg">
                  Get started
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatedTerminal />
            <p className="text-center text-xs text-muted-foreground mt-3">
              Live demo - watch 6 autonomous agents coordinate a SOL/USDC trading session.
              TraderGamma crashes twice and recovers on its own.
            </p>
          </motion.div>
        </section>

        {/* What you just saw */}
        <section className="border-y bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-center text-muted-foreground">
                What you just saw - explained
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">6</div>
                  <div className="font-medium mb-1">Autonomous agents</div>
                  <div className="text-muted-foreground">PriceOracle · 3 Traders · RiskMonitor · Auctioneer - each running independently</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">BDI</div>
                  <div className="font-medium mb-1">Beliefs-Desires-Intentions</div>
                  <div className="text-muted-foreground">Each trader reasons about price vs target and decides buy/hold/sell on its own</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">2</div>
                  <div className="font-medium mb-1">Crashes auto-recovered</div>
                  <div className="text-muted-foreground">Supervisor caught TraderGamma failing and restarted it with exponential backoff</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Solana builders are using it for</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every use case below has a working example you can run with a single command.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <uc.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2">{uc.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{uc.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {uc.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://github.com/RustyAI/examples/blob/main/examples/${uc.example}.rs`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-mono flex items-center gap-1 hover:underline"
                    >
                      cargo run --example {uc.example} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BDI code snippet */}
        <section className="border-t bg-muted/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Agents that actually think
                </h2>
                <p className="text-muted-foreground mb-6">
                  Each trader has a <strong>BeliefBase</strong> (what it knows), a <strong>Desire</strong> (profit),
                  and derives an <strong>Intention</strong> every tick. This is the Beliefs-Desires-Intentions
                  model from cognitive science - running in your Rust binary.
                </p>
                <p className="text-muted-foreground mb-6">
                  Agents don't need a database or LLM for simple reasoning. The BDI engine
                  is deterministic and fast - ideal for latency-sensitive trading.
                </p>
                <Link href="/docs/getting-started">
                  <Button variant="outline" size="sm">
                    Build your first agent <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="min-w-0"
              >
                <div className="rounded-xl border border-zinc-700 bg-zinc-950 overflow-hidden w-full">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                    <span className="ml-2 text-xs text-zinc-500 font-mono">trader_agent.rs</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed w-full">
                    <code>
                      {traderSnippet.split('\n').map((line, i) => {
                        const isComment = line.trim().startsWith('//');
                        const isKeyword = /\b(fn|let|if|else|self|pub|f64|bool)\b/.test(line);
                        return (
                          <div key={i} className={isComment ? 'text-zinc-500' : 'text-zinc-200'}>
                            {line || ' '}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Rust */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Rust?</h2>
            <p className="text-muted-foreground">
              Because your on-chain programs are already Rust. Your agents should be too.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {rustPoints.map((point, i) => (
              <motion.div
                key={point.heading}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="feature-card flex gap-4"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{point.heading}</h3>
                  <p className="text-muted-foreground text-sm">{point.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Clone examples and run the trading swarm demo in under 2 minutes.
                No API keys, no config - just Rust and Cargo.
              </p>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg inline-block px-6 py-3 font-mono text-sm text-emerald-400 mb-8">
                cargo run --example solana_swarm
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://github.com/RustyAI/examples" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    Clone examples <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/docs/getting-started">
                  <Button variant="outline" size="lg">
                    Read the docs
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
