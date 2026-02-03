import { zodToJsonSchema } from "zod-to-json-schema";
import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaParseResumeRequest, type ParseResumeRequest } from "../schemas/parse-resume.js";

export const parseResumeTool = {
  name: "parse_resume",
  description: `Parse an existing resume document (PDF, DOCX) into structured JSON or markdown format.

COST: 4 credits per parse

INPUT: Either provide a publicly accessible file_url OR base64-encoded file content (not both)
- file_url: Max 20MB file size
- file (base64): Max 4MB file size

OUTPUT FORMATS:
- json: Structured data with name, employment, education, skills, etc.
- markdown: Human-readable markdown format`,

  inputSchema: zodToJsonSchema(schemaParseResumeRequest, {
    $refStrategy: "none",
    target: "jsonSchema7",
  }),

  async handler(args: unknown) {
    try {
      const parsed = schemaParseResumeRequest.parse(args);
      const client = getApiClient();
      const result = await client.parseResume(parsed as ParseResumeRequest);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                data: result.data,
                credits_used: result.meta.credits_used,
                credits_remaining: result.meta.credits_remaining,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: formatToolError(error),
          },
        ],
        isError: true,
      };
    }
  },
};
