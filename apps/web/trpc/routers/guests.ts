import { z } from "zod";
import { createTRPCRouter, procedure } from "../init";

export const guestsRouter = createTRPCRouter({
  list: procedure
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
                contains: name.trim(),
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

// import { z } from "zod";
// import { createTRPCRouter, procedure } from "../init";

// export const guestsRouter = createTRPCRouter({
//   list: procedure
//     .input(
//       z.object({
//         name: z.string().optional(),
//       })
//     )
//     .query(async ({ ctx: { db }, input: { name } }) => {
//       return await db.party.findMany({
//         where: {
//           ...(name
//             ? {
//                 guests: {
//                   some: {
//                     name: {
//                       contains: name.trim(),
//                       mode: "insensitive",
//                     },
//                   },
//                 },
//               }
//             : {}),
//         },
//         include: {
//           guests: true,
//         },
//       });
//     }),
// });
