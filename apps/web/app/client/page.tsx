"use client";

import { trpc } from "@/trpc/client";
import { Button } from "@repo/ui/components/button";
import UserForm from "./user-form";

export default function Page() {
  const { data } = trpc.users.list.useQuery();

  const utils = trpc.useUtils();

  const { mutate } = trpc.users.create.useMutation({
    onSuccess: async () => {
      await utils.users.list.invalidate();
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-6">{JSON.stringify(data || "Loading")}</div>
      <UserForm />
    </div>
  );
}
