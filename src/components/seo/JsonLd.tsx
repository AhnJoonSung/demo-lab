/**
 * 구조화된 데이터(Schema.org)를 위한 JSON-LD 컴포넌트
 * 검색 엔진 최적화 및 리치 결과를 위한 구조화된 데이터 제공
 * @see https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
 */

import { siteConfig, getAbsoluteUrl } from "@/utils/seo/constants";

type JsonLdProps<T = any> = {
  item: T;
};

export function JsonLd<T>({ item }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      item={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      item={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "대모산개발단",
        url: siteConfig.url,
        logo: getAbsoluteUrl("/logo.png"),
        sameAs: [
          "https://www.demodev.io/",
          "https://www.youtube.com/@%EB%8C%80%EB%AA%A8%EC%82%B0%EA%B0%9C%EB%B0%9C%EB%8B%A8",
          "https://www.linkedin.com/company/demodevelop",
        ],
      }}
    />
  );
}

export function PersonJsonLd({
  name,
  image,
  url,
}: {
  name: string;
  image: string;
  url: string;
}) {
  return (
    <JsonLd
      item={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        image,
        url,
      }}
    />
  );
}
