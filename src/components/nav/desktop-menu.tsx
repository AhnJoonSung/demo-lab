"use client";

import { User } from "@supabase/supabase-js";
import UserNav from "./user-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DesktopMenuProps {
  user: User | null;
}

export default function DesktopMenu({ user }: DesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-4">
      {user && (
        <div className="text-sm mr-2">
          <span className="hidden md:inline">환영합니다, </span>
          <span className="font-medium">{user.email?.split("@")[0]}</span>님
        </div>
      )}

      <UserNav user={user} />
      <ThemeToggle />
    </div>
  );
}
