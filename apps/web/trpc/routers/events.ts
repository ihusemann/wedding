import { z } from "zod";
import { createTRPCRouter, procedure } from "../init";
import { createEventSchema } from "@repo/schemas/events";
import { TRPCError } from "@trpc/server";

export const eventsRouter = createTRPCRouter({
  get: procedure
    .input(z.string())
    .query(async ({ input: id, ctx: { db, user } }) => {
      const event = await db.event.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });

      if (!event)
        throw new TRPCError({
          code: "NOT_FOUND",
        });

      return event;
    }),
  list: procedure.query(({ ctx: { db, user } }) =>
    db.event.findMany({
      where: {
        userId: user.id,
      },
    })
  ),
  create: procedure
    .input(createEventSchema)
    .mutation(({ input: { name }, ctx: { db, user } }) =>
      db.event.create({
        data: {
          name,
          userId: user.id,
        },
      })
    ),
  delete: procedure
    .input(z.string())
    .mutation(async ({ input: id, ctx: { user, db } }) => {
      const count = await db.event.count({
        where: {
          userId: user.id,
          id,
        },
      });

      if (count !== 1)
        throw new TRPCError({
          code: "NOT_FOUND",
        });

      await db.event.delete({
        where: {
          id,
          userId: user.id,
        },
      });
    }),
});
