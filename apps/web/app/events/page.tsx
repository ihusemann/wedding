"use client";

import { trpc } from "@/trpc/client";
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@repo/ui/components/context-menu";
import { Trash2Icon } from "lucide-react";
import EventItem from "./event-item";

export default function EventsPage() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = trpc.events.list.useQuery();

  if (isLoading || !events)
    return (
      <>
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-24 rounded-3xl" />
        <div className="flex justify-end">
          <Skeleton className="h-24 w-24 rounded-3xl" />
        </div>
      </>
    );

  if (isError) return <div className="text-red-600">{error.message}</div>;

  if (events.length === 0)
    return (
      <div>
        <p className="text-lg font-semibold text-center">None yet</p>
        <p className="text-sm text-muted-foreground text-center">
          Lorem ipsum dolor sit amet.
        </p>
      </div>
    );

  return events.map((event) => <EventItem key={event.id} {...event} />);
}
