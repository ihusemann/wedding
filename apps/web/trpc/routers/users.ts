import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "../prisma";

export const usersRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const users = await db.trial.findMany();

    return users;
  }),
});
