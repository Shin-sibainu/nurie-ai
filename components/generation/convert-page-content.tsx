"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { LoginDialog } from "@/components/auth/login-dialog";
import { UserMenu } from "@/components/auth/user-menu";
import { convertAction } from "@/actions/convert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/** クライアント側で画像を最大2048pxにリサイズ＆JPEG圧縮 */
function compressImage(file: File, maxSize = 2048, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          resolve(new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export function ConvertPageContent() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [result, setResult] = useState<{
    imageUrl: string;
    pdfUrl: string | null;
  } | null>(null);
  const [thickness, setThickness] = useState(50);
  const [detail, setDetail] = useState(75);
  const [dragging, setDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const thicknessLabel =
    thickness < 33 ? "細い" : thickness < 66 ? "ふつう" : "太い";
  const detailLabel =
    detail < 33 ? "シンプル" : detail < 66 ? "ふつう" : "精密";

  const handleFileSelect = useCallback((selected: File) => {
    if (selected.size > 10 * 1024 * 1024) {
      toast.error("ファイルサイズは10MB以下にしてください");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(selected.type)) {
      toast.error("JPEG、PNG、WebP形式の画像を選択してください");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const submitConversion = async () => {
    if (!file) {
      toast.error("写真を選択してください");
      return;
    }

    if (!session) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("photo", compressed);

      const res = await convertAction(formData);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      if (res.data) {
        setResult({
          imageUrl: res.data.imageUrl,
          pdfUrl: res.data.pdfUrl,
        });
        toast.success("塗り絵に変換しました！");
      }
    } catch {
      toast.error("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f8f7] text-slate-800 h-screen overflow-hidden flex flex-col">
      {/* Navbar - generate page と同じパターン */}
      <nav className="h-16 bg-white border-b border-primary/10 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-icons-round">palette</span>
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-slate-900">
              ぬりえ<span className="text-primary">AI</span>
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
              className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-sm font-medium transition-all"
            >
              テキストから生成
            </Link>
            <Link
              href="/convert"
              className="px-4 py-1.5 bg-white shadow-sm rounded-full text-sm font-bold text-slate-800 transition-all"
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
              <span className="material-icons-round text-slate-400">
                person
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Upload + Settings + Button */}
        <aside
          className={cn(
            "w-full md:w-[400px] bg-white/50 backdrop-blur-sm border-r border-primary/10 flex flex-col z-10",
            loading ? "overflow-hidden" : "overflow-y-auto"
          )}
        >
          <div className="p-6 space-y-6">
            {/* Upload Zone */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="material-icons-round text-primary text-lg">
                  add_a_photo
                </span>
                写真をアップロード
              </label>

              {preview ? (
                /* Uploaded Preview */
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-100 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="選択した写真"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <button
                    onClick={handleClear}
                    disabled={loading}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <span className="material-icons-round text-base">
                      close
                    </span>
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                    {file?.name}
                  </div>
                </div>
              ) : (
                /* Drop Zone */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group",
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-slate-300 hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons-round text-primary text-2xl">
                      add_a_photo
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm mb-1">
                    写真をここにドロップ
                  </p>
                  <p className="text-slate-400 text-xs">
                    またはクリックして選択
                  </p>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs text-slate-400 pl-1">
                JPG, PNG, WebP（10MB以下）
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="material-icons-round text-primary text-lg">
                  tune
                </span>
                変換設定
              </label>

              {/* Thickness Slider */}
              <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-600">
                    線の太さ
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {thicknessLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-slate-400 text-sm">
                    remove
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    disabled={loading}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
                  />
                  <span className="material-icons-round text-slate-400 text-sm">
                    add
                  </span>
                </div>
              </div>

              {/* Detail Slider */}
              <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-600">
                    ディテールの量
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {detailLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    シンプル
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={detail}
                    onChange={(e) => setDetail(Number(e.target.value))}
                    disabled={loading}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
                  />
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    精密
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions (Sticky) */}
          <div className="mt-auto p-6 bg-white border-t border-primary/10 sticky bottom-0">
            <button
              onClick={submitConversion}
              disabled={!file || loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-display font-bold text-lg py-4 rounded-full shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-icons-round animate-spin">
                    progress_activity
                  </span>
                  変換中...
                </>
              ) : (
                <>
                  <span className="material-icons-round group-hover:animate-bounce">
                    auto_awesome
                  </span>
                  塗り絵に変換する
                </>
              )}
            </button>
            {!file && (
              <p className="text-[10px] text-center text-slate-400 mt-3">
                写真をアップロードすると変換できます
              </p>
            )}
          </div>
        </aside>

        {/* Right Panel (Preview) */}
        <section className="hidden md:flex flex-1 bg-[#f6f8f7] relative flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          </div>

          {/* Toolbar */}
          <div className="w-full max-w-3xl flex justify-between items-center mb-6 z-10">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  loading
                    ? "bg-amber-500 animate-pulse"
                    : result
                      ? "bg-green-500"
                      : "bg-primary animate-pulse"
                )}
              />
              <span className="text-sm font-bold text-slate-500">
                {loading
                  ? "変換中..."
                  : result
                    ? "変換完了"
                    : "プレビュー"}
              </span>
            </div>
            {result && (
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  <span className="material-icons-round text-sm">
                    restart_alt
                  </span>
                  やり直す
                </button>
              </div>
            )}
          </div>

          {/* Preview Container */}
          <div className="relative z-10 w-full max-w-3xl flex-1 flex flex-col items-center justify-center min-h-0">
            {result ? (
              /* Result: Lineart Only */
              <div
                onClick={() => setShowModal(true)}
                className="w-full max-w-2xl aspect-[3/4] bg-white shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden relative cursor-zoom-in hover:shadow-3xl transition-shadow"
              >
                <div className="absolute top-3 right-3 z-10 bg-primary/20 text-primary backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium border border-primary/20">
                  ぬりえ
                </div>
                <div className="absolute bottom-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <span className="material-icons-round text-xs">zoom_in</span>
                  クリックで拡大
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={result.imageUrl}
                    alt="ぬりえ（線画）"
                    fill
                    className="object-contain p-6"
                    style={{
                      filter:
                        "grayscale(100%) contrast(125%) brightness(110%)",
                    }}
                  />
                </div>
              </div>
            ) : loading && preview ? (
              /* Loading State */
              <div className="w-full max-w-lg aspect-[4/3] bg-white shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden relative">
                <Image
                  src={preview}
                  alt="オリジナル写真"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-round text-3xl text-primary animate-spin">
                      progress_activity
                    </span>
                  </div>
                  <div className="text-center mt-4">
                    <p className="font-bold text-slate-700">
                      塗り絵に変換中...
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      AIが写真を線画に変換しています
                    </p>
                  </div>
                </div>
              </div>
            ) : preview ? (
              /* Preview Only (before conversion) */
              <div className="w-full max-w-lg aspect-[4/3] bg-white shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden relative group transition-transform duration-500 ease-out hover:scale-[1.01]">
                <Image
                  src={preview}
                  alt="選択した写真"
                  fill
                  className="object-contain"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                  オリジナル
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="w-full max-w-lg aspect-[4/3] bg-white shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                  <span className="material-icons-round text-4xl text-primary/40">
                    photo_camera
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-400">プレビュー</p>
                  <p className="text-sm text-slate-300 mt-1">
                    左のパネルから写真をアップロードして
                    <br />
                    塗り絵に変換してみましょう
                  </p>
                </div>
              </div>
            )}

            {/* Floating Download Buttons */}
            {result && (
              <div className="mt-6 flex gap-3 z-20">
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
                  <span className="material-icons-round text-primary">
                    image
                  </span>
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

      {/* Image Modal */}
      {showModal && result && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <a
              href={result.imageUrl}
              download="nurie.png"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors backdrop-blur-sm"
            >
              <span className="material-icons-round text-sm">download</span>
              PNG
            </a>
            {result.pdfUrl && (
              <a
                href={result.pdfUrl}
                download="nurie.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors backdrop-blur-sm"
              >
                <span className="material-icons-round text-sm">picture_as_pdf</span>
                PDF
              </a>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <span className="material-icons-round">close</span>
            </button>
          </div>
          <div
            className="relative w-full max-w-4xl max-h-[90vh] aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={result.imageUrl}
              alt="ぬりえ（線画）拡大"
              fill
              className="object-contain p-8"
              style={{
                filter: "grayscale(100%) contrast(125%) brightness(110%)",
              }}
            />
          </div>
        </div>
      )}

      {/* Login Dialog */}
      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
        callbackURL="/convert"
      />
    </div>
  );
}
