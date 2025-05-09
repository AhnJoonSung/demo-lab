import { MetadataRoute } from "next";
import { siteConfig } from "@/utils/seo/constants";

/**
 * 검색 엔진을 위한 sitemap.xml 파일
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 정적 페이지들
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/profile`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 동적 데이터 가져오기 (예: 블로그 포스트, 프로젝트 등)
  // 주석을 해제하고 실제 데이터를 가져오는 로직을 구현하세요
  // const posts = await fetchBlogPosts();
  // const dynamicPages = posts.map(post => ({
  //   url: `${siteConfig.url}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.8,
  // }));

  // return [...staticPages, ...dynamicPages];
  return staticPages;
}
