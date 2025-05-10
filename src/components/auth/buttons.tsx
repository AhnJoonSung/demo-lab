"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useFormStatus } from "react-dom";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}

// 로그인 버튼 컴포넌트
export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full h-12 text-lg" disabled={pending}>
      {pending ? "로그인 중..." : "로그인"}
    </Button>
  );
}

// 회원가입 버튼 컴포넌트
export function SignupButton({
  isPasswordValid,
}: {
  isPasswordValid: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full h-12 text-lg"
      disabled={!isPasswordValid || pending}
    >
      {pending ? "처리 중..." : "회원가입"}
    </Button>
  );
}
