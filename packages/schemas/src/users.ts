import z from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

extendZodWithOpenApi(z);

const userSchema = z.object({
  id: z.string(),
  githubId: z.number(),
  username: z.string(),
});

export const listUsersSchema = z.array(userSchema);
