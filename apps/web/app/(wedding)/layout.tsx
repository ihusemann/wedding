"use client";

import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

export default function HomeLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <NuqsAdapter>
      <div className="pb-12">
        <div className="px-8 py-8 flex">
          <div>
            <div className="flex font-mono uppercase font-bold mb-3 text-sm tracking-wide justify-center items-start space-x-6">
              <Link
                href="/"
                className={cn(
                  pathname === "/" && "underline underline-offset-4"
                )}
              >
                Home
              </Link>
              <Link
                href="/rsvp"
                className={cn(
                  pathname.startsWith("/rsvp") && "underline underline-offset-4"
                )}
              >
                RSVP
              </Link>
              <Link href="#">Registry</Link>
            </div>
            <div className="mt-4">
              <div>Love,</div>
              <div>L &amp; I</div>
            </div>
          </div>

          <div className="flex ml-auto gap-x-24">
            <div>
              <p className="font-mono font-bold uppercase text-sm mb-1">
                Date &amp; Time
              </p>
              <p className="text-sm font-mono uppercase">Friday, October 10</p>
              <p className="text-sm font-mono uppercase">5:00 PM - 12:00 AM</p>
            </div>
            <div>
              <p className="font-mono font-bold uppercase text-sm mb-1">
                Ceremony &amp; Reception
              </p>
              <p className="text-sm font-mono uppercase">
                Ravenswood Event Center
              </p>
              <p className="text-sm font-mono uppercase">
                4021 N Ravenswood Ave
              </p>
              <p className="text-sm font-mono uppercase">Chicago, IL</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </NuqsAdapter>
  );
}
