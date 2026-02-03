import { z } from "zod";
import { schemaResumeContent } from "./resume-content.js";
import { schemaResumeStyle } from "./resume-style.js";

export const schemaCreateResumeRequest = z.object({
  content: schemaResumeContent,
  style: schemaResumeStyle,
});

export type CreateResumeRequest = z.infer<typeof schemaCreateResumeRequest>;

export const schemaTailoredResumeRequest = z.object({
  resume_content: schemaCreateResumeRequest.describe(
    "Your complete resume data that will be optimized and tailored for the target job. Include all experience, skills, education, etc. - the AI will emphasize the most relevant parts"
  ),
  target_job: z
    .object({
      job_title: z
        .string()
        .max(250, { message: "Job title cannot exceed 250 characters" })
        .describe(
          "Job title of the position you're applying for (e.g., 'Senior Software Engineer', 'Marketing Manager')"
        ),
      job_description: z
        .string()
        .max(10000, {
          message: "Job description cannot exceed 10000 characters",
        })
        .describe(
          "Complete job posting text including responsibilities, requirements, and qualifications. More detail helps create a better-tailored resume"
        ),
    })
    .describe(
      "Details of the job you're applying for. Used to tailor your resume by optimizing keywords, emphasizing relevant experience, and adjusting content order to match job requirements"
    ),
  tailoring_instructions: z
    .string()
    .max(2000, {
      message: "Tailoring instructions cannot exceed 2000 characters",
    })
    .optional()
    .describe(
      "Optional additional instructions for tailoring (e.g., 'emphasize leadership experience', 'highlight Python skills', 'focus on remote work experience')"
    ),
});

export type TailoredResumeRequest = z.infer<typeof schemaTailoredResumeRequest>;

// Shared response schema for create and create-tailored endpoints
export const schemaCreateResumeResponse = z.object({
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

export type CreateResumeResponse = z.infer<typeof schemaCreateResumeResponse>;
