"use client";

import { Button } from "@repo/ui/components/button";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { Guest } from "@repo/db";

export default function RsvpPage() {
  const [name] = useQueryState("name");

  const { data, isLoading, isError } = trpc.guests.list.useQuery(
    {
      name: name ?? "",
    },
    {
      enabled: !!name,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 65, // 65 minutes
    }
  );

  if (!name) return null;

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground text-center">Loading...</p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        Oops! Something went wrong.
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        Hmm, nobody matches that name.
      </p>
    );
  }

  function sortGuests({ name: aName }: Guest, { name: bName }: Guest) {
    if (aName == null && bName == null) return 0;
    if (aName === null) return 1;
    if (bName === null) return -1;

    return aName.localeCompare(bName);
  }

  return (
    data.length > 0 && (
      <div className="divide-y w-full divide-primary/50">
        <div className="text-sm font-mono pb-4">
          Select your party below or try another search.
        </div>
        {data.map(({ id, guests }) => (
          <div key={id} className="py-6 flex justify-between items-center">
            <div className="text-sm font-mono">
              {guests.sort(sortGuests).map(({ id, name }) => (
                <p key={id} className="font-medium">
                  {name || "Guest"}
                </p>
              ))}
            </div>
            <Button size="sm" asChild>
              <Link
                href={
                  guests.some(({ respondedAt }) => respondedAt === null)
                    ? `/rsvp/${id}`
                    : `/rsvp/${id}/thanks`
                }
              >
                Select
              </Link>
            </Button>
          </div>
        ))}
        <div className="text-xs font-mono text-center pt-6">
          <p className="max-w-md mx-auto">
            If you can&apos;t find yourself or your party, please reach out to
            Isaac &amp; Laura directly.
          </p>
        </div>
      </div>
    )
  );
}
