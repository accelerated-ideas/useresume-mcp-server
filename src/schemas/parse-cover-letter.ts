import { z } from "zod";

export const schemaParseCoverLetterRequest = z
  .object({
    file_url: z
      .string()
      .optional()
      .describe(
        "URL of the uploaded cover letter file. Must be publicly accessible. 20MB file size limit. Either file_url or file is required."
      ),
    file: z
      .string()
      .optional()
      .describe(
        "Base64-encoded string of the file. 4MB file size limit. Either file_url or file is required."
      ),
    parse_to: z
      .enum(["markdown", "json"])
      .describe("Format to parse the cover letter to"),
  })
  .superRefine((data, ctx) => {
    if (!data.file_url && !data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either file_url or file is required",
      });
    }
    if (data.file_url && data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either file_url or file is required, not both",
      });
    }
  });

export type ParseCoverLetterRequest = z.infer<typeof schemaParseCoverLetterRequest>;

export const schemaParseCoverLetterResponseData = z
  .object({
    name: z.string().nullable().describe("Your full name"),
    address: z.string().nullable().describe("Your physical address"),
    email: z.string().nullable().describe("Your email address"),
    phone: z.string().nullable().describe("Your phone number"),
    text: z.string().nullable().describe("Main body text of the cover letter."),
    hiring_manager_company: z
      .string()
      .nullable()
      .describe("Company name. Used in the letter header and salutation"),
    hiring_manager_name: z
      .string()
      .nullable()
      .describe("The name of the hiring manager"),
    role: z
      .string()
      .nullable()
      .describe("Applicant's professional role or job title."),
  })
  .describe(
    "Cover letter content including personal details, letter body text, and recipient information"
  );

export type ParseCoverLetterResponseData = z.infer<typeof schemaParseCoverLetterResponseData>;

export const schemaParseCoverLetterResponse = z.object({
  success: z.boolean(),
  data: z.union([schemaParseCoverLetterResponseData, z.string()]),
  meta: z.object({
    run_id: z.string(),
    credits_used: z.number(),
    credits_remaining: z.number(),
  }),
});

export type ParseCoverLetterResponse = z.infer<typeof schemaParseCoverLetterResponse>;
