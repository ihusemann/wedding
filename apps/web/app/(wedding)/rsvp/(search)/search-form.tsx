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
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { ArrowRightIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  name: z.string(),
});

type FormFields = z.infer<typeof searchSchema>;

export default function SearchForm() {
  const [name, setName] = useQueryState("name");

  const form = useForm<FormFields>({
    defaultValues: {
      name: name ?? "",
    },
    resolver: zodResolver(searchSchema),
  });

  function onSubmit(data: FormFields) {
    setName(data.name);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl bg-muted py-12 px-4 w-full"
      >
        <p className="text-sm font-mono text-center w-full max-w-xl mx-auto">
          Please enter the first and last name of one member of your party
          below. If you&apos;re responding for you and a guest (or your family),
          you&apos;ll be able to RSVP for your entire group on the next page.
        </p>

        <div className="flex mt-5 justify-center items-center">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-fit space-y-0">
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl className="w-fit ">
                  <Input
                    {...field}
                    placeholder="First and last name"
                    className="bg-background w-screen max-w-xs font-mono font-semibold placeholder:font-medium px-4 h-10"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="font-mono ml-2 h-10">
            Continue
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
