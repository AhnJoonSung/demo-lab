/**
 * SEO 관련 상수 및 설정
 * Next.js 메타데이터 API를 위한 중앙 집중식 설정
 */

export const siteConfig = {
  name: "Next.js + Supabase 보일러플레이트",
  description:
    "최신 Next.js와 Supabase를 활용한 풀스택 개발을 위한 보일러플레이트",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  locale: "ko_KR",
  keywords: [
    "대모산개발단",
    "demodev",
    "Next.js",
    "Supabase",
    "Boilerplate",
    "보일러플레이트",
  ],
  twitterHandle: "@demodev",
};

/**
 * 상대 경로를 절대 URL로 변환
 */
export const getAbsoluteUrl = (path: string): string => {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
};
