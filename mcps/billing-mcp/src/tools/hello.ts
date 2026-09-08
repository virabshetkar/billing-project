import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

export function registerHelloTool(server: McpServer) {
  server.registerTool(
    "hello",
    {
      description: "Says hello to a person.",
      inputSchema: z.object({
        name: z.string().describe("The person's name"),
      }),
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: `Hello ${name}!`,
          },
        ],
      };
    },
  );
}
