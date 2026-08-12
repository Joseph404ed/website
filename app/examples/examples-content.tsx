"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Terminal } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CodeBlock } from '@/components/CodeBlock';

interface Example {
  title: string;
  description: string;
  tags: string[];
  filename: string;
  code: string;
  runCmd: string;
}

const examples: Example[] = [
  {
    title: 'Hello Agent',
    description: 'The simplest possible agent — spawns into the runtime, ticks every 500ms, and shuts down cleanly. Start here.',
    tags: ['agent-core', 'runtime', 'Agent trait'],
    filename: 'hello_agent.rs',
    runCmd: 'cargo run --example hello_agent',
    code: `use agent_core::{Agent, AgentContext, AgentId, AgentResult};
use runtime::prelude::*;
use async_trait::async_trait;

struct GreeterAgent { id: AgentId, count: u32 }

#[async_trait]
impl Agent for GreeterAgent {
    fn id(&self) -> &AgentId { &self.id }

    async fn initialize(&mut self, _ctx: &AgentContext) -> AgentResult<()> {
        println!("[Greeter] Hello! I'm alive.");
        Ok(())
    }

    async fn execute(&mut self, _ctx: &AgentContext) -> AgentResult<()> {
        self.count += 1;
        println!("[Greeter] Tick #{}", self.count);
        tokio::time::sleep(Duration::from_millis(500)).await;
        Ok(())
    }

    async fn shutdown(&mut self, _ctx: &AgentContext) -> AgentResult<()> {
        println!("[Greeter] Goodbye after {} ticks!", self.count);
        Ok(())
    }
}

#[tokio::main]
async fn main() -> Result<(), RuntimeError> {
    let runtime = Runtime::new();
    runtime.spawn(Box::new(GreeterAgent { id: AgentId::new(), count: 0 }), "greeter").await?;
    tokio::time::sleep(Duration::from_secs(3)).await;
    runtime.shutdown().await
}`,
  },
  {
    title: 'BDI Cognitive Reasoning',
    description: 'A CognitiveAgent loads beliefs from JSON and answers questions via forward-chaining inference. Unknown questions fall back to an LLM.',
    tags: ['cognition', 'runtime', 'BeliefBase', 'Rule'],
    filename: 'cognitive_agent.rs',
    runCmd: 'cargo run --example cognitive_agent',
    code: `use cognition::Rule;
use runtime::{prelude::*, CognitiveAgent};

// Load 61 beliefs from JSON, wire two inference rules
let mut thinker = CognitiveAgent::from_config(
    "data/beliefs.json",
    "data/config.json",
);

thinker.add_rule(
    Rule::new("topic:what_is")
        .with_condition("what")
        .with_condition("rustyai")
        .with_conclusion("what_is_rustyai"),
);
thinker.add_rule(
    Rule::new("topic:patterns")
        .with_condition("pattern")
        .with_condition("support")
        .with_conclusion("patterns"),
);

println!("{} beliefs, {} rules loaded",
    thinker.belief_count(),
    thinker.rule_count(),
);

// Spawn alongside a CuriousAgent that sends queries
let runtime = Runtime::new();
runtime.spawn(Box::new(thinker), "thinker").await?;
runtime.spawn(Box::new(CuriousAgent::new()), "curious").await?;

// CuriousAgent → thinker: "What is RustyAI?"
// thinker → CuriousAgent: "<answer from belief base>"`,
  },
  {
    title: 'Market Auction',
    description: 'Three trader agents bid in a sealed-bid auction for a GPU cluster. The auctioneer resolves via FIPA CFP → Propose → Accept performatives.',
    tags: ['patterns', 'runtime', 'Market', 'FIPA ACL'],
    filename: 'market_pattern.rs',
    runCmd: 'cargo run --example market_pattern',
    code: `use patterns::market::{Auction, AuctionType, Bid};
use runtime::prelude::*;

// Sealed-bid auction, $5k reserve
let auction = Arc::new(Mutex::new(
    Auction::new(AuctionType::SealedBid, "GPU Cluster (8x A100)")
        .with_reserve_price(5000.0),
));

let runtime = Runtime::new();
runtime.spawn(Box::new(TraderAgent::new("Trader-1", 8_000.0)), "trader_1").await?;
runtime.spawn(Box::new(TraderAgent::new("Trader-2", 12_000.0)), "trader_2").await?;
runtime.spawn(Box::new(TraderAgent::new("Trader-3", 6_500.0)), "trader_3").await?;
runtime.spawn(Box::new(AuctioneerAgent::new(auction.clone(), 3)), "auctioneer").await?;

// Output:
// [Auctioneer] Now auctioning: "GPU Cluster (8x A100)"
// [Trader-1] Bidding $6160 ...  [Trader-2] Bidding $9240 ...
// [Auctioneer] WINNER: $9240!`,
  },
  {
    title: 'Swarm Consensus',
    description: 'Five scout agents vote independently on a route. A tally agent counts results and declares the swarm decision — no central coordinator.',
    tags: ['patterns', 'runtime', 'Swarm', 'Decentralized'],
    filename: 'swarm_pattern.rs',
    runCmd: 'cargo run --example swarm_pattern',
    code: `use patterns::swarm::Swarm;
use runtime::prelude::*;

let mut swarm = Swarm::new("Scout Swarm");
let board = VoteBoard::new(); // shared Arc<Mutex<Vec<(agent, vote)>>>

let agents = vec![
    ("Scout-1", "Route A"),
    ("Scout-2", "Route B"),
    ("Scout-3", "Route A"),
    ("Scout-4", "Route A"),
    ("Scout-5", "Route B"),
];

for (name, preference) in &agents {
    let agent = SwarmAgent::new(name, preference, board.clone());
    swarm.add_member(*agent.id());
    runtime.spawn(Box::new(agent), &name.to_lowercase()).await?;
}

// Each agent broadcasts its vote, TallyAgent counts:
// Route A ███ (3)
// Route B ██  (2)
// → Swarm decision: Route A`,
  },
  {
    title: 'Supervised Recovery',
    description: 'An agent intentionally crashes 3 times. The runtime restarts it automatically using the OnFailure restart strategy with exponential backoff.',
    tags: ['runtime', 'RestartPolicy', 'CircuitBreaker'],
    filename: 'supervised_agents.rs',
    runCmd: 'cargo run --example supervised_agents',
    code: `use runtime::prelude::*;

let counter = Arc::new(AtomicU32::new(0));

// Agent returns Err for first 3 executions, then runs normally
let agent = FlakyAgent::new(counter.clone(), fail_until: 3);

let policy = RestartPolicy::new(RestartStrategy::OnFailure)
    .with_max_retries(5)
    .with_backoff_seconds(1);

runtime.spawn_with_policy(Box::new(agent), "flaky", policy).await?;

tokio::time::sleep(Duration::from_secs(8)).await;

// Output:
// [Flaky] Crashing! (execution #1)
// [Flaky] Crashing! (execution #2)
// [Flaky] Crashing! (execution #3)
// [Flaky] ✓ Running normally (execution #4)
// Total executions: 6 (3 crashes + 3 successful)`,
  },
  {
    title: 'Full System Demo',
    description: 'Workers report to a manager, a CognitiveAgent answers queries, and an unreliable agent crashes twice before recovering — all in one runtime.',
    tags: ['agent-core', 'cognition', 'runtime', 'messaging'],
    filename: 'full_system.rs',
    runCmd: 'cargo run --example full_system',
    code: `// Stage 1: Workers report to Manager via FIPA Inform
runtime.spawn(Box::new(ManagerAgent::new()), "manager").await?;
runtime.spawn(Box::new(WorkerAgent::new("Alpha")), "alpha").await?;
runtime.spawn(Box::new(WorkerAgent::new("Beta")), "beta").await?;

// Stage 2: CognitiveAgent answers queries from another agent
let thinker = CognitiveAgent::from_config("data/beliefs.json", "data/config.json");
runtime.spawn(Box::new(thinker), "thinker").await?;
runtime.spawn(Box::new(QuickAsker::new()), "asker").await?;

// Stage 3: Unreliable agent crashes twice, supervisor restarts it
let policy = RestartPolicy::new(RestartStrategy::OnFailure)
    .with_max_retries(5)
    .with_backoff_seconds(1);

runtime.spawn_with_policy(
    Box::new(UnreliableAgent::new(counter.clone())),
    "unreliable",
    policy,
).await?;

// All three stages run concurrently on the same Tokio runtime.
// Agents: 6  |  Crashes: 2  |  Recovery: automatic`,
  },
];

export default function Examples() {
  return (
    <Layout>
      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Link href="/" className="hover:text-[var(--cyan)] transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">Examples</span>
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
              Real code · Real output
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Examples that{' '}
              <span className="text-gradient-brand">actually compile</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed mb-6">
              Every snippet below is pulled directly from{' '}
              <a
                href="https://github.com/RustyAI/examples"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyan)] hover:underline"
              >
                RustyAI/examples
              </a>
              . Clone the repo and run any of them with a single{' '}
              <code className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">cargo run</code>.
            </p>
            <div className="holo-frame inline-flex items-center gap-3 px-4 py-3">
              <Terminal className="h-4 w-4 text-[var(--cyan)]" />
              <code className="font-mono text-sm text-[var(--cyan)]">
                git clone https://github.com/RustyAI/examples
              </code>
            </div>
          </motion.div>

          {/* Examples */}
          <div className="space-y-10">
            {examples.map((ex, i) => (
              <motion.div
                key={ex.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="holo-frame overflow-hidden"
              >
                {/* Card header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8 bg-white/[0.02]">
                  <div>
                    <h2 className="font-semibold text-base mb-1">{ex.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                      {ex.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {ex.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.6rem] px-2 py-0.5 rounded border border-[var(--cyan)]/20 text-[var(--cyan)]/60 bg-[var(--cyan)]/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <code className="flex items-center gap-2 font-mono text-xs text-[var(--cyan)]/70 bg-[var(--cyan)]/5 border border-[var(--cyan)]/20 rounded px-3 py-1.5 whitespace-nowrap">
                      <Terminal className="h-3 w-3" />
                      {ex.runCmd}
                    </code>
                  </div>
                </div>

                {/* Code block */}
                <CodeBlock
                  code={ex.code}
                  language="rust"
                  filename={ex.filename}
                  showLineNumbers={false}
                />
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="holo-frame p-10 sm:p-14 mt-16"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[var(--cyan)] mb-4">
              13 examples in total
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              See the rest on{' '}
              <span className="text-gradient-brand">GitHub</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mb-8">
              The full repo includes blackboard, coalition, federation, hierarchy,
              holarchy, team patterns, and a combined full-system demo — all runnable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/RustyAI/examples"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber"
              >
                View examples on GitHub
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <Link href="/docs/getting-started" className="btn-cyber btn-cyber-ghost">
                Read the docs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
