"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">エラーが発生しました</h1>
        <p className="text-muted-foreground">
          申し訳ありません。予期しないエラーが発生しました。
        </p>
        <Button onClick={reset}>もう一度試す</Button>
      </div>
    </div>
  );
}
