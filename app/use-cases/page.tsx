import type { Metadata } from "next";
import UseCases from './usecase-content';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.rustyai.xyz/use-case",
  },
};

export default function UseCasesPage() {
  return <UseCases />;
}