"use client";
import { trpc } from "@/trpc/client";

export default function MePage() {
  const { data } = trpc.auth.getUser.useQuery();

  return <div>{JSON.stringify(data)}</div>;
}
