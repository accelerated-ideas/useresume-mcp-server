import { z } from "zod";

export const schemaCoverLetterContent = z
  .object({
    name: z
      .string()
      .max(1000, {
        message: "Name must be less than 1000 characters",
      })
      .optional()
      .describe("Your full name"),
    address: z
      .string()
      .max(1000, {
        message: "Address must be less than 1000 characters",
      })
      .optional()
      .describe("Your physical address"),
    email: z
      .string()
      .max(250, {
        message: "Email must be less than 250 characters",
      })
      .optional()
      .describe("Your email address"),
    phone: z
      .string()
      .max(250, {
        message: "Phone number must be less than 250 characters",
      })
      .optional()
      .describe("Your phone number"),
    text: z
      .string()
      .max(15000, {
        message: "Cover letter text must be less than 15000 characters",
      })
      .optional()
      .describe(
        "Main body text of the cover letter. Should include introduction, relevant experience/skills, why you're interested in the role, and closing. Typically 3-4 paragraphs"
      ),
    hiring_manager_company: z
      .string()
      .max(250, {
        message: "Company name must be less than 250 characters",
      })
      .optional()
      .describe(
        "Company name you're applying to. Used in the letter header and salutation"
      ),
    hiring_manager_name: z
      .string()
      .max(250, {
        message: "Hiring manager name must be less than 250 characters",
      })
      .optional()
      .describe("The name of the hiring manager"),
    role: z
      .string()
      .max(1000, {
        message: "Role must be less than 1000 characters",
      })
      .optional()
      .describe("Your professional role or job title."),
  })
  .describe(
    "Cover letter content including personal details, letter body text, and recipient information"
  );

export type CoverLetterContent = z.infer<typeof schemaCoverLetterContent>;
