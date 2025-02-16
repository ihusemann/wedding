import { createClient } from "@/lib/supabase/server";
import { db } from "./prisma";

export async function createContext() {
  async function getUser() {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  const user = await getUser();

  return {
    user,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
