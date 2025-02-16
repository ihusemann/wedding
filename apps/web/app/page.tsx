// import SignOutButton from "@/components/auth/sign-out-button";
import { createClient } from "@/lib/supabase/server";
import { trpc } from "@/trpc/server";
import { Button } from "@repo/ui/components/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const data = await trpc.users.list();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="text-blue-600">{JSON.stringify(user)}</div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{JSON.stringify(data)}</h1>
        <Button size="sm">Button</Button>
      </div>

      {/* <SignOutButton /> */}
    </div>
  );
}
