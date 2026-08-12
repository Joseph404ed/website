import type { Metadata } from "next";
import GettingStarted from './getting-started-content';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.rustyai.xyz/docs/getting-started",
  },
}

export default function GettingStartedPage() {
  return <GettingStarted />;
}