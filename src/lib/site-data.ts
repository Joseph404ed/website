export const SITE_URL = "https://www.rustyaifw.xyz";
export const GITHUB_URL = "https://github.com/RustyAIFW";
export const TWITTER_URL = "https://x.com/RustyAIFwk";
export const TELEGRAM_URL = "https://t.me/rustyaifw";
export const TWITTER_HANDLE = "@RustyAIFwk";
export const TELEGRAM_HANDLE = "@rustyaifw";
export const TOKEN_CA = "Fwfx9SXtqLwH4H6b1m5pCUzcACZBvrGRn6w8TGXepump";
export const SOLSCAN_URL = `https://solscan.io/token/${TOKEN_CA}`;

export type Crate = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  level: string;
  apis: string[];
  depends: string[];
  code: string;
};

export const crates: Crate[] = [
  {
    slug: "agent-core",
    name: "agent-core",
    tagline: "The foundation for autonomous agents.",
    description:
      "Agent, AgentId, AgentContext, lifecycle hooks, and state management. Everything an autonomous unit needs to exist, be addressed, and be driven by a runtime.",
    level: "Level 0 — Foundation",
    apis: ["Agent", "AgentId", "AgentContext", "AgentState", "LifecycleHooks"],
    depends: [],
    code: `use agent_core::prelude::*;

struct Researcher;

#[async_trait]
impl Agent for Researcher {
    async fn on_start(&mut self, ctx: &AgentContext) -> Result<()> {
        ctx.log("researcher online");
        Ok(())
    }
}`,
  },
  {
    slug: "cognition",
    name: "cognition",
    tagline: "Give agents actual reasoning architecture.",
    description:
      "BDI beliefs, desires, intentions, reasoning, planning, utility functions, and intention management — a cognitive loop instead of a callback soup.",
    level: "Level 1 — Reasoning",
    apis: ["BeliefBase", "Desire", "Intention", "Planner", "UtilityFn"],
    depends: ["agent-core"],
    code: `use cognition::prelude::*;

let mut beliefs = BeliefBase::new();
beliefs.assert("market_open", 0.92);

let plan = Planner::strips()
    .goal("rebalance_portfolio")
    .plan(&beliefs)?;`,
  },
  {
    slug: "messaging",
    name: "messaging",
    tagline: "Agents need to communicate.",
    description:
      "FIPA-inspired ACL, typed messages, bounded mailboxes, routing, and request-reply protocols with backpressure built in.",
    level: "Level 1 — Transport",
    apis: ["AclMessage", "Performative", "Mailbox", "Router", "RequestReply"],
    depends: ["agent-core"],
    code: `use messaging::prelude::*;

let msg = AclMessage::new(Performative::Request)
    .to("agent://worker-3")
    .content(Task::Index { shard: 7 });

router.send(msg).await?;`,
  },
  {
    slug: "patterns",
    name: "patterns",
    tagline: "Coordinate agents as organizations.",
    description:
      "Hierarchy, Swarm, Market, Coalition, Holarchy, Federation, Blackboard, and Team — reusable coordination topologies rather than bespoke glue.",
    level: "Level 2 — Coordination",
    apis: ["Hierarchy", "Swarm", "Market", "Coalition", "Blackboard"],
    depends: ["messaging", "agent-core"],
    code: `use patterns::market::*;

let market = Market::sealed_bid()
    .task("render_frame")
    .deadline(Duration::from_millis(50));

let winner = market.allocate(&bidders).await?;`,
  },
  {
    slug: "runtime",
    name: "runtime",
    tagline: "Run agents reliably.",
    description:
      "Tokio-powered execution, supervision, restart policies, circuit breakers, health checks, metrics, sandboxing, and scheduling.",
    level: "Level 2 — Execution",
    apis: ["Runtime", "Supervisor", "RestartPolicy", "HealthCheck", "Scheduler"],
    depends: ["agent-core", "messaging"],
    code: `use runtime::prelude::*;

Runtime::builder()
    .supervisor(RestartPolicy::exponential_backoff())
    .spawn(Researcher::default())
    .run()
    .await?;`,
  },
  {
    slug: "rustyai",
    name: "rustyai",
    tagline: "One facade for the entire framework.",
    description:
      "A unified API and prelude that re-exports the framework's core capabilities, so a single dependency gets you the whole agent stack.",
    level: "Level 3 — Facade",
    apis: ["prelude::*", "AgentBuilder", "RustyAI"],
    depends: ["patterns", "runtime", "cognition", "messaging", "agent-core"],
    code: `use rustyai::prelude::*;

let agent = AgentBuilder::new("researcher")
    .with_belief("rust_is_fast")
    .with_goal("find_solution")
    .build();`,
  },
];

export type Pattern = {
  slug: string;
  name: string;
  short: string;
  description: string;
  useCase: string;
  scenario: string;
  code: string;
};

export const patterns: Pattern[] = [
  {
    slug: "hierarchy",
    name: "Hierarchy",
    short: "Tree-like delegation.",
    description:
      "A manager agent decomposes work and delegates down a supervision tree, aggregating results on the way back up.",
    useCase: "Workflows with clear ownership and escalation paths.",
    scenario: "A pipeline coordinator splits an ingest job across worker tiers.",
    code: `let org = Hierarchy::new("root")
    .child("ingest", vec!["parse", "normalize"])
    .child("index", vec!["shard-a", "shard-b"]);`,
  },
  {
    slug: "swarm",
    name: "Swarm",
    short: "Decentralized agents communicating locally.",
    description:
      "No central coordinator. Agents follow local rules and neighbour messages; global behaviour emerges.",
    useCase: "Large populations of cheap, interchangeable agents.",
    scenario: "Edge sensors converge on a coverage map without a server.",
    code: `let swarm = Swarm::new()
    .radius(3)
    .rule(Rule::Align)
    .rule(Rule::Separate);`,
  },
  {
    slug: "market",
    name: "Market",
    short: "Agents bidding for work.",
    description:
      "Auction-based task allocation using Dutch, sealed-bid, and English auctions.",
    useCase: "Allocating scarce capacity between self-interested agents.",
    scenario: "Trading agents bid for execution slots under a latency budget.",
    code: `let auction = Market::english()
    .reserve(10)
    .task("execute_order");`,
  },
  {
    slug: "coalition",
    name: "Coalition",
    short: "Agents dynamically forming teams.",
    description:
      "Agents negotiate temporary groups when a goal exceeds any individual's capability, then dissolve them.",
    useCase: "Goals requiring complementary, short-lived capability sets.",
    scenario: "Three analysis agents combine to close a single incident.",
    code: `let coalition = Coalition::form(&candidates)
    .requiring(&["ocr", "nlp", "audit"])
    .await?;`,
  },
  {
    slug: "holarchy",
    name: "Holarchy",
    short: "Nested autonomous groups.",
    description:
      "Each holon is simultaneously a whole and a part — autonomous internally, cooperative externally.",
    useCase: "Systems that must be recursive and locally survivable.",
    scenario: "A factory cell operates alone or as part of a plant.",
    code: `let plant = Holarchy::new("plant")
    .holon("cell-1", cell_agents)
    .holon("cell-2", cell_agents_2);`,
  },
  {
    slug: "federation",
    name: "Federation",
    short: "Peer-to-peer decentralized coordination.",
    description:
      "Independent domains keep sovereignty over their agents and exchange messages through federated brokers.",
    useCase: "Cross-organization or cross-region coordination.",
    scenario: "Two regional clusters share load without shared state.",
    code: `let fed = Federation::new()
    .peer("eu-west", broker_eu)
    .peer("us-east", broker_us);`,
  },
  {
    slug: "blackboard",
    name: "Blackboard",
    short: "Agents sharing a common knowledge space.",
    description:
      "Specialists opportunistically read and write a shared knowledge structure until a solution emerges.",
    useCase: "Problems solved incrementally by heterogeneous experts.",
    scenario: "Parsers, validators, and planners refine one shared document.",
    code: `let bb = Blackboard::new();
bb.write("hypothesis", h, 0.7).await?;
bb.subscribe("hypothesis", solver).await?;`,
  },
  {
    slug: "team",
    name: "Team",
    short: "Fixed-role cooperative agents.",
    description:
      "A stable roster with assigned roles and a shared plan, coordinating through explicit joint intentions.",
    useCase: "Repeatable missions with known role decomposition.",
    scenario: "Scout, planner, and executor agents run a recurring job.",
    code: `let team = Team::new("ops")
    .role("scout", scout)
    .role("planner", planner)
    .role("executor", executor);`,
  },
];

export const examples = [
  {
    slug: "defi-trading",
    title: "DeFi / Trading",
    description: "Trading agents coordinate through market-based allocation.",
    stack: ["market", "runtime", "messaging"],
    nodes: ["Signal", "Bidding", "Risk", "Execution"],
  },
  {
    slug: "self-healing",
    title: "Self-Healing Services",
    description: "Supervised agents automatically restart failed components.",
    stack: ["runtime", "agent-core"],
    nodes: ["Health", "Supervisor", "Restart", "Recovered"],
  },
  {
    slug: "robotics-iot",
    title: "Robotics / IoT",
    description: "Swarm and federation patterns coordinate distributed edge agents.",
    stack: ["patterns", "messaging"],
    nodes: ["Edge", "Swarm", "Federation", "Fleet"],
  },
  {
    slug: "reasoning-chatbots",
    title: "Reasoning Chatbots",
    description: "BDI reasoning combined with structured beliefs.",
    stack: ["cognition", "agent-core"],
    nodes: ["Input", "Beliefs", "Planning", "Reply"],
  },
  {
    slug: "enterprise-automation",
    title: "Enterprise Automation",
    description: "Agents coordinate multi-party workflows.",
    stack: ["patterns", "runtime"],
    nodes: ["Intake", "Hierarchy", "Approval", "Ledger"],
  },
  {
    slug: "game-ai",
    title: "Game AI",
    description: "NPCs use goals, beliefs, and planning.",
    stack: ["cognition", "patterns"],
    nodes: ["Perceive", "Beliefs", "Intentions", "Act"],
  },
];