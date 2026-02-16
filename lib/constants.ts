import type {
  PlanDefinition,
  StyleDefinition,
  DifficultyDefinition,
  CategoryDefinition,
} from "@/types";

export const FREE_GENERATIONS_PER_MONTH = 3;

export const PLANS: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    nameJa: "無料プラン",
    price: 0,
    priceLabel: "¥0",
    features: [
      "月3回まで生成",
      "透かし入り画像",
      "PNG ダウンロード",
      "基本スタイル3種",
    ],
    generationsPerMonth: FREE_GENERATIONS_PER_MONTH,
    hasWatermark: false,
    stripePriceId: null,
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    nameJa: "Pro 月額プラン",
    price: 980,
    priceLabel: "¥980/月",
    features: [
      "無制限生成",
      "透かしなし高画質",
      "PNG + PDF ダウンロード",
      "全スタイル・難易度",
      "写真→塗り絵変換",
      "優先サポート",
    ],
    generationsPerMonth: null,
    hasWatermark: false,
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
  },
  {
    id: "pro-annual",
    name: "Pro Annual",
    nameJa: "Pro 年額プラン",
    price: 9800,
    priceLabel: "¥9,800/年（¥817/月相当）",
    features: [
      "無制限生成",
      "透かしなし高画質",
      "PNG + PDF ダウンロード",
      "全スタイル・難易度",
      "写真→塗り絵変換",
      "優先サポート",
      "年額で2ヶ月分お得",
    ],
    generationsPerMonth: null,
    hasWatermark: false,
    stripePriceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID ?? "",
  },
];

export const STYLES: StyleDefinition[] = [
  {
    id: "simple",
    name: "Simple",
    nameJa: "シンプル",
    description: "太い線・少ない詳細。小さなお子様向け",
    icon: "circle",
  },
  {
    id: "detailed",
    name: "Detailed",
    nameJa: "精密",
    description: "細い線・多い詳細。じっくり塗りたい方向け",
    icon: "sparkles",
  },
  {
    id: "kawaii",
    name: "Kawaii",
    nameJa: "かわいい",
    description: "丸みのある線。ポップでかわいいスタイル",
    icon: "heart",
  },
];

export const DIFFICULTIES: DifficultyDefinition[] = [
  {
    id: "easy",
    name: "Easy",
    nameJa: "かんたん",
    description: "大きなパーツ、少ない要素（幼児〜園児向け）",
  },
  {
    id: "normal",
    name: "Normal",
    nameJa: "ふつう",
    description: "適度な詳細と要素数（小学生向け）",
  },
  {
    id: "hard",
    name: "Hard",
    nameJa: "むずかしい",
    description: "細かいパーツ、多い要素（大人向け）",
  },
];

export const CATEGORIES: CategoryDefinition[] = [
  { id: "animals", nameJa: "動物", description: "かわいい動物の塗り絵", count: 40 },
  { id: "vehicles", nameJa: "乗り物", description: "車・電車・飛行機の塗り絵", count: 30 },
  { id: "seasons", nameJa: "季節", description: "春夏秋冬の風景塗り絵", count: 30 },
  { id: "food", nameJa: "食べ物", description: "おいしい食べ物の塗り絵", count: 20 },
  { id: "landscape", nameJa: "風景", description: "美しい風景の塗り絵", count: 20 },
  { id: "flowers", nameJa: "花", description: "きれいな花の塗り絵", count: 20 },
  { id: "fantasy", nameJa: "ファンタジー", description: "ファンタジーの世界の塗り絵", count: 20 },
  { id: "adult", nameJa: "大人向け", description: "複雑で美しい大人の塗り絵", count: 20 },
];

export const APP_NAME = "ぬりえAI";
export const APP_NAME_JA = "ぬりえAI";
export const APP_DESCRIPTION = "AIでオリジナルの塗り絵を作ろう！テキスト入力や写真アップロードから、世界にひとつだけの塗り絵を生成できます。";
