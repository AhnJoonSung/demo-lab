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
import { Navbar } from "@/components/navbar";

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
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <div className="container mx-auto py-6 px-4 sm:px-6 sm:py-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">프로필</h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">프로필 정보</CardTitle>
            <CardDescription className="text-sm">
              현재 로그인한 사용자 정보입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="bg-muted/20 p-3 sm:p-4 rounded-md">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                이메일
              </p>
              <p className="text-base sm:text-lg truncate">{user.email}</p>
            </div>
            <div className="bg-muted/20 p-3 sm:p-4 rounded-md">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                ID
              </p>
              <p className="text-base sm:text-lg truncate">{user.id}</p>
            </div>
            <div className="bg-muted/20 p-3 sm:p-4 rounded-md">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                최종 업데이트
              </p>
              <p className="text-base sm:text-lg">
                {new Date(user.updated_at || "").toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center sm:text-left">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
