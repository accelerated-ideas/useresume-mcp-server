import { ApiError, ConfigurationError } from "./errors.js";
import type { CreateResumeRequest, TailoredResumeRequest, CreateResumeResponse } from "./schemas/tailored-resume.js";
import type { ParseResumeRequest, ParseResumeResponse } from "./schemas/parse-resume.js";
import type { CreateCoverLetterRequest, TailoredCoverLetterRequest, CreateCoverLetterResponse } from "./schemas/tailored-cover-letter.js";
import type { ParseCoverLetterRequest, ParseCoverLetterResponse } from "./schemas/parse-cover-letter.js";
import type { GetRunRequest, GetRunResponse } from "./schemas/get-run.js";

const DEFAULT_BASE_URL = "https://useresume.ai/api/v3";

export class ResumeApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    const apiKey = process.env.RESUME_API_KEY;
    if (!apiKey) {
      throw new ConfigurationError(
        "RESUME_API_KEY environment variable is required. Get your API key at https://useresume.ai/account/api-platform"
      );
    }
    if (!apiKey.startsWith("ur_")) {
      throw new ConfigurationError(
        'Invalid API key format. Key must start with "ur_". Get your API key at https://useresume.ai/account/api-platform'
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = process.env.RESUME_API_BASE_URL || DEFAULT_BASE_URL;
  }

  // Resume endpoints
  async createResume(input: CreateResumeRequest): Promise<CreateResumeResponse> {
    return this.request<CreateResumeResponse>("/resume/create", input);
  }

  async parseResume(input: ParseResumeRequest): Promise<ParseResumeResponse> {
    return this.request<ParseResumeResponse>("/resume/parse", input);
  }

  async createTailoredResume(input: TailoredResumeRequest): Promise<CreateResumeResponse> {
    return this.request<CreateResumeResponse>("/resume/create-tailored", input);
  }

  // Cover letter endpoints
  async createCoverLetter(input: CreateCoverLetterRequest): Promise<CreateCoverLetterResponse> {
    return this.request<CreateCoverLetterResponse>("/cover-letter/create", input);
  }

  async parseCoverLetter(input: ParseCoverLetterRequest): Promise<ParseCoverLetterResponse> {
    return this.request<ParseCoverLetterResponse>("/cover-letter/parse", input);
  }

  async createTailoredCoverLetter(input: TailoredCoverLetterRequest): Promise<CreateCoverLetterResponse> {
    return this.request<CreateCoverLetterResponse>("/cover-letter/create-tailored", input);
  }

  // Run status endpoint
  async getRunStatus(input: GetRunRequest): Promise<GetRunResponse> {
    return this.requestGet<GetRunResponse>(`/run/get/${input.run_id}`);
  }

  private async request<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data);
    }

    return data as T;
  }

  private async requestGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data);
    }

    return data as T;
  }
}

// Singleton instance
let clientInstance: ResumeApiClient | null = null;

export function getApiClient(): ResumeApiClient {
  if (!clientInstance) {
    clientInstance = new ResumeApiClient();
  }
  return clientInstance;
}
