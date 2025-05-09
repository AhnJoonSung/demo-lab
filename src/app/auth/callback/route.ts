/**
 * @file route.ts
 * @description Supabase 인증 콜백 처리 API 라우트
 *
 * 이 파일은 Supabase 인증 프로세스의 콜백을 처리하는 API 라우트입니다.
 * 로그인 또는 회원가입 후 Supabase가 리다이렉트하는 엔드포인트로,
 * 인증 토큰을 검증하고 세션을 설정합니다.
 *
 * 주요 기능:
 * 1. 이메일 OTP 인증 토큰 검증
 * 2. 인증 코드를 세션으로 교환
 * 3. 인증 성공 시 사용자를 원하는 페이지로 리다이렉트
 * 4. 인증 실패 시 에러 페이지로 리다이렉트
 *
 * 구현 로직:
 * - Next.js의 API 라우트 핸들러(GET 메서드) 사용
 * - URL 쿼리 파라미터에서 token_hash, type, code, next 값 추출
 * - Supabase 서버 클라이언트 생성 및 쿠키 관리
 * - code 파라미터가 있는 경우 exchangeCodeForSession 메서드로 세션 생성
 * - token_hash와 type 파라미터가 있는 경우 verifyOtp 메서드로 OTP 검증
 * - 검증 성공 시 next 파라미터 URL로 리다이렉트 (기본값: /profile)
 * - 실패 시 /auth/error로 리다이렉트
 *
 * @dependencies
 * - next/server
 * - @supabase/ssr
 * - @supabase/supabase-js
 */

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
