import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trialSchema } from "@repo/schemas/trial";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/", zValidator("json", trialSchema), (c) => {
  const body = c.req.valid("json");

  return c.text(`hello ${body.name}`);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
