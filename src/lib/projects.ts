export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  challenge: string;
  techStack: string[];
  techNote: string;
  demoUrl?: string;
  demoNote?: string;
  screenshots?: string[];
  screenshotsNote?: string;
  githubUrl: string;
  githubPrivate?: boolean;
  gumroadUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "subscription-saas-demo",
    name: "Subscription SaaS Demo",
    subtitle: "Stripe連携のサブスクリプション課金SaaS",
    challenge:
      "Stripe Checkout / Webhookまわりの決済設計、特にWebhookの冪等性担保をどう実装するかを検証したプロジェクトです。",
    techStack: ["Laravel", "Stripe", "MySQL", "Pest"],
    techNote:
      "Stripeイベントの重複配信に対して、イベントIDへのUNIQUE制約で二重処理を防止するWebhook設計を実装しました。",
    demoUrl: "https://subscription-saas-demo-production.up.railway.app",
    demoNote: "テスト決済のみで、実際の課金は発生しません。",
    githubUrl: "https://github.com/ekusibhrm/subscription-saas-demo",
    githubPrivate: true,
    gumroadUrl: "https://ekusibhrm.gumroad.com/l/nrstvi",
  },
  {
    slug: "laravel-ai-lab",
    name: "laravel-ai-lab",
    subtitle: "案件・タスク管理のマルチユーザーSaaS",
    challenge:
      "AI(Claude Code)を指揮して、要件定義からリリースまでを一気通貫で完遂できるかを検証したプロジェクトです。",
    techStack: ["PHP", "Laravel", "MySQL", "Pest"],
    techNote:
      "設計判断・レビューは自分が担当し、実装とテストコードの作成をClaude Codeに任せる分担で開発しました。",
    screenshots: [
      "/screenshots/laravel-ai-lab-1.png",
      "/screenshots/laravel-ai-lab-2.png",
      "/screenshots/laravel-ai-lab-3.png",
    ],
    screenshotsNote: "※デモ環境は準備中のため、画面キャプチャを掲載しています",
    githubUrl: "https://github.com/ekusibhrm/laravel-ai-lab",
    githubPrivate: true,
    gumroadUrl: "https://ekusibhrm.gumroad.com/l/auvkwoe",
  },
  {
    slug: "slimoa-lp",
    name: "Slimoa LP",
    subtitle: "架空ダイエット商品のデモLP",
    challenge:
      "いわゆる「ダイエット系LP」の型(ヒーロー→課題提起→特徴→お客様の声→料金→FAQ→最終CTA)を、景品表示法・薬機法に配慮しながら再現したデモプロジェクトです。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    techNote:
      "外部ライブラリに頼らず、Intersection Observerベースのスクロールフェードインやカウントアップ演出を軽量に実装しました。",
    demoUrl: "https://slimoa-lp.vercel.app",
    demoNote: "架空の商品のデモLPです。実在の商品ではありません。",
    githubUrl: "https://github.com/ekusibhrm/slimoa-lp",
  },
  {
    slug: "vantra",
    name: "Vantra",
    subtitle: "架空スタートアップのコーポレートサイト",
    challenge:
      "Linear・Vercel・Stripeのようなプロダクト系スタートアップのトーンを参考に、App Routerでの複数ページ構成(Home/Service/Company/Recruit/Contact)のコーポレートサイトを実装したデモプロジェクトです。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    techNote:
      "共通ヘッダー/フッターのレイアウト化、メッシュグラデーション背景、グラスモーフィズムなど、モダンなSaaSサイトのデザインパターンを実装しました。",
    demoUrl: "https://vantra-omega.vercel.app",
    demoNote: "架空の企業のデモサイトです。実在の企業ではありません。",
    githubUrl: "https://github.com/ekusibhrm/vantra",
  },
  {
    slug: "minato-tax",
    name: "みなと税理士法人",
    subtitle: "架空の税理士法人のコーポレートサイト",
    challenge:
      "グラデーション・グラスモーフィズム・ネオン装飾を一切使わず、単色のアクセントカラーと余白・タイポグラフィ・情報設計だけで「士業らしい信頼感」を表現できるかを検証したデモプロジェクトです。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    techNote:
      "装飾要素を極力削ぎ落とし、罫線・行間・数字の並びだけでセクションを区切るレイアウトを実装しました。",
    demoUrl: "https://minato-tax.vercel.app",
    demoNote: "架空の税理士法人のデモサイトです。実在の事務所ではありません。",
    githubUrl: "https://github.com/ekusibhrm/minato-tax",
  },
  {
    slug: "spectra-fes",
    name: "SPECTRA FESTIVAL",
    subtitle: "架空の音楽フェス公式サイト",
    challenge:
      "同じくポートフォリオに掲載しているVantra(モダンSaaS系)とは対照的な方向性として、ビビッドなネオンカラーと大胆なタイポグラフィでフェスらしい高揚感を表現したデモプロジェクトです。実写素材がない前提で、抽象的な幾何学グラフィックを写真代わりに使っています。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    techNote:
      "開催日までの残り時間を表示するカウントダウンタイマーをクライアントコンポーネントで実装しました。",
    demoUrl: "https://spectra-fes.vercel.app",
    demoNote: "架空の音楽フェスのデモサイトです。実在のイベントではありません。",
    githubUrl: "https://github.com/ekusibhrm/spectra-fes",
  },
  {
    slug: "sumica",
    name: "SUMICA",
    subtitle: "架空の内装リノベーション会社サイト",
    challenge:
      "「工務店っぽさ」ではなく高級感のある設計事務所寄りのトーンを目指し、木目・ベージュ基調の配色と明朝体見出しで「和」の落ち着きを表現したコーポレートサイトのデモプロジェクトです。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    techNote:
      "next/imageによる画像最適化を前提に、施工事例(Works)を画像主体の大きめカードで見せるレイアウトを実装しました。",
    demoUrl: "https://sumica-nu.vercel.app",
    demoNote: "架空の企業のデモサイトです。実在の企業ではありません。",
    githubUrl: "https://github.com/ekusibhrm/sumica",
  },
];
