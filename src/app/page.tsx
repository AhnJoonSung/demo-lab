/**
 * @file page.tsx
 * @description 메인 홈페이지 컴포넌트
 *
 * 이 파일은 애플리케이션의 메인 홈페이지(/) 경로에 제공되는 페이지 컴포넌트를 정의합니다.
 * 최근 게시글 목록을 보여주는 메인 화면을 렌더링합니다.
 *
 * 주요 기능:
 * 1. 정적 게시글 데이터 표시
 * 2. 사용자 인증 상태 확인
 * 3. 반응형 카드 그리드 레이아웃 제공
 * 4. 헤더 및 내비게이션 바 통합
 *
 * 구현 로직:
 * - 서버 컴포넌트로 구현 ('use server' 지시문)
 * - Supabase 클라이언트를 사용하여 현재 사용자 확인
 * - 샘플 게시글 데이터 렌더링
 * - ShadcnUI의 Card 컴포넌트를 활용한 게시글 표시
 * - 반응형 그리드 레이아웃을 위한 Tailwind CSS 활용
 *
 * @dependencies
 * - @/components/ui/button
 * - @/components/ui/card
 * - @/utils/supabase/server
 * - @/components/nav
 */

"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/nav";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const posts = [
    {
      id: 1,
      title: "Next.js + Supabase",
      description:
        "바이브 코딩 위한 최고의 스타터 템플릿\n지금 바로 경험해보세요!",
      author: "Boilerplate",
      date: "2024-08-01",
    },
    {
      id: 2,
      title: "Next.js + Supabase",
      description: "1인 바이브 코더에게 최적화된\n최신 풀스택 개발 스택",
      author: "Boilerplate",
      date: "2024-08-02",
    },
    {
      id: 3,
      title: "AI 기반 개발 워크플로우",
      description: "MCP와 커서룰의 완벽한 조합\n바이브 코딩 생산성 극대화",
      author: "Boilerplate",
      date: "2024-08-03",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 sm:py-8">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            최근 게시글
          </h1>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {post.date} | {post.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-sm sm:text-base">
                    {post.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">
                    자세히 보기
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
