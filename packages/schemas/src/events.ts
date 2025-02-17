import z from "zod";

const eventSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createEventSchema = eventSchema.pick({
  name: true,
});

export type CreateEventForm = z.infer<typeof createEventSchema>;
