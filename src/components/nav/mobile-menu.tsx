/**
 * @file mobile-menu.tsx
 * @description 모바일 사이드 메뉴 컴포넌트
 *
 * 이 파일은 모바일 화면에서 표시되는 사이드 메뉴 컴포넌트를 정의합니다.
 * 햄버거 버튼 클릭 시 화면 좌측에서 나타나는 드로어 메뉴를 구현합니다.
 *
 * 주요 기능:
 * 1. 모바일 화면에서 햄버거 메뉴 버튼 제공
 * 2. 사이드 드로어 형태의 메뉴 구현
 * 3. 네비게이션 링크 표시 (인증 상태에 따라 다른 메뉴 표시)
 * 4. 테마 전환 기능 제공
 * 5. 로그인/사용자 프로필 액세스 제공
 *
 * 구현 로직:
 * - Sheet 컴포넌트를 활용한 사이드 메뉴 구현
 * - 사용자 인증 상태에 따른 조건부 렌더링
 * - navLinks 배열을 사용한 네비게이션 링크 생성
 * - 클릭 이벤트 핸들러를 통한 메뉴 닫기 기능
 *
 * @dependencies
 * - @supabase/supabase-js (User 타입)
 * - lucide-react (아이콘)
 * - @/components/ui/* (UI 컴포넌트)
 * - ./user-nav (사용자 네비게이션 컴포넌트)
 * - ./nav-links (네비게이션 링크 정의)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import UserNav from "./user-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks } from "./nav-links";

interface MobileMenuProps {
  user: User | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col p-0 w-[280px] sm:w-[320px]"
      >
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="flex items-center justify-between">
            <p>메뉴</p>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">메뉴 닫기</span>
            </Button>
          </SheetTitle>
        </SheetHeader>

        <nav className="px-6 py-6 flex flex-col">
          <div className="text-sm font-medium text-muted-foreground mb-3">
            페이지
          </div>

          {navLinks.map((link) => {
            // 인증이 필요한 링크이면서 사용자가 로그인하지 않은 경우 표시하지 않음
            if (link.requireAuth && !user) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">테마</span>
              <ThemeToggle />
            </div>

            {user && (
              <div className="flex items-center justify-between py-2 mt-4">
                <span className="text-sm font-medium">계정</span>
                <UserNav user={user} />
              </div>
            )}

            {!user && (
              <div className="mt-4">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full">로그인</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
