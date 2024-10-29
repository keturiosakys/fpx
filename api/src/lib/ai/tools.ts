import { z } from "zod";

// NOTE - We cannot use `.optional` from zod because it does not play nicely with structured output
export const requestSchema = z.object({
  path: z.string(),
  pathParams: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .nullable(),
  queryParams: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .nullable(),
  body: z
    .union([z.string(), z.record(z.string(), z.any()), z.array(z.any())])
    .nullable(),
  bodyType: z
    .object({
      type: z.enum(["json", "text", "form-data", "file"]),
      isMultipart: z.boolean(),
    })
    .nullable(),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
  // .nullable(),
});

export const makeRequestTool = {
  type: "function",
  function: {
    name: "make_request",
    description:
      "Generates some random data for an http request to an api backend",
    parameters: requestSchema,
  },
};

export const commandsSchema = z.object({
  // we use the routeId so that the LLMs know to reference that
  commands: z.array(
    z.object({
      routeId: z.number(),
    }),
  ),
});

export const commandsTool = {
  type: "function",
  function: {
    name: "commands",
    description: "Translates natural language commands to request sequences",
    parameters: commandsSchema,
  },
};
