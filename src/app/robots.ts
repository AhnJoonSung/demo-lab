import { MetadataRoute } from "next";
import { siteConfig } from "@/utils/seo/constants";

/**
 * 검색 엔진 크롤러를 위한 robots.txt 파일
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
