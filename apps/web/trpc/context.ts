import { cookies, headers } from "next/headers";
import { db } from "./prisma";
import { UAParser } from "ua-parser-js";

async function getUserAgent() {
  const requestHeaders = await headers();

  const userAgent = requestHeaders.get("user-agent");

  if (!userAgent) return undefined;

  const data = new UAParser(userAgent);
  return data.getResult();
}

export async function createContext() {
  const session = (await cookies()).get("session");

  const userAgent = await getUserAgent();

  return {
    db,
    session: session?.value,
    userAgent,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
