"use server";

import Link from "next/link";
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
import { Navbar } from "@/components/navbar";

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

      {/* 메인 컨텐츠 */}
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">최근 게시글</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.date} | {post.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
