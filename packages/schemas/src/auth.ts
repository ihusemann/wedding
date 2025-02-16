import z from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = authSchema;
export type SignUpForm = z.infer<typeof signUpSchema>;

export const signInSchema = authSchema;
export type SignInForm = z.infer<typeof signInSchema>;
