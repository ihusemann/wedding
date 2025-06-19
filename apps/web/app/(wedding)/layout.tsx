"use client";

import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import Flower from "../assets/flower.png";
import Image from "next/image";

export default function HomeLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <NuqsAdapter>
      <div className="pb-8">
        <div className="px-8 py-8 flex flex-col md:flex-row gap-y-12 md:gap-y-0">
          <div className="flex md:flex-col flex-col-reverse items-start gap-y-6">
            <div className="flex uppercase font-bold mb-3 text-sm tracking-wide justify-center items-start space-x-6">
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
              <Link
                href="https://www.zola.com/registry/isaacandlaura2025/?preview=true"
                target="_blank"
              >
                Registry
              </Link>
            </div>
            {/* <div className="mt-4">
              <div>Love,</div>
              <div>L &amp; I</div>
            </div> */}
            <Image src={Flower} alt="" height={70} className="object-contain" />
          </div>

          <div className="flex md:ml-auto justify-around md:justify-normal md:gap-x-24">
            <div>
              <p className="font-bold uppercase text-sm mb-1">
                Date &amp; Time
              </p>
              <p className="text-sm uppercase">Friday, October 10</p>
              <p className="text-sm uppercase">5:00 PM - 12:00 AM</p>
            </div>
            <div>
              <p className="font-bold uppercase text-sm mb-1">
                Ceremony &amp; Reception
              </p>
              <p className="text-sm uppercase">Ravenswood Event Center</p>
              <p className="text-sm uppercase">4021 N Ravenswood Ave</p>
              <p className="text-sm uppercase">Chicago, IL</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </NuqsAdapter>
  );
}
