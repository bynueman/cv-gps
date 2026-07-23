"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slug";
import { ARTICLE_CATEGORIES } from "@/lib/articleCategories";
import { ImageUploadField, type UploadedImage } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gpsfood.id";
const EXCERPT_MIN = 70;
const EXCERPT_MAX = 160;

const inputClass =
  "w-full rounded-xl border border-espresso-900/15 bg-cream-50 px-4 py-3 text-sm text-espresso-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30";

export type ArticleFormValues = {
  id: string;
  slug: string;
  date: string; // yyyy-mm-dd
  categorySlug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  body: { id: string; en: string }; // rich-text HTML
  tags: { id: string; en: string }; // raw comma-separated
  image: string | null;
  imageThumb: string | null;
  imageOg: string | null;
  featured: boolean;
  published: boolean;
};

async function uploadImage(file: File): Promise<string | null> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) return null;
  const json = await res.json();
  return json.image as string;
}

function ExcerptCounter({ value }: { value: string }) {
  const len = value.length;
  const tone =
    len === 0
      ? "text-espresso-500"
      : len < EXCERPT_MIN || len > EXCERPT_MAX
        ? "text-amber-700"
        : "text-green-700";
  return (
    <p className={`mt-1 text-xs ${tone}`}>
      {len} karakter (ideal {EXCERPT_MIN}–{EXCERPT_MAX} untuk cuplikan pencarian Google)
    </p>
  );
}

function SeoPreview({ title, url, description }: { title: string; url: string; description: string }) {
  return (
    <div className="mt-2 rounded-xl border border-espresso-900/10 bg-cream-50 p-4">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-espresso-500">
        Pratinjau hasil pencarian Google
      </p>
      <p className="truncate text-[13px] text-green-800">{url}</p>
      <p className="truncate text-lg text-blue-800">{title || "Judul artikel"}</p>
      <p className="line-clamp-2 text-sm text-espresso-600">{description || "Ringkasan artikel akan muncul di sini."}</p>
    </div>
  );
}

export function ArticleForm({
  mode,
  article,
}: {
  mode: "create" | "edit";
  article?: ArticleFormValues;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"id" | "en">("id");
  const [titleId, setTitleId] = useState(article?.title.id ?? "");
  const [titleEn, setTitleEn] = useState(article?.title.en ?? "");
  const [categorySlug, setCategorySlug] = useState(article?.categorySlug ?? ARTICLE_CATEGORIES[0].slug);
  const [excerptId, setExcerptId] = useState(article?.excerpt.id ?? "");
  const [excerptEn, setExcerptEn] = useState(article?.excerpt.en ?? "");
  const [bodyId, setBodyId] = useState(article?.body.id ?? "");
  const [bodyEn, setBodyEn] = useState(article?.body.en ?? "");
  const [tagsId, setTagsId] = useState(article?.tags.id ?? "");
  const [tagsEn, setTagsEn] = useState(article?.tags.en ?? "");
  const [date, setDate] = useState(article?.date ?? new Date().toISOString().slice(0, 10));
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [published, setPublished] = useState(article?.published ?? false);
  const [confirmSlugChange, setConfirmSlugChange] = useState(false);
  const [image, setImage] = useState<UploadedImage>({
    image: article?.image ?? null,
    imageThumb: article?.imageThumb ?? null,
    imageOg: article?.imageOg ?? null,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const effectiveSlug = useMemo(() => (slugTouched ? slug : slugify(titleId)), [slugTouched, slug, titleId]);

  const wasPublished = mode === "edit" && Boolean(article?.published);
  const slugChangedAfterPublish = wasPublished && effectiveSlug !== article?.slug;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const payload = {
      slug: effectiveSlug,
      date,
      categorySlug,
      title: { id: titleId, en: titleEn },
      excerpt: { id: excerptId, en: excerptEn },
      body: { id: bodyId, en: bodyEn },
      tags: { id: tagsId, en: tagsEn },
      image: image.image,
      imageThumb: image.imageThumb,
      imageOg: image.imageOg,
      featured,
      published,
      confirmSlugChange,
    };

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/articles" : `/api/admin/articles/${article!.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.fieldErrors ?? {});
        setError(json.error ?? null);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Gagal menyimpan. Periksa koneksi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Slug</span>
          <input
            type="text"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
            placeholder="contoh-slug-artikel"
          />
          {fieldErrors.slug ? <p className="mt-1 text-xs text-red-700">{fieldErrors.slug}</p> : null}
          {slugChangedAfterPublish && !fieldErrors.slug ? (
            <label className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <input
                type="checkbox"
                checked={confirmSlugChange}
                onChange={(e) => setConfirmSlugChange(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                Artikel ini sudah dipublikasikan. Mengubah slug akan mengubah URL publik. Centang untuk
                melanjutkan.
              </span>
            </label>
          ) : null}
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold">Kategori</span>
          <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} className={inputClass}>
            {ARTICLE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.id}
              </option>
            ))}
          </select>
          {fieldErrors.category ? <p className="mt-1 text-xs text-red-700">{fieldErrors.category}</p> : null}
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold">Tanggal</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${inputClass} max-w-xs`}
          required
        />
        {fieldErrors.date ? <p className="mt-1 text-xs text-red-700">{fieldErrors.date}</p> : null}
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold">Gambar</span>
        <ImageUploadField initial={image} onChange={setImage} />
      </div>

      <div className="flex gap-2 border-b border-espresso-900/10">
        {(["id", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setTab(l)}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
              tab === l ? "border-b-2 border-gold-500 text-espresso-950" : "text-espresso-500"
            }`}
          >
            {l === "id" ? "Indonesia" : "English"}
          </button>
        ))}
      </div>

      <div className={tab === "id" ? "space-y-5" : "hidden space-y-5"}>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Judul (ID)</span>
          <input type="text" value={titleId} onChange={(e) => setTitleId(e.target.value)} className={inputClass} />
          {fieldErrors["title.id"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["title.id"]}</p> : null}
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Ringkasan / Meta Deskripsi (ID)</span>
          <textarea rows={2} value={excerptId} onChange={(e) => setExcerptId(e.target.value)} className={inputClass} />
          <ExcerptCounter value={excerptId} />
          {fieldErrors["excerpt.id"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["excerpt.id"]}</p> : null}
          <SeoPreview title={titleId} url={`${SITE_URL}/news/${effectiveSlug}`} description={excerptId} />
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Isi Artikel (ID)</span>
          <RichTextEditor value={bodyId} onChange={setBodyId} onUploadImage={uploadImage} />
          {fieldErrors["body.id"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["body.id"]}</p> : null}
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Tags (ID)</span>
          <input
            type="text"
            value={tagsId}
            onChange={(e) => setTagsId(e.target.value)}
            className={inputClass}
            placeholder="contoh: kuicip, singkong, resep"
          />
          <p className="mt-1 text-xs text-espresso-500">Pisahkan dengan koma. Digunakan untuk meta keywords & SEO.</p>
        </div>
      </div>

      <div className={tab === "en" ? "space-y-5" : "hidden space-y-5"}>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Title (EN)</span>
          <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={inputClass} />
          {fieldErrors["title.en"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["title.en"]}</p> : null}
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Excerpt / Meta Description (EN)</span>
          <textarea rows={2} value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} className={inputClass} />
          <ExcerptCounter value={excerptEn} />
          {fieldErrors["excerpt.en"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["excerpt.en"]}</p> : null}
          <SeoPreview title={titleEn} url={`${SITE_URL}/news/${effectiveSlug}`} description={excerptEn} />
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Body (EN)</span>
          <RichTextEditor value={bodyEn} onChange={setBodyEn} onUploadImage={uploadImage} />
          {fieldErrors["body.en"] ? <p className="mt-1 text-xs text-red-700">{fieldErrors["body.en"]}</p> : null}
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Tags (EN)</span>
          <input
            type="text"
            value={tagsEn}
            onChange={(e) => setTagsEn(e.target.value)}
            className={inputClass}
            placeholder="e.g. kuicip, cassava, recipe"
          />
          <p className="mt-1 text-xs text-espresso-500">Comma-separated. Used for meta keywords & SEO.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-espresso-900/10 pt-6">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured (maks. 3 aktif)
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published
        </label>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? "Menyimpan…" : "Simpan"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-outline">
          Batal
        </button>
      </div>
    </form>
  );
}
