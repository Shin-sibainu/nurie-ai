import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { SAMPLE_DATA } from "@/lib/sample-data";

const CATEGORY_ICON: Record<string, string> = {
  animals: "pets",
  vehicles: "directions_car",
  seasons: "ac_unit",
  food: "restaurant",
  landscape: "landscape",
  flowers: "local_florist",
  fantasy: "auto_awesome",
  adult: "palette",
};

const STYLE_LABEL: Record<string, string> = {
  simple: "シンプル",
  kawaii: "かわいい",
  detailed: "繊細",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "やさしい",
  normal: "ふつう",
  hard: "むずかしい",
};

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return { title: "Not Found" };

  return {
    title: `${cat.nameJa}の塗り絵 - 人気テーマ`,
    description: `${cat.description}。AIでオリジナルの${cat.nameJa}の塗り絵を作成しましょう。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const samples = SAMPLE_DATA[category] ?? [];
  const icon = CATEGORY_ICON[category] ?? "brush";

  return (
    <div className="relative overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="hero-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/nurie" className="hover:text-primary transition-colors">
              テーマ一覧
            </Link>
            <span className="material-icons-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-700 font-medium">{cat.nameJa}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="material-icons-outlined text-3xl text-primary">
                {icon}
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                {cat.nameJa}の塗り絵
              </h1>
            </div>
          </div>
          <p className="text-slate-500 text-lg max-w-xl mt-2">
            {cat.description}。気に入ったテーマをタップして、自分だけの塗り絵を作りましょう。
          </p>
        </div>
      </section>

      {/* ── Sample Grid ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {samples.map((item, i) => (
            <Link
              key={item.id}
              href={`/generate?prompt=${encodeURIComponent(item.prompt)}&style=${item.style}&difficulty=${item.difficulty}`}
              className="gallery-card group block"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Thumbnail */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-slate-100 group-hover:border-primary/40 transition-all duration-300 relative group-hover:shadow-lg group-hover:shadow-primary/10">
                {item.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnail}
                    alt={item.prompt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder: prompt text as visual */
                  <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="material-icons-outlined text-3xl text-slate-300 group-hover:text-primary transition-colors">
                        {icon}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 text-center leading-relaxed line-clamp-3">
                      {item.prompt}
                    </p>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

                {/* CTA on hover */}
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-primary text-white text-sm font-bold py-2.5 px-4 rounded-xl text-center shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    <span className="material-icons-outlined text-base">
                      brush
                    </span>
                    このテーマで作る
                  </div>
                </div>
              </div>

              {/* Info below card */}
              <div className="mt-3 px-1">
                <p className="text-sm font-medium text-slate-700 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.prompt}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {STYLE_LABEL[item.style] ?? item.style}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {DIFFICULTY_LABEL[item.difficulty] ?? item.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "Create your own" card */}
        <div className="mt-12">
          <div className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 transition-colors p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <span className="material-icons-outlined text-2xl text-primary">
                add
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              オリジナルのプロンプトで作る
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
              好きなテーマを自由に入力して、あなただけの{cat.nameJa}の塗り絵を作りましょう。
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              <span className="material-icons-outlined text-lg">brush</span>
              テキストから生成
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
