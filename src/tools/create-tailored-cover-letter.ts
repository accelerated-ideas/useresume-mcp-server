import { zodToJsonSchema } from "zod-to-json-schema";
import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaTailoredCoverLetterRequest, type TailoredCoverLetterRequest } from "../schemas/tailored-cover-letter.js";

export const createTailoredCoverLetterTool = {
  name: "create_tailored_cover_letter",
  description: `Generate a cover letter optimized and tailored for a specific job posting using AI.

COST: 5 credits per generation

The AI will:
- If 'text' field is provided: enhance and rewrite it for the target job
- If 'text' is empty: generate a complete cover letter from scratch based on the job description
- Incorporate relevant keywords from the job posting
- Emphasize matching qualifications
- Adjust tone to fit the role and company culture

RETURNS: URL to download the generated PDF (valid for 24 hours)

TEMPLATES (11): atlas, classic, clean, default, executive, horizon, meridian, modern-pro, nova, prism, zenith`,

  inputSchema: zodToJsonSchema(schemaTailoredCoverLetterRequest, {
    $refStrategy: "none",
    target: "jsonSchema7",
  }),

  async handler(args: unknown) {
    try {
      const parsed = schemaTailoredCoverLetterRequest.parse(args);
      const client = getApiClient();
      const result = await client.createTailoredCoverLetter(parsed as TailoredCoverLetterRequest);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                file_url: result.data.file_url,
                file_expires_at: new Date(result.data.file_expires_at).toISOString(),
                file_url_expires_at: new Date(result.data.file_url_expires_at).toISOString(),
                file_size_bytes: result.data.file_size_bytes,
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
