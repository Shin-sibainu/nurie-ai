"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { ManagePlanButton } from "@/components/pricing/manage-plan-button";
import { cn } from "@/lib/utils";
import { FREE_GENERATIONS_PER_MONTH } from "@/lib/constants";

interface Generation {
  id: string;
  prompt: string;
  style: string;
  difficulty: string;
  status: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  createdAt: Date | null;
}

interface MypageContentProps {
  generations: Generation[];
  isPro: boolean;
  credits: number;
  freeCountMonth: number;
  totalGenerations: number;
  userName: string;
  userImage: string | null;
  userEmail: string;
}

type FilterType = "all" | "text" | "photo";

function timeAgo(date: Date | null): string {
  if (!date) return "";
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);

  if (minutes < 1) return "たった今";
  if (minutes < 60) return `${minutes}分前`;
  if (hours < 24) return `${hours}時間前`;
  if (days < 7) return `${days}日前`;
  if (weeks < 4) return `${weeks}週間前`;
  return date.toLocaleDateString("ja-JP");
}

export function MypageContent({
  generations,
  isPro,
  credits,
  freeCountMonth,
  totalGenerations,
  userName,
  userImage,
  userEmail,
}: MypageContentProps) {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const remaining = isPro
    ? null
    : Math.max(0, FREE_GENERATIONS_PER_MONTH - freeCountMonth);
  const usagePercent = isPro
    ? 100
    : ((freeCountMonth / FREE_GENERATIONS_PER_MONTH) * 100);

  const filteredGenerations = generations.filter((gen) => {
    if (search && !gen.prompt.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const daysUntilReset = (() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return Math.ceil(
      (endOfMonth.getTime() - now.getTime()) / 86400000
    );
  })();

  const displayName = session?.user?.name || userName;
  const displayImage = session?.user?.image || userImage;

  return (
    <div className="bg-[#f6f8f7] text-slate-800 min-h-screen flex font-display">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ぬりえ<span className="text-primary">AI</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 py-4">
          <Link
            href="/mypage"
            className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg transition-colors font-semibold"
          >
            <span className="material-icons-outlined">dashboard</span>
            ダッシュボード
          </Link>
          <Link
            href="/generate"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors font-medium"
          >
            <span className="material-icons-outlined">brush</span>
            塗り絵を作る
          </Link>
          <Link
            href="/convert"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors font-medium"
          >
            <span className="material-icons-outlined">photo_camera</span>
            写真から変換
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors font-medium"
          >
            <span className="material-icons-outlined">credit_card</span>
            プラン・お支払い
          </Link>
        </nav>

        {/* User Mini Profile Bottom */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-4 py-2">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={displayName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {displayName?.charAt(0) || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {isPro ? "Pro プラン" : "無料プラン"}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-slate-400 hover:text-slate-600"
              title="ログアウト"
            >
              <span className="material-icons-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#f6f8f7]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-transparent">
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-icons-outlined">menu</span>
            </button>
            <span className="text-lg font-bold text-slate-900">
              ぬりえ<span className="text-primary">AI</span>
            </span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-slate-900">マイページ</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/generate"
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <span className="material-icons-outlined text-xl">add</span>
              <span className="hidden sm:inline">塗り絵を作る</span>
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
          {/* User Stats / Plan Summary */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl transition-opacity group-hover:opacity-75" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    おかえりなさい、{displayName}さん！
                  </h2>
                  <p className="text-slate-500 max-w-md">
                    あなたのイマジネーションを塗り絵にしましょう。
                    {filteredGenerations.length > 0
                      ? "過去の作品をチェックしたり、新しい塗り絵を作成できます。"
                      : "最初の塗り絵を作ってみましょう！"}
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {totalGenerations} 作品
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    {isPro ? "Pro" : "無料"} プラン
                  </div>
                </div>
              </div>
            </div>

            {/* Credits / Plan Card */}
            <div className="col-span-1 bg-white rounded-2xl p-8 shadow-sm border border-primary/20 flex flex-col justify-between relative">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {isPro ? "Pro プラン" : "無料プラン"}
                    </h3>
                    {!isPro && (
                      <p className="text-xs text-slate-500">
                        リセットまで {daysUntilReset} 日
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider",
                      isPro
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {isPro ? "Pro" : "Basic"}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-600">
                      {isPro ? "生成回数" : "今月の残り"}
                    </span>
                    <span className="text-primary font-bold">
                      {isPro
                        ? "無制限"
                        : `${remaining} / ${FREE_GENERATIONS_PER_MONTH}`}
                    </span>
                  </div>
                  {!isPro && (
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-600">保有クレジット</span>
                    <span className="text-amber-600 font-bold">
                      {credits} クレジット
                    </span>
                  </div>
                </div>
              </div>
              {isPro ? (
                <div className="mt-6">
                  <ManagePlanButton />
                </div>
              ) : (
                <Link
                  href="/pricing"
                  className="mt-6 w-full py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="material-icons-outlined group-hover:scale-110 transition-transform">
                    bolt
                  </span>
                  Pro にアップグレード
                </Link>
              )}
            </div>
          </section>

          {/* Filters & Sort */}
          <section className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {(
                [
                  { id: "all", label: "すべて" },
                  { id: "text", label: "テキスト生成" },
                  { id: "photo", label: "写真変換" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors",
                    filter === f.id
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-full text-sm focus:ring-2 focus:ring-primary text-slate-900 placeholder-slate-400 shadow-sm outline-none"
                  placeholder="プロンプトを検索..."
                />
              </div>
            </div>
          </section>

          {/* Grid Layout */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGenerations.map((gen) => {
              const displayUrl = gen.imageUrl;
              return (
                <article
                  key={gen.id}
                  className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-3 border border-slate-100">
                    {displayUrl ? (
                      <Image
                        src={displayUrl}
                        alt={gen.prompt}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50">
                        <span className="material-icons-outlined text-4xl text-slate-300">
                          image
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
                        Text
                      </span>
                    </div>
                  </div>
                  <div className="px-1 flex-1 flex flex-col">
                    <h4
                      className="font-bold text-slate-900 line-clamp-1 mb-1"
                      title={gen.prompt}
                    >
                      {gen.prompt}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                      <span className="material-icons-outlined text-[14px]">
                        schedule
                      </span>
                      {timeAgo(gen.createdAt)}
                    </p>
                    <div className="mt-auto flex gap-2">
                      {gen.pdfUrl && (
                        <a
                          href={gen.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-primary/20 hover:text-primary transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-icons-outlined text-sm">
                            download
                          </span>
                          PDF
                        </a>
                      )}
                      {displayUrl && (
                        <a
                          href={displayUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-primary/20 hover:text-primary transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-icons-outlined text-sm">
                            download
                          </span>
                          PNG
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Create New Card */}
            <Link
              href="/generate"
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full opacity-60 hover:opacity-100"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 mb-3 border border-slate-100 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
                    <span className="material-icons-outlined">add</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    新しく作る
                  </p>
                </div>
              </div>
              <div className="px-1 flex-1 flex flex-col justify-center text-center">
                <p className="text-xs text-slate-400">
                  あなたのアイデアを塗り絵にしよう！
                </p>
              </div>
            </Link>
          </section>

          {/* Empty State */}
          {filteredGenerations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons-outlined text-4xl text-primary/40">
                  palette
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">
                {search
                  ? "検索結果が見つかりません"
                  : "まだ塗り絵がありません"}
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                {search
                  ? "別のキーワードで検索してみてください"
                  : "最初の塗り絵を作ってみましょう！"}
              </p>
              {!search && (
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-icons-outlined">brush</span>
                  塗り絵を作る
                </Link>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <Link
        href="/generate"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center z-50 hover:scale-110 transition-transform"
      >
        <span className="material-icons-outlined text-3xl">add</span>
      </Link>
    </div>
  );
}
