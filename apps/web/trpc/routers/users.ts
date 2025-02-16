import { publicProcedure, createTRPCRouter } from "../init";
import { createUserSchema } from "@repo/schemas/users";

export const usersRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx: { db } }) => {
    const users = await db.trial.findMany();

    return users;
  }),
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      return db.trial.create({
        data: input,
      });
    }),
});
