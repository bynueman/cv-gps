import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "Artikel baru" };

export default function NewArticlePage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="font-display text-2xl font-semibold">Artikel baru</h1>
      <div className="mt-8">
        <ArticleForm mode="create" />
      </div>
    </div>
  );
}
