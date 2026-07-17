"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

/**
 * Single source of truth for all visible UI copy.
 * `id` is the canonical shape; `en` is type-checked against it, so a
 * missing translation is a compile error. Product/article content that
 * is data rather than UI copy lives in src/lib/content.ts with
 * { id, en } fields.
 */
const id = {
  nav: {
    home: "Beranda",
    products: "Produk Kami",
    export: "Ekspor",
    news: "Berita & Kegiatan",
    contact: "Hubungi Kami",
    inquiry: "Hubungi Kami",
  },
  common: {
    seeAll: "Lihat semua",
    seeAllProducts: "Lihat semua produk",
    readMore: "Baca selengkapnya",
    backToNews: "Kembali ke Berita & Kegiatan",
    backToProducts: "Kembali ke katalog",
    exploreBrand: "Jelajahi",
    viewDetail: "Lihat detail",
    home: "Beranda",
    relatedArticles: "Artikel terkait",
    editableNote: "Konten placeholder — sesuaikan dengan data final.",
  },
  hero: {
    kicker: "CV Gama Putra Santosa · Sleman, Yogyakarta",
    title: "Pangan lokal, dibawa ke panggung modern.",
    subtitle:
      "Dari Sleman, Yogyakarta — kami mengolah singkong dan rempah asli Indonesia menjadi dua keluarga produk: camilan Kuicip dan minuman tradisional Putri Teko.",
    ctaProducts: "Jelajahi Produk",
    ctaExport: "Permintaan Ekspor",
    ctaContact: "Hubungi Kami",
    scrollHint: "Gulir untuk menjelajah",
    lineSnack: "Keripik Singkong",
    lineBeverage: "Minuman Tradisional",
  },
  intro: {
    kicker: "Tentang Kami",
    title: "Perusahaan pangan dari Yogyakarta dengan dua dunia rasa.",
    body: "CV Gama Putra Santosa adalah perusahaan produksi pangan yang berbasis di Sleman, DI Yogyakarta. Kami percaya bahan lokal — singkong dari kebun sekitar dan rempah warisan Nusantara — layak tampil dalam produk modern yang dikemas serius dan siap tumbuh ke pasar yang lebih luas.",
    facts: [
      { label: "Basis Produksi", value: "Sleman, DI Yogyakarta" },
      { label: "Fokus", value: "Camilan & minuman tradisional" },
      { label: "Keluarga Produk", value: "Kuicip · Putri Teko" },
      { label: "Kemitraan", value: "Terbuka untuk kolaborasi" },
    ],
  },
  featured: {
    kicker: "Produk Unggulan",
    title: "Yang paling sering dicari, dari dua dunia kami.",
    subtitle:
      "Sebagian kecil dari katalog — pilihan yang paling menggambarkan karakter tiap keluarga produk.",
    kuicipTitle: "Sorotan Kuicip",
    tekoRtdTitle: "Putri Teko · Siap Minum",
    tekoBrewTitle: "Putri Teko · Seduh Sendiri",
  },
  families: {
    kicker: "Dua Dunia, Satu Dapur",
    title: "Kenali dua keluarga produk kami.",
    kuicip: {
      lead: "Renyah, berwarna, ekspresif.",
      body: "Kuicip membawa singkong lokal ke era camilan modern — delapan kepribadian rasa dalam kemasan ziplock 70 gr yang berani tampil beda.",
      cta: "Masuk ke dunia Kuicip",
    },
    teko: {
      lead: "Hangat, membumi, penuh cerita.",
      body: "Putri Teko meracik kembali minuman tradisional Jawa — dari wedang jahe hingga wedang uwuh — untuk kehangatan yang bisa dinikmati kapan saja.",
      cta: "Masuk ke dunia Putri Teko",
    },
  },
  exportSection: {
    kicker: "Ekspor & Kemitraan",
    title: "Portofolio kami terbuka untuk dieksplorasi.",
    subtitle:
      "Kami menyambut percakapan dengan distributor, peritel, dan calon buyer — dari penjajakan produk hingga diskusi kebutuhan pasar tujuan.",
    blocks: [
      {
        title: "Eksplorasi Portofolio",
        body: "Dua keluarga produk dengan karakter berbeda — camilan modern dan minuman tradisional — siap dipresentasikan untuk penjajakan pasar.",
      },
      {
        title: "Presentasi Kemasan",
        body: "Kemasan ziplock dan botol yang dirancang rapi, dengan ruang diskusi untuk penyesuaian label sesuai kebutuhan mitra.",
      },
      {
        title: "Peluang Kolaborasi",
        body: "Terbuka untuk kerja sama distribusi, penempatan ritel, dan bentuk kemitraan lain yang dirancang bersama.",
      },
      {
        title: "Diskusi Ekspor",
        body: "Percakapan eksplorasi untuk kebutuhan pasar luar negeri — mulai dari sampel, spesifikasi, hingga skenario kerja sama.",
      },
    ],
    ctaTitle: "Mari diskusikan peluang untuk pasar Anda.",
    ctaBody: "Sampaikan kebutuhan Anda — kami siapkan materi produk dan jadwal diskusi.",
    ctaButton: "Mulai Percakapan",
    pageIntro:
      "Halaman ini dirancang untuk mitra bisnis: distributor, peritel, dan calon buyer yang ingin mengenal portofolio kami lebih dekat. Kami tidak mengumbar klaim — kami mengundang percakapan.",
    processTitle: "Bagaimana percakapan dimulai",
    process: [
      { title: "Perkenalan", body: "Ceritakan pasar dan kebutuhan Anda melalui formulir atau email." },
      { title: "Materi Produk", body: "Kami kirimkan profil produk, spesifikasi kemasan, dan daftar varian." },
      { title: "Sampel & Diskusi", body: "Penjajakan sampel dan diskusi skema kerja sama yang sesuai." },
      { title: "Kemitraan", body: "Kesepakatan dirancang bersama, bertumbuh secara bertahap." },
    ],
  },
  newsSection: {
    kicker: "Berita & Kegiatan",
    title: "Cerita dari dapur dan lapangan.",
    subtitle:
      "Sorotan produk, kegiatan perusahaan, partisipasi lokal, dan edukasi seputar bahan — didokumentasikan sebagai catatan perjalanan.",
    empty: "Belum ada artikel.",
  },
  contactSection: {
    kicker: "Hubungi Kami",
    title: "Mari mulai percakapan.",
    subtitle:
      "Untuk pertanyaan produk, distribusi, ekspor, maupun kolaborasi — tim kami siap membantu.",
    ctaTitle: "Punya pertanyaan atau peluang kerja sama?",
    ctaBody: "Satu pesan singkat sudah cukup untuk memulai.",
    ctaButton: "Hubungi Kami",
    form: {
      name: "Nama",
      namePlaceholder: "Nama lengkap Anda",
      email: "Email",
      emailPlaceholder: "nama@perusahaan.com",
      topic: "Kategori",
      topics: ["Umum", "Produk", "Ekspor", "Kolaborasi"],
      message: "Pesan",
      messagePlaceholder: "Ceritakan kebutuhan Anda…",
      submit: "Kirim Pesan",
      sent: "Terima kasih — pesan Anda telah kami terima.",
    },
    info: {
      addressLabel: "Alamat",
      addressNote: "Alamat placeholder — perbarui dengan info bisnis final.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      hoursLabel: "Jam Operasional",
      hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
      mapNote: "Slot peta — sematkan lokasi final di sini.",
    },
  },
  productsPage: {
    kicker: "Produk Kami",
    title: "Dua keluarga produk, satu standar dapur.",
    subtitle:
      "Kuicip dan Putri Teko lahir dari dapur produksi yang sama di Sleman — namun masing-masing membawa dunia rasanya sendiri.",
    highlightsLabel: "Sorotan",
  },
  kuicipPage: {
    kicker: "Keluarga Produk · Kuicip",
    title: "Singkong lokal, delapan kepribadian rasa.",
    subtitle:
      "Keripik singkong modern dalam kemasan ziplock 70 gr — diiris tipis, digoreng renyah, dan dibumbui dengan spektrum rasa dari yang jujur sampai yang berani.",
    catalogTitle: "Katalog Rasa",
    personalityLabel: "Kepribadian",
  },
  tekoPage: {
    kicker: "Keluarga Produk · Putri Teko",
    title: "Minuman tradisional, diracik untuk hari ini.",
    subtitle:
      "Dari wedang jahe hingga wedang uwuh — rempah asli diseduh dan dikemas dalam dua cara menikmati: siap minum, atau diseduh sendiri di rumah.",
    rtdTitle: "Siap Minum",
    rtdBody: "Diseduh di dapur kami, tinggal dibuka dan dinikmati — hangat maupun dingin.",
    brewTitle: "Seduh Sendiri",
    brewBody: "Rempah kering dalam takaran pas, untuk yang ingin menikmati ritual menyeduh.",
    servingLabel: "Penyajian",
    groupNote: "Pembagian kategori bersifat placeholder — sesuaikan dengan lini produk final.",
  },
  productDetail: {
    categoryLabel: "Kategori",
    aboutTitle: "Tentang produk ini",
    highlightsTitle: "Keunggulan",
    notesTitleKuicip: "Catatan rasa",
    notesTitleTeko: "Bahan & penyajian",
    relatedTitle: "Produk lain dari keluarga ini",
    inquiryTitle: "Tertarik dengan produk ini?",
    inquiryBody: "Hubungi kami untuk info ketersediaan, kerja sama distribusi, atau permintaan sampel.",
    inquiryButton: "Tanyakan Produk Ini",
    weightLabel: "Isi bersih",
  },
  articleDetail: {
    publishedLabel: "Dipublikasikan",
    shareHint: "Bagikan artikel ini",
  },
  footer: {
    tagline: "Perusahaan produksi pangan dari Sleman, Yogyakarta — rumah bagi Kuicip dan Putri Teko.",
    linksTitle: "Navigasi",
    brandsTitle: "Keluarga Produk",
    contactTitle: "Kontak",
    langTitle: "Bahasa",
    copyright: "Hak cipta dilindungi.",
  },
};

const en: typeof id = {
  nav: {
    home: "Home",
    products: "Our Products",
    export: "Export",
    news: "News & Activities",
    contact: "Contact Us",
    inquiry: "Contact Us",
  },
  common: {
    seeAll: "See all",
    seeAllProducts: "See all products",
    readMore: "Read more",
    backToNews: "Back to News & Activities",
    backToProducts: "Back to catalog",
    exploreBrand: "Explore",
    viewDetail: "View details",
    home: "Home",
    relatedArticles: "Related articles",
    editableNote: "Placeholder content — replace with final data.",
  },
  hero: {
    kicker: "CV Gama Putra Santosa · Sleman, Yogyakarta",
    title: "Local ingredients, brought to the modern stage.",
    subtitle:
      "From Sleman, Yogyakarta — we craft Indonesian cassava and native spices into two product families: Kuicip snacks and Putri Teko traditional beverages.",
    ctaProducts: "Explore Products",
    ctaExport: "Export Inquiry",
    ctaContact: "Contact Us",
    scrollHint: "Scroll to explore",
    lineSnack: "Cassava Chips",
    lineBeverage: "Traditional Beverages",
  },
  intro: {
    kicker: "About Us",
    title: "A Yogyakarta food company with two worlds of flavor.",
    body: "CV Gama Putra Santosa is a food production company based in Sleman, Yogyakarta. We believe local ingredients — cassava from nearby fields and heritage Nusantara spices — deserve modern products, packaged seriously and ready to grow into wider markets.",
    facts: [
      { label: "Production Base", value: "Sleman, Yogyakarta" },
      { label: "Focus", value: "Snacks & traditional beverages" },
      { label: "Product Families", value: "Kuicip · Putri Teko" },
      { label: "Partnership", value: "Open for collaboration" },
    ],
  },
  featured: {
    kicker: "Featured Products",
    title: "The most sought-after, from both of our worlds.",
    subtitle:
      "A small slice of the catalog — the picks that best capture each product family's character.",
    kuicipTitle: "Kuicip Highlights",
    tekoRtdTitle: "Putri Teko · Ready to Drink",
    tekoBrewTitle: "Putri Teko · Brew at Home",
  },
  families: {
    kicker: "Two Worlds, One Kitchen",
    title: "Meet our two product families.",
    kuicip: {
      lead: "Crunchy, colorful, expressive.",
      body: "Kuicip brings local cassava into the modern snack era — eight flavor personalities in a 70 gr ziplock pack that isn't afraid to stand out.",
      cta: "Enter the Kuicip world",
    },
    teko: {
      lead: "Warm, grounded, full of stories.",
      body: "Putri Teko re-crafts traditional Javanese beverages — from ginger wedang to Wedang Uwuh — for warmth you can enjoy any time.",
      cta: "Enter the Putri Teko world",
    },
  },
  exportSection: {
    kicker: "Export & Partnership",
    title: "A portfolio open for exploration.",
    subtitle:
      "We welcome conversations with distributors, retailers, and prospective buyers — from product exploration to destination-market discussions.",
    blocks: [
      {
        title: "Portfolio Exploration",
        body: "Two product families with distinct characters — modern snacks and traditional beverages — ready to present for market exploration.",
      },
      {
        title: "Packaging Presentation",
        body: "Neatly designed ziplock and bottle packaging, with room to discuss label adjustments for partner needs.",
      },
      {
        title: "Collaboration Opportunities",
        body: "Open to distribution partnerships, retail placement, and other collaboration formats designed together.",
      },
      {
        title: "Export Discussions",
        body: "Exploratory conversations for overseas market needs — from samples and specifications to partnership scenarios.",
      },
    ],
    ctaTitle: "Let's discuss the opportunity for your market.",
    ctaBody: "Tell us what you need — we'll prepare product materials and a discussion schedule.",
    ctaButton: "Start the Conversation",
    pageIntro:
      "This page is built for business partners: distributors, retailers, and prospective buyers who want a closer look at our portfolio. We don't broadcast claims — we invite conversations.",
    processTitle: "How the conversation starts",
    process: [
      { title: "Introduction", body: "Tell us about your market and needs via the form or email." },
      { title: "Product Materials", body: "We send product profiles, packaging specifications, and the variant list." },
      { title: "Samples & Discussion", body: "Sample exploration and discussion of a suitable partnership scheme." },
      { title: "Partnership", body: "Agreements designed together, growing step by step." },
    ],
  },
  newsSection: {
    kicker: "News & Activities",
    title: "Stories from the kitchen and the field.",
    subtitle:
      "Product highlights, company activities, local participation, and ingredient education — documented as travel notes.",
    empty: "No articles yet.",
  },
  contactSection: {
    kicker: "Contact Us",
    title: "Let's start a conversation.",
    subtitle:
      "For product, distribution, export, or collaboration inquiries — our team is ready to help.",
    ctaTitle: "Have a question or a partnership opportunity?",
    ctaBody: "One short message is enough to get started.",
    ctaButton: "Contact Us",
    form: {
      name: "Name",
      namePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "name@company.com",
      topic: "Category",
      topics: ["General", "Product", "Export", "Collaboration"],
      message: "Message",
      messagePlaceholder: "Tell us what you need…",
      submit: "Send Message",
      sent: "Thank you — we have received your message.",
    },
    info: {
      addressLabel: "Address",
      addressNote: "Placeholder address — update with final business info.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      hoursLabel: "Business Hours",
      hours: "Monday – Saturday, 08.00 – 17.00 WIB",
      mapNote: "Map slot — embed the final location here.",
    },
  },
  productsPage: {
    kicker: "Our Products",
    title: "Two product families, one kitchen standard.",
    subtitle:
      "Kuicip and Putri Teko are born from the same production kitchen in Sleman — yet each carries its own world of flavor.",
    highlightsLabel: "Highlights",
  },
  kuicipPage: {
    kicker: "Product Family · Kuicip",
    title: "Local cassava, eight flavor personalities.",
    subtitle:
      "Modern cassava chips in 70 gr ziplock packaging — sliced thin, fried crisp, and seasoned across a spectrum from honest to daring.",
    catalogTitle: "Flavor Catalog",
    personalityLabel: "Personality",
  },
  tekoPage: {
    kicker: "Product Family · Putri Teko",
    title: "Traditional beverages, crafted for today.",
    subtitle:
      "From ginger wedang to Wedang Uwuh — real spices brewed and packaged two ways: ready to drink, or brewed at home.",
    rtdTitle: "Ready to Drink",
    rtdBody: "Brewed in our kitchen — just open and enjoy, warm or chilled.",
    brewTitle: "Brew at Home",
    brewBody: "Dried spices in measured portions, for those who savor the brewing ritual.",
    servingLabel: "Serving",
    groupNote: "The category split is a placeholder — align it with the final product line.",
  },
  productDetail: {
    categoryLabel: "Category",
    aboutTitle: "About this product",
    highlightsTitle: "Highlights",
    notesTitleKuicip: "Flavor notes",
    notesTitleTeko: "Ingredients & serving",
    relatedTitle: "More from this family",
    inquiryTitle: "Interested in this product?",
    inquiryBody: "Contact us for availability, distribution partnerships, or sample requests.",
    inquiryButton: "Ask About This Product",
    weightLabel: "Net weight",
  },
  articleDetail: {
    publishedLabel: "Published",
    shareHint: "Share this article",
  },
  footer: {
    tagline: "A food production company from Sleman, Yogyakarta — home of Kuicip and Putri Teko.",
    linksTitle: "Navigation",
    brandsTitle: "Product Families",
    contactTitle: "Contact",
    langTitle: "Language",
    copyright: "All rights reserved.",
  },
};

export const dictionary = { id, en } as const;
export type Dictionary = typeof id;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
