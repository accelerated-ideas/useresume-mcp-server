type ApiErrorDetails = {
  error?: unknown;
  message?: unknown;
  details?: unknown;
  field_errors?: unknown;
  code?: unknown;
};

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public details: unknown
  ) {
    super(formatErrorMessage(statusCode, details));
    this.name = "ApiError";
  }
}

function formatFieldErrors(fieldErrors: unknown): string | null {
  if (!Array.isArray(fieldErrors)) {
    return null;
  }

  const formatted = fieldErrors
    .map((fieldError) => {
      if (!fieldError || typeof fieldError !== "object") {
        return null;
      }

      const { path, message } = fieldError as {
        path?: unknown;
        message?: unknown;
      };

      if (typeof message !== "string") {
        return null;
      }

      const pathText = Array.isArray(path)
        ? path.map((segment) => String(segment)).join(".")
        : typeof path === "string"
          ? path
          : "";

      return pathText ? `${pathText}: ${message}` : message;
    })
    .filter((value): value is string => Boolean(value));

  return formatted.length > 0 ? formatted.join("; ") : null;
}

function extractErrorParts(details: unknown): {
  primary: string | null;
  extras: string[];
} {
  if (typeof details === "string") {
    return { primary: details, extras: [] };
  }

  if (!details || typeof details !== "object") {
    return { primary: null, extras: [] };
  }

  const errorDetails = details as ApiErrorDetails;
  const primary =
    typeof errorDetails.message === "string"
      ? errorDetails.message
      : typeof errorDetails.error === "string"
        ? errorDetails.error
        : null;

  const extras = [
    typeof errorDetails.details === "string" ? errorDetails.details : null,
    formatFieldErrors(errorDetails.field_errors),
    typeof errorDetails.code === "string" ? `code: ${errorDetails.code}` : null,
  ].filter((value): value is string => Boolean(value));

  return { primary, extras };
}

function composeMessage(prefix: string, details: unknown, fallback?: string): string {
  const { primary, extras } = extractErrorParts(details);
  const parts = [primary ?? fallback ?? null, ...extras].filter(
    (value): value is string => Boolean(value)
  );

  return parts.length > 0 ? `${prefix} ${parts.join(" - ")}` : prefix.trim();
}

function formatErrorMessage(statusCode: number, details: unknown): string {
  switch (statusCode) {
    case 401:
      return composeMessage(
        "Authentication failed.",
        details,
        "Check your API key."
      );
    case 400:
      return composeMessage(
        "Validation error:",
        details,
        "Request data did not pass validation."
      );
    case 429:
      return composeMessage(
        "Rate limit exceeded.",
        details,
        "Please wait before making more requests."
      );
    case 402:
      return composeMessage(
        "Insufficient credits.",
        details,
        "Top up your API credits to continue."
      );
    case 500:
      return composeMessage(
        "Server error.",
        details,
        "The service is temporarily unavailable."
      );
    default:
      return composeMessage(`API error (${statusCode}):`, details);
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
