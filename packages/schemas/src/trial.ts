import { z } from "zod";

export const trialSchema = z.object({
  name: z.string(),
});

export const listTrialsSchema = z.array(trialSchema);
