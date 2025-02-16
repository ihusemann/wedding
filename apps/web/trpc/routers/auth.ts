import { createClient } from "@/lib/supabase/server";
import { publicProcedure, createTRPCRouter, procedure } from "../init";
import { signInSchema, signUpSchema } from "@repo/schemas/auth";
import { headers } from "next/headers";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  getUser: procedure.query(async ({ ctx: { user } }) => {
    return user;
  }),
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: { email, password } }) => {
      const origin = (await headers()).get("origin");

      const supabase = await createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      // TODO: handle errors better
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return {
        message: "Thanks!  Please check your email for a verification link.",
      };
    }),
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input: { email, password } }) => {
      const supabase = await createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // TODO: handle errors better
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),
  signOut: procedure.mutation(async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    // TODO: handle errors better
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }),
});
