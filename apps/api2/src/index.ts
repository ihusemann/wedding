import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trialSchema } from "@repo/schemas/trial";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@repo/db";

const app = new Hono();

const db = new PrismaClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/", zValidator("json", trialSchema), async (c) => {
  const data = c.req.valid("json");

  const result = await db.trial.create({
    data,
  });

  return c.json(result);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
