"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "@/components/auth/user-menu";
import { MobileNav } from "./mobile-nav";
import { Palette } from "lucide-react";
import { APP_NAME_JA } from "@/lib/constants";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">{APP_NAME_JA}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/generate"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            塗り絵を作る
          </Link>
          <Link
            href="/convert"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            写真から変換
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            料金プラン
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {session ? (
              <UserMenu />
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                ログイン
              </Link>
            )}
          </div>
          <MobileNav isLoggedIn={!!session} />
        </div>
      </div>
    </header>
  );
}
