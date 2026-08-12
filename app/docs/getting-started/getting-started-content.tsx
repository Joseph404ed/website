"use client";

import Link from 'next/link';
import { ChevronRight, Book, Code, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CodeBlock } from '@/components/CodeBlock';
import { MotionDiv } from '@/components/framer/motion';

const tocItems = [
  { id: 'installation', label: 'Installation' },
  { id: 'first-agent', label: 'Your First Agent' },
  { id: 'run-it', label: 'Run with the Runtime' },
  { id: 'messaging', label: 'Message Passing' },
  { id: 'next-steps', label: 'Next Steps' },
];

const installCode = `[dependencies]
agent-core    = { git = "https://github.com/RustyAI/agent-core",    branch = "main" }
runtime = { git = "https://github.com/RustyAI/runtime", branch = "main" }
tokio     = { version = "1", features = ["full"] }
async-trait = "0.1"`;

const firstAgentCode = `use agent_core::{Agent, AgentContext, AgentId, AgentResult};
use async_trait::async_trait;
use std::time::Duration;

struct GreeterAgent {
    id: AgentId,
    count: u32,
}

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
}`;

const runtimeCode = `use agent_core::AgentId;
use runtime::{Runtime, supervisor::RestartPolicy};

#[tokio::main]
async fn main() {
    let runtime = Runtime::new();

    runtime
        .spawn_with_policy(
            Box::new(GreeterAgent { id: AgentId::new(), count: 0 }),
            "greeter",
            RestartPolicy::OnFailure,
        )
        .await;

    runtime.run().await;
}`;

const messagingCode = `// Send a message to another agent from inside execute()
async fn execute(&mut self, ctx: &AgentContext) -> AgentResult<()> {
    ctx.send_message("responder", "inform", "Hello from Greeter!");
    tokio::time::sleep(Duration::from_millis(500)).await;
    Ok(())
}

// Receive messages by overriding handle_message
async fn handle_message(
    &mut self,
    _ctx: &AgentContext,
    sender: &str,
    performative: &str,
    content: &str,
) -> AgentResult<()> {
    println!("[{}] from {}: {}", performative, sender, content);
    Ok(())
}`;

export default function GettingStarted() {
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
              <Link href="/docs" className="hover:text-foreground transition-colors">
                Docs
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Getting Started</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_220px] gap-12">
            {/* Main content */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Build your first multi-agent system with RustyAI in minutes.
                </p>

                {/* Installation */}
                <section id="installation" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    Installation
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    RustyAI crates are on GitHub. Add them to your{' '}
                    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">Cargo.toml</code>{' '}
                    as git dependencies:
                  </p>
                  <CodeBlock code={installCode} language="toml" filename="Cargo.toml" showLineNumbers={false} />
                  <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      Add only the crates you need. <code className="font-mono">agent-core</code> defines
                      the Agent trait. <code className="font-mono">runtime</code> runs your agents.
                      Add <code className="font-mono">cognition</code> and{' '}
                      <code className="font-mono">patterns</code> when you need BDI reasoning or
                      organizational coordination.
                    </p>
                  </div>
                </section>

                {/* First Agent */}
                <section id="first-agent" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    Your First Agent
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Implement the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">Agent</code>{' '}
                    trait from <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">agent-core</code>.
                    Four async methods — <code className="font-mono text-sm">id</code>,{' '}
                    <code className="font-mono text-sm">initialize</code>,{' '}
                    <code className="font-mono text-sm">execute</code>, and{' '}
                    <code className="font-mono text-sm">shutdown</code>:
                  </p>
                  <CodeBlock code={firstAgentCode} language="rust" filename="src/main.rs" />
                  <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Lifecycle:</strong>{' '}
                      <code className="font-mono">initialize</code> runs once at startup.{' '}
                      <code className="font-mono">execute</code> loops continuously — add a{' '}
                      <code className="font-mono">sleep</code> to control tick rate.{' '}
                      <code className="font-mono">shutdown</code> runs once when the agent stops.
                      Add <code className="font-mono">#[async_trait]</code> from the{' '}
                      <code className="font-mono">async-trait</code> crate on the impl block.
                    </p>
                  </div>
                </section>

                {/* Run with the Runtime */}
                <section id="run-it" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Terminal className="h-4 w-4 text-primary" />
                    </div>
                    Run with the Runtime
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Create a <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">Runtime</code>,
                    spawn your agent with a restart policy, and call{' '}
                    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">run().await</code>:
                  </p>
                  <CodeBlock code={runtimeCode} language="rust" filename="src/main.rs" />
                  <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Restart policies:</strong>{' '}
                      <code className="font-mono">Never</code> (let it die),{' '}
                      <code className="font-mono">Always</code> (restart on any stop),{' '}
                      <code className="font-mono">OnFailure</code> (restart on errors only),{' '}
                      <code className="font-mono">ExponentialBackoff</code> (restart with doubling delays).
                      The Supervisor wires this up automatically on every{' '}
                      <code className="font-mono">spawn_with_policy</code> call.
                    </p>
                  </div>
                </section>

                {/* Message Passing */}
                <section id="messaging" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Book className="h-4 w-4 text-primary" />
                    </div>
                    Message Passing
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Agents talk to each other through{' '}
                    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">AgentContext</code>.
                    Call <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">ctx.send_message(receiver, performative, content)</code>{' '}
                    to send. Override{' '}
                    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">handle_message</code>{' '}
                    to receive:
                  </p>
                  <CodeBlock code={messagingCode} language="rust" filename="src/main.rs" />
                  <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Performatives</strong> are FIPA ACL message
                      intents: <code className="font-mono">"inform"</code>,{' '}
                      <code className="font-mono">"request"</code>,{' '}
                      <code className="font-mono">"query"</code>,{' '}
                      <code className="font-mono">"propose"</code>,{' '}
                      <code className="font-mono">"cfp"</code> and 6 more.
                      The Router in runtime delivers messages by agent name.
                    </p>
                  </div>
                </section>

                {/* Next Steps */}
                <section id="next-steps" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <a
                      href="https://github.com/RustyAI/examples"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feature-card block"
                    >
                      <h3 className="font-semibold mb-2">Run the Examples</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Clone examples and run any example with a single{' '}
                        <code className="font-mono">cargo run</code> command.
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        View on GitHub <ArrowRight className="h-4 w-4" />
                      </span>
                    </a>
                    <Link href="/crates" className="feature-card block">
                      <h3 className="font-semibold mb-2">Explore Crates</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add BDI cognition with cognition or coordination patterns with patterns.
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        View crates <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/examples" className="feature-card block">
                      <h3 className="font-semibold mb-2">Examples Gallery</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Browse all 6 examples with real code — from hello_agent to full_system.
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        View examples <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/use-cases" className="feature-card block">
                      <h3 className="font-semibold mb-2">What Can You Build?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Trading bots, swarm simulations, self-healing services, game AI, and more.
                      </p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        Explore use cases <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </section>
              </div>
            </MotionDiv>

            {/* Table of Contents */}
            <div className="hidden lg:block">
              <div className="sticky top-24 doc-toc">
                <h3 className="font-semibold text-sm mb-4">On this page</h3>
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
