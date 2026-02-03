import { z } from "zod";
import { nanoid } from "nanoid";

const apiSchemaCustomSectionsArray = z
  .array(
    z.object({
      section_id: z
        .string()
        .max(50, { message: "Section ID cannot exceed 50 characters" })
        .default(nanoid())
        .describe(
          "Unique identifier for the custom section (auto-generated if not provided). Used to reference this section in resume_structure for positioning"
        ),
      section_name: z
        .string()
        .max(250, { message: "Section name cannot exceed 250 characters" })
        .describe("Display name for the custom section"),
      section: z
        .array(
          z
            .object({
              start_date: z
                .string()
                .max(10, {
                  message: "Start date cannot exceed 10 characters",
                })
                .optional()
                .describe("Start date YYYY-MM-DD"),
              end_date: z
                .string()
                .max(10, { message: "End date cannot exceed 10 characters" })
                .optional()
                .describe("End date YYYY-MM-DD"),
              present: z
                .boolean()
                .optional()
                .describe("Whether item is current/ongoing"),
              name: z
                .string()
                .max(250, { message: "Name cannot exceed 250 characters" })
                .optional()
                .describe("Item name"),
              location: z
                .string()
                .max(250, { message: "Location cannot exceed 250 characters" })
                .optional()
                .describe("Set the location"),
              short_description: z
                .string()
                .max(2000, {
                  message: "Description cannot exceed 2000 characters",
                })
                .optional()
                .describe("Item description"),
              bullet_points: z
                .array(
                  z.object({
                    text: z
                      .string()
                      .max(1000, {
                        message: "Bullet point cannot exceed 1000 characters",
                      })
                      .optional()
                      .describe("Bullet point text"),
                  })
                )
                .optional()
                .describe("Array of bullet points for the item"),
            })
            .optional()
        )
        .max(25, { message: "Cannot add more than 25 items" })
        .optional()
        .describe("Array of items within the custom section"),
    })
  )
  .max(10, { message: "Cannot add more than 10 custom sections" })
  .optional()
  .describe(
    "Besides the default sections like Education, Skills, etc., you can add custom sections to the resume"
  );

export const schemaResumeContent = z
  .object({
    photo_url: z
      .string()
      .max(2000, { message: "Photo URL cannot exceed 2000 characters" })
      .url({ message: "Please enter a valid URL for the photo" })
      .optional()
      .describe(
        "URL to your photo. Must be publicly accessible. Recommended: square image, at least 400x400px, JPG or PNG format"
      ),
    links: z
      .array(
        z.object({
          url: z
            .string()
            .max(2000, { message: "Link URL cannot exceed 2000 characters" })
            .optional()
            .describe("Link URL"),
          name: z
            .string()
            .max(250, { message: "Link name cannot exceed 250 characters" })
            .optional()
            .describe("Link display name"),
        })
      )
      .max(25, { message: "Cannot add more than 25 links" })
      .optional()
      .describe(
        "Array of personal/professional links (e.g., LinkedIn, portfolio, GitHub, personal website)"
      ),
    name: z
      .string()
      .max(1000, { message: "Name cannot exceed 1000 characters" })
      .optional()
      .describe("Your full name"),
    role: z
      .string()
      .max(1000, { message: "Role cannot exceed 1000 characters" })
      .optional()
      .describe("Your professional role or job title"),
    email: z
      .string()
      .max(250, { message: "Email cannot exceed 250 characters" })
      .optional()
      .describe("Your email address"),
    phone: z
      .string()
      .max(250, { message: "Phone number cannot exceed 250 characters" })
      .optional()
      .describe("Your phone number"),
    address: z
      .string()
      .max(1000, { message: "Address cannot exceed 1000 characters" })
      .optional()
      .describe("Your physical address"),
    summary: z
      .string()
      .max(5000, { message: "Summary cannot exceed 5000 characters" })
      .optional()
      .describe(
        "Professional summary or career objective. Typically 2-4 sentences highlighting key skills and career goals"
      ),
    employment: z
      .array(
        z.object({
          start_date: z
            .string()
            .max(10, { message: "Start date cannot exceed 10 characters" })
            .optional()
            .describe("Start date YYYY-MM-DD"),
          end_date: z
            .string()
            .max(10, { message: "End date cannot exceed 10 characters" })
            .optional()
            .describe("End date YYYY-MM-DD"),
          present: z
            .boolean()
            .optional()
            .describe("Whether this is the current job"),
          title: z
            .string()
            .max(250, { message: "Title cannot exceed 250 characters" })
            .optional()
            .describe("Job title"),
          company: z
            .string()
            .max(250, { message: "Company name cannot exceed 250 characters" })
            .optional()
            .describe("Company name"),
          location: z
            .string()
            .max(250, { message: "Location cannot exceed 250 characters" })
            .optional()
            .describe("Job location"),
          short_description: z
            .string()
            .max(5000, { message: "Description cannot exceed 5000 characters" })
            .optional()
            .describe(
              "Brief overview of the role and responsibilities (2-3 sentences)"
            ),
          responsibilities: z
            .array(
              z.object({
                text: z
                  .string()
                  .max(1000, {
                    message: "Bullet point cannot exceed 1000 characters",
                  })
                  .optional()
                  .describe(
                    "Specific responsibility or achievement in this role"
                  ),
              })
            )
            .max(50, { message: "Cannot add more than 50 responsibilities" })
            .optional()
            .describe("Array of responsibility bullet points"),
        })
      )
      .max(25, { message: "Cannot add more than 25 employment items" })
      .optional()
      .describe("Array of employment history objects"),
    skills: z
      .array(
        z.object({
          name: z
            .string()
            .max(1000, { message: "Skill name cannot exceed 1000 characters" })
            .optional()
            .describe("Skill name"),
          display_proficiency: z
            .boolean()
            .optional()
            .describe("Whether to display proficiency level"),
          proficiency: z
            .enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
              errorMap: () => ({ message: "Proficiency is required" }),
            })
            .optional()
            .describe("Skill proficiency level"),
        })
      )
      .max(25, { message: "Cannot add more than 25 skills" })
      .optional()
      .describe("Array of skill objects"),
    education: z
      .array(
        z.object({
          start_date: z
            .string()
            .max(10, { message: "Start date cannot exceed 10 characters" })
            .optional()
            .describe("Start date YYYY-MM-DD"),
          end_date: z
            .string()
            .max(10, { message: "End date cannot exceed 10 characters" })
            .optional()
            .describe("End date YYYY-MM-DD"),
          present: z
            .boolean()
            .optional()
            .describe("Whether currently studying"),
          degree: z
            .string()
            .max(250, { message: "Degree cannot exceed 250 characters" })
            .optional()
            .describe("Degree name"),
          institution: z
            .string()
            .max(250, {
              message: "Institution name cannot exceed 250 characters",
            })
            .optional()
            .describe("Institution name"),
          location: z
            .string()
            .max(250, { message: "Location cannot exceed 250 characters" })
            .optional()
            .describe("Institution location"),
          short_description: z
            .string()
            .max(5000, { message: "Description cannot exceed 5000 characters" })
            .optional()
            .describe("Education description"),
          achievements: z
            .array(
              z.object({
                text: z
                  .string()
                  .max(1000, {
                    message: "Bullet point cannot exceed 1000 characters",
                  })
                  .optional()
                  .describe(
                    "Academic achievement / grade, courses taken, award, or notable accomplishment during education"
                  ),
              })
            )
            .max(50, { message: "Cannot add more than 50 achievements" })
            .optional()
            .describe("Array of achievement bullet points"),
        })
      )
      .max(25, { message: "Cannot add more than 25 education items" })
      .optional()
      .describe(
        "Array of education objects with degree, institution, dates, location, description, and achievements (max 50 items)"
      ),
    certifications: z
      .array(
        z.object({
          start_date: z
            .string()
            .max(10, { message: "Start date cannot exceed 10 characters" })
            .optional()
            .describe("Issue date YYYY-MM-DD"),
          end_date: z
            .string()
            .max(10, { message: "End date cannot exceed 10 characters" })
            .optional()
            .describe("Expiration date YYYY-MM-DD"),
          present: z
            .boolean()
            .optional()
            .describe("Whether certification does not expire"),
          name: z
            .string()
            .max(250, {
              message: "Certification name cannot exceed 250 characters",
            })
            .optional()
            .describe("Certification name"),
          institution: z
            .string()
            .max(250, {
              message: "Institution name cannot exceed 250 characters",
            })
            .optional()
            .describe("Issuing institution"),
        })
      )
      .max(25, { message: "Cannot add more than 25 certifications" })
      .optional()
      .describe(
        "Array of certification objects with name, institution, and dates"
      ),
    languages: z
      .array(
        z.object({
          language: z
            .string()
            .max(250, { message: "Language name cannot exceed 250 characters" })
            .optional()
            .describe("Language name"),
          display_proficiency: z
            .boolean()
            .optional()
            .describe("Whether to display proficiency level"),
          proficiency: z
            .enum(["Beginner", "Intermediate", "Advanced", "Fluent"], {
              errorMap: () => ({ message: "Proficiency is required" }),
            })
            .optional()
            .describe("Language proficiency level"),
        })
      )
      .max(25, { message: "Cannot add more than 25 languages" })
      .optional()
      .describe(
        "Array of language objects with language name and proficiency level"
      ),
    references: z
      .array(
        z.object({
          name: z
            .string()
            .max(250, { message: "Name cannot exceed 250 characters" })
            .optional()
            .describe("Reference name"),
          title: z
            .string()
            .max(250, { message: "Title cannot exceed 250 characters" })
            .optional()
            .describe("Reference job title"),
          company: z
            .string()
            .max(250, { message: "Company name cannot exceed 250 characters" })
            .optional()
            .describe("Reference company"),
          email: z
            .string()
            .max(250, { message: "Email cannot exceed 250 characters" })
            .optional()
            .describe("Reference email"),
          phone: z
            .string()
            .max(250, { message: "Phone number cannot exceed 250 characters" })
            .optional()
            .describe("Reference phone number"),
        })
      )
      .max(25, { message: "Cannot add more than 25 references" })
      .optional()
      .describe(
        "Array of reference objects with name, title, company, email, and phone"
      ),
    projects: z
      .array(
        z.object({
          name: z
            .string()
            .max(250, { message: "Name cannot exceed 250 characters" })
            .optional()
            .describe("Project name"),
          short_description: z
            .string()
            .max(5000, { message: "Description cannot exceed 5000 characters" })
            .optional()
            .describe(
              "Summary of the project, technologies used, and outcomes achieved"
            ),
          present: z
            .boolean()
            .optional()
            .describe("Whether project is ongoing"),
          start_date: z
            .string()
            .max(10, { message: "Start date cannot exceed 10 characters" })
            .optional()
            .describe("Project start date YYYY-MM-DD"),
          end_date: z
            .string()
            .max(10, { message: "End date cannot exceed 10 characters" })
            .optional()
            .describe("Project end date YYYY-MM-DD"),
        })
      )
      .max(25, { message: "Cannot add more than 25 projects" })
      .optional()
      .describe("Array of project objects with name, description, and dates"),
    activities: z
      .array(
        z.object({
          name: z
            .string()
            .max(250, { message: "Name cannot exceed 250 characters" })
            .optional()
            .describe("Activity name"),
          short_description: z
            .string()
            .max(5000, { message: "Description cannot exceed 5000 characters" })
            .optional()
            .describe("Activity description"),
        })
      )
      .max(25, { message: "Cannot add more than 25 activities" })
      .optional()
      .describe(
        "Extracurricular activities, volunteer work, hobbies, or community involvement"
      ),
    // #### Section names
    summary_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the summary section"),
    employment_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the employment section"),
    skills_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the skills section"),
    education_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the education section"),
    certifications_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the certifications section"),
    languages_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the languages section"),
    projects_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the projects section"),
    activities_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the activities section"),
    references_section_name: z
      .string()
      .max(250, {
        message: "Section name cannot exceed 250 characters",
      })
      .optional()
      .describe("Custom name for the references section"),
    custom_sections: apiSchemaCustomSectionsArray,

    // #### Extra fields
    date_of_birth: z
      .string()
      .max(250, {
        message: "Date of birth cannot exceed 250 characters",
      })
      .optional()
      .describe("Date of birth"),
    marital_status: z
      .string()
      .max(250, {
        message: "Marital status cannot exceed 250 characters",
      })
      .optional()
      .describe("Marital status"),
    passport_or_id: z
      .string()
      .max(250, {
        message: "Passport or ID cannot exceed 250 characters",
      })
      .optional()
      .describe("Passport or ID number"),
    nationality: z
      .string()
      .max(250, {
        message: "Nationality cannot exceed 250 characters",
      })
      .optional()
      .describe("Nationality"),
    visa_status: z
      .string()
      .max(250, {
        message: "Visa status cannot exceed 250 characters",
      })
      .optional()
      .describe("Visa status"),
    pronouns: z
      .string()
      .max(250, {
        message: "Pronouns cannot exceed 250 characters",
      })
      .optional()
      .describe("Personal pronouns"),
  })
  .describe("The resume data object containing all resume content");

export type ResumeContent = z.infer<typeof schemaResumeContent>;
