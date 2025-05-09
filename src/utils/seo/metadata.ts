import { siteConfig } from "./constants";
import type { Metadata } from "next";

/**
 * 일관된 메타데이터를 생성하는 유틸리티 함수
 * Next.js 공식 메타데이터 API 사양에 맞게 구성
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export function createMetadata({
  title,
  description,
  noIndex = false,
  ogImage,
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: string;
}): Metadata {
  const finalTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const finalDescription = description || siteConfig.description;
  const finalOgImage = ogImage || siteConfig.ogImage;

  return {
    title: title, // 템플릿 사용을 위해 title만 전달 (루트 레이아웃에서 template 설정)
    description: finalDescription,
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: "website",
      locale: siteConfig.locale,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalOgImage],
      creator: siteConfig.twitterHandle,
    },
  };
}
