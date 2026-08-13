export function AgentGraph() {
  const peers = [
    { x: 70, y: 250, label: "Agent B" },
    { x: 210, y: 250, label: "Agent C" },
    { x: 350, y: 250, label: "Agent D" },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="relative flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
          agent society · topology
        </span>
        <span className="font-mono text-[11px] text-rust">tokio runtime</span>
      </div>
      <svg viewBox="0 0 420 400" className="relative h-auto w-full" role="img" aria-label="Multi-agent topology: Agent A coordinating agents B, C and D over FIPA messaging on the Tokio runtime">
        <g stroke="var(--border)" strokeWidth="1" fill="none">
          <path d="M210 96 V150" />
          <path d="M210 190 V210 M70 210 H350 M70 210 V232 M210 210 V232 M350 210 V232" />
          <path d="M70 292 V310 M210 292 V310 M350 292 V310 M70 310 H350 M210 310 V330" />
        </g>
        <g
          stroke="var(--rust)"
          strokeWidth="1.2"
          fill="none"
          className="flow-line"
          opacity="0.75"
        >
          <path d="M210 96 V150" />
          <path d="M70 210 H350" />
          <path d="M210 310 V330" />
        </g>

        <g>
          <rect x="140" y="40" width="140" height="56" rx="6" fill="var(--elevated)" stroke="var(--rust)" strokeOpacity="0.5" />
          <text x="210" y="64" textAnchor="middle" className="fill-[var(--foreground)] font-mono" fontSize="12">
            Agent A
          </text>
          <text x="210" y="82" textAnchor="middle" className="fill-[var(--rust)] font-mono" fontSize="10">
            BDI
          </text>
        </g>

        <text x="210" y="176" textAnchor="middle" className="fill-[var(--muted-foreground)] font-mono" fontSize="10">
          FIPA Messaging
        </text>

        {peers.map((p, i) => (
          <g key={p.label}>
            <rect
              x={p.x - 46}
              y={232}
              width="92"
              height="60"
              rx="6"
              fill="var(--elevated)"
              stroke="var(--border)"
            />
            <circle cx={p.x} cy={252} r="3" fill="var(--rust)" className="pulse-node" style={{ animationDelay: `${i * 0.6}s` }} />
            <text x={p.x} y={276} textAnchor="middle" className="fill-[var(--foreground)] font-mono" fontSize="11">
              {p.label}
            </text>
          </g>
        ))}

        <text x="210" y="326" textAnchor="middle" className="fill-[var(--muted-foreground)] font-mono" fontSize="10">
          Coordination
        </text>
        <rect x="120" y="340" width="180" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" />
        <text x="210" y="365" textAnchor="middle" className="fill-[var(--foreground)] font-mono" fontSize="11">
          Tokio Runtime
        </text>
      </svg>
      <div className="relative border-t border-border px-4 py-3 font-mono text-[11px] text-subtle">
        <span className="text-rust">agent://</span>A → broadcast(Request) → [B, C, D] ·
        latency budget 10µs
      </div>
    </div>
  );
}