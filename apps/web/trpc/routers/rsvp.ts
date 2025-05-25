import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../init";
import { partyRsvpSchema } from "@repo/schemas/rsvp";

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
  rsvp: publicProcedure
    .input(partyRsvpSchema)
    .mutation(
      async ({
        ctx: { db },
        input: { guests, specialConsiderations, recaptchaToken },
      }) => {
        const respondedAt = new Date();

        await verifyRecaptcha(recaptchaToken);

        const res = await db.$transaction(async (tx) => {
          const tasks = guests.map(({ id, ...guest }) =>
            tx.guest.update({
              where: {
                id,
              },
              data: {
                ...guest,
                specialConsiderations,
                respondedAt,
              },
            })
          );

          return Promise.all(tasks);
        });

        return res;
      }
    ),
});
