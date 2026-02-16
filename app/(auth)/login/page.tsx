import type { Metadata } from "next";
import { LoginButton } from "@/components/auth/login-button";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <div className="mx-auto w-full max-w-sm space-y-6 rounded-xl bg-background p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">ぬりえAI にログイン</h1>
          <p className="text-sm text-muted-foreground">
            Googleアカウントでかんたんログイン
          </p>
        </div>
        <LoginButton />
        <p className="text-center text-xs text-muted-foreground">
          ログインすることで、
          <a href="/terms" className="underline hover:text-foreground">
            利用規約
          </a>
          に同意したものとみなします。
        </p>
      </div>
    </div>
  );
}
