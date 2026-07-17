import type { Metadata } from "next";
import { KuicipCatalog } from "@/components/pages/KuicipCatalog";

export const metadata: Metadata = {
  title: "Kuicip — Keripik Singkong",
  description:
    "Keripik singkong modern dalam kemasan ziplock 70 gr — delapan varian rasa dari Original hingga Truffle.",
};

export default function KuicipPage() {
  return <KuicipCatalog />;
}
