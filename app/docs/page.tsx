import type { Metadata } from "next";
import Docs from "./docs-content";
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.rustyai.xyz/docs",
  },
};

export default function DocsPage() {
  return <Docs />;
}