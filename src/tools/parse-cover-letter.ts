import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaParseCoverLetterRequest, type ParseCoverLetterRequest } from "../schemas/parse-cover-letter.js";

export const parseCoverLetterTool = {
  name: "parse_cover_letter",
  description: `Parse an existing cover letter document (PDF, DOCX) into structured JSON or markdown format.

COST: 4 credits per parse

INPUT: Either provide a publicly accessible file_url OR base64-encoded file content (not both)
- file_url: Max 20MB file size
- file (base64): Max 4MB file size

OUTPUT FORMATS:
- json: Structured data with name, text, hiring_manager_company, etc.
- markdown: Human-readable markdown format`,

  inputSchema: schemaParseCoverLetterRequest,

  async handler(args: unknown) {
    try {
      const parsed = schemaParseCoverLetterRequest.parse(args);
      const client = getApiClient();
      const result = await client.parseCoverLetter(parsed as ParseCoverLetterRequest);

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
