import { createClient } from "@/lib/supabase/server";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default async function HomeLayout({ children }: PropsWithChildren) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="py-4 px-4 grid w-full items-center grid-cols-[auto,1fr,auto]">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">evry</h1>
        </div>
        <div className="flex items-center justify-center gap-x-8">
          <Link className="text-sm font-medium" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium" href="#">
            About
          </Link>
        </div>
        <div className="flex justify-end items-center gap-x-2">
          {user ? (
            <Button size="sm" asChild>
              <Link href="/events">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="link">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
