"use client";
import { RouterOutput, trpc } from "@/trpc/client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { partyRsvpSchema } from "@repo/schemas/rsvp";
import { zodResolver } from "@hookform/resolvers/zod";
import GuestForm from "./guest-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/form";
import { Textarea } from "@repo/ui/components/textarea";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type FormFields = z.infer<typeof partyRsvpSchema>;

interface Props {
  guests: RouterOutput["parties"]["listGuests"];
}

export default function RsvpForm({ guests }: Props) {
  const { partyId } = useParams<{ partyId: string }>();

  const form = useForm<FormFields>({
    defaultValues: {
      guests: guests.map(({ id, name, rsvp, mealSelection }) => ({
        id,
        name: name || "",
        rsvp: rsvp as "attending" | "declined" | undefined,
        mealSelection: mealSelection || "",
      })),
      recaptchaToken: "",
      specialConsiderations: guests.every(
        ({ specialConsiderations }) => specialConsiderations
      )
        ? guests[0]?.specialConsiderations
        : "",
    },
    resolver: zodResolver(partyRsvpSchema),
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "guests",
  });

  const { replace } = useRouter();

  const { mutate, isPending } = trpc.rsvp.rsvp.useMutation({
    onSuccess: () => {
      replace(`/rsvp/${partyId}/thanks`);
    },
  });

  const noneAttending = form
    .watch("guests")
    .every(({ rsvp }) => rsvp === "declined");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  async function executeRecaptchaAndSubmit(e: FormEvent) {
    e.preventDefault();

    const token = await recaptchaRef.current?.executeAsync();

    if (!token) return;

    form.handleSubmit((data) => {
      mutate(data);
    })();
  }

  return (
    <Form {...form}>
      <form onSubmit={executeRecaptchaAndSubmit}>
        <FormField
          control={form.control}
          name="recaptchaToken"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  size="invisible"
                  ref={recaptchaRef}
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="divide-y w-full mt-9 divide-primary/50 border-y border-primary/50">
          {fields.map((guest, index) => (
            <GuestForm key={guest.id} {...guest} index={index} />
          ))}
        </div>

        {/* <input
          type="text"
          {...form.register("honeypot")}
          className="absolute left-[-100vw] top-0 opacity-0"
          autoComplete="off"
          tabIndex={-1}
        /> */}

        {!noneAttending && (
          <div className="bg-accent rounded-2xl p-6 w-full flex flex-col items-center mt-8">
            <div className="w-full max-w-xl mx-auto">
              <p className="font-mono mb-3 text-center font-medium">
                Lastly...
              </p>
              <p className="font-mono text-sm">
                Are there any dietary restrictions we should know of? (Optional)
              </p>
              <FormField
                control={form.control}
                name="specialConsiderations"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="mt-2"
                        defaultValue={value ?? ""}
                        onChange={onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="w-full flex justify-center mt-4">
          <Button
            size="lg"
            disabled={!form.formState.isValid || isPending}
            className="font-mono text-base relative"
          >
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
