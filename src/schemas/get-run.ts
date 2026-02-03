import { z } from "zod";

export const schemaRunStatus = z.enum(["success", "error", "in_progress"]);

export type RunStatus = z.infer<typeof schemaRunStatus>;

export const schemaGetRunRequest = z.object({
  run_id: z
    .string()
    .max(99, { message: "Run ID must be less than 99 characters" })
    .describe("The ID of the run to check status for"),
});

export type GetRunRequest = z.infer<typeof schemaGetRunRequest>;

export const schemaGetRunResponse = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string().describe("The run ID"),
    created_at: z.number().describe("Timestamp when the run was created (milliseconds)"),
    endpoint: z.string().describe("The API endpoint that was called"),
    api_platform_user_id: z.string().describe("The user ID who initiated the run"),
    credits_used: z.number().describe("Number of credits used for this run"),
    status: schemaRunStatus.describe("Current status of the run: 'success', 'error', or 'in_progress'"),
    file_url: z.string().nullable().optional().describe("URL to download the generated file (only present when status is 'success')"),
    file_url_expires_at: z.number().nullable().optional().describe("Timestamp when the file URL expires (milliseconds)"),
    file_expires_at: z.number().describe("Timestamp when the file itself expires (milliseconds)"),
    file_size_bytes: z.number().describe("Size of the generated file in bytes"),
  }),
});

export type GetRunResponse = z.infer<typeof schemaGetRunResponse>;
