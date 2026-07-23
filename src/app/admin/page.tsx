import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";
import { EyeIcon, PencilIcon } from "@/components/admin/icons";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminHomePage() {
  const articles = await prisma.article.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-espresso-500">
        <Link href="/admin" className="hover:text-gold-700">
          Admin
        </Link>{" "}
        / <span className="text-espresso-900">Berita &amp; Kegiatan</span>
      </nav>

      <div className="mt-3 flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Berita & Kegiatan</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/articles/new" className="btn-primary !px-4 !py-2 text-sm">
            + Tambah Blog
          </Link>
          <SignOutButton />
        </div>
      </div>

      {articles.length === 0 ? (
        <p className="mt-8 text-sm text-espresso-600">Belum ada artikel. Buat artikel pertama.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.id}
              className="overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream-50 shadow-card"
            >
              <div className="relative aspect-[16/10] bg-espresso-800">
                {a.imageThumb || a.image ? (
                  <Image src={(a.imageThumb || a.image)!} alt="" fill sizes="24rem" className="object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center font-display text-3xl font-semibold text-cream-100/20">
                    GPS
                  </span>
                )}
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    a.published ? "bg-green-100 text-green-800" : "bg-cream-100 text-espresso-700"
                  }`}
                >
                  {a.published ? "Published" : "Draft"}
                </span>
                {a.featured ? (
                  <span className="absolute right-3 top-3 rounded-full bg-gold-500/90 px-3 py-1 text-xs font-semibold text-espresso-950">
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
                  {a.categoryId} · {formatDate(a.date)}
                </p>
                <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-snug text-espresso-950">
                  {a.titleId}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-espresso-900/10 pt-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/articles/${a.id}/edit`}
                      title="Edit"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso-900 hover:underline"
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Link>
                    <DeleteArticleButton id={a.id} title={a.titleId} />
                  </div>
                  {a.published ? (
                    <Link
                      href={`/news/${a.slug}`}
                      target="_blank"
                      title="Lihat di situs publik"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Lihat
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
