import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // 기본 응답 설정
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Supabase 클라이언트 초기화
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // 토큰 갱신 및 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 현재 경로 확인
  const path = request.nextUrl.pathname;

  // 이미 로그인된 사용자가 /login 페이지에 접근할 때 홈으로 리다이렉트
  if (path === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 보호된 라우트에 대한 인증 체크
  const protectedRoute = path.startsWith("/profile");

  // 인증이 필요한 페이지에 접근 시 로그인이 되어 있지 않으면 로그인 페이지로 리다이렉션
  if (protectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 기본 응답 반환
  return response;
}
