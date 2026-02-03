import { z } from "zod";
import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaResumeContent } from "../schemas/resume-content.js";
import { schemaResumeStyle } from "../schemas/resume-style.js";
import type { CreateResumeRequest } from "../schemas/tailored-resume.js";

const inputSchema = z.object({
  content: schemaResumeContent,
  style: schemaResumeStyle,
});

export const createResumeTool = {
  name: "create_resume",
  description: `Generate a professional PDF resume from structured content.

COST: 1 credit per generation

RETURNS: URL to download the generated PDF (valid for 24 hours)

TEMPLATES (17): default, clean, classic, executive, modern-pro, meridian, horizon, atlas, prism, nova, zenith, vantage, summit, quantum, vertex, harvard, lattice

COLORS (32): blue, black, emerald, purple, rose, amber, slate, indigo, teal, burgundy, forest, navy, charcoal, plum, olive, maroon, steel, sapphire, pine, violet, mahogany, sienna, moss, midnight, copper, cobalt, crimson, sage, aqua, coral, graphite, turquoise

FONTS (9): geist, inter, merryweather, roboto, playfair, lora, jost, manrope, ibm-plex-sans

BACKGROUNDS (16): white, cream, pearl, mist, smoke, ash, frost, sage, mint, blush, lavender, sky, sand, stone, linen, ivory`,

  inputSchema: inputSchema,

  async handler(args: unknown) {
    try {
      const parsed = inputSchema.parse(args);
      const client = getApiClient();
      const result = await client.createResume(parsed as CreateResumeRequest);

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
