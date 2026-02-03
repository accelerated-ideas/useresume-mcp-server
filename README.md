# @useresume/mcp-server

MCP (Model Context Protocol) server for AI-powered resume and cover letter generation via the [UseResume API](https://useresume.ai/resume-generation-api).

This package allows AI agents like Claude to generate professional PDF resumes and cover letters through natural conversation.

## Features

- **7 Tools** for complete document generation workflow
- **Resume Generation** - Create PDFs from structured data or tailored to job postings
- **Cover Letter Generation** - Create PDFs with AI-powered content tailoring
- **Document Parsing** - Parse existing PDFs/DOCX into structured data
- **17 Resume Templates** - Professional designs for any industry
- **32 Color Variants** - Customizable accent colors
- **Full Styling Control** - Fonts, backgrounds, spacing, and more

## Installation

### Using npx (Recommended)

No installation required. Configure Claude Desktop or Claude Code to use npx:

```json
{
  "mcpServers": {
    "useresume": {
      "command": "npx",
      "args": ["-y", "@useresume/mcp-server"],
      "env": {
        "USERESUME_API_KEY": "ur_xxxxx"
      }
    }
  }
}
```

### Global Installation

```bash
npm install -g @useresume/mcp-server
```

Then configure:

```json
{
  "mcpServers": {
    "useresume": {
      "command": "useresume-mcp",
      "env": {
        "USERESUME_API_KEY": "ur_xxxxx"
      }
    }
  }
}
```

## Getting an API Key

1. Go to [useresume.ai/account/api-platform](https://useresume.ai/account/api-platform)
2. Create an account or sign in
3. Generate an API key (starts with `ur_`)
4. Add credits to your account

## Available Tools

### Resume Tools

| Tool                     | Credits | Description                                                                    |
| ------------------------ | ------- | ------------------------------------------------------------------------------ |
| `create_resume`          | 1       | Generate PDF resume from structured content                                    |
| `parse_resume`           | 4       | Parse existing resume (PDF / DOCX / PNG / JPG / JPEG /WEBP) into JSON/markdown |
| `create_tailored_resume` | 5       | Generate resume optimized for a specific job posting                           |

### Cover Letter Tools

| Tool                           | Credits | Description                                                                          |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| `create_cover_letter`          | 1       | Generate PDF cover letter from structured content                                    |
| `parse_cover_letter`           | 4       | Parse existing cover letter (PDF / DOCX / PNG / JPG / JPEG /WEBP) into JSON/markdown |
| `create_tailored_cover_letter` | 5       | Generate cover letter optimized for a specific job posting                           |

### Utility Tools

| Tool             | Credits | Description                                      |
| ---------------- | ------- | ------------------------------------------------ |
| `get_run_status` | 0       | Check the status of an async operation by run ID |

## Example Usage

Once configured, you can ask Claude to:

- "Create a resume for a software engineer with 5 years of experience"
- "Parse my resume from this URL: https://example.com/resume.pdf"
- "Create a tailored resume for this job posting: [paste job description]"
- "Generate a cover letter for a marketing manager position at Google"
- "Create a tailored cover letter for this job: [paste job description]"

## Styling Options

### Resume Templates (17)

`default`, `clean`, `classic`, `executive`, `modern-pro`, `meridian`, `horizon`, `atlas`, `prism`, `nova`, `zenith`, `vantage`, `summit`, `quantum`, `vertex`, `harvard`, `lattice`

### Cover Letter Templates (11)

`atlas`, `classic`, `clean`, `default`, `executive`, `horizon`, `meridian`, `modern-pro`, `nova`, `prism`, `zenith`

### Colors (32)

`blue`, `black`, `emerald`, `purple`, `rose`, `amber`, `slate`, `indigo`, `teal`, `burgundy`, `forest`, `navy`, `charcoal`, `plum`, `olive`, `maroon`, `steel`, `sapphire`, `pine`, `violet`, `mahogany`, `sienna`, `moss`, `midnight`, `copper`, `cobalt`, `crimson`, `sage`, `aqua`, `coral`, `graphite`, `turquoise`

### Fonts (9)

`geist`, `inter`, `merryweather`, `roboto`, `playfair`, `lora`, `jost`, `manrope`, `ibm-plex-sans`

### Background Colors (16)

`white`, `cream`, `pearl`, `mist`, `smoke`, `ash`, `frost`, `sage`, `mint`, `blush`, `lavender`, `sky`, `sand`, `stone`, `linen`, `ivory`

## Environment Variables

| Variable                 | Required | Description                                                  |
| ------------------------ | -------- | ------------------------------------------------------------ |
| `USERESUME_API_KEY`      | Yes      | Your UseResume API key (starts with `ur_`)                   |
| `USERESUME_API_BASE_URL` | No       | Custom API base URL (default: `https://useresume.ai/api/v3`) |

## Configuration Locations

### Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Claude Code

`~/.config/claude-code/settings.json`

## Response Format

All tools return JSON with the following structure:

### Success (create/create-tailored)

```json
{
  "success": true,
  "file_url": "https://...",
  "file_expires_at": "2024-02-15T12:00:00.000Z",
  "file_url_expires_at": "2024-01-17T12:00:00.000Z",
  "file_size_bytes": 245000,
  "credits_used": 1,
  "credits_remaining": 99
}
```

### Success (parse)

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "employment": [...],
    "education": [...],
    ...
  },
  "credits_used": 4,
  "credits_remaining": 95
}
```

### Error

```json
{
  "success": false,
  "error": "Error message",
  "status_code": 400,
  "details": {...}
}
```

## Development

```bash
# Clone and install
git clone https://github.com/accelerated-ideas/useresume-mcp-server
cd mcp-server
npm install

# Build
npm run build

# Test locally
USERESUME_API_KEY=ur_test node dist/index.js
```

## License

MIT

## Links

- [Resume Generation API](https://useresume.ai/resume-generation-api)
- [API Dashboard](https://useresume.ai/account/api-platform)
- [GitHub Issues](https://github.com/accelerated-ideas/useresume-mcp-server/issues)
