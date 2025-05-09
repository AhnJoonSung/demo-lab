"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/buttons";

export default async function Profile() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // session이 있으면 user도 있음을 보장
  const user = session.user;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">프로필</h1>
        <LogoutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>현재 로그인한 사용자 정보입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">이메일</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">ID</p>
            <p className="text-lg">{user.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium">최종 업데이트</p>
            <p className="text-lg">
              {new Date(user.updated_at || "").toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href="/">
          <Button variant="link">홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
