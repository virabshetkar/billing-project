import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { registerHelloTool } from "./tools/hello.js";
import { registerContactsTools } from "./tools/contacts-tool.js";

const server = new McpServer({
  name: "myapp-mcp",
  version: "1.0.0",
});

registerHelloTool(server);
registerContactsTools(server);

void serveStdio(() => server);

console.error("MyApp MCP server running");
