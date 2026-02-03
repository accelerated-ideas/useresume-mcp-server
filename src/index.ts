#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Resume tools
import { createResumeTool } from "./tools/create-resume.js";
import { parseResumeTool } from "./tools/parse-resume.js";
import { createTailoredResumeTool } from "./tools/create-tailored-resume.js";

// Cover letter tools
import { createCoverLetterTool } from "./tools/create-cover-letter.js";
import { parseCoverLetterTool } from "./tools/parse-cover-letter.js";
import { createTailoredCoverLetterTool } from "./tools/create-tailored-cover-letter.js";

// Run status tool
import { getRunTool } from "./tools/get-run.js";

const server = new McpServer({
  name: "useresume",
  version: "1.0.0",
});

// Register resume tools
server.registerTool(
  createResumeTool.name,
  {
    description: createResumeTool.description,
    inputSchema: createResumeTool.inputSchema,
  },
  createResumeTool.handler
);

server.registerTool(
  parseResumeTool.name,
  {
    description: parseResumeTool.description,
    inputSchema: parseResumeTool.inputSchema,
  },
  parseResumeTool.handler
);

server.registerTool(
  createTailoredResumeTool.name,
  {
    description: createTailoredResumeTool.description,
    inputSchema: createTailoredResumeTool.inputSchema,
  },
  createTailoredResumeTool.handler
);

// Register cover letter tools
server.registerTool(
  createCoverLetterTool.name,
  {
    description: createCoverLetterTool.description,
    inputSchema: createCoverLetterTool.inputSchema,
  },
  createCoverLetterTool.handler
);

server.registerTool(
  parseCoverLetterTool.name,
  {
    description: parseCoverLetterTool.description,
    inputSchema: parseCoverLetterTool.inputSchema,
  },
  parseCoverLetterTool.handler
);

server.registerTool(
  createTailoredCoverLetterTool.name,
  {
    description: createTailoredCoverLetterTool.description,
    inputSchema: createTailoredCoverLetterTool.inputSchema,
  },
  createTailoredCoverLetterTool.handler
);

// Register run status tool
server.registerTool(
  getRunTool.name,
  {
    description: getRunTool.description,
    inputSchema: getRunTool.inputSchema,
  },
  getRunTool.handler
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("UseResume MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
