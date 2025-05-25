import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

export const partiesRouter = createTRPCRouter({
  listGuests: publicProcedure
    .input(z.object({ partyId: z.string() }))
    .query(({ ctx: { db }, input: { partyId } }) =>
      db.guest.findMany({
        where: {
          partyId,
        },
      })
    ),

  get: publicProcedure.input(z.string()).query(({ ctx: { db }, input: id }) =>
    db.party.findUnique({
      where: {
        id,
      },
      include: {
        guests: true,
      },
    })
  ),

  list: publicProcedure
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
