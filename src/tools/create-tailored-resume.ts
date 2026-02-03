import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaTailoredResumeRequest, type TailoredResumeRequest } from "../schemas/tailored-resume.js";

export const createTailoredResumeTool = {
  name: "create_tailored_resume",
  description: `Generate a resume optimized and tailored for a specific job posting using AI.

COST: 5 credits per generation

The AI will:
- Optimize keywords to match the job description
- Emphasize relevant experience and skills
- Reorder and highlight content that matches job requirements
- Adjust language to match the role and industry

RETURNS: URL to download the generated PDF (valid for 24 hours)

TEMPLATES (17): default, clean, classic, executive, modern-pro, meridian, horizon, atlas, prism, nova, zenith, vantage, summit, quantum, vertex, harvard, lattice`,

  inputSchema: schemaTailoredResumeRequest,

  async handler(args: unknown) {
    try {
      const parsed = schemaTailoredResumeRequest.parse(args);
      const client = getApiClient();
      const result = await client.createTailoredResume(parsed as TailoredResumeRequest);

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
