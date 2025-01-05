import { serve } from "@hono/node-server";
import { trialSchema } from "@repo/schemas/trial";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@repo/db";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { listTrialsSchema } from "@repo/schemas/trial";
import { apiReference } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

const db = new PrismaClient();

app.openapi(
  createRoute({
    method: "get",
    path: "/",
    operationId: "listTrials",
    summary: "List trials",
    tags: ["Trials"],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: listTrialsSchema,
          },
        },
        description: "Lists trials",
      },
    },
  }),
  async (c) => {
    const trials = await db.trial.findMany();

    return c.json(trials);
  }
);

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

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Lorem ipsum",
  },
});

app.get(
  "/api",
  apiReference({
    spec: {
      url: "/doc",
    },
  })
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
