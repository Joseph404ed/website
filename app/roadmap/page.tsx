// app/about/page.tsx
import type { Metadata } from "next";
import Roadmap from "./roadmap-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.rustyai.xyz/roadmap",
  },
};

export default function RoadmapPage() {
  return <Roadmap />;
}