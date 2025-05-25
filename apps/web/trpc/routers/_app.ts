import { createTRPCRouter } from "../init";
import { guestsRouter } from "./guests";
import { partiesRouter } from "./parties";
import { rsvpRouter } from "./rsvp";

export const appRouter = createTRPCRouter({
  rsvp: rsvpRouter,
  guests: guestsRouter,
  parties: partiesRouter,
});

export type AppRouter = typeof appRouter;
