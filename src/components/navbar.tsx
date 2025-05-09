"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import UserNav from "@/components/auth/user-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar({ user }: { user: User | null }) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold">
          보일러플레이트
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user && (
            <div className="text-sm mr-2">
              <span className="hidden md:inline">환영합니다, </span>
              <span className="font-medium">{user.email?.split("@")[0]}</span>님
            </div>
          )}
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
