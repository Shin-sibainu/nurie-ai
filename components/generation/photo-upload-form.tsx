"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GenerationPreview } from "./generation-preview";
import { LoginDialog } from "@/components/auth/login-dialog";
import { convertAction } from "@/actions/convert";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Upload, Camera, X } from "lucide-react";
import Image from "next/image";

export function PhotoUploadForm() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [result, setResult] = useState<{
    imageUrl: string;
    pdfUrl: string | null;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 10 * 1024 * 1024) {
      toast.error("ファイルサイズは10MB以下にしてください");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const submitConversion = async (targetFile: File) => {
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("photo", targetFile);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("写真を選択してください");
      return;
    }

    // 未ログインの場合: ログインダイアログを表示
    // ※写真はsessionStorageに保存できないため、ファイルはstateに保持したまま
    //   認証後のリダイレクトで再選択が必要になる
    if (!session) {
      setShowLogin(true);
      return;
    }

    await submitConversion(file);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            写真から塗り絵に変換
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">写真を選択</label>
              {!preview ? (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">クリックして写真を選択</p>
                    <p className="text-xs text-muted-foreground">
                      JPEG, PNG, WebP (10MB以下)
                    </p>
                  </div>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <Image
                    src={preview}
                    alt="選択した写真"
                    width={600}
                    height={400}
                    className="w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <Button type="submit" loading={loading} disabled={!file} className="w-full">
              {loading ? "変換中..." : "塗り絵に変換する"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <GenerationPreview imageUrl={result.imageUrl} pdfUrl={result.pdfUrl} />
      )}

      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
        callbackURL="/convert"
      />
    </div>
  );
}
