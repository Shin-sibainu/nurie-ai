"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { createCheckoutAction } from "@/actions/billing";
import { toast } from "sonner";

export function PricingPageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoadingPlan(planId);
    try {
      const result = await createCheckoutAction(planId);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.error(result.error || "エラーが発生しました");
      }
    } catch {
      toast.error("エラーが発生しました");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900">
          AIであなただけの
          <br className="md:hidden" />
          塗り絵を、もっと自由に。
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          日本語プロンプトや写真変換で、世界に一つだけの塗り絵を作成しましょう。
          <br className="hidden md:block" />
          あなたのクリエイティビティに合わせたプランをお選びください。
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 px-4">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col transition-transform duration-300 hover:-translate-y-2">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">フリー</h3>
            <p className="text-sm text-slate-500">お試しで始めたい方に</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">¥0</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>月3枚まで生成</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>PNGダウンロード</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>PDF ダウンロード</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-400">
              <span className="material-icons-outlined text-lg mt-0.5">
                remove_circle_outline
              </span>
              <span>基本スタイルのみ</span>
            </li>
          </ul>
          <button
            onClick={() => {
              if (!session) {
                router.push("/login");
              } else {
                router.push("/generate");
              }
            }}
            className="w-full py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
          >
            無料で始める
          </button>
        </div>

        {/* Pro Monthly */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col transition-transform duration-300 hover:-translate-y-2 shadow-lg relative">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">プロ (月額)</h3>
            <p className="text-sm text-slate-500">趣味として楽しむ方に</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">¥980</span>
            <span className="text-slate-500">/月</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span className="font-bold">無制限に生成可能</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>高画質 PDF/PNG 出力</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>全スタイル・難易度</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>生成履歴の保存・管理</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>写真からの線画変換</span>
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe("pro-monthly")}
            disabled={loadingPlan === "pro-monthly"}
            className="w-full py-4 rounded-full bg-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingPlan === "pro-monthly" ? "処理中..." : "プランを選択する"}
          </button>
        </div>

        {/* Pro Yearly (Highlighted) */}
        <div className="bg-white p-8 rounded-2xl border-2 border-primary flex flex-col transition-transform duration-300 transform md:-translate-y-4 shadow-[0_0_20px_-5px_rgba(25,230,107,0.3)] relative">
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            一番人気
          </div>

          <div className="mb-6 mt-2">
            <h3 className="text-xl font-bold mb-2 text-primary">
              プロ (年額)
            </h3>
            <p className="text-sm text-slate-500">本格的に創作したい方に</p>
          </div>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">¥9,800</span>
            <span className="text-slate-500">/年</span>
          </div>
          <div className="mb-6 p-3 bg-primary/10 rounded-xl text-xs text-center text-primary font-medium">
            月額プランより2ヶ月分お得です
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                verified
              </span>
              <span className="font-bold">全てのプロ機能</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>無制限に生成可能</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>高画質 PDF/PNG 出力</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>優先サポート</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="material-icons-outlined text-primary text-lg mt-0.5">
                check_circle
              </span>
              <span>新機能への早期アクセス</span>
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe("pro-annual")}
            disabled={loadingPlan === "pro-annual"}
            className="w-full py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-dark hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingPlan === "pro-annual" ? "処理中..." : "プランを選択する"}
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 text-center px-4">
        <div className="inline-flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-2xl">lock</span>
            <span className="text-sm font-semibold">安全なお支払い</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-2xl">
              cancel_schedule_send
            </span>
            <span className="text-sm font-semibold">いつでも解約可能</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
        <div className="space-y-4">
          <details className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-primary/50 transition-all">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="font-bold text-lg">
                生成した画像の商用利用は可能ですか？
              </h3>
              <span className="material-icons-outlined transform group-open:rotate-180 transition-transform text-slate-400">
                expand_more
              </span>
            </summary>
            <div className="mt-4 text-slate-600 text-sm leading-relaxed">
              はい、プロプラン（月額・年額）をご利用のお客様は、生成された画像を商用利用していただけます。無料プランの場合は個人利用に限られますのでご注意ください。
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-primary/50 transition-all">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="font-bold text-lg">
                写真からの線画変換はどう動きますか？
              </h3>
              <span className="material-icons-outlined transform group-open:rotate-180 transition-transform text-slate-400">
                expand_more
              </span>
            </summary>
            <div className="mt-4 text-slate-600 text-sm leading-relaxed">
              お好きな写真をアップロードするだけで、AIが自動的に輪郭を抽出し、塗り絵に適した線画データに変換します。ペットの写真や風景写真などを使って、オリジナルの塗り絵を作成できます。
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-primary/50 transition-all">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="font-bold text-lg">いつでも解約できますか？</h3>
              <span className="material-icons-outlined transform group-open:rotate-180 transition-transform text-slate-400">
                expand_more
              </span>
            </summary>
            <div className="mt-4 text-slate-600 text-sm leading-relaxed">
              はい、アカウント設定ページからいつでも簡単に解約手続きを行っていただけます。契約期間終了までは引き続きプロ機能をご利用いただけます。
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-primary/50 transition-all">
            <summary className="flex items-center justify-between cursor-pointer">
              <h3 className="font-bold text-lg">
                無料プランから有料プランへの切り替えは？
              </h3>
              <span className="material-icons-outlined transform group-open:rotate-180 transition-transform text-slate-400">
                expand_more
              </span>
            </summary>
            <div className="mt-4 text-slate-600 text-sm leading-relaxed">
              この料金ページから簡単にアップグレードできます。Stripeによる安全な決済で、即座にプロ機能をご利用いただけます。過去の生成履歴もそのまま引き継がれます。
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
