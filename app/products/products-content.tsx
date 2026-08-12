"use client";

import { MotionDiv } from "@/components/framer/motion";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Brain, Swords, Search, Bot, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Cortex",
    tagline: "Cognitive agent platform",
    description:
      "Deploy and manage intelligent agents in production. Cortex is a higher-level platform built on the RustyAI framework — dashboards, monitoring, and managed runtimes without touching the low-level API.",
    icon: Brain,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    url: "https://cortex.rustyai.xyz",
    status: "soon",
  },
  {
    name: "Arena",
    tagline: "Agents debate, judge decides",
    description:
      "Two AI agents argue for and against any topic. A judge agent scores their arguments and declares a winner. Multi-agent reasoning in action.",
    icon: Swords,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    url: "https://arena.rustyai.xyz",
    status: "soon",
  },
  {
    name: "Recall",
    tagline: "Retrieve, reason, respond",
    description:
      "RAG system powered by agents. A retriever fetches relevant documents, a reasoner analyzes them, and a responder delivers precise answers.",
    icon: Search,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    url: "https://recall.rustyai.xyz",
    status: "soon",
  },
  {
    name: "xbot",
    tagline: "Autonomous X agent",
    description:
      "A live X/Twitter bot that posts scheduled content, responds to mentions, and reasons over a belief base before replying — the first RustyAI application running in production.",
    icon: Bot,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    url: "https://x.com/RustyAI",
    status: "active",
  },
];

export function ProductsContent() {
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
              <span className="text-foreground">Products</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-3">
              Built with <span className="text-primary">RustyAI</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Real applications powered by multi-agent coordination.
            </p>
          </MotionDiv>

          <div className="max-w-4xl h-auto mx-auto grid md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <motion.a
                key={product.name}
                href={product.status === "active" ? product.url : undefined}
                target={product.status === "active" ? "_blank" : undefined}
                rel={product.status === "active" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group block p-6 rounded-xl border ${product.border} ${product.bg} hover:border-opacity-50 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <product.icon className={`h-6 w-6 ${product.color}`} />
                    <div>
                      <h2 className="text-xl font-bold">{product.name}</h2>
                      <p className={`text-sm ${product.color}`}>{product.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        product.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {product.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
