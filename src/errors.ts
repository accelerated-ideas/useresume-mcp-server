export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public details: unknown
  ) {
    super(formatErrorMessage(statusCode, details));
    this.name = "ApiError";
  }
}

function formatErrorMessage(statusCode: number, details: unknown): string {
  const detailsStr =
    typeof details === "string"
      ? details
      : details && typeof details === "object" && "error" in details
        ? (details as { error: string }).error
        : JSON.stringify(details);

  switch (statusCode) {
    case 401:
      return `Authentication failed. Check your API key. ${detailsStr}`;
    case 400:
      return `Validation error: ${detailsStr}`;
    case 429:
      return "Rate limit exceeded. Please wait before making more requests.";
    case 402:
      return `Insufficient credits. ${detailsStr}`;
    case 500:
      return "Server error. The service is temporarily unavailable.";
    default:
      return `API error (${statusCode}): ${detailsStr}`;
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export function formatToolError(error: unknown): string {
  if (error instanceof ApiError) {
    return JSON.stringify(
      {
        success: false,
        error: error.message,
        status_code: error.statusCode,
        details: error.details,
      },
      null,
      2
    );
  }

  if (error instanceof ConfigurationError) {
    return JSON.stringify(
      {
        success: false,
        error: error.message,
        type: "configuration_error",
      },
      null,
      2
    );
  }

  if (error instanceof Error) {
    return JSON.stringify(
      {
        success: false,
        error: error.message,
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      success: false,
      error: "Unknown error occurred",
    },
    null,
    2
  );
}
