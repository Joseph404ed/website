const PHRASES = [
  "AGENT ONLINE",
  "BDI CYCLE ACTIVE",
  "CONSENSUS ACHIEVED",
  "BELIEF BASE UPDATED",
  "GOAL RESOLVED",
  "INTENTION LOCKED",
  "SWARM SYNCHRONIZED",
  "MAILBOX ROUTING",
  "SUPERVISOR STABLE",
  "COALITION FORMED",
  "FIPA ACL VERIFIED",
  "PLAN LIBRARY LOADED",
  "RUNTIME EXECUTING",
  "SIGNAL PROPAGATING",
  "NETWORK OBSERVING",
  "AGENT MESH STABLE",
  "COGNITION EXPANDING",
  "UTILITY EVALUATED",
  "HIERARCHY ALIGNED",
  "MARKET CLEARING",
];

export function AgentTicker() {
  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="relative w-full overflow-hidden border-y border-[var(--cyan)]/30 bg-white/90 py-2 backdrop-blur-sm">
      <div className="flex w-max animate-ticker gap-14 whitespace-nowrap">
        {items.map((p, i) => (
          <span
            key={i}
            className="terminal-text text-xs uppercase tracking-[0.35em]"
          >
            ▸ {p}
          </span>
        ))}
      </div>
    </div>
  );
}
