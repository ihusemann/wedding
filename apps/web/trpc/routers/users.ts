import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "../prisma";
import { createUserSchema } from "@repo/schemas/users";

export const usersRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const users = await db.trial.findMany();

    return users;
  }),
  create: baseProcedure.input(createUserSchema).mutation(async ({ input }) => {
    return db.trial.create({
      data: input,
    });
  }),
});
