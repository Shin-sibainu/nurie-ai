import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-2xl font-bold">利用規約</h1>
      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <h2 className="text-lg font-semibold">第1条（適用）</h2>
          <p className="text-muted-foreground">
            この利用規約（以下「本規約」）は、ぬりえAI（以下「本サービス」）が提供するサービスの利用条件を定めるものです。
            ユーザーは、本規約に同意の上、本サービスをご利用ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第2条（サービス内容）</h2>
          <p className="text-muted-foreground">
            本サービスは、AIを活用して塗り絵（線画）を生成するWebアプリケーションです。
            テキスト入力または写真アップロードにより、オリジナルの塗り絵を生成し、ダウンロードすることができます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第3条（利用料金）</h2>
          <p className="text-muted-foreground">
            本サービスは無料プランとProプランを提供しています。
            無料プランでは月3回まで塗り絵を生成できます（透かし入り）。
            Proプランの料金は料金プランページに記載の通りです。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第4条（禁止事項）</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>法令に違反する行為</li>
            <li>公序良俗に反するコンテンツの生成</li>
            <li>他者の権利を侵害する行為</li>
            <li>サービスの運営を妨害する行為</li>
            <li>不正アクセスやシステムへの攻撃</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第5条（著作権）</h2>
          <p className="text-muted-foreground">
            本サービスで生成された塗り絵の著作権は、利用者に帰属します。
            個人利用・商用利用ともに可能ですが、生成されたコンテンツに関する責任は利用者が負うものとします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第6条（免責事項）</h2>
          <p className="text-muted-foreground">
            本サービスは「現状有姿」で提供されます。
            サービスの中断、変更、終了により利用者に生じた損害について、当社は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">第7条（規約の変更）</h2>
          <p className="text-muted-foreground">
            本規約は予告なく変更される場合があります。
            変更後も本サービスを利用した場合、変更後の規約に同意したものとみなします。
          </p>
        </section>
      </div>
    </div>
  );
}
