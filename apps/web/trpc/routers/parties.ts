import { z } from "zod";
import { createTRPCRouter, procedure } from "../init";

export const partiesRouter = createTRPCRouter({
  listGuests: procedure
    .input(z.object({ partyId: z.string() }))
    .query(({ ctx: { db }, input: { partyId } }) =>
      db.guest.findMany({
        where: {
          partyId,
        },
      })
    ),

  get: procedure.input(z.string()).query(({ ctx: { db }, input: id }) =>
    db.party.findUnique({
      where: {
        id,
      },
      include: {
        guests: true,
      },
    })
  ),

  list: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx: { db }, input: { name } }) => {
      return await db.party.findMany({
        where: {
          guests: {
            some: {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
          },
        },
        include: {
          guests: true,
        },
      });
    }),
});
