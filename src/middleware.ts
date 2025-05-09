import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  // 세션 갱신 및 인증 상태 한 번에 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 현재 경로 확인
  const path = request.nextUrl.pathname;

  // 이미 로그인된 사용자가 /login 페이지에 접근할 때 홈으로 리다이렉트
  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 보호된 라우트에 대한 인증 체크
  const protectedRoute = path.startsWith("/profile");

  // 인증이 필요한 페이지에 접근 시 로그인이 되어 있지 않으면 로그인 페이지로 리다이렉션
  if (protectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public file paths with file extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
