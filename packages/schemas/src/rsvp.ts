import z from "zod";

export const responseSchema = z.enum(["Attending", "Declined"]);

export const mealSchema = z.enum(["Steak", "Chicken", "Risotto"]);

export const rsvpSchema = z
  .object({
    id: z.string(),
    name: z.string().min(4).optional().or(z.literal("")),
    isPlusOne: z.boolean(),
    rsvp: responseSchema,
    mealSelection: mealSchema.optional(),
  })
  .refine(
    ({ rsvp, mealSelection, name }) => {
      if (rsvp === "Attending") {
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
