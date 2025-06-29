"use client";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/schemas/auth";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { cn } from "@repo/ui/lib/utils";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { replace } = useRouter();
  const [message, setMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending } = trpc.login.useMutation({
    onError: () => {
      setMessage("Something went wrong.  Please try again later.");
    },

    onSuccess: ({ success }) => {
      if (success) {
        replace("/");
        return;
      }

      setMessage("Oops! That's not the password. Try again?");
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          mutate(data);
        })}
        className="max-w-md w-full"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Password"
                  className="bg-transparent font-semibold text-lg w-full border-primary/40 focus-within:border-primary border-b-2 focus-within:outline-none placeholder:text-primary/50 tracking-wide"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            disabled={isPending || form.watch("password").length < 3}
            className={cn(
              "text-primary font-semibold text-base bg-transparent border-primary/80 px-5 hover:bg-primary/5",
              form.watch("password").length < 3 && "invisible"
            )}
            // size="lg"
            variant="outline"
          >
            <span className="mt-0.5">Submit</span>
            <MoveRightIcon className="size-4 ml-2" />
          </Button>
        </div>

        {message && (
          <p className="text-center font-semibold mt-4 px-5 py-2 rounded-lg bg-primary/5">
            {message}
          </p>
        )}
      </form>
    </Form>
  );
}
