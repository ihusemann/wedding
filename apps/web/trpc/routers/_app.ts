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
      console.log(password);
      if (password === env.WEBSITE_PASSWORD) {
        console.log("success");

        (await cookies()).set("session", password, {
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
