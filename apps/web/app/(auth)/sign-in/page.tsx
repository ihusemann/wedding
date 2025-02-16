"use client";

import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInForm,
  signInSchema,
  SignUpForm,
  signUpSchema,
} from "@repo/schemas/auth";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const [message, setMessage] = useState("");

  const { replace } = useRouter();

  const { mutate } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      replace("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const { isSubmitting } = form.formState;

  if (message) {
    return <p className="font-medium text-sm">{message}</p>;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutate(data);
          })}
          className="w-full flex flex-col gap-y-4"
        >
          <div>
            <h1 className="text-xl font-semibold">Welcome back!</h1>
            <p className="text-muted-foreground text-sm">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="me@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="relative"
            >
              <span className={cn(isSubmitting && "invisible")}>Sign up</span>
              {isSubmitting && (
                <Loader2Icon className="h-5 w-5 absolute animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <p className="absolute text-sm text-muted-foreground inset-x-0 translate-y-full -bottom-2 text-center">
        Already have an account? Sign in.
      </p>
    </>
  );
}
