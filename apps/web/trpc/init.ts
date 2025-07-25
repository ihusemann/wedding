import { initTRPC, TRPCError } from "@trpc/server";
// import { cache } from "react";
import superjson from "superjson";
import { Context } from "./context";
// export const createTRPCContext = cache(async () => {
//   /**
//    * @see: https://trpc.io/docs/server/context
//    */
//   return { userId: "user_123" };
// });
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const procedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.session || ctx.session !== process.env.WEBSITE_PASSWORD) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx,
  });
});
