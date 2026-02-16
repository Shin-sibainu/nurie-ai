import type { Metadata } from "next";
import { getUserProfile, getUserGenerations } from "@/actions/user";
import { redirect } from "next/navigation";
import { MypageContent } from "@/components/mypage/mypage-content";

export const metadata: Metadata = {
  title: "マイページ",
};

export default async function MyPage() {
  const profile = await getUserProfile();
  if (!profile) redirect("/login");

  const generations = await getUserGenerations();
  const isPro = profile.plan?.startsWith("pro") ?? false;

  return (
    <MypageContent
      generations={generations.map((g) => ({
        id: g.id,
        prompt: g.prompt,
        style: g.style,
        difficulty: g.difficulty,
        status: g.status,
        imageUrl: g.imageUrl,
        pdfUrl: g.pdfUrl,
        createdAt: g.createdAt,
      }))}
      isPro={isPro}
      credits={profile.credits ?? 0}
      freeCountMonth={profile.freeCountMonth ?? 0}
      totalGenerations={generations.length}
      userName={profile.name}
      userImage={profile.image ?? null}
      userEmail={profile.email}
    />
  );
}
