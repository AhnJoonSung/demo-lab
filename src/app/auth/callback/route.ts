import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/profile";

  // 응답 객체 생성 - 쿠키를 설정할 수 있도록 만듦
  const redirectUrl = new URL(next, request.url);
  const response = NextResponse.redirect(redirectUrl);

  // Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          response.cookies.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          });
        },
      },
    },
  );

  // code가 있으면 OTP 검증 대신 코드를 세션으로 교환
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Code exchange error:", error);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
    return response;
  }

  // token_hash와 type으로 OTP 검증하는 경우
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return response;
    }
  }

  // 에러 페이지로 리다이렉트
  return NextResponse.redirect(new URL("/auth/error", request.url));
}
