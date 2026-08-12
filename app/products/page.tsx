import type { Metadata } from "next";
import { ProductsContent } from "./products-content";

export const metadata: Metadata = {
  title: "Products",
  description: "Applications built with the RustyAI multi-agent framework.",
  alternates: {
    canonical: "https://www.rustyai.xyz/products",
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
