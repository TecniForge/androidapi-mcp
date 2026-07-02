#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { TOOLS } from "./tools.js";
import { handleTool } from "./handlers.js";
const server = new Server({
    name: "androidapi-mcp",
    version: "1.0.0",
}, {
    capabilities: { tools: {} },
});
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (!process.env.ANDROIDAPI_SECRET) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        error: "ANDROIDAPI_SECRET is not configured. " +
                            "Set it in the MCP server environment (see README for setup instructions).",
                    }),
                },
            ],
            isError: true,
        };
    }
    try {
        const result = await handleTool(name, args ?? {});
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
            content: [{ type: "text", text: JSON.stringify({ error: message }) }],
            isError: true,
        };
    }
});
const transport = new StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map