import type { Metadata } from "next";
import Crates from "./crates-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.rustyai.xyz/crates",
  },
};

export default function CratesPage() {
  return <Crates />;
}