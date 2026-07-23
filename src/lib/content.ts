/**
 * Structured content for the whole site.
 *
 * CONTENT SOURCING RULES
 * ──────────────────────
 * • Facts drawn from public context + real packaging photos in
 *   /public/images (kept intentionally soft):
 *   – CV Gama Putra Santosa: food production, Sleman, DI Yogyakarta.
 *   – Kuicip: cassava chips line ("Cassa Lite"), 70 gr ziplock, 8
 *     flavors — each with a real studio packshot. "Cassa Lite" and
 *     "no added flour" are corroborated by public market research
 *     (the term is printed on the real packaging photos too).
 *   – Putri Teko: traditional/herbal beverages in four packaging
 *     forms photographed in /public/images/putri-teko:
 *     botol (RTD bottles), kotak (sachet boxes), toples (jars),
 *     kemasan (practical plastic pack). The name references the
 *     general Javanese custom of brewing warm wedang to welcome
 *     guests — copy frames this as heritage/inspiration ("a recipe
 *     familiar in Yogyakarta homes"), not as an affiliation with any
 *     specific named household, palace, or third-party product.
 * • Blurbs, serving copy, and article stories are EDITABLE copy
 *   written to invite inquiry, not to claim facts.
 *
 * IMAGE SLOTS: every `image` field is `string | null`. All current
 * products point at real studio photos (1086×1448, warm cream
 * backdrop). If a future SKU has no photo yet, leave `image: null`
 * and components fall back to SVG placeholder packshots.
 */

export type Bilingual = { id: string; en: string };
export type BrandKey = "kuicip" | "putri-teko";
export type TekoGroup = "rtd" | "brew";
/** Real Putri Teko packaging forms, mirroring the photo set */
export type TekoPackaging = "botol" | "kotak" | "toples" | "kemasan" | "besek";

/* ------------------------------------------------------------------ */
/* Brand assets — real files in /public/images                         */
/* ------------------------------------------------------------------ */
export const logos = {
  /** corporate mark: red flower + blue "GPS", landscape, transparent */
  gps: "/images/logo/gps.webp",
  /** playful yellow cartoon wordmark, landscape, transparent */
  kuicip: "/images/logo/kuicip.webp",
  /** ornate art-nouveau emblem, portrait, transparent */
  "putri-teko": "/images/logo/putriteko.webp",
} as const;

/** Transparent multi-product cutouts for layered hero/panel scenes */
export const groupShots = {
  kuicip: "/images/kuicip-nobg.webp", // 3-pouch fan (Seaweed · Original · Truffle)
  "putri-teko": "/images/putriteko-nobg.webp", // 5 kotak sachet boxes (Susu Jahe, Jahe Cokelat, Jahe Serai, Jahe Merah, Wedang Uwuh)
} as const;

/* ------------------------------------------------------------------ */
/* Brands                                                              */
/* ------------------------------------------------------------------ */
export const brands = {
  kuicip: {
    key: "kuicip" as const,
    name: "Kuicip",
    tag: { id: "Keripik Singkong Modern", en: "Modern Cassava Chips" },
    weight: "70 gr",
    story: {
      id: "Kuicip lahir dari pertanyaan sederhana: bisakah singkong kampung tampil di rak modern tanpa kehilangan kejujurannya? Jawabannya — diiris tipis, digoreng renyah, tanpa campuran tepung — lalu dibumbui delapan rasa, dari yang bersahaja sampai yang berani, dan dikemas ziplock 70 gr supaya gampang dibawa ke mana saja.",
      en: "Kuicip started with a simple question: can village cassava stand on a modern shelf without losing its honesty? The answer — sliced thin, fried crisp, no added flour — then seasoned across eight flavors, from humble to daring, and sealed in a 70 gr ziplock pack that travels easily.",
    },
    href: "/products/kuicip",
  },
  "putri-teko": {
    key: "putri-teko" as const,
    name: "Putri Teko",
    tag: { id: "Minuman Tradisional & Herbal", en: "Traditional & Herbal Beverages" },
    weight: null,
    story: {
      id: "Nama Putri Teko kami pinjam dari kebiasaan lama: menyeduh wedang hangat untuk menjamu tamu yang datang. Jahe, sereh, dan gula Jawa kami racik jadi wedang jahe, kunir asam, sampai wedang uwuh — lalu dikemas dalam botol siap minum, kotak sachet, toples, dan kemasan praktis, supaya kehangatan itu bisa dinikmati kapan saja, bukan hanya saat ada tamu.",
      en: "We borrowed the name Putri Teko from an old habit: brewing a warm wedang to welcome guests. Ginger, lemongrass, and palm sugar become ginger wedang, turmeric-tamarind, and Wedang Uwuh — now packaged in ready-to-drink bottles, sachet boxes, jars, and practical packs, so that warmth isn't reserved only for when guests arrive.",
    },
    href: "/products/putri-teko",
  },
} satisfies Record<BrandKey, unknown>;

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */
export type Product = {
  slug: string;
  brand: BrandKey;
  /** Putri Teko only: ready-to-drink vs ready-to-brew */
  group?: TekoGroup;
  /** Putri Teko only: real packaging form (drives card framing) */
  packaging?: TekoPackaging;
  name: Bilingual;
  /** one-line card blurb */
  short: Bilingual;
  /** flavor personality (Kuicip) / beverage type (Putri Teko) */
  personality: Bilingual;
  /** serving style — Putri Teko cards + detail pages */
  serving?: Bilingual;
  /** detail-page intro paragraph */
  description: Bilingual;
  highlights: Bilingual[];
  /** flavor notes (Kuicip) / ingredient & serving notes (Putri Teko) */
  notes: Bilingual[];
  color: string;
  colorDark: string;
  image: string | null;
  featured?: boolean;
  /** SKU is editable placeholder, not backed by a real asset */
  placeholder?: boolean;
};

const kuicipShared = {
  brand: "kuicip" as const,
  highlightsBase: [
    { id: "Singkong lokal pilihan", en: "Selected local cassava" },
    { id: "Kemasan ziplock 70 gr", en: "70 gr ziplock packaging" },
    { id: "Diiris tipis, digoreng renyah", en: "Sliced thin, fried crisp" },
  ],
};

export const kuicipProducts: Product[] = [
  {
    slug: "original",
    ...{ brand: kuicipShared.brand },
    name: { id: "Original", en: "Original" },
    short: {
      id: "Gurih asin klasik yang membiarkan rasa singkong bicara.",
      en: "Classic savory-salty that lets the cassava speak.",
    },
    personality: { id: "Jujur & membumi", en: "Honest & grounded" },
    description: {
      id: "Varian pembuka dari keluarga Kuicip: singkong pilihan yang diiris tipis dan digoreng hingga renyah, dibumbui garam gurih secukupnya. Sederhana, tapi justru di situ ujiannya — tidak ada rasa yang bisa disembunyikan.",
      en: "The opening act of the Kuicip family: selected cassava sliced thin and fried until crisp, seasoned with just enough savory salt. Simple — which is exactly the test, because nothing can hide.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Gurih asin, ringan", en: "Savory-salty, light" },
      { id: "Cocok untuk semua umur", en: "Crowd-pleaser for all ages" },
    ],
    color: "#F2B234",
    colorDark: "#9C6508",
    image: "/images/kuicip/kuicip-ori.webp",
    featured: true,
  },
  {
    slug: "balado",
    brand: "kuicip",
    name: { id: "Balado", en: "Balado" },
    short: {
      id: "Pedas manis khas balado yang nempel di jari.",
      en: "Sweet-spicy balado that stays on your fingers.",
    },
    personality: { id: "Ramai & nagih", en: "Loud & addictive" },
    description: {
      id: "Bumbu balado bergaya Minang — cabai, bawang, dan sedikit manis — membalut tiap keping singkong renyah. Varian yang paling sering habis duluan.",
      en: "Minang-style balado seasoning — chili, shallot, and a touch of sweetness — coats every crisp of cassava. The variant that runs out first.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Pedas manis, aroma cabai", en: "Sweet heat, chili aroma" },
      { id: "Level pedas: sedang", en: "Heat level: medium" },
    ],
    color: "#D9442E",
    colorDark: "#8E2718",
    image: "/images/kuicip/kuicip-balado.webp",
    featured: true,
  },
  {
    slug: "barbeque",
    brand: "kuicip",
    name: { id: "Barbeque", en: "Barbeque" },
    short: {
      id: "Manis smoky ala panggangan, renyah sampai akhir.",
      en: "Smoky-sweet grill character, crunchy to the end.",
    },
    personality: { id: "Santai & smoky", en: "Laid-back & smoky" },
    description: {
      id: "Bumbu barbeque dengan karakter smoky-manis yang akrab di lidah — versi singkong dari rasa favorit lintas generasi.",
      en: "Barbeque seasoning with a familiar smoky-sweet character — the cassava take on a cross-generation favorite.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Smoky manis, sedikit paprika", en: "Smoky-sweet with a paprika note" },
      { id: "Level pedas: rendah", en: "Heat level: low" },
    ],
    color: "#C05A2E",
    colorDark: "#7A3418",
    image: "/images/kuicip/kuicip-barbeque.webp",
  },
  {
    slug: "rendang",
    brand: "kuicip",
    name: { id: "Rendang", en: "Rendang" },
    short: {
      id: "Rempah rendang yang dalam dan gurih di tiap keping.",
      en: "Deep, savory rendang spice in every crisp.",
    },
    personality: { id: "Kaya & berkarakter", en: "Rich & full of character" },
    description: {
      id: "Terinspirasi masakan paling terkenal dari Sumatra Barat: lengkuas, serai, santan, dan cabai dalam bumbu kering yang gurihnya berlapis.",
      en: "Inspired by West Sumatra's most famous dish: galangal, lemongrass, coconut, and chili in a dry seasoning with layered savoriness.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Gurih rempah, aroma santan", en: "Spiced savory, coconut aroma" },
      { id: "Level pedas: sedang", en: "Heat level: medium" },
    ],
    color: "#7E3020",
    colorDark: "#4A1B11",
    image: "/images/kuicip/kuicip-rendang.webp",
  },
  {
    slug: "spicy-mala",
    brand: "kuicip",
    name: { id: "Spicy Mala", en: "Spicy Mala" },
    short: {
      id: "Pedas menggigit dengan sensasi mala yang menggetarkan.",
      en: "Biting heat with that tingling mala buzz.",
    },
    personality: { id: "Berani & bergetar", en: "Bold & tingling" },
    description: {
      id: "Untuk pemburu pedas: bumbu mala dengan sensasi kebas khas andaliman-szechuan yang perlahan menjalar. Bukan untuk yang setengah-setengah.",
      en: "For heat hunters: mala seasoning with the slow-spreading szechuan-pepper tingle. Not for the half-hearted.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Pedas kebas khas mala", en: "Numbing-spicy mala character" },
      { id: "Level pedas: tinggi", en: "Heat level: high" },
    ],
    color: "#B3232E",
    colorDark: "#6D0F16",
    image: "/images/kuicip/kuicip-spicymala.webp",
  },
  {
    slug: "seaweed",
    brand: "kuicip",
    name: { id: "Seaweed", en: "Seaweed" },
    short: {
      id: "Umami rumput laut yang gurihnya tenang tapi dalam.",
      en: "Seaweed umami — quiet on top, deep underneath.",
    },
    personality: { id: "Tenang & umami", en: "Calm & umami" },
    description: {
      id: "Bubuk rumput laut membalut keping singkong dengan gurih umami yang bersih — varian favorit penikmat rasa asin non-pedas.",
      en: "Seaweed powder coats each crisp with clean umami savoriness — the favorite for non-spicy savory fans.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Umami gurih, aroma nori", en: "Savory umami, nori aroma" },
      { id: "Tanpa pedas", en: "No heat" },
    ],
    color: "#3E8E52",
    colorDark: "#1F5230",
    image: "/images/kuicip/kuicip-seaweed.webp",
    featured: true,
  },
  {
    slug: "truffle",
    brand: "kuicip",
    name: { id: "Truffle", en: "Truffle" },
    short: {
      id: "Aroma truffle yang mewah di atas singkong lokal.",
      en: "Luxurious truffle aroma over humble local cassava.",
    },
    personality: { id: "Elegan & tak terduga", en: "Elegant & unexpected" },
    description: {
      id: "Perpaduan yang tidak biasa: aroma truffle yang earthy-mewah bertemu keping singkong Sleman. Bukti bahwa bahan lokal bisa tampil di panggung mana pun.",
      en: "An unlikely pairing: earthy, luxurious truffle aroma meets Sleman cassava crisps. Proof that local ingredients belong on any stage.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Earthy, buttery, aromatik", en: "Earthy, buttery, aromatic" },
      { id: "Tanpa pedas", en: "No heat" },
    ],
    color: "#33302B",
    colorDark: "#191713",
    image: "/images/kuicip/kuicip-truffle.webp",
    featured: true,
  },
  {
    slug: "chili-lime",
    brand: "kuicip",
    name: { id: "Chili Lime", en: "Chili Lime" },
    short: {
      id: "Pedas segar dengan kecutan jeruk yang membangunkan.",
      en: "Fresh heat with a wake-up squeeze of lime.",
    },
    personality: { id: "Segar & nakal", en: "Zesty & mischievous" },
    description: {
      id: "Cabai bertemu jeruk limau: pedas yang datang duluan, disusul asam segar yang membuat tangan kembali ke kemasan.",
      en: "Chili meets lime: heat arrives first, followed by a fresh tang that sends your hand back into the bag.",
    },
    highlights: kuicipShared.highlightsBase,
    notes: [
      { id: "Pedas asam segar", en: "Fresh sour heat" },
      { id: "Level pedas: sedang", en: "Heat level: medium" },
    ],
    color: "#8FAE3A",
    colorDark: "#4E6318",
    image: "/images/kuicip/kuicip-chililime.webp",
  },
];

/**
 * Putri Teko catalog — mirrors the real photo set in
 * /public/images/putri-teko, one SKU per photographed product:
 *   botol  (RTD)   : Beras Kencur, Gula Asam, Kunir Asam
 *   kotak  (sachet): Jahe Coklat, Jahe Merah, Jahe Serai, Wedang Uwuh
 *   toples (jar)   : Gula Batu Kristal, Jahe Merah, Jahe Serai, Wedang Uwuh
 *   kemasan (pack) : Racikan Original
 * Blurbs/serving copy remain editable marketing copy.
 */
const tekoBotolServing = {
  id: "Siap minum · nikmat hangat atau dingin",
  en: "Ready to drink · best warm or chilled",
};
const tekoKotakServing = {
  id: "Kotak isi sachet · tinggal seduh",
  en: "Sachet box · just steep",
};
const tekoToplesServing = {
  id: "Toples racikan · seduh sesuai selera",
  en: "Jar blend · steep to taste",
};

export const putriTekoProducts: Product[] = [
  /* ── Botol · Siap Minum ─────────────────────────────────────────── */
  {
    slug: "beras-kencur",
    brand: "putri-teko",
    group: "rtd",
    packaging: "botol",
    name: { id: "Beras Kencur", en: "Beras Kencur" },
    short: {
      id: "Manis lembut beras dan hangat kencur dalam satu botol.",
      en: "Gentle rice sweetness and warm kencur in one bottle.",
    },
    personality: { id: "Lembut & memulihkan", en: "Gentle & restoring" },
    serving: tekoBotolServing,
    description: {
      id: "Jamu klasik Jawa yang paling ramah di lidah: beras yang disangrai halus bertemu kencur yang hangat, diseduh menjadi minuman lembut berwarna susu — kini siap minum dalam botol praktis.",
      en: "The friendliest of classic Javanese jamu: finely toasted rice meets warming kencur in a smooth, milky drink — now ready to drink in a practical bottle.",
    },
    highlights: [
      { id: "Resep jamu klasik Jawa", en: "A classic Javanese jamu recipe" },
      { id: "Diseduh dari bahan asli", en: "Brewed from real ingredients" },
      { id: "Botol siap minum", en: "Ready-to-drink bottle" },
    ],
    notes: [
      { id: "Beras sangrai, kencur, gula", en: "Toasted rice, kencur, sugar" },
      { id: "Kocok dahulu, simpan dingin", en: "Shake first, keep chilled" },
    ],
    color: "#CBA35C",
    colorDark: "#7A5A25",
    image: "/images/putri-teko/boto-beraskencur.webp",
    featured: true,
  },
  {
    slug: "gula-asam",
    brand: "putri-teko",
    group: "rtd",
    packaging: "botol",
    name: { id: "Gula Asam", en: "Gula Asam" },
    short: {
      id: "Asam jawa dan gula aren — segar, manis, membangunkan.",
      en: "Tamarind and palm sugar — fresh, sweet, awakening.",
    },
    personality: { id: "Segar & klasik", en: "Fresh & classic" },
    serving: tekoBotolServing,
    description: {
      id: "Perpaduan asam jawa dan gula aren yang turun-temurun jadi pelepas dahaga: kecut yang segar disusul manis karamel yang dalam. Paling nikmat disajikan dingin di siang hari.",
      en: "The time-honored thirst-quencher of tamarind and palm sugar: a fresh tang followed by deep caramel sweetness. At its best served cold on a warm afternoon.",
    },
    highlights: [
      { id: "Asam jawa asli", en: "Real tamarind" },
      { id: "Manis alami gula aren", en: "Naturally sweetened with palm sugar" },
      { id: "Botol siap minum", en: "Ready-to-drink bottle" },
    ],
    notes: [
      { id: "Asam jawa, gula aren", en: "Tamarind, palm sugar" },
      { id: "Paling segar disajikan dingin", en: "At its best served cold" },
    ],
    color: "#8A4A26",
    colorDark: "#502713",
    image: "/images/putri-teko/botol-gulaasam.webp",
  },
  {
    slug: "kunir-asam",
    brand: "putri-teko",
    group: "rtd",
    packaging: "botol",
    name: { id: "Kunir Asam", en: "Kunir Asam" },
    short: {
      id: "Kunyit segar bertemu asam jawa yang menyegarkan.",
      en: "Fresh turmeric meets bright, refreshing tamarind.",
    },
    personality: { id: "Segar & membumi", en: "Fresh & grounding" },
    serving: tekoBotolServing,
    description: {
      id: "Kunir asam — pasangan kunyit dan asam jawa yang dinikmati lintas generasi sebagai penyegar harian — diseduh dari bahan asli tanpa pewarna, dengan warna keemasan alami dari kunyitnya sendiri.",
      en: "Kunir asam — the turmeric-and-tamarind pairing enjoyed across generations as a daily refresher — brewed from real ingredients with no coloring, its golden hue coming from the turmeric itself.",
    },
    highlights: [
      { id: "Kunyit segar, asam jawa asli", en: "Fresh turmeric, real tamarind" },
      { id: "Warna kuning alami", en: "Naturally golden color" },
      { id: "Botol siap minum", en: "Ready-to-drink bottle" },
    ],
    notes: [
      { id: "Kunyit, asam jawa, gula", en: "Turmeric, tamarind, sugar" },
      { id: "Paling segar disajikan dingin", en: "At its best served cold" },
    ],
    color: "#D98E23",
    colorDark: "#8A5510",
    image: "/images/putri-teko/botol-kuniasam.webp",
    featured: true,
  },

  /* ── Kotak · Sachet Seduh ───────────────────────────────────────── */
  {
    slug: "jahe-coklat",
    brand: "putri-teko",
    group: "brew",
    packaging: "kotak",
    name: { id: "Jahe Cokelat", en: "Ginger Chocolate" },
    short: {
      id: "Hangat jahe berpadu coklat — kombinasi yang menenangkan.",
      en: "Ginger warmth meets chocolate — a soothing pairing.",
    },
    personality: { id: "Hangat & manja", en: "Warm & comforting" },
    serving: tekoKotakServing,
    description: {
      id: "Perpaduan yang tidak terduga tapi langsung masuk akal di seduhan pertama: pedas hangat jahe dilembutkan coklat yang creamy. Sachet praktis dalam kotak batik khas Putri Teko.",
      en: "An unexpected pairing that makes sense from the first sip: warm ginger heat softened by creamy chocolate. Practical sachets in Putri Teko's signature batik box.",
    },
    highlights: [
      { id: "Jahe asli + coklat", en: "Real ginger + chocolate" },
      { id: "Sachet sekali seduh", en: "Single-steep sachets" },
      { id: "Kotak batik khas", en: "Signature batik box" },
    ],
    notes: [
      { id: "Seduh dengan air panas 200 ml", en: "Steep in 200 ml hot water" },
      { id: "Nikmat juga dengan susu", en: "Also great with milk" },
    ],
    color: "#6B4226",
    colorDark: "#3E2413",
    image: "/images/putri-teko/kotak-jahecoklat.webp",
  },
  {
    slug: "jahe-merah-kotak",
    brand: "putri-teko",
    group: "brew",
    packaging: "kotak",
    name: { id: "Jahe Merah", en: "Red Ginger" },
    short: {
      id: "Jahe merah pilihan untuk seduhan yang lebih berani.",
      en: "Selected red ginger for a bolder cup.",
    },
    personality: { id: "Kuat & menghangatkan", en: "Strong & warming" },
    serving: tekoKotakServing,
    description: {
      id: "Jahe merah dikenal lebih pedas dan hangat daripada jahe biasa. Dalam sachet praktis, seduhan berani ini siap menemani begadang dan musim hujan — tinggal tuang air panas.",
      en: "Red ginger runs spicier and warmer than common ginger. In practical sachets, this bold brew is ready for late nights and rainy seasons — just add hot water.",
    },
    highlights: [
      { id: "Jahe merah, karakter lebih kuat", en: "Red ginger, stronger character" },
      { id: "Sachet sekali seduh", en: "Single-steep sachets" },
      { id: "Kotak batik khas", en: "Signature batik box" },
    ],
    notes: [
      { id: "Seduh dengan air panas 200 ml", en: "Steep in 200 ml hot water" },
      { id: "Nikmat dengan madu", en: "Great with honey" },
    ],
    color: "#A63A2A",
    colorDark: "#64190F",
    image: "/images/putri-teko/kotak-jahemerah.webp",
  },
  {
    slug: "jahe-serai",
    brand: "putri-teko",
    group: "brew",
    packaging: "kotak",
    name: { id: "Jahe Serai", en: "Ginger Lemongrass" },
    short: {
      id: "Jahe hangat dengan aroma serai yang bersih dan segar.",
      en: "Warm ginger lifted by clean, fresh lemongrass.",
    },
    personality: { id: "Segar & harum", en: "Fresh & fragrant" },
    serving: tekoKotakServing,
    description: {
      id: "Serai memberi aroma segar yang mengangkat hangatnya jahe — kombinasi klasik dapur Jawa dalam sachet yang praktis diseduh kapan saja.",
      en: "Lemongrass adds a fresh aroma that lifts the ginger's warmth — a classic Javanese kitchen pairing in sachets ready to steep any time.",
    },
    highlights: [
      { id: "Jahe + serai asli", en: "Real ginger + lemongrass" },
      { id: "Sachet sekali seduh", en: "Single-steep sachets" },
      { id: "Kotak batik khas", en: "Signature batik box" },
    ],
    notes: [
      { id: "Seduh dengan air panas 200 ml", en: "Steep in 200 ml hot water" },
      { id: "Aromanya paling keluar saat hangat", en: "Aroma peaks while warm" },
    ],
    color: "#5F7A3D",
    colorDark: "#354A1E",
    image: "/images/putri-teko/kotak-jaheserai.webp",
  },
  {
    slug: "susu-jahe",
    brand: "putri-teko",
    group: "brew",
    packaging: "kotak",
    name: { id: "Susu Jahe", en: "Ginger Milk" },
    short: {
      id: "Susu creamy bertemu hangatnya jahe — penutup hari yang menenangkan.",
      en: "Creamy milk meets ginger's warmth — a soothing way to end the day.",
    },
    personality: { id: "Lembut & menenangkan", en: "Gentle & soothing" },
    serving: tekoKotakServing,
    description: {
      id: "Perpaduan susu yang lembut dan jahe yang menghangatkan — resep sederhana yang biasa jadi penutup hari di rumah-rumah Jawa. Sachet praktis dalam kotak batik khas Putri Teko, tinggal diseduh sebelum tidur.",
      en: "Gentle milk meets warming ginger — a simple recipe that often closes the day in Javanese homes. Practical sachets in Putri Teko's signature batik box, ready to steep before bed.",
    },
    highlights: [
      { id: "Susu creamy + jahe asli", en: "Creamy milk + real ginger" },
      { id: "Sachet sekali seduh", en: "Single-steep sachets" },
      { id: "Kotak batik khas", en: "Signature batik box" },
    ],
    notes: [
      { id: "Seduh dengan air panas 200 ml", en: "Steep in 200 ml hot water" },
      { id: "Nikmat diminum hangat sebelum tidur", en: "Best enjoyed warm before bed" },
    ],
    color: "#8A6240",
    colorDark: "#4A3018",
    image: "/images/putri-teko/kotak-susujahe.webp",
  },
  {
    slug: "wedang-uwuh-kotak",
    brand: "putri-teko",
    group: "brew",
    packaging: "kotak",
    name: { id: "Wedang Uwuh", en: "Wedang Uwuh" },
    short: {
      id: "Racikan rempah khas Imogiri dengan warna merah secang.",
      en: "The Imogiri spice blend with its signature secang red.",
    },
    personality: { id: "Klasik & beraroma", en: "Classic & aromatic" },
    serving: {
      id: "Kotak 5 sachet × 25 g · tinggal seduh",
      en: "Box of 5 × 25 g sachets · just steep",
    },
    description: {
      id: "Wedang uwuh — 'minuman dari dedaunan' khas Yogyakarta — memadukan secang, jahe, cengkih, dan kayu manis menjadi minuman merah hangat yang wanginya memenuhi ruangan. Lima sachet takaran pas dalam satu kotak batik.",
      en: "Wedang Uwuh — Yogyakarta's famous 'drink of leaves' — combines secang wood, ginger, clove, and cinnamon into a warm red drink whose aroma fills the room. Five measured sachets in one batik box.",
    },
    highlights: [
      { id: "Resep khas Yogyakarta", en: "A Yogyakarta signature recipe" },
      { id: "Warna merah alami dari secang", en: "Natural red from secang wood" },
      { id: "5 sachet × 25 g per kotak", en: "5 × 25 g sachets per box" },
    ],
    notes: [
      { id: "Secang, jahe, cengkih, kayu manis", en: "Secang, ginger, clove, cinnamon" },
      { id: "Seduh 5–7 menit dengan air panas", en: "Steep 5–7 minutes in hot water" },
    ],
    color: "#C98A1B",
    colorDark: "#7A5208",
    image: "/images/putri-teko/kotak-wedanguwuh.webp",
    featured: true,
  },

  /* ── Toples · Racikan Seduh ─────────────────────────────────────── */
  {
    slug: "gula-batu-kristal",
    brand: "putri-teko",
    group: "brew",
    packaging: "toples",
    name: { id: "Gula Batu Kristal", en: "Rock Sugar Crystals" },
    short: {
      id: "Gula batu kristal — pemanis jernih pendamping wedang.",
      en: "Clear rock sugar crystals — the wedang's companion.",
    },
    personality: { id: "Jernih & serbaguna", en: "Clean & versatile" },
    serving: tekoToplesServing,
    description: {
      id: "Pemanis klasik untuk minuman tradisional: gula batu kristal yang larut perlahan dan memberi manis bersih tanpa menutupi aroma rempah. Pasangan wajib wedang uwuh dan teh nasgitel.",
      en: "The classic sweetener for traditional drinks: rock sugar crystals that dissolve slowly with a clean sweetness that never masks the spices. The essential partner for Wedang Uwuh and strong tea.",
    },
    highlights: [
      { id: "Manis bersih, larut perlahan", en: "Clean sweetness, slow-dissolving" },
      { id: "Pendamping semua wedang", en: "Pairs with every wedang" },
      { id: "Toples praktis ditakar", en: "Easy-to-measure jar" },
    ],
    notes: [
      { id: "Tambahkan sesuai selera", en: "Add to taste" },
      { id: "Simpan tertutup rapat", en: "Keep tightly sealed" },
    ],
    color: "#B99C55",
    colorDark: "#6E5A2A",
    image: "/images/putri-teko/toples-gulabatukristal.webp",
  },
  {
    slug: "jahe-merah-toples",
    brand: "putri-teko",
    group: "brew",
    packaging: "toples",
    name: { id: "Jahe Merah Gula Batu", en: "Red Ginger & Rock Sugar" },
    short: {
      id: "Racikan jahe merah dan gula batu siap seduh dari toples.",
      en: "Red ginger and rock sugar, ready to spoon and steep.",
    },
    personality: { id: "Hangat & praktis", en: "Warming & practical" },
    serving: {
      id: "Toples 150 g · 2 sdt per cangkir",
      en: "150 g jar · 2 tsp per cup",
    },
    description: {
      id: "Racikan jahe merah, gula batu, dan rempah pendamping dalam toples 150 g — tinggal ambil dua sendok teh, tuang air panas, aduk, dan nikmati hangatnya kapan saja.",
      en: "A blend of red ginger, rock sugar, and companion spices in a 150 g jar — just spoon out two teaspoons, add hot water, stir, and enjoy the warmth any time.",
    },
    highlights: [
      { id: "Racikan siap seduh", en: "Ready-to-steep blend" },
      { id: "Toples 150 g", en: "150 g jar" },
      { id: "Takaran fleksibel sesuai selera", en: "Flexible dosing to taste" },
    ],
    notes: [
      { id: "Jahe merah, gula batu, serai, kayu manis", en: "Red ginger, rock sugar, lemongrass, cinnamon" },
      { id: "2 sdt per 200 ml air panas", en: "2 tsp per 200 ml hot water" },
    ],
    color: "#B3362B",
    colorDark: "#6D1812",
    image: "/images/putri-teko/toples-jahemerah.webp",
    featured: true,
  },
  {
    slug: "jahe-serai-toples",
    brand: "putri-teko",
    group: "brew",
    packaging: "toples",
    name: { id: "Jahe Serai", en: "Ginger Lemongrass" },
    short: {
      id: "Racikan jahe serai dalam toples — segar setiap sendoknya.",
      en: "The ginger-lemongrass blend by the spoonful.",
    },
    personality: { id: "Segar & harum", en: "Fresh & fragrant" },
    serving: tekoToplesServing,
    description: {
      id: "Versi toples dari pasangan jahe dan serai: racikan siap seduh untuk stok dapur, dengan takaran yang bisa diatur seencer atau sepekat yang diinginkan.",
      en: "The jar edition of the ginger-lemongrass pairing: a ready-to-steep pantry blend, dosed as light or as strong as you like.",
    },
    highlights: [
      { id: "Racikan siap seduh", en: "Ready-to-steep blend" },
      { id: "Stok dapur praktis", en: "Practical pantry stock" },
      { id: "Takaran fleksibel", en: "Flexible dosing" },
    ],
    notes: [
      { id: "Jahe, serai, gula", en: "Ginger, lemongrass, sugar" },
      { id: "Seduh dengan air panas, aduk rata", en: "Steep in hot water, stir well" },
    ],
    color: "#6E8A3D",
    colorDark: "#3F5220",
    image: "/images/putri-teko/toples-jaheserai.webp",
  },
  {
    slug: "wedang-uwuh-toples",
    brand: "putri-teko",
    group: "brew",
    packaging: "toples",
    name: { id: "Wedang Uwuh", en: "Wedang Uwuh" },
    short: {
      id: "Rempah wedang uwuh dalam toples untuk penikmat rutin.",
      en: "Wedang Uwuh spices by the jar, for the regulars.",
    },
    personality: { id: "Klasik & hemat", en: "Classic & generous" },
    serving: tekoToplesServing,
    description: {
      id: "Untuk yang menyeduh wedang uwuh hampir setiap hari: rempah kering dalam toples yang praktis ditakar — secang, jahe, cengkih, dan kayu manis siap diracik dari dapur sendiri.",
      en: "For those who brew Wedang Uwuh almost daily: dried spices in an easy-to-measure jar — secang, ginger, clove, and cinnamon, ready to blend from your own kitchen.",
    },
    highlights: [
      { id: "Rempah wedang uwuh lengkap", en: "The complete Wedang Uwuh spices" },
      { id: "Toples praktis ditakar", en: "Easy-to-measure jar" },
      { id: "Bisa diseduh ulang", en: "Good for a second steep" },
    ],
    notes: [
      { id: "Secang, jahe, cengkih, kayu manis", en: "Secang, ginger, clove, cinnamon" },
      { id: "Tambahkan gula batu sesuai selera", en: "Add rock sugar to taste" },
    ],
    color: "#C06B2D",
    colorDark: "#7A3E14",
    image: "/images/putri-teko/toples-wedanguwuh.webp",
  },

  /* ── Kemasan · Racikan Praktis ──────────────────────────────────── */
  {
    slug: "racikan-original",
    brand: "putri-teko",
    group: "brew",
    packaging: "kemasan",
    name: { id: "Racikan Original", en: "Original Blend" },
    short: {
      id: "Satu kemasan berisi racikan rempah lengkap siap seduh.",
      en: "One pack, the complete spice bundle, ready to steep.",
    },
    personality: { id: "Lengkap & bersahaja", en: "Complete & humble" },
    serving: {
      id: "Kemasan praktis · 1 racikan lengkap",
      en: "Practical pack · 1 complete blend",
    },
    description: {
      id: "Racikan original dalam kemasan praktis: rempah kering pilihan bersama gula batu dalam satu paket transparan — tinggal seduh dengan air panas dan nikmati ritual wedang yang sesungguhnya.",
      en: "The original blend in a practical pack: selected dried spices with rock sugar in one clear pouch — just steep in hot water and enjoy the real wedang ritual.",
    },
    highlights: [
      { id: "Rempah utuh, bukan bubuk", en: "Whole spices, not powder" },
      { id: "Gula batu sudah termasuk", en: "Rock sugar included" },
      { id: "Kemasan praktis dibawa", en: "Easy-to-carry pack" },
    ],
    notes: [
      { id: "Seduh 5–7 menit dengan air panas", en: "Steep 5–7 minutes in hot water" },
      { id: "Bisa diseduh ulang", en: "Good for a second steep" },
    ],
    color: "#CDA02F",
    colorDark: "#77590E",
    image: "/images/putri-teko/kemasan-ori.webp",
  },

  /* ── Besek · Oleh-Oleh Khas ─────────────────────────────────────── */
  {
    slug: "wedang-uwuh-besek",
    brand: "putri-teko",
    group: "brew",
    packaging: "besek",
    name: { id: "Wedang Uwuh Besek", en: "Wedang Uwuh Gift Basket" },
    short: {
      id: "Wedang uwuh dalam besek anyaman — oleh-oleh yang unik dan berkesan.",
      en: "Wedang Uwuh in a hand-woven bamboo basket — a unique, memorable souvenir.",
    },
    personality: { id: "Khas & berkesan", en: "Distinctive & memorable" },
    serving: {
      id: "Besek anyaman · oleh-oleh unik",
      en: "Woven basket · a unique souvenir",
    },
    description: {
      id: "Racikan wedang uwuh yang sama, dikemas dalam besek anyaman bambu — bentuk oleh-oleh yang jarang ditemui, cocok dibawa pulang sebagai buah tangan khas Yogyakarta.",
      en: "The same Wedang Uwuh blend, packaged in a hand-woven bamboo basket — an uncommon gift form, perfect to bring home as a distinctly Yogyakarta souvenir.",
    },
    highlights: [
      { id: "Besek anyaman bambu asli", en: "Genuine woven bamboo basket" },
      { id: "Cocok untuk oleh-oleh", en: "Great as a souvenir or gift" },
      { id: "Racikan wedang uwuh lengkap", en: "Complete Wedang Uwuh blend" },
    ],
    notes: [
      { id: "Seduh 5–7 menit dengan air panas", en: "Steep 5–7 minutes in hot water" },
      { id: "Besek bisa dipakai ulang", en: "Basket is reusable" },
    ],
    color: "#B8935A",
    colorDark: "#6B4F2A",
    image: "/images/putri-teko/besek-wedanguwuh.webp",
  },
];

export const allProducts: Product[] = [...kuicipProducts, ...putriTekoProducts];

export function getProduct(brand: BrandKey, slug: string): Product | undefined {
  return allProducts.find((p) => p.brand === brand && p.slug === slug);
}

export function relatedProducts(product: Product, count = 3): Product[] {
  const family = allProducts.filter(
    (p) => p.brand === product.brand && p.slug !== product.slug
  );
  // prefer siblings that share the same packaging form, then the rest
  return [
    ...family.filter((p) => p.packaging && p.packaging === product.packaging),
    ...family.filter((p) => !p.packaging || p.packaging !== product.packaging),
  ].slice(0, count);
}

export const featuredKuicip = kuicipProducts.filter((p) => p.featured);
export const featuredTekoRtd = putriTekoProducts.filter((p) => p.featured && p.group === "rtd");
export const featuredTekoBrew = putriTekoProducts.filter((p) => p.featured && p.group === "brew");

/** Putri Teko catalog grouped by real packaging form, in display order */
export const tekoPackagingOrder: TekoPackaging[] = ["botol", "kotak", "toples", "kemasan", "besek"];
export function tekoByPackaging(packaging: TekoPackaging): Product[] {
  return putriTekoProducts.filter((p) => p.packaging === packaging);
}

/* ------------------------------------------------------------------ */
/* News & Activities — empty until the admin panel/CMS is wired up.    */
/* Real content: CV Gama Putra Santosa's own activities/announcements  */
/* — export milestones, local and non-local events, product news.     */
/* ------------------------------------------------------------------ */
export type Article = {
  slug: string;
  date: string; // ISO
  category: Bilingual;
  title: Bilingual;
  excerpt: Bilingual;
  // DB-backed articles (src/lib/articles.ts) store rich-text HTML from
  // the admin editor and hold exactly one element here (the sanitized
  // HTML blob per language) rather than one element per paragraph.
  body: Bilingual[];
  image: string | null;
  featured?: boolean;
  tags?: string[];
};

export const articles: Article[] = [];
// ↑ Emptied intentionally — News & Activities will be populated via an
// admin panel/CMS. Keep the Article type and helpers below as the
// contract that panel writes against.

export const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Company info — real business details                                */
/* ------------------------------------------------------------------ */
export const company = {
  name: "CV Gama Putra Santosa",
  shortName: "Gama Putra Santosa",
  location: { id: "Sleman, DI Yogyakarta, Indonesia", en: "Sleman, Yogyakarta, Indonesia" },
  address: "Jl. Gedongan Min Klangon, Sumberagung, Moyudan, Sleman, DI Yogyakarta, Indonesia",
  email: "contact@gpsfood.id",
  emailAlt: "gpsmanajemen@gmail.com",
  whatsapp: "+62 812-4926-9546",
  whatsappHref: "https://wa.me/6281249269546",
  hours: { id: "Senin–Sabtu, 08.00–16.00", en: "Monday–Saturday, 08.00–16.00" },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4401.129263842572!2d110.25497837550057!3d-7.7584989769411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af77d5d4060a3%3A0xa56138636b069bc5!2sKuicip%20Cassa%20Lite!5e1!3m2!1sen!2sid!4v1784696348421!5m2!1sen!2sid",
};
