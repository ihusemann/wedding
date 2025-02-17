"use client";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateEventForm, createEventSchema } from "@repo/schemas/events";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function CreateEventForm() {
  const form = useForm<CreateEventForm>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createEventSchema),
  });

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.events.create.useMutation({
    onSuccess: async () => {
      await utils.events.list.invalidate();
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => mutate(d))}
        className="flex flex-col gap-y-4 max-w-md mx-auto w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Wedding" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button size="sm" disabled={isPending}>
            <span className={cn(isPending && "invisible")}>Submit</span>
            {isPending && (
              <Loader2Icon className="h-5 w-5 animate-spin absolute" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
