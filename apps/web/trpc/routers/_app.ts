import { createTRPCRouter, publicProcedure } from "../init";
import { guestsRouter } from "./guests";
import { partiesRouter } from "./parties";
import { rsvpRouter } from "./rsvp";
import { env } from "../env";
import { loginSchema } from "@repo/schemas/auth";
import { cookies } from "next/headers";

export const appRouter = createTRPCRouter({
  rsvp: rsvpRouter,
  guests: guestsRouter,
  parties: partiesRouter,
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input: { password } }) => {
      if (password.toLowerCase() === env.WEBSITE_PASSWORD.toLowerCase()) {
        (await cookies()).set("session", env.WEBSITE_PASSWORD, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    }),
});

export type AppRouter = typeof appRouter;
