import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CrateCard, CrateStatus } from '@/components/CrateCard';
import { MotionDiv } from '@/components/framer/motion';

interface CrateInfo {
  name: string;
  description: string;
  status: CrateStatus;
  features: string[];
  href: string;
}

const crates: CrateInfo[] = [
  {
    name: 'agent-core',
    description: 'Agent trait, AgentId, AgentContext, AgentState, and AgentResult. The foundation every other crate builds on.',
    status: 'stable',
    features: ['Agent trait', 'AgentId (UUID)', 'AgentContext', 'AgentState machine'],
    href: 'https://github.com/RustyAI/agent-core',
  },
  {
    name: 'messaging',
    description: 'Async message passing with a typed Router, bounded Mailboxes, MessageBuilder, and 11 FIPA ACL performatives.',
    status: 'stable',
    features: ['Router', 'Mailbox', 'FIPA performatives', 'RequestReply'],
    href: 'https://github.com/RustyAI/messaging',
  },
  {
    name: 'cognition',
    description: 'Full BDI cognitive architecture: BeliefBase, forward-chaining ReasoningEngine, BFS STRIPS Planner, UtilityFunction, and IntentionStack.',
    status: 'beta',
    features: ['BeliefBase', 'ReasoningEngine', 'STRIPS Planner', 'BDI model'],
    href: 'https://github.com/RustyAI/cognition',
  },
  {
    name: 'patterns',
    description: '8 organizational patterns for multi-agent coordination, each with a spawn_agents() bridge to runtime.',
    status: 'beta',
    features: ['Swarm', 'Hierarchy', 'Market', 'Federation', 'Coalition', 'Blackboard', 'Team', 'Holarchy'],
    href: 'https://github.com/RustyAI/patterns',
  },
  {
    name: 'runtime',
    description: 'Async execution engine on Tokio. Spawns agents as tasks, supervises with restart policies, and provides circuit breaking, scheduling, metrics, and sandboxing.',
    status: 'beta',
    features: ['Supervisor', 'CircuitBreaker', 'Scheduler', 'MetricsRegistry', 'Sandbox'],
    href: 'https://github.com/RustyAI/runtime',
  },
  {
    name: 'rustyai',
    description: 'Facade crate that re-exports agent-core, messaging, cognition, patterns, and runtime as a single dependency.',
    status: 'stable',
    features: ['Single dependency', 'Re-exports all crates', 'Prelude module'],
    href: 'https://github.com/RustyAI/rustyai',
  },
  {
    name: 'deploy',
    description: 'Deployment CLI and utilities for containerizing, monitoring, and scaling RustyAI agent systems in production.',
    status: 'coming-soon',
    features: ['Docker', 'Railway', 'Monitoring', 'CLI'],
    href: 'https://github.com/RustyAI',
  },
];

export default function Crates() {
  return (
    <Layout>
      <div>
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Crates</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Crates</h1>
            <p className="text-xl text-start text-muted-foreground max-w-2xl mx-auto">
              RustyAI is built as a polyrepo of independent crates. Use only what you need,
              or combine them for a complete multi-agent framework.
            </p>
          </MotionDiv>

          {/* Status legend */}
          <div className="grid grid-cols-1 sm:flex justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <span className="crate-badge stable">Stable</span>
              <span className="text-sm text-muted-foreground">Production ready</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="crate-badge beta">Beta</span>
              <span className="text-sm text-muted-foreground">API may change</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="crate-badge coming-soon">Coming Soon</span>
              <span className="text-sm text-muted-foreground">In development</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crates.map((crate, i) => (
              <CrateCard key={crate.name} {...crate} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
