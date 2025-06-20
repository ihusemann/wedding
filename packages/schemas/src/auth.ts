import z from "zod";

export const loginSchema = z.object({
  password: z.string().min(3, "Please enter at least 3 characters."),
});
