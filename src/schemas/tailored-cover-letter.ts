import { z } from "zod";
import { schemaCoverLetterContent } from "./cover-letter-content.js";
import { schemaCoverLetterStyle } from "./cover-letter-style.js";

export const schemaCreateCoverLetterRequest = z.object({
  content: schemaCoverLetterContent,
  style: schemaCoverLetterStyle,
});

export type CreateCoverLetterRequest = z.infer<typeof schemaCreateCoverLetterRequest>;

export const schemaTailoredCoverLetterRequest = z.object({
  cover_letter_content: schemaCreateCoverLetterRequest.describe(
    "Your cover letter content and styling. If 'text' field is provided, the AI will enhance/rewrite it for the target job. If 'text' is empty, the AI will generate a complete cover letter from scratch based on the job description."
  ),
  target_job: z
    .object({
      job_title: z
        .string()
        .max(250, { message: "Job title cannot exceed 250 characters" })
        .describe(
          "Job title you're applying for (e.g., 'Senior Software Engineer', 'Marketing Manager'). Used to personalize the cover letter"
        ),
      job_description: z
        .string()
        .max(10000, {
          message: "Job description cannot exceed 10000 characters",
        })
        .describe(
          "Complete job posting including responsibilities, requirements, and company information. More detail produces a better-tailored cover letter with relevant keywords and examples"
        ),
    })
    .describe(
      "Details of the target position. Used to tailor the cover letter by incorporating relevant keywords, emphasizing matching qualifications, and adjusting tone to fit the role and company culture"
    ),
  tailoring_instructions: z
    .string()
    .max(2000, {
      message: "Tailoring instructions cannot exceed 2000 characters",
    })
    .optional()
    .describe(
      "Optional additional instructions for tailoring the cover letter (e.g., 'emphasize leadership experience', 'highlight Python skills', 'mention passion for sustainability', 'keep tone formal'). Use this to guide the AI's focus areas"
    ),
});

export type TailoredCoverLetterRequest = z.infer<typeof schemaTailoredCoverLetterRequest>;

// Shared response schema for create and create-tailored endpoints
export const schemaCreateCoverLetterResponse = z.object({
  success: z.boolean(),
  data: z.object({
    file_url: z.string().describe("URL to download the generated PDF"),
    file_url_expires_at: z
      .number()
      .describe("Timestamp in milliseconds when the download URL expires (24 hours from creation)"),
    file_expires_at: z
      .number()
      .describe("Timestamp in milliseconds when the file itself expires (~30 days)"),
    file_size_bytes: z.number().describe("Size of the generated PDF in bytes"),
  }),
  meta: z.object({
    run_id: z.string().nullable().describe("Unique identifier for this run"),
    credits_used: z.number().describe("Number of credits used for this request"),
    credits_remaining: z
      .number()
      .nullable()
      .describe("Remaining credits after this request"),
  }),
});

export type CreateCoverLetterResponse = z.infer<typeof schemaCreateCoverLetterResponse>;
