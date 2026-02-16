import Link from "next/link";
import { Palette } from "lucide-react";
import { APP_NAME_JA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-bold">{APP_NAME_JA}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AIでオリジナルの塗り絵を作ろう
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">サービス</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/generate" className="hover:text-foreground">
                  テキストから生成
                </Link>
              </li>
              <li>
                <Link href="/convert" className="hover:text-foreground">
                  写真から変換
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  料金プラン
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">その他</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME_JA}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
