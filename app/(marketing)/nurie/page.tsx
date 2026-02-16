/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "人気のぬりえテーマ",
  description:
    "動物・乗り物・恐竜・マンダラなど、AIで生成された人気の塗り絵テーマを一覧で見られます。無料ダウンロードも。",
};

const CATEGORY_META: Record<
  string,
  { icon: string; img: string; accent: string; accentBg: string }
> = {
  animals: {
    icon: "pets",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-_Dkxr2w8XnaVOfwQt7CTaBnBPun_hudB9skJEi5lpATTj58TifKFyXsWaQLqIwOSw2YcmsbAkFm_6PeUb2tBpPgZofVVklixwsg0jCm7pQ_9qC6b9et0j-MddjXYr5xwe4WALMmxo2ZF_-fI0Fcs5ecZv3GrWd1zRwMZLKIz_CRDT80vOVt92_IvKoczkwND57g8CGRCAbsaROVA7Allmb7vpAYU4RP0cvQtWz7N7w1CmRJAEnpMQLivWRWvQgm4SbS_gQYrNU8",
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.12)",
  },
  vehicles: {
    icon: "directions_car",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUurcExQQqbOrSspMT9gsO6_PY1X7tYS9cc7P9_9PPB7XUc3IupvjCQ9COHkg0S3HVGLoTCkn6SggapmVgyPaqJFzRsZDjcU4N-H7hyu7Ig4TaJHhhpQPG-e5HtP9Bry4kEk6XTp0qT_PrR7_mUP9qGBQWD2M-rVIzGdjE2bLNyH3c-Xw6hlJd1ioEeSBnW5OpEdiXwKLqZBGMOhRcKEcLefw-UuUhva1RWPXYZAVwztQFCnKVp7Bbo36wucfctvQXRrEuh0UJWo4",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.12)",
  },
  seasons: {
    icon: "ac_unit",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkZbhQABdtquV2pozDqUMkYAoZauQxSl6pakDQJQo44pSHb5082BifOIwTliE6k_BjntXjKUBBSWcot1fqBKzIog0vlG_7KMOd7gm_xROs3EK6jVodQ3CXaPXq8qUFLOWeHZS3cER4sMsiMEOXSUe9iNVwLuIqP-zKSjRCjQm6U-zT4b8XdReioi0Ch3lpJFYQpwD18D-ymqEfYu6Z5vZqXztUZ8y-Yud5FUAJPGPKMOSgYVH38pgM3O1vUg0SaVpjqnOth_lD-yU",
    accent: "#f43f5e",
    accentBg: "rgba(244,63,94,0.12)",
  },
  food: {
    icon: "restaurant",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDboqNJb4IKNJ-xSI8NERrYtqu9bqoMAl3K-VQekzcD5DVXqCeG6ny0w_EZiUCAHcypbbCFWpw2MoH07oC91_Fwf8Tk0nePAnddZUB59VTLKnaiFBN_XGRW6OKYY4pqmfTRy6-oPiWNhnO-pVEzbBviA3ClgWvv_gjzGX-irpLs-zZObN9sbA3zRDHOfINr-GmOV1HkyQl0ckM66-Sa_K-14sW5maA5jug8EUOWrkqTR3PskUzlwIN0myhZKGfLz7ZNavsFdYFnaE8",
    accent: "#f97316",
    accentBg: "rgba(249,115,22,0.12)",
  },
  landscape: {
    icon: "landscape",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr9jLAfWs70cCqdNmshqlILfzPKxkdc46wha27vk2rrnqekWgOEGdnn50YBa-kH6LdPxyfUyLnmY2e3WoB5gkKZ-QTTjkMzjMrs9PAmVOQcHH_QJzXVmhLeC1BQkL8dW0VwFyBxzflzc0TnO5NBE1_J0W-RZYii6yA9WBNzjcfuxMKvt0HywmpiydMpJqaiueGX-Wa0vk3qMvvt8-jNd-Wf7etxG6-P_Tedv6Lar4IzOxVcvV7kU-e5y3NCjwmXUfcKPhMSYczX8Q",
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.12)",
  },
  flowers: {
    icon: "local_florist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgNuL31_7G5_QKrICMNhh0mMH73ePPZC3CPlgBvKK5oEX23c5JwKeGpytXNtIa2mSADnLooMasqo3VMB7rSk7wZcn2mfUHjpcKaHGlDtOFTb6S4Y3Yyj0B3gjsEFGwXQvwjTLxQLe1cSeZECIczJar5rQf1mkHlRAs4ZdLjirb8awQRU626be4mk8tFyp0vQc6fPOQgNk_iUDcBk8DEEooh9UKnLrc8NBLyr-KFEY2PxFd45BfqvKETX9y7WYjG-DhmTsmU_xan-0",
    accent: "#ec4899",
    accentBg: "rgba(236,72,153,0.12)",
  },
  fantasy: {
    icon: "auto_awesome",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2toxdZKyh94c5lF7_ZQ41nFo2ZUVbnIZvIvOzZpPoWQYliOXMu6b3CNYosdgvYAWbCKFeQs5VHWNXdqsVPE2lcyCKl0SqujdwqKCoC3jVa-c-vxMUAbJaP9IaHHT_AXB5eLN9o9BEVolbaDrounoWEmb5Bmp_2_GB5ypyALkS349FtLzxzXpviVfTVMbWJ5a4RPHGIChX3LCUbfDvAbYniLPxUPLdZZuK38j-Yk5CuIiRyrZa0Zxp6dDfmYVBc05WIW4wdu7w00",
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.12)",
  },
  adult: {
    icon: "palette",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3cwtZBZZYBT1hh9pBIkxlbG4E3t71tHtBATLdN2uTQseAbr4ghWmwLivEcDovv1oCh6IkhHRhHYEjWuEeCmNFdJlsg6KvnEFbL65jryIGo7ItJafuy0TQPOCtSS7MOFEFg6nYyC6mn_fSpayiAJXRa5OWLLNWai_2n1pEHMkTAn1IDRAx6T8ETq2RRTM_7FaujnWmJEEG9MDK1LhLlLV_t8wbU2KDJJXfOsmxuyS-Ireuce2PeqBtmKTsWYtgCNGC7Rax4ZdBIWQ",
    accent: "#64748b",
    accentBg: "rgba(100,116,139,0.12)",
  },
};

export default function NurieGalleryPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Dot pattern background */}
        <div className="hero-pattern absolute inset-0 opacity-30 pointer-events-none" />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 mb-6">
            テーマを選んで、
            <br />
            <span className="text-primary">塗り絵</span>を作ろう
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            好きなカテゴリをタップして、AIでオリジナルの塗り絵を生成できます。
          </p>
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        {/* Featured row: first 2 categories span wider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {CATEGORIES.slice(0, 2).map((cat, i) => {
            const meta = CATEGORY_META[cat.id] || {
              icon: "brush",
              img: "",
              accent: "#19e66b",
              accentBg: "rgba(25,230,107,0.12)",
            };
            return (
              <Link
                key={cat.id}
                href={`/nurie/${cat.id}`}
                className="gallery-card group relative rounded-3xl overflow-hidden block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  {meta.img ? (
                    <img
                      alt={`${cat.nameJa}の塗り絵`}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      src={meta.img}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <span className="material-icons-outlined text-7xl text-slate-200">
                        {meta.icon}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md"
                        style={{ background: meta.accentBg, color: meta.accent }}
                      >
                        <span className="material-icons-outlined text-xl">
                          {meta.icon}
                        </span>
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md"
                        style={{ background: meta.accentBg, color: meta.accent }}
                      >
                        {cat.count}+ テーマ
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight">
                      {cat.nameJa}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 text-white text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span>このテーマで作る</span>
                      <span className="material-icons-outlined text-base">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Regular grid: remaining categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {CATEGORIES.slice(2).map((cat, i) => {
            const meta = CATEGORY_META[cat.id] || {
              icon: "brush",
              img: "",
              accent: "#19e66b",
              accentBg: "rgba(25,230,107,0.12)",
            };
            return (
              <Link
                key={cat.id}
                href={`/nurie/${cat.id}`}
                className="gallery-card group relative rounded-3xl overflow-hidden block"
                style={{ animationDelay: `${(i + 2) * 80}ms` }}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  {meta.img ? (
                    <img
                      alt={`${cat.nameJa}の塗り絵`}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      src={meta.img}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <span className="material-icons-outlined text-6xl text-slate-200">
                        {meta.icon}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md"
                        style={{ background: meta.accentBg, color: meta.accent }}
                      >
                        <span className="material-icons-outlined text-lg">
                          {meta.icon}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md"
                        style={{ background: meta.accentBg, color: meta.accent }}
                      >
                        {cat.count}+
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      {cat.nameJa}
                    </h3>
                    <p className="text-white/60 text-xs mt-1 hidden md:block">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-white text-xs font-bold mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span>このテーマで作る</span>
                      <span className="material-icons-outlined text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-slate-900" />
            <div className="hero-pattern absolute inset-0 opacity-10 pointer-events-none" />

            <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(25,230,107,0.15)" }}
              >
                <span className="material-icons-outlined text-3xl text-primary">
                  auto_awesome
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                オリジナルの塗り絵を作ろう
              </h2>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto">
                テーマを入力するだけで、AIがあなただけの塗り絵を生成。
                写真からの変換もできます。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/generate"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span className="material-icons-outlined text-xl">brush</span>
                  テキストから生成
                </Link>
                <Link
                  href="/convert"
                  className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-base font-bold backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span className="material-icons-outlined text-xl">
                    add_a_photo
                  </span>
                  写真から変換
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
