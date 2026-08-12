"use client";

import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChevronRight, Send } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/framer/motion";

interface Message {
  role: "user" | "agent";
  content: string;
  source?: string;
  beliefs?: number;
}

export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend() {
    const q = input.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: data.answer,
          source: data.source,
          beliefs: data.beliefs,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Could not reach the agent. Is the runtime running?", source: "error" },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Chat</span>
            </nav>
          </div>
        </div>
      
        <div className="max-w-3xl flex flex-col h-[85vh] sm:h-[calc(100vh-7rem)] container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6" 
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-primary">Cognitive</span> Agent
            </h1>
            <p className="text-xl text-start text-muted-foreground max-w-2xl mx-auto">
              Ask about the framework. Answers from knowledge base or LLM fallback.
            </p>
          </MotionDiv>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto h-[300px] space-y-4 scrollbar-hide py-4 px-2 border border-transparent hover:border-gray-800 active:border-gray-800"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-20 space-y-3">
                <p className="text-lg">No messages yet</p>
                <p className="text-sm">Try asking: &quot;What is RustyAI?&quot; or &quot;What patterns are supported?&quot;</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted border rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.source && msg.role === "agent" && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          msg.source === "knowledge_base"
                            ? "bg-green-500/10 text-green-500"
                            : msg.source === "llm"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {msg.source}
                      </span>
                      {msg.beliefs && (
                        <span className="text-xs text-muted-foreground">
                          {msg.beliefs} beliefs
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="mt-4 flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-muted border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
