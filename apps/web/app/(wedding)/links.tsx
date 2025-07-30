"use client";

import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Links() {
  const pathname = usePathname();

  return (
    <div className="flex uppercase font-bold mb-3 md:text-sm tracking-wide justify-center items-start space-x-6">
      <Link
        href="/"
        className={cn(pathname === "/" && "underline underline-offset-4")}
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
      <Link href="#faqs">FAQs</Link>
    </div>
  );
}
