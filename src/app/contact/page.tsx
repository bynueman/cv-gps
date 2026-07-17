import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi CV Gama Putra Santosa untuk pertanyaan umum, produk, ekspor, dan kolaborasi.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
