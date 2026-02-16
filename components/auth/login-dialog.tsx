"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  callbackURL?: string;
}

export function LoginDialog({ open, onClose, callbackURL = "/generate" }: LoginDialogProps) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = async () => {
    setLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-round text-primary text-2xl">brush</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            ログインして塗り絵を作ろう
          </h3>
          <p className="text-sm text-slate-500">
            Googleアカウントでログインすると、塗り絵の生成・保存ができます。
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold transition-all hover:bg-slate-50 hover:shadow-md disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          {loading ? "ログイン中..." : "Googleでログイン"}
        </button>

        <p className="text-xs text-slate-400 text-center mt-4">
          ログインすると<a href="/terms" className="underline hover:text-primary">利用規約</a>に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
