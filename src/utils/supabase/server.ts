"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerSupabaseClient = async (admin: boolean = false) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: await cookies() },
  );
};

export const createServerSupabaseAdminClient = async () => {
  return createServerSupabaseClient(true);
};
