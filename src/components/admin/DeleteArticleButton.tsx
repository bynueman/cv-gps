"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/admin/icons";

export function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setPending(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        window.alert(json.error || "Gagal menghapus artikel.");
        return;
      }
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      title="Hapus"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline disabled:opacity-60"
    >
      <TrashIcon className="h-4 w-4" />
      {pending ? "Menghapus…" : "Hapus"}
    </button>
  );
}
