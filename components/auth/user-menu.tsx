"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-border p-1 transition-colors hover:bg-secondary"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {session.user.name?.charAt(0) || "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-background py-1 shadow-lg z-50">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <Link
            href="/mypage"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" />
            マイページ
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary"
            onClick={() => setOpen(false)}
          >
            <CreditCard className="h-4 w-4" />
            プラン管理
          </Link>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
