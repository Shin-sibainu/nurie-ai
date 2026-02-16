"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { LoginDialog } from "@/components/auth/login-dialog";
import { UserMenu } from "@/components/auth/user-menu";
import { generateAction, type GenerateInput } from "@/actions/generate";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { StyleType, DifficultyLevel } from "@/types";

const STORAGE_KEY = "nurie-generate-form";

interface SavedForm {
  prompt: string;
  style: StyleType;
  difficulty: DifficultyLevel;
  autoSubmit?: boolean;
}

const STYLE_OPTIONS: {
  id: StyleType;
  label: string;
  img: string;
}[] = [
  {
    id: "simple",
    label: "シンプル",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCGtvEP_p0v-MJKtfBvmwhtVjt5918TeRselAKdloziF6IrAAaAuEmhkX13007I-LVtjAQ0R1APessV1km8siyyN4RT1n9ZDnebftZhcTdGpmA8xZNDfD0d8bO9oU-JQEoHUaEaFmayVNfDU2rJyoQJ1VajK-kZE3QNs6LMZz8ce02No3EcZS6vUQr3LKWpvZoG2tAn3tXi4Bel9XuVz8NE3eBw_4SE3XuXP_O5IqbFQEAKSuCZv48OzwPbINUnkXQ193Gv5KJyOM",
  },
  {
    id: "kawaii",
    label: "かわいい",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPzd6j0wm94yCm6XGyF8-Av0i7i74chnrd4njAmXJp0l4stkuYxTSDbZsZFwmqB6M4NbYbSM_FKqG9DC3jI51PfEIkpZV2mpRRUYeNCwwccRlvD7wlZT4Au3sIOv22ahsKtafp-Gb_UOw3TR5yy9_MJV1_zyRGn8Wkx60OlYepeWYCOTzhpspsDLrRo29DvpNjO_Ouxt-1Qr9ndUWrzvMKNu7QMS3tcTEpgR-6K43SofKfQkYcPjDJcQZoqiGAn1eWKYRd1wmFIEY",
  },
  {
    id: "detailed",
    label: "繊細",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH86ucZEZxBIJPLkvnxZWkE5D3x87k6cKgWecXR57Zsec1BM0Rv-wpOUDuF6lQLZY0XfGLb1o5a3gRUkv6PhG1iJKGhyQ4k1UxW3BpkT6bHfZuV_BfBAkHfw0ho_xMXlYz8ORepNoI8iICAnrmehwE1SgfhPFBTLdTZ892df8ov62Pfg9xHEN2m-aS2OGHtZK_QdiSO5Fu_fd40-jE0E_uWAgrTE_ydsXrsVD_oDkQkd37iZXvY2Y-pDMsrfLi2VCdC_A6QkZX9K4",
  },
];

const DIFFICULTY_OPTIONS: { id: DifficultyLevel; label: string }[] = [
  { id: "easy", label: "やさしい" },
  { id: "normal", label: "ふつう" },
  { id: "hard", label: "むずかしい" },
];

const VALID_STYLES: StyleType[] = ["simple", "kawaii", "detailed"];
const VALID_DIFFICULTIES: DifficultyLevel[] = ["easy", "normal", "hard"];

export function GeneratePageContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleType>("kawaii");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [result, setResult] = useState<{
    imageUrl: string;
    pdfUrl: string | null;
  } | null>(null);
  const [remaining, setRemaining] = useState<number | undefined>();

  // URLクエリパラメータからフォームを初期化（サンプルからの遷移）
  useEffect(() => {
    const qPrompt = searchParams.get("prompt");
    const qStyle = searchParams.get("style") as StyleType | null;
    const qDifficulty = searchParams.get("difficulty") as DifficultyLevel | null;

    if (qPrompt) {
      setPrompt(qPrompt);
      if (qStyle && VALID_STYLES.includes(qStyle)) setStyle(qStyle);
      if (qDifficulty && VALID_DIFFICULTIES.includes(qDifficulty)) setDifficulty(qDifficulty);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 認証後にフォーム状態を復元 & 自動送信
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const data: SavedForm = JSON.parse(saved);
      setPrompt(data.prompt);
      setStyle(data.style);
      setDifficulty(data.difficulty);

      if (session && data.autoSubmit) {
        sessionStorage.removeItem(STORAGE_KEY);
        submitGeneration({
          prompt: data.prompt,
          style: data.style,
          difficulty: data.difficulty,
        });
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitGeneration = async (input: GenerateInput) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await generateAction(input);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      if (res.data) {
        setResult({
          imageUrl: res.data.imageUrl,
          pdfUrl: res.data.pdfUrl,
        });
        toast.success("塗り絵を生成しました！");
      }

      if (res.remaining !== undefined) {
        setRemaining(res.remaining);
      }
    } catch {
      toast.error("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("テーマを入力してください");
      return;
    }

    if (!session) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          prompt: prompt.trim(),
          style,
          difficulty,
          autoSubmit: true,
        })
      );
      setShowLogin(true);
      return;
    }

    await submitGeneration({ prompt: prompt.trim(), style, difficulty });
  };

  return (
    <div className="bg-[#f6f8f7] text-slate-800 h-screen overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-primary/10 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-icons-round">palette</span>
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-slate-900">
              Nurie<span className="text-primary">AI</span>
            </h1>
          </Link>
          <span className="ml-2 px-3 py-1 bg-slate-100 text-xs font-bold text-slate-500 rounded-full">
            BETA
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-slate-100 p-1 rounded-full">
            <Link
              href="/generate"
              className="px-4 py-1.5 bg-white shadow-sm rounded-full text-sm font-bold text-slate-800 transition-all"
            >
              テキストから生成
            </Link>
            <Link
              href="/convert"
              className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-sm font-medium transition-all"
            >
              写真から変換
            </Link>
          </div>
          {session ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white flex items-center justify-center"
            >
              <span className="material-icons-round text-slate-400">person</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={cn("w-full md:w-[400px] bg-white/50 backdrop-blur-sm border-r border-primary/10 flex flex-col z-10", loading ? "overflow-hidden" : "overflow-y-auto")}>
          <div className="p-6 space-y-8">
            {/* Prompt */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="material-icons-round text-primary text-lg">edit</span>
                プロンプト (Prompt)
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={200}
                  disabled={loading}
                  className="w-full h-32 bg-white border-2 border-slate-100 rounded-lg p-4 text-base resize-none focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 disabled:opacity-50"
                  placeholder="例：花畑で遊ぶかわいい子猫、周りに蝶々が飛んでいる"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    type="button"
                    className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                    title="おまかせ"
                  >
                    <span className="material-icons-round text-sm">auto_awesome</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-400 pl-1">
                詳細に入力すると、より良い塗り絵が生成されます。
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="material-icons-round text-primary text-lg">style</span>
                画風 (Art Style)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {STYLE_OPTIONS.map((opt) => {
                  const selected = style === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={loading}
                      onClick={() => setStyle(opt.id)}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all disabled:opacity-50",
                        selected
                          ? "bg-primary/10 border-primary"
                          : "border-transparent hover:bg-primary/5"
                      )}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white shadow-sm">
                          <span className="material-icons-round text-[12px] font-bold">
                            check
                          </span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full overflow-hidden border-2 transition-colors",
                          selected
                            ? "bg-white border-primary"
                            : "bg-slate-100 border-transparent group-hover:border-primary"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={`${opt.label}スタイル`}
                          className={cn(
                            "w-full h-full object-cover",
                            selected
                              ? "opacity-100"
                              : "opacity-70 group-hover:opacity-100"
                          )}
                          src={opt.img}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          selected
                            ? "text-primary"
                            : "text-slate-600 group-hover:text-primary"
                        )}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Toggle */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="material-icons-round text-primary text-lg">speed</span>
                難易度 (Difficulty)
              </label>
              <div className="flex bg-slate-100 p-1.5 rounded-full">
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={loading}
                    onClick={() => setDifficulty(opt.id)}
                    className={cn(
                      "flex-1 py-2 rounded-full text-xs font-bold transition-colors disabled:opacity-50",
                      difficulty === opt.id
                        ? "bg-white shadow-sm text-primary"
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="pt-2">
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors w-full">
                <span className="material-icons-round text-lg">tune</span>
                高度な設定 (Advanced)
                <span className="material-icons-round text-sm ml-auto">expand_more</span>
              </button>
            </div>
          </div>

          {/* Footer Actions (Sticky) */}
          <div className="mt-auto p-6 bg-white border-t border-primary/10 sticky bottom-0">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-display font-bold text-lg py-4 rounded-full shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-icons-round animate-spin">progress_activity</span>
                  生成中...
                </>
              ) : (
                <>
                  <span className="material-icons-round group-hover:animate-bounce">brush</span>
                  塗り絵を生成する
                </>
              )}
            </button>
            {remaining !== undefined && (
              <p className="text-[10px] text-center text-slate-400 mt-3">
                生成には1クレジットを消費します (残り: {remaining})
              </p>
            )}
          </div>
        </aside>

        {/* Right Panel (Canvas/Preview) */}
        <section className="hidden md:flex flex-1 bg-[#f6f8f7] relative flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          </div>

          {/* Toolbar */}
          <div className="w-full max-w-2xl flex justify-between items-center mb-6 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-slate-500">
                プレビュー (Preview)
              </span>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors shadow-sm">
                <span className="material-icons-round text-sm">undo</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors shadow-sm">
                <span className="material-icons-round text-sm">redo</span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors shadow-sm">
                <span className="material-icons-round text-sm">add</span>
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col items-center justify-center min-h-0">
            <div className="aspect-a4 h-full max-h-[85vh] bg-white shadow-2xl shadow-slate-200/50 rounded-lg overflow-hidden relative group transition-transform duration-500 ease-out hover:scale-[1.01]">
              {/* Paper texture */}
              <div className="absolute inset-0 bg-slate-50 opacity-10 pointer-events-none" />

              {loading ? (
                /* Loading State */
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-round text-3xl text-primary animate-spin">
                      progress_activity
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-700">塗り絵を生成中...</p>
                    <p className="text-sm text-slate-400 mt-1">
                      AIが描いています。少々お待ちください。
                    </p>
                  </div>
                </div>
              ) : result ? (
                /* Result */
                <div className="w-full h-full p-8 flex items-center justify-center">
                  <Image
                    src={result.imageUrl}
                    alt="生成された塗り絵"
                    width={768}
                    height={1086}
                    className="w-full h-full object-contain mix-blend-multiply opacity-90"
                    style={{
                      filter: "grayscale(100%) contrast(125%) brightness(110%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 90%, transparent 100%)",
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur text-slate-700 hover:text-primary p-2 rounded-full shadow-md">
                      <span className="material-icons-round text-lg">fullscreen</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                    <span className="material-icons-round text-4xl text-primary/40">
                      brush
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-400">プレビュー</p>
                    <p className="text-sm text-slate-300 mt-1">
                      左のフォームからテーマを入力して
                      <br />
                      塗り絵を生成してみましょう
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Download Buttons */}
            {result && (
              <div className="absolute bottom-8 flex gap-3 z-20">
                {result.pdfUrl && (
                  <a
                    href={result.pdfUrl}
                    download="nurie.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-full font-bold shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-2 transition-transform hover:-translate-y-1"
                  >
                    <span className="material-icons-round text-rose-500">
                      picture_as_pdf
                    </span>
                    PDFを保存
                  </a>
                )}
                <a
                  href={result.imageUrl}
                  download="nurie.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 text-white hover:bg-slate-700 px-6 py-3 rounded-full font-bold shadow-lg shadow-slate-400/50 flex items-center gap-2 transition-transform hover:-translate-y-1"
                >
                  <span className="material-icons-round text-primary">image</span>
                  PNGを保存
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-white border border-primary/20 text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all z-50 group">
        <span className="material-icons-round text-2xl group-hover:rotate-12 transition-transform">
          help_outline
        </span>
      </button>

      {/* Login Dialog */}
      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
        callbackURL="/generate"
      />
    </div>
  );
}
