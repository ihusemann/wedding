"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryState } from "nuqs";
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
import { ArrowRightIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

const searchSchema = z.object({
  name: z.string().min(3, "Please search with at least 3 characters"),
});

type FormFields = z.infer<typeof searchSchema>;

export default function SearchForm() {
  const [name, setName] = useQueryState("name");
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormFields>({
    defaultValues: {
      name: name ?? "",
    },
    resolver: zodResolver(searchSchema),
  });

  function onSubmit(data: FormFields) {
    setName(data.name);
    inputRef.current?.blur();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl bg-muted py-12 px-4 w-full"
      >
        <p className="md:text-sm text-center w-full max-w-xl mx-auto">
          Please enter the name of one member of your party below. If
          you&apos;re responding for you and a guest (or your family),
          you&apos;ll be able to RSVP for your entire group on the next page.
        </p>

        <div className="flex flex-col sm:flex-row mt-5 justify-center sm:items-center">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0 relative">
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl ref={inputRef} className="">
                  <Input
                    {...field}
                    placeholder="Name"
                    className="bg-background w-full sm:w-screen sm:max-w-xs font-semibold placeholder:font-medium px-4 h-10"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-1.5 translate-y-full text-sm font-mono" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="sm:ml-2 mt-2 sm:mt-0 sm:text-sm h-10 ml-auto"
          >
            Continue
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
