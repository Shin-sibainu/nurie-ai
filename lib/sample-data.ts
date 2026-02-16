import type { StyleType, DifficultyLevel } from "@/types";

export interface SampleItem {
  id: string;
  prompt: string;
  style: StyleType;
  difficulty: DifficultyLevel;
  thumbnail: string | null; // null = まだ画像未生成
}

// カテゴリごとのサンプルプロンプト（画像は後から追加）
export const SAMPLE_DATA: Record<string, SampleItem[]> = {
  animals: [
    { id: "a1", prompt: "花畑で遊ぶかわいい子猫、周りに蝶々が飛んでいる", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "a2", prompt: "森の中で仲良く並ぶウサギの親子", style: "simple", difficulty: "easy", thumbnail: null },
    { id: "a3", prompt: "海辺を歩くペンギンの群れ、背景に氷山", style: "kawaii", difficulty: "normal", thumbnail: null },
    { id: "a4", prompt: "大きな木の上でくつろぐフクロウ、月が出ている夜空", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "a5", prompt: "サバンナでたたずむライオンの家族、夕日が沈む", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "a6", prompt: "お花をくわえた柴犬、桜の木の下で", style: "kawaii", difficulty: "easy", thumbnail: null },
  ],
  vehicles: [
    { id: "v1", prompt: "未来的な宇宙ステーション、地球が見える窓付き", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "v2", prompt: "蒸気機関車が山あいの鉄橋を渡る風景", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "v3", prompt: "消防車が街を走る、消防士が手を振っている", style: "simple", difficulty: "easy", thumbnail: null },
    { id: "v4", prompt: "海賊船が嵐の海を進む、大きな波しぶき", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "v5", prompt: "かわいいバス停に停まったレトロなバス", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "v6", prompt: "空を飛ぶ気球、下には田園風景が広がる", style: "simple", difficulty: "normal", thumbnail: null },
  ],
  seasons: [
    { id: "s1", prompt: "桜満開の公園、子どもたちがピクニックしている", style: "kawaii", difficulty: "normal", thumbnail: null },
    { id: "s2", prompt: "ひまわり畑で麦わら帽子をかぶった女の子", style: "simple", difficulty: "easy", thumbnail: null },
    { id: "s3", prompt: "紅葉した山道を歩く鹿、落ち葉が舞っている", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "s4", prompt: "雪だるまを作る子どもたち、コタツのある家が背景", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "s5", prompt: "お月見、ススキと団子、ウサギが月を眺めている", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "s6", prompt: "梅雨の日、カエルが蓮の葉の上で雨宿り", style: "simple", difficulty: "easy", thumbnail: null },
  ],
  food: [
    { id: "f1", prompt: "かわいい顔をしたケーキやドーナツが並ぶパティスリー", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "f2", prompt: "お寿司のネタが並ぶ回転寿司、マグロやエビ", style: "simple", difficulty: "normal", thumbnail: null },
    { id: "f3", prompt: "たくさんのフルーツが盛られたパフェ、クリームたっぷり", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "f4", prompt: "おばあちゃんのキッチン、鍋から湯気が立っている", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "f5", prompt: "クリスマスのジンジャーブレッドハウス、飴やチョコで飾られた", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "f6", prompt: "屋台のたこ焼きとお好み焼き、提灯がぶら下がっている", style: "simple", difficulty: "normal", thumbnail: null },
  ],
  landscape: [
    { id: "l1", prompt: "富士山と五重塔、手前に桜並木", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "l2", prompt: "南国のビーチ、ヤシの木とハンモック", style: "simple", difficulty: "easy", thumbnail: null },
    { id: "l3", prompt: "ヨーロッパの石畳の路地、花が飾られたバルコニー", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "l4", prompt: "田舎の田んぼ、かかしと赤トンボ", style: "simple", difficulty: "normal", thumbnail: null },
    { id: "l5", prompt: "星空の下のキャンプファイヤー、テントと焚き火", style: "kawaii", difficulty: "normal", thumbnail: null },
    { id: "l6", prompt: "水中世界、サンゴ礁と熱帯魚", style: "detailed", difficulty: "normal", thumbnail: null },
  ],
  flowers: [
    { id: "fl1", prompt: "バラのアーチがあるイングリッシュガーデン", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "fl2", prompt: "たんぽぽの綿毛が風に飛ばされている野原", style: "simple", difficulty: "easy", thumbnail: null },
    { id: "fl3", prompt: "蓮の花が咲く日本庭園の池、鯉が泳いでいる", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "fl4", prompt: "花冠をかぶった妖精、チューリップの中に座っている", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "fl5", prompt: "ラベンダー畑が広がるプロヴァンスの風景", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "fl6", prompt: "朝顔のツルが絡まった竹垣、風鈴が揺れている", style: "simple", difficulty: "normal", thumbnail: null },
  ],
  fantasy: [
    { id: "fa1", prompt: "ドラゴンの背中に乗って空を飛ぶ騎士、雲の城が見える", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "fa2", prompt: "魔法の森のツリーハウス、きのこの階段付き", style: "kawaii", difficulty: "normal", thumbnail: null },
    { id: "fa3", prompt: "人魚姫が海底の宮殿で歌っている、宝石が散りばめられた", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "fa4", prompt: "ユニコーンが虹の橋を渡る、星が降り注ぐ", style: "kawaii", difficulty: "easy", thumbnail: null },
    { id: "fa5", prompt: "魔女の部屋、本棚と薬草、水晶玉がある", style: "detailed", difficulty: "normal", thumbnail: null },
    { id: "fa6", prompt: "小さな妖精の村、花びらの屋根の家が並ぶ", style: "kawaii", difficulty: "easy", thumbnail: null },
  ],
  adult: [
    { id: "ad1", prompt: "マンダラ模様、幾何学的な花のパターン", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "ad2", prompt: "アールヌーヴォー風の孔雀、装飾的な羽の模様", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "ad3", prompt: "禅庭園の枯山水、石と砂紋の模様", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "ad4", prompt: "ステンドグラス風のバラ窓、ゴシック大聖堂", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "ad5", prompt: "和柄パターン、波と鶴と松の伝統文様", style: "detailed", difficulty: "hard", thumbnail: null },
    { id: "ad6", prompt: "ケルト文様のインターレース模様、動物モチーフ", style: "detailed", difficulty: "hard", thumbnail: null },
  ],
};
