"use client";
import { trpc } from "@/trpc/client";
import { Button } from "@repo/ui/components/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { replace } = useRouter();

  const { mutate, isPending } = trpc.auth.signOut.useMutation({
    // onSuccess: () => {
    //   replace("/sign-in");
    // },
  });

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      Sign out
    </Button>
  );
}
