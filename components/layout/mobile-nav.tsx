"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  isLoggedIn: boolean;
}

export function MobileNav({ isLoggedIn }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary"
        aria-label="メニュー"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background p-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            <Link
              href="/generate"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              塗り絵を作る
            </Link>
            <Link
              href="/convert"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              写真から変換
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              料金プラン
            </Link>
            {isLoggedIn ? (
              <Link
                href="/mypage"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                マイページ
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                ログイン
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
