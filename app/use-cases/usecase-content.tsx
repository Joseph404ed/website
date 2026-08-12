"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, Server, Gamepad2, Radio, Activity, Bot, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const useCases = [
  {
    icon: TrendingUp,
    title: 'DeFi & Trading Bots',
    description:
      'Coordinate fleets of trading agents using built-in auction types — Dutch, sealed-bid, and English. BDI reasoning handles signal evaluation and position sizing before execution. Not just rule triggers — actual agent cognition.',
    examples: [
      'Market-making agent swarms via the Market pattern',
      'Cross-exchange arbitrage with BDI position evaluation',
      'Risk management hierarchies with circuit breakers',
      'Sentiment coalition agents feeding into a lead trader',
    ],
    tags: ['Market pattern', 'patterns', 'cognition'],
  },
  {
    icon: Activity,
    title: 'Swarm Simulations',
    description:
      'Model flocking, stigmergy, and emergent behavior with the Swarm pattern. Thousands of lightweight async agents on a single Tokio runtime — zero GC pauses, real swarm dynamics in safe Rust.',
    examples: [
      'Drone swarm coordination with emergent formation',
      'Ant-colony stigmergy for route optimization',
      'Agent-based economic modeling',
      'Particle physics simulation with BDI agents',
    ],
    tags: ['Swarm pattern', 'agent-core', 'runtime'],
  },
  {
    icon: Server,
    title: 'Self-Healing Services',
    description:
      'Supervised agent hierarchies with 4 restart strategies and circuit breakers. Each stage recovers without operator intervention. Think Kubernetes — but for your agent graph, with reasoning built in.',
    examples: [
      'Microservice orchestration with health-check agents',
      'Event-driven pipelines where each stage is an agent',
      'Distributed caching with coordinator agents',
      'Consensus protocols backed by a Hierarchy pattern',
    ],
    tags: ['runtime', 'Hierarchy pattern', 'CircuitBreaker'],
  },
  {
    icon: Bot,
    title: 'Reasoning Chatbots',
    description:
      'BDI agents that query a structured belief base before replying. Rule-based inference engine with certainty scoring. LLM as fallback, not foundation — structured knowledge over pattern matching.',
    examples: [
      'Customer support bots with domain belief bases',
      'Developer assistants that reason over API docs',
      'Medical triage agents with rule-based inference',
      'Financial advisory agents with regulatory guardrails',
    ],
    tags: ['cognition', 'BeliefBase', 'ReasoningEngine'],
  },
  {
    icon: Radio,
    title: 'IoT Coordination',
    description:
      'Deploy agents across edge nodes using the Federation pattern. Each node runs an independent agent; agents negotiate over FIPA ACL without a central coordinator. Fully decentralized.',
    examples: [
      'Smart building management across zones',
      'Agricultural robot teams with local autonomy',
      'Factory floor agents negotiating shared resources',
      'Edge sensor networks with FIPA ACL messaging',
    ],
    tags: ['Federation pattern', 'messaging', 'FIPA ACL'],
  },
  {
    icon: Gamepad2,
    title: 'Game AI & NPCs',
    description:
      'Give NPCs real goals, beliefs, and STRIPS-style planning instead of scripted state machines. The IntentionStack and UtilityFunction map directly to game-AI design patterns — no custom glue needed.',
    examples: [
      'RPG NPCs with dynamic goal hierarchies',
      'Strategy game units with BDI planning',
      'Emergent faction behavior via Coalition pattern',
      'NPC economies using the Market auction pattern',
    ],
    tags: ['cognition', 'Planner', 'UtilityFunction'],
  },
];

export default function UseCases() {
  return (
    <Layout>
      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Link href="/" className="hover:text-[var(--cyan)] transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">Use Cases</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[var(--cyan)] mb-3">
              What you can build
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Real systems,{' '}
              <span className="text-[var(--cyan)]">real Rust</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              RustyAI is a coordination and reasoning layer — not a toy demo.
              Here's what teams are building with it across industries.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="holo-frame p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[var(--cyan)]/10 text-[var(--cyan)]">
                    <uc.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-sm">{uc.title}</h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {uc.description}
                </p>

                <ul className="space-y-1.5">
                  {uc.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-[var(--cyan)] font-mono mt-0.5">▸</span>
                      {ex}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6rem] px-2 py-0.5 rounded border border-[var(--cyan)]/20 text-[var(--cyan)]/60 bg-[var(--cyan)]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="holo-frame p-10 sm:p-14"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[var(--cyan)] mb-4">
              Open Source · MIT / Apache-2.0
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Ready to build your{' '}
              <span className="text-[var(--cyan)]">agent system?</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mb-8">
              Start with the crates you need. Every pattern, primitive, and runtime
              component ships independently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/getting-started" className="btn-cyber">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://github.com/RustyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber btn-cyber-ghost"
              >
                View on GitHub
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
