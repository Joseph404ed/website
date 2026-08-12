import type { Metadata } from "next";
import { ChatUI } from "./chat-ui";

export const metadata: Metadata = {
  title: "Chat with CognitiveAgent",
  description: "Ask the RustyAI CognitiveAgent about the framework. Powered by a knowledge base with LLM fallback.",
};

export default function ChatPage() {
  return <ChatUI />;
}
