import { cookies } from "next/headers";
import { db } from "./prisma";

export async function createContext() {
  const session = (await cookies()).get("session");

  return {
    db,
    session: session?.value,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
