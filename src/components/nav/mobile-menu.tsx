"use client";

import * as React from "react";
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
  const [open, setOpen] = React.useState(false);

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
            <Link href="/" onClick={() => setOpen(false)}>
              메뉴
            </Link>
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
