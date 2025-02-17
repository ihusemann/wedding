"use client";

import { RouterOutput, trpc } from "@/trpc/client";
import { Button } from "@repo/ui/components/button";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@repo/ui/components/context-menu";
import { cn } from "@repo/ui/lib/utils";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function EventItem({
  id,
  name,
}: RouterOutput["events"]["list"][number]) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.events.delete.useMutation({
    onSuccess: async () => {
      await utils.events.list.invalidate();
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button asChild variant="outline" className="rounded-3xl h-24">
          <Link href={`/events/${id}`} className=" p-3">
            {name}
          </Link>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className={cn(isPending && "text-red-600")}
          onSelect={() => {
            mutate(id);
          }}
        >
          <Trash2Icon className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
