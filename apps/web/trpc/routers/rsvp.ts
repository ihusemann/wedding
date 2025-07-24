import { TRPCError } from "@trpc/server";
import { createTRPCRouter, procedure } from "../init";
import { partyRsvpSchema } from "@repo/schemas/rsvp";
import { z } from "zod";
import { Prisma } from "@repo/db";

async function verifyRecaptcha(token: string) {
  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify?" +
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
    {
      method: "POST",
    }
  );

  const { success } = (await res.json()) as {
    success: boolean;
    challenge_ts: string;
    apk_package_name: string;
    "error-codes": string[];
  };

  if (!success)
    throw new TRPCError({
      code: "FORBIDDEN",
    });
}

export const rsvpRouter = createTRPCRouter({
  rsvp: procedure
    .input(partyRsvpSchema)
    .mutation(
      async ({
        ctx: { db, userAgent },
        input: { guests, specialConsiderations, recaptchaToken },
      }) => {
        await verifyRecaptcha(recaptchaToken);

        const data: Prisma.RsvpCreateManyInput[] = guests.map(
          ({ id: guestId, mealSelection, rsvp }) => ({
            guestId,
            response: rsvp,
            meal: rsvp === "Attending" ? mealSelection : undefined,
            specialConsiderations,
            metadata: userAgent ? JSON.stringify(userAgent) : undefined,
          })
        );

        const res = await db.rsvp.createMany({
          data,
        });

        return res;
      }
    ),
});
