import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

import { api } from "../api/api.js";

export function registerContactsTools(server: McpServer) {
  server.registerTool(
    "list_contacts",
    {
      description: "Gets all contacts from the application.",
    },
    async () => {
      const response = await api.get("/api/contacts");

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_contact",
    {
      description: "Gets a contact by its ID.",
      inputSchema: z.object({
        id: z.uuid().describe("The contact ID"),
      }),
    },
    async ({ id }) => {
      const response = await api.get(`/api/contacts/${id}`);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );

  server.registerTool(
    "create_contact",
    {
      description: "Creates a new contact in the application.",
      inputSchema: z.object({
        name: z.string().describe("The contact's name"),
        phone: z.string().describe("The contact's phone number"),
        email: z.email().optional().describe("The contact's email address"),
      }),
    },
    async ({ name, phone, email }) => {
      const response = await api.post("/api/contacts", {
        name,
        phone,
        email,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );

  server.registerTool(
    "update_contact",
    {
      description: "Updates an existing contact.",
      inputSchema: z.object({
        id: z.uuid().describe("The contact ID"),
        name: z.string().describe("The contact's name"),
        phone: z.string().describe("The contact's phone number"),
        email: z.email().optional().describe("The contact's email address"),
      }),
    },
    async ({ id, name, phone, email }) => {
      const response = await api.put(`/api/contacts/${id}`, {
        name,
        phone,
        email,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );

  server.registerTool(
    "delete_contact",
    {
      description: "Deletes a contact by its ID.",
      inputSchema: z.object({
        id: z.uuid().describe("The contact ID"),
      }),
    },
    async ({ id }) => {
      const response = await api.delete(`/api/contacts/${id}`);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );
}
