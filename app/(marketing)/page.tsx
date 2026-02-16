/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <header className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-600">
              新機能：写真→線画変換 v2.0
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-slate-900">
            AIで世界に一つだけの
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-primary">塗り絵</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-pastel-yellow -rotate-2 z-0 opacity-60 rounded-full" />
            </span>
            を作ろう
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            テキスト入力や写真アップロードから、美しい塗り絵を数秒で生成。
            お子さまのお遊びやリラックスタイムにぴったりです。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/generate"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span className="material-icons-round">edit_note</span>
              テキストから生成
            </Link>
            <Link
              href="/convert"
              className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-full text-lg font-bold shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span className="material-icons-round">add_a_photo</span>
              写真から変換
            </Link>
          </div>

          {/* Demo Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-90 opacity-50" />
            <div className="relative bg-white p-2 md:p-4 rounded-xl shadow-2xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4 h-[400px] md:h-[500px]">
                <div className="relative overflow-hidden rounded-lg group h-full">
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    元の写真
                  </div>
                  <img
                    alt="カラフルなドラゴン"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY9JRnM9hvomm2HXvhWDhKPGFcXqISZtVYYWVLYjx-TS0u3OIElIfW_L4eXXlDGAhUvp60nAQ4Wv5epvQ9PkxzjHuyUuqJuxORnjFUQZcWASdKkTmh6D5_u2bCX_U7p4akT_ZtZGcSjUVOG64R9kecgIDBOp9Y4P9Kmv21Sc3UuqlSyBtKBjMpOqR-o7gLjiHCbwRumMckLsIRRr8ktsrQ9dpzzg3lYbR2xskWHza-Tnhs_XwllJpEqGh-hknrFGW5ZIbuh1TIRn8"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg bg-white h-full border border-slate-100 flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    AI線画
                  </div>
                  <img
                    alt="線画ドラゴン"
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                    style={{
                      filter:
                        "grayscale(100%) contrast(150%) brightness(110%)",
                    }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh2toxdZKyh94c5lF7_ZQ41nFo2ZUVbnIZvIvOzZpPoWQYliOXMu6b3CNYosdgvYAWbCKFeQs5VHWNXdqsVPE2lcyCKl0SqujdwqKCoC3jVa-c-vxMUAbJaP9IaHHT_AXB5eLN9o9BEVolbaDrounoWEmb5Bmp_2_GB5ypyALkS349FtLzxzXpviVfTVMbWJ5a4RPHGIChX3LCUbfDvAbYniLPxUPLdZZuK38j-Yk5CuIiRyrZa0Zxp6dDfmYVBc05WIW4wdu7w00"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-slate-100">
                <span className="material-icons-round text-primary">
                  auto_awesome
                </span>
                <p className="text-sm font-mono text-slate-600">
                  プロンプト：「きのこの上に座るかわいい赤ちゃんドラゴン、ファンタジーの森」
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── How it Works ── */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm">
              使い方
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">
              ぬりえAIの使い方
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-pastel-blue/50 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 relative z-10 border-4 border-white shadow-sm">
                <span className="material-icons-round text-4xl text-slate-700 group-hover:text-white">
                  draw
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                1. テーマを入力・写真をアップロード
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">
                日本語でテーマを入力するか、お気に入りの写真をアップロードしましょう。
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-pastel-pink/50 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 relative z-10 border-4 border-white shadow-sm">
                <span className="material-icons-round text-4xl text-slate-700 group-hover:text-white">
                  auto_fix_high
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                2. AIが生成
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">
                AIが入力をもとに、高品質な白黒の線画に変換します。
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-pastel-yellow/50 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 relative z-10 border-4 border-white shadow-sm">
                <span className="material-icons-round text-4xl text-slate-700 group-hover:text-white">
                  print
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                3. ダウンロード＆ぬりえ
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">
                PDFまたはPNGで保存して、さっそくぬりえを楽しもう！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery (Community Showcase) ── */}
      <section className="py-24 px-4 bg-slate-50" id="gallery">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm">
              みんなの作品
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">
              ユーザーが作った塗り絵
            </h2>
          </div>

          <div className="masonry-grid">
            {[
              {
                alt: "猫の塗り絵",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-_Dkxr2w8XnaVOfwQt7CTaBnBPun_hudB9skJEi5lpATTj58TifKFyXsWaQLqIwOSw2YcmsbAkFm_6PeUb2tBpPgZofVVklixwsg0jCm7pQ_9qC6b9et0j-MddjXYr5xwe4WALMmxo2ZF_-fI0Fcs5ecZv3GrWd1zRwMZLKIz_CRDT80vOVt92_IvKoczkwND57g8CGRCAbsaROVA7Allmb7vpAYU4RP0cvQtWz7N7w1CmRJAEnpMQLivWRWvQgm4SbS_gQYrNU8",
                caption: "「おひさまの下の幸せな猫」 - @mimi_chan",
              },
              {
                alt: "東京の街並み",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUurcExQQqbOrSspMT9gsO6_PY1X7tYS9cc7P9_9PPB7XUc3IupvjCQ9COHkg0S3HVGLoTCkn6SggapmVgyPaqJFzRsZDjcU4N-H7hyu7Ig4TaJHhhpQPG-e5HtP9Bry4kEk6XTp0qT_PrR7_mUP9qGBQWD2M-rVIzGdjE2bLNyH3c-Xw6hlJd1ioEeSBnW5OpEdiXwKLqZBGMOhRcKEcLefw-UuUhva1RWPXYZAVwztQFCnKVp7Bbo36wucfctvQXRrEuh0UJWo4",
                caption: "「レトロな東京の路地裏」 - @kenji_ai",
              },
              {
                alt: "春の庭",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDboqNJb4IKNJ-xSI8NERrYtqu9bqoMAl3K-VQekzcD5DVXqCeG6ny0w_EZiUCAHcypbbCFWpw2MoH07oC91_Fwf8Tk0nePAnddZUB59VTLKnaiFBN_XGRW6OKYY4pqmfTRy6-oPiWNhnO-pVEzbBviA3ClgWvv_gjzGX-irpLs-zZObN9sbA3zRDHOfINr-GmOV1HkyQl0ckM66-Sa_K-14sW5maA5jug8EUOWrkqTR3PskUzlwIN0myhZKGfLz7ZNavsFdYFnaE8",
                caption: "「春のお花畑」 - @flora_art",
              },
              {
                alt: "ドラゴン",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2toxdZKyh94c5lF7_ZQ41nFo2ZUVbnIZvIvOzZpPoWQYliOXMu6b3CNYosdgvYAWbCKFeQs5VHWNXdqsVPE2lcyCKl0SqujdwqKCoC3jVa-c-vxMUAbJaP9IaHHT_AXB5eLN9o9BEVolbaDrounoWEmb5Bmp_2_GB5ypyALkS349FtLzxzXpviVfTVMbWJ5a4RPHGIChX3LCUbfDvAbYniLPxUPLdZZuK38j-Yk5CuIiRyrZa0Zxp6dDfmYVBc05WIW4wdu7w00",
                caption: "「伝説のドラゴン」 - @ryu_color",
              },
              {
                alt: "恐竜",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkZbhQABdtquV2pozDqUMkYAoZauQxSl6pakDQJQo44pSHb5082BifOIwTliE6k_BjntXjKUBBSWcot1fqBKzIog0vlG_7KMOd7gm_xROs3EK6jVodQ3CXaPXq8qUFLOWeHZS3cER4sMsiMEOXSUe9iNVwLuIqP-zKSjRCjQm6U-zT4b8XdReioi0Ch3lpJFYQpwD18D-ymqEfYu6Z5vZqXztUZ8y-Yud5FUAJPGPKMOSgYVH38pgM3O1vUg0SaVpjqnOth_lD-yU",
                caption: "「ちびティラノサウルス」 - @kid_creator",
              },
              {
                alt: "マンダラ模様",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDboqNJb4IKNJ-xSI8NERrYtqu9bqoMAl3K-VQekzcD5DVXqCeG6ny0w_EZiUCAHcypbbCFWpw2MoH07oC91_Fwf8Tk0nePAnddZUB59VTLKnaiFBN_XGRW6OKYY4pqmfTRy6-oPiWNhnO-pVEzbBviA3ClgWvv_gjzGX-irpLs-zZObN9sbA3zRDHOfINr-GmOV1HkyQl0ckM66-Sa_K-14sW5maA5jug8EUOWrkqTR3PskUzlwIN0myhZKGfLz7ZNavsFdYFnaE8",
                caption: "「禅パターン」 - @relax_mind",
              },
            ].map((item) => (
              <div key={item.alt} className="masonry-item">
                <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-2">
                  <img
                    alt={item.alt}
                    className="w-full h-auto rounded-md"
                    src={item.src}
                  />
                  <p className="mt-2 text-xs font-medium text-slate-500 px-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-4 relative overflow-hidden bg-white" id="pricing">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm">
              料金プラン
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">
              シンプルでクリエイティブな料金体系
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm flex flex-col hover:border-primary/30 transition-colors">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  フリー
                </h3>
                <p className="text-slate-500">お試しで始めたい方に</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    ¥0
                  </span>
                  <span className="text-slate-500">/月</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  月3回まで生成
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  PNGダウンロード
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <span className="material-icons-round text-slate-300 text-xl">
                    cancel
                  </span>
                  透かし (Watermark) あり
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <span className="material-icons-round text-slate-300 text-xl">
                    cancel
                  </span>
                  商用利用不可
                </li>
              </ul>
              <Link
                href="/login"
                className="w-full py-4 rounded-full border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors text-center"
              >
                無料で始める
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-lg p-8 border-4 border-primary shadow-xl flex flex-col relative md:scale-105 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-bold tracking-widest">
                一番人気
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  プロ
                </h3>
                <p className="text-slate-500">
                  無制限に創作したいクリエイターへ
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    ¥980
                  </span>
                  <span className="text-slate-500">/月</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  無制限に生成
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  高画質 PDF / PNG 出力
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  透かしなし
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  商用利用OK
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <span className="material-icons-round text-primary text-xl">
                    check_circle
                  </span>
                  優先サポート
                </li>
              </ul>
              <Link
                href="/pricing"
                className="w-full py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all text-center"
              >
                プロプランを始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Themes ── */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
                人気のテーマ
              </h2>
              <p className="text-slate-500">
                みんなが作った人気カテゴリを見てみよう。
              </p>
            </div>
            <Link
              href="/nurie"
              className="text-primary font-bold hover:text-primary-dark flex items-center gap-1 group"
            >
              ギャラリーを見る{" "}
              <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titleJa: "動物",
                slug: "animals",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-_Dkxr2w8XnaVOfwQt7CTaBnBPun_hudB9skJEi5lpATTj58TifKFyXsWaQLqIwOSw2YcmsbAkFm_6PeUb2tBpPgZofVVklixwsg0jCm7pQ_9qC6b9et0j-MddjXYr5xwe4WALMmxo2ZF_-fI0Fcs5ecZv3GrWd1zRwMZLKIz_CRDT80vOVt92_IvKoczkwND57g8CGRCAbsaROVA7Allmb7vpAYU4RP0cvQtWz7N7w1CmRJAEnpMQLivWRWvQgm4SbS_gQYrNU8",
              },
              {
                titleJa: "乗り物",
                slug: "vehicles",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUurcExQQqbOrSspMT9gsO6_PY1X7tYS9cc7P9_9PPB7XUc3IupvjCQ9COHkg0S3HVGLoTCkn6SggapmVgyPaqJFzRsZDjcU4N-H7hyu7Ig4TaJHhhpQPG-e5HtP9Bry4kEk6XTp0qT_PrR7_mUP9qGBQWD2M-rVIzGdjE2bLNyH3c-Xw6hlJd1ioEeSBnW5OpEdiXwKLqZBGMOhRcKEcLefw-UuUhva1RWPXYZAVwztQFCnKVp7Bbo36wucfctvQXRrEuh0UJWo4",
              },
              {
                titleJa: "季節",
                slug: "seasons",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkZbhQABdtquV2pozDqUMkYAoZauQxSl6pakDQJQo44pSHb5082BifOIwTliE6k_BjntXjKUBBSWcot1fqBKzIog0vlG_7KMOd7gm_xROs3EK6jVodQ3CXaPXq8qUFLOWeHZS3cER4sMsiMEOXSUe9iNVwLuIqP-zKSjRCjQm6U-zT4b8XdReioi0Ch3lpJFYQpwD18D-ymqEfYu6Z5vZqXztUZ8y-Yud5FUAJPGPKMOSgYVH38pgM3O1vUg0SaVpjqnOth_lD-yU",
              },
              {
                titleJa: "マンダラ",
                slug: "adult",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDboqNJb4IKNJ-xSI8NERrYtqu9bqoMAl3K-VQekzcD5DVXqCeG6ny0w_EZiUCAHcypbbCFWpw2MoH07oC91_Fwf8Tk0nePAnddZUB59VTLKnaiFBN_XGRW6OKYY4pqmfTRy6-oPiWNhnO-pVEzbBviA3ClgWvv_gjzGX-irpLs-zZObN9sbA3zRDHOfINr-GmOV1HkyQl0ckM66-Sa_K-14sW5maA5jug8EUOWrkqTR3PskUzlwIN0myhZKGfLz7ZNavsFdYFnaE8",
              },
            ].map((theme) => (
              <Link
                key={theme.slug}
                href={`/nurie/${theme.slug}`}
                className="group bg-white rounded-lg p-3 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl border border-slate-100"
              >
                <div className="h-48 rounded-lg overflow-hidden mb-4 bg-slate-50 relative">
                  <img
                    alt={`${theme.titleJa}テーマ`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    src={theme.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-lg text-slate-900">
                    {theme.titleJa}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm">
              よくある質問
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">
              FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "生成した画像の商用利用は可能ですか？",
                a: "はい！プロプランをご利用のお客様は、生成された塗り絵を商用利用していただけます。オンデマンド印刷の書籍、教材、ご自身のストアでの販売など、自由にお使いいただけます。無料プランの場合は個人利用に限られます。",
              },
              {
                q: "どのような支払い方法に対応していますか？",
                a: "Visa、Mastercard、American Expressなどの主要なクレジットカード、Apple Pay、Google Payに対応しています。安全な決済パートナーStripeを通じて処理されます。",
              },
              {
                q: "日本語のプロンプトに対応していますか？",
                a: "もちろんです！ぬりえAIは日本語のプロンプトに最適化されています。「かわいい猫」や「森の中のドラゴン」のように入力するだけで、AIが最適な線画を生成します。",
              },
              {
                q: "生成される画像の解像度はどのくらいですか？",
                a: "無料プランでは標準的なPNGファイルをダウンロードできます。プロプランでは高画質のPDFやPNGファイルをダウンロード可能で、プロ品質の印刷にも対応できます。",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-slate-50 rounded-lg border border-slate-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-primary/30 transition-all"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <h4 className="font-bold text-slate-900">{item.q}</h4>
                  <span className="material-icons-round text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="material-icons-round text-4xl text-primary mb-6 block">
            format_quote
          </span>
          <p className="text-2xl md:text-3xl font-display font-medium text-slate-800 mb-8 leading-snug">
            「雨の日の救世主です。子どもたちが大好きな動物を塗り絵にできて、いつも大喜び！」
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
              alt="ユーザーアバター"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvIvamSpagTtEnO6hKCfJsfp6lOgH5hY8kRyrvyMyZFHoYucCLXTdytOcXuGcT0hjpVvoWrbwJUwSlQKFOT62BtSJ-71AETN_BpMo9jZxU2wMolu7JcQlkmxWLNDiOi2D3Asli0E-zhUgPXSujZvkDoluakwWVJi-auywmyXQfQ1lSLOSAZWx4MvkHp_f7HFsdtwh0ELdoJB8EKVS_re_K92W2XNY92x5yepTuQY7DV2YYT-FKkEZdX8fz6cybIBJVE8owZeX4urM"
            />
            <div className="text-left">
              <p className="font-bold text-slate-900">田中さくら</p>
              <p className="text-sm text-slate-500">2児のママ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 mb-8">
            <span className="material-icons-round text-primary text-sm">
              palette
            </span>
            <span className="text-xs font-bold text-primary tracking-wider">
              無料で始められます
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight mb-6">
            さあ、あなただけの
            <br />
            <span className="text-primary">塗り絵</span>を作ろう
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            登録は30秒。月3枚まで無料で生成できます。
            <br className="hidden md:block" />
            クレジットカード不要で、今すぐお試しください。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span className="material-icons-round">brush</span>
              無料で塗り絵を作る
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto text-slate-600 hover:text-primary px-8 py-4 rounded-full text-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              料金プランを見る
              <span className="material-icons-round text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-icons-outlined text-sm">
                check_circle
              </span>
              カード登録不要
            </span>
            <span className="flex items-center gap-1">
              <span className="material-icons-outlined text-sm">
                check_circle
              </span>
              月3枚まで無料
            </span>
            <span className="flex items-center gap-1">
              <span className="material-icons-outlined text-sm">
                check_circle
              </span>
              いつでも解約OK
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
