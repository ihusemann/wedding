import z from "zod";

export const rsvpSchema = z
  .object({
    id: z.string(),
    name: z.string().min(4).optional().or(z.literal("")),
    rsvp: z.enum(["attending", "declined"]),
    mealSelection: z.string().optional(),
  })
  .refine(
    ({ rsvp, mealSelection, name }) => {
      if (rsvp === "attending") {
        return !!mealSelection && !!name;
      }

      return true;
    },
    {
      message: "Meal selection and guest name is required when attending",
      path: ["mealSelection", "name"],
    }
  );

export const partyRsvpSchema = z.object({
  guests: z.array(rsvpSchema),
  specialConsiderations: z.string().nullish(),
  recaptchaToken: z.string(),
  // honeypot: z
  //   .string()
  //   .optional()
  //   .refine((val) => !val, {
  //     message: "Bot detected",
  //   }),
});
