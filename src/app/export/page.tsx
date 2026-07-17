import type { Metadata } from "next";
import { ExportPage } from "@/components/pages/ExportPage";

export const metadata: Metadata = {
  title: "Ekspor & Kemitraan",
  description:
    "Peluang kemitraan, distribusi, dan diskusi ekspor bersama CV Gama Putra Santosa.",
};

export default function ExportRoute() {
  return <ExportPage />;
}
