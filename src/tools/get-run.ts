import { zodToJsonSchema } from "zod-to-json-schema";
import { getApiClient } from "../api-client.js";
import { formatToolError } from "../errors.js";
import { schemaGetRunRequest, type GetRunRequest } from "../schemas/get-run.js";

export const getRunTool = {
  name: "get_run_status",
  description: `Check the status of an asynchronous operation by its run ID.

COST: 0 credits (status checks are free)

Use this tool to:
- Poll for completion of long-running operations
- Check if a previous request succeeded or failed
- Get the file URL once processing is complete

RETURNS:
- status: 'success' | 'error' | 'in_progress'
- file_url: Download URL (only present when status is 'success')
- credits_used: Credits consumed by the original operation`,

  inputSchema: zodToJsonSchema(schemaGetRunRequest, {
    $refStrategy: "none",
    target: "jsonSchema7",
  }),

  async handler(args: unknown) {
    try {
      const parsed = schemaGetRunRequest.parse(args);
      const client = getApiClient();
      const result = await client.getRunStatus(parsed as GetRunRequest);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                run_id: result.data.id,
                status: result.data.status,
                endpoint: result.data.endpoint,
                credits_used: result.data.credits_used,
                file_url: result.data.file_url || null,
                file_url_expires_at: result.data.file_url_expires_at
                  ? new Date(result.data.file_url_expires_at).toISOString()
                  : null,
                file_expires_at: new Date(result.data.file_expires_at).toISOString(),
                file_size_bytes: result.data.file_size_bytes,
                created_at: new Date(result.data.created_at).toISOString(),
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
