import { db } from "./prisma";

export async function createContext() {
  return {
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
