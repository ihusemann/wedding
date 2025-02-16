import { createTRPCRouter } from "../init";
import { usersRouter } from "./users";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
