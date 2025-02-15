"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUser, createUserSchema } from "@repo/schemas/users";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { trpc } from "@/trpc/client";

export default function UserForm() {
  const form = useForm<CreateUser>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createUserSchema),
  });

  const utils = trpc.useUtils();

  const { mutate } = trpc.users.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.users.list.invalidate();
    },
  });

  return (
    <Form {...form}>
      <form
        className="max-w-lg mx-auto"
        onSubmit={form.handleSubmit((data) => {
          mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
