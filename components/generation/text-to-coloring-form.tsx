"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StyleSelector } from "./style-selector";
import { DifficultySelector } from "./difficulty-selector";
import { GenerationPreview } from "./generation-preview";
import { LoginDialog } from "@/components/auth/login-dialog";
import { generateAction, type GenerateInput } from "@/actions/generate";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import type { StyleType, DifficultyLevel } from "@/types";

const STORAGE_KEY = "nurie-generate-form";

interface SavedForm {
  prompt: string;
  style: StyleType;
  difficulty: DifficultyLevel;
  autoSubmit?: boolean;
}

export function TextToColoringForm() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleType>("simple");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [result, setResult] = useState<{
    imageUrl: string;
    pdfUrl: string | null;
  } | null>(null);
  const [remaining, setRemaining] = useState<number | undefined>();

  // 認証後にフォーム状態を復元 & 自動送信
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const data: SavedForm = JSON.parse(saved);
      setPrompt(data.prompt);
      setStyle(data.style);
      setDifficulty(data.difficulty);

      // ログイン済みで autoSubmit フラグがある場合は自動送信
      if (session && data.autoSubmit) {
        sessionStorage.removeItem(STORAGE_KEY);
        submitGeneration({ prompt: data.prompt, style: data.style, difficulty: data.difficulty });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("テーマを入力してください");
      return;
    }

    // 未ログインの場合: フォーム状態を保存してログインダイアログを表示
    if (!session) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ prompt: prompt.trim(), style, difficulty, autoSubmit: true })
      );
      setShowLogin(true);
      return;
    }

    await submitGeneration({ prompt: prompt.trim(), style, difficulty });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            テキストから塗り絵を生成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">テーマ・お題</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例: 森の中で遊ぶうさぎとリス、桜の木の下で花見をする猫..."
                maxLength={200}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground text-right">
                {prompt.length}/200
              </p>
            </div>

            <StyleSelector value={style} onChange={setStyle} disabled={loading} />
            <DifficultySelector value={difficulty} onChange={setDifficulty} disabled={loading} />

            {remaining !== undefined && (
              <p className="text-sm text-muted-foreground">
                今月の残り生成回数: <span className="font-semibold text-foreground">{remaining}回</span>
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              {loading ? "生成中..." : "塗り絵を生成する"}
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
        callbackURL="/generate"
      />
    </div>
  );
}
