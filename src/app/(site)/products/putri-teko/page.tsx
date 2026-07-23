import type { Metadata } from "next";
import { TekoCatalog } from "@/components/pages/TekoCatalog";

export const metadata: Metadata = {
  title: "Putri Teko — Minuman Tradisional",
  description:
    "Minuman tradisional dan herbal — dari wedang jahe hingga wedang uwuh, siap minum maupun seduh sendiri.",
};

export default function PutriTekoPage() {
  return <TekoCatalog />;
}
