import { z } from "zod";

export const trialSchema = z.object({
  name: z.string(),
});
