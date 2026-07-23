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
};

export const projects: Project[] = [
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
  },
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
    githubPrivate: false,
  },
];
