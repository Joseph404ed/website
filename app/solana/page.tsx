import type { Metadata } from "next";
import SolanaPage from './solana-content';

export const metadata: Metadata = {
  title: "RustyAI for Solana Builders",
  description: "Build autonomous trading bots, MEV agents, and self-healing Solana infrastructure with RustyAI — the Rust multi-agent framework.",
  alternates: {
    canonical: "https://www.rustyai.xyz/solana",
  },
};

export default function Solana() {
  return <SolanaPage />;
}
