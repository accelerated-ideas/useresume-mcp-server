/**
 * This script is used to check if the types in the MCP server are the same as the types in the original API.
 *
 * If any types drift, the TypeScript compiler will fail during the `npm run test:drift` step,
 * preventing the build from completing.
 */

// 1. Import the original types using the relative path to the neighbor folder
// Note: We use "import type" to ensure we don't execute runtime code

// Resume
import type { ApiCreateResume as OriginalApiCreateResume } from "../../../../cv-personal/src/app/api/v3/resume/create/schema-api-create-resume";
import type { SchemaApiCreateTailoredResume as OriginalSchemaApiCreateTailoredResume } from "../../../../cv-personal/src/app/api/v3/resume/create-tailored/schema-api-create-tailored-resume";
import type { SchemaApiParseResume as OriginalSchemaApiParseResume } from "../../../../cv-personal/src/app/api/v3/resume/parse/schema-parse-resume";

// Cover Letter
import type { ApiCreateCoverLetter as OriginalApiCreateCoverLetter } from "../../../../cv-personal/src/app/api/v3/cover-letter/create/schema-api-cover-letter";
import type { SchemaApiCreateTailoredCoverLetter as OriginalSchemaApiCreateTailoredCoverLetter } from "../../../../cv-personal/src/app/api/v3/cover-letter/create-tailored/schema-api-create-tailored-cover-letter";
import type { SchemaApiParseCoverLetter as OriginalSchemaApiParseCoverLetter } from "../../../../cv-personal/src/app/api/v3/cover-letter/parse/schema-parse-cover-letter";

// Run status
import type { SchemaApiRunStatus as OriginalSchemaApiRunStatus } from "../../../../cv-personal/src/app/api/v3/run/get/[runId]/schema-api-run-status";

// 2. Import the MCP server types
// Resume
import type { CreateResumeRequest as McpCreateResumeRequest } from "../schemas/tailored-resume";
import type { TailoredResumeRequest as McpTailoredResumeRequest } from "../schemas/tailored-resume";
import type { ParseResumeRequest as McpParseResumeRequest } from "../schemas/parse-resume";

// Cover Letter
import type { CreateCoverLetterRequest as McpCreateCoverLetterRequest } from "../schemas/tailored-cover-letter";
import type { TailoredCoverLetterRequest as McpTailoredCoverLetterRequest } from "../schemas/tailored-cover-letter";
import type { ParseCoverLetterRequest as McpParseCoverLetterRequest } from "../schemas/parse-cover-letter";

// Run status
import type { GetRunRequest as McpGetRunRequest } from "../schemas/get-run";

// --- THE UTILITY ---
// Returns 'true' ONLY if types are exactly identical
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

// --- THE TESTS ---
// If the types drift, the Result type will become 'false' and trigger a compile error below

// Resume comparisons
type ResultCreateResume = Equals<OriginalApiCreateResume, McpCreateResumeRequest>;
type ResultTailoredResume = Equals<OriginalSchemaApiCreateTailoredResume, McpTailoredResumeRequest>;
type ResultParseResume = Equals<OriginalSchemaApiParseResume, McpParseResumeRequest>;

// Cover Letter comparisons
type ResultCreateCoverLetter = Equals<OriginalApiCreateCoverLetter, McpCreateCoverLetterRequest>;
type ResultTailoredCoverLetter = Equals<OriginalSchemaApiCreateTailoredCoverLetter, McpTailoredCoverLetterRequest>;
type ResultParseCoverLetter = Equals<OriginalSchemaApiParseCoverLetter, McpParseCoverLetterRequest>;

// Run status comparison
type ResultGetRunStatus = Equals<OriginalSchemaApiRunStatus, McpGetRunRequest>;

// --- ASSERTIONS ---
// These lines will turn RED in your editor if the types don't match
// The assignment will fail if the Result type resolved to 'false'

// Resume assertions
const assertMatchCreateResume: ResultCreateResume = true;
const assertMatchTailoredResume: ResultTailoredResume = true;
const assertMatchParseResume: ResultParseResume = true;

// Cover Letter assertions
const assertMatchCreateCoverLetter: ResultCreateCoverLetter = true;
const assertMatchTailoredCoverLetter: ResultTailoredCoverLetter = true;
const assertMatchParseCoverLetter: ResultParseCoverLetter = true;

// Run status assertion
const assertMatchGetRunStatus: ResultGetRunStatus = true;
