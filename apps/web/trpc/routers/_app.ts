import { createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { eventsRouter } from "./events";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
