import type { Metadata } from "next";
import { Suspense } from "react";
import { GeneratePageContent } from "@/components/generation/generate-page-content";

export const metadata: Metadata = {
  title: "塗り絵を生成",
  description:
    "AIでオリジナルの塗り絵を生成しよう。テーマを入力するだけで、世界にひとつだけの塗り絵が作れます。",
};

export default function GeneratePage() {
  return (
    <Suspense>
      <GeneratePageContent />
    </Suspense>
  );
}
