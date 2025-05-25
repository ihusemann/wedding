import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

export const guestsRouter = createTRPCRouter({
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
