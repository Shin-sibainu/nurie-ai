import type { Metadata } from "next";
import { ConvertPageContent } from "@/components/generation/convert-page-content";

export const metadata: Metadata = {
  title: "写真から塗り絵に変換",
  description:
    "お気に入りの写真をAIが塗り絵に変換します。写真をアップロードするだけで線画に変換できます。",
};

export default function ConvertPage() {
  return <ConvertPageContent />;
}
