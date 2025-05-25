import { z } from "zod";

export const guestSearchSchema = z.object({
  name: z.string(),
});
