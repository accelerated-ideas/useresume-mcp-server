import { z } from "zod";

// Type definitions (inline from types.ts)
export type Template =
  | "default"
  | "clean"
  | "classic"
  | "executive"
  | "modern-pro"
  | "meridian"
  | "horizon"
  | "atlas"
  | "prism"
  | "nova"
  | "zenith"
  | "vantage"
  | "summit"
  | "quantum"
  | "vertex"
  | "harvard"
  | "lattice";

export type ColorVariant =
  | "blue"
  | "black"
  | "emerald"
  | "purple"
  | "rose"
  | "amber"
  | "slate"
  | "indigo"
  | "teal"
  | "burgundy"
  | "forest"
  | "navy"
  | "charcoal"
  | "plum"
  | "olive"
  | "maroon"
  | "steel"
  | "sapphire"
  | "pine"
  | "violet"
  | "mahogany"
  | "sienna"
  | "moss"
  | "midnight"
  | "copper"
  | "cobalt"
  | "crimson"
  | "sage"
  | "aqua"
  | "coral"
  | "graphite"
  | "turquoise";

export type DocumentFont =
  | "geist"
  | "inter"
  | "merryweather"
  | "roboto"
  | "playfair"
  | "lora"
  | "jost"
  | "manrope"
  | "ibm-plex-sans";

export type BackgroundColor =
  | "white"
  | "cream"
  | "pearl"
  | "mist"
  | "smoke"
  | "ash"
  | "frost"
  | "sage"
  | "mint"
  | "blush"
  | "lavender"
  | "sky"
  | "sand"
  | "stone"
  | "linen"
  | "ivory";

export type ResumeSectionId =
  | "personal_details"
  | "links"
  | "employment"
  | "skills"
  | "education"
  | "summary"
  | "certifications"
  | "languages"
  | "references"
  | "projects"
  | "activities";

export type DocumentLanguage =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "nl"
  | "pl"
  | "lt";

export type PageFormat = "a4" | "letter";

export type DateFormat =
  | "LLL yyyy"
  | "LL/yyyy"
  | "dd/LL/yyyy"
  | "LL/dd/yyyy"
  | "dd.LL.yyyy"
  | "yyyy";

export type ProfilePictureRadius =
  | "rounded-full"
  | "rounded-xl"
  | "rounded-none";

export const schemaResumeStyle = z
  .object({
    // #### Resume structure
    resume_structure: z
      .array(
        z.object({
          section_id: z
            .union([
              z.enum([
                "summary" as ResumeSectionId,
                "employment" as ResumeSectionId,
                "skills" as ResumeSectionId,
                "education" as ResumeSectionId,
                "certifications" as ResumeSectionId,
                "languages" as ResumeSectionId,
                "references" as ResumeSectionId,
                "projects" as ResumeSectionId,
                "activities" as ResumeSectionId,
              ]),
              z.string().max(250, {
                message: "Section ID cannot exceed 250 characters",
              }),
            ])
            .describe(
              "Unique identifier for the resume section. Can be one of the predefined sections or a custom section ID"
            ),
          position_index: z.coerce
            .number()
            .min(0)
            .max(25)
            .describe("The position/order index of the section in the resume"),
        })
      )
      .max(25, { message: "Cannot add more than 25 sections" })
      .optional()
      .describe(
        "Defines the order sections appear in the resume. Each section gets a position_index (0-based). Lower indices appear first. Use default section IDs (e.g., 'summary', 'employment') or custom section IDs from custom_sections array"
      ),

    // #### Styling
    template: z
      .enum(
        [
          "default" as Template,
          "clean" as Template,
          "classic" as Template,
          "executive" as Template,
          "modern-pro" as Template,
          "meridian" as Template,
          "horizon" as Template,
          "atlas" as Template,
          "prism" as Template,
          "nova" as Template,
          "zenith" as Template,
          "vantage" as Template,
          "summit" as Template,
          "quantum" as Template,
          "vertex" as Template,
          "harvard" as Template,
          "lattice" as Template,
        ],
        {
          message:
            "Please select a valid template. (e.g. 'default', 'clean', 'classic', 'executive', 'modern-pro', 'meridian', 'horizon', 'atlas', 'prism', 'nova', 'zenith', 'vantage', 'summit', 'quantum', 'vertex', 'harvard', 'lattice')",
        }
      )
      .optional()
      .describe("Resume template to use"),

    template_color: z
      .enum(
        [
          "blue" as ColorVariant,
          "black" as ColorVariant,
          "emerald" as ColorVariant,
          "purple" as ColorVariant,
          "rose" as ColorVariant,
          "amber" as ColorVariant,
          "slate" as ColorVariant,
          "indigo" as ColorVariant,
          "teal" as ColorVariant,
          "burgundy" as ColorVariant,
          "forest" as ColorVariant,
          "navy" as ColorVariant,
          "charcoal" as ColorVariant,
          "plum" as ColorVariant,
          "olive" as ColorVariant,
          "maroon" as ColorVariant,
          "steel" as ColorVariant,
          "sapphire" as ColorVariant,
          "pine" as ColorVariant,
          "violet" as ColorVariant,
          "mahogany" as ColorVariant,
          "sienna" as ColorVariant,
          "moss" as ColorVariant,
          "midnight" as ColorVariant,
          "copper" as ColorVariant,
          "cobalt" as ColorVariant,
          "crimson" as ColorVariant,
          "sage" as ColorVariant,
          "aqua" as ColorVariant,
          "coral" as ColorVariant,
          "graphite" as ColorVariant,
          "turquoise" as ColorVariant,
        ],
        {
          message:
            "Please select a valid color variant. (e.g. 'blue', 'black', 'emerald', 'purple', 'rose', 'amber', 'slate', 'indigo', 'teal', 'burgundy', 'forest', 'navy', 'charcoal', 'plum', 'olive', 'maroon', 'steel', 'sapphire', 'pine', 'violet', 'mahogany', 'sienna', 'moss', 'midnight', 'copper', 'cobalt', 'crimson', 'sage', 'aqua', 'coral', 'graphite', 'turquoise')",
        }
      )
      .optional()
      .describe(
        "Color scheme for the resume. Affects headings, section dividers, and accent elements"
      ),
    font: z
      .enum(
        [
          "geist" as DocumentFont,
          "inter" as DocumentFont,
          "merryweather" as DocumentFont,
          "roboto" as DocumentFont,
          "playfair" as DocumentFont,
          "lora" as DocumentFont,
          "jost" as DocumentFont,
          "manrope" as DocumentFont,
          "ibm-plex-sans" as DocumentFont,
        ],
        {
          message:
            "Please select a valid font. (e.g. 'geist', 'inter', 'merryweather', 'roboto', 'playfair', 'lora', 'jost', 'manrope', 'ibm-plex-sans')",
        }
      )
      .optional()
      .describe("Font family for the resume"),
    background_color: z
      .enum(
        [
          "white" as BackgroundColor,
          "cream" as BackgroundColor,
          "pearl" as BackgroundColor,
          "mist" as BackgroundColor,
          "smoke" as BackgroundColor,
          "ash" as BackgroundColor,
          "frost" as BackgroundColor,
          "sage" as BackgroundColor,
          "mint" as BackgroundColor,
          "blush" as BackgroundColor,
          "lavender" as BackgroundColor,
          "sky" as BackgroundColor,
          "sand" as BackgroundColor,
          "stone" as BackgroundColor,
          "linen" as BackgroundColor,
          "ivory" as BackgroundColor,
        ],
        {
          message:
            "Please select a valid background color. (e.g. 'white', 'cream', 'pearl', 'mist', 'smoke', 'ash', 'frost', 'sage', 'mint', 'blush', 'lavender', 'sky', 'sand', 'stone', 'linen', 'ivory')",
        }
      )
      .optional()
      .describe("Background color of the resume"),
    page_padding: z
      .number({
        message: "Page padding is required",
      })
      .min(0, "Page padding cannot be negative")
      .max(2, "Page padding cannot exceed 2")
      .optional()
      .describe(
        "Page padding multiplier. Controls margins around the page content"
      ),
    gap_multiplier: z
      .number({
        message: "Gap multiplier is required",
      })
      .min(0.5, "Gap multiplier must be at least 0.5")
      .max(1.5, "Gap multiplier cannot exceed 1.5")
      .optional()
      .describe(
        "Gap multiplier between sections. Controls spacing between resume sections"
      ),
    font_size_multiplier: z
      .number({
        message: "Font size multiplier is required",
      })
      .min(0.8, "Font size multiplier must be at least 0.8")
      .max(1.2, "Font size multiplier cannot exceed 1.2")
      .optional()
      .describe("Font size multiplier. Controls overall text size"),
    profile_picture_radius: z
      .enum(["rounded-full", "rounded-xl", "rounded-none"])
      .optional()
      .describe(
        "Profile picture border radius. 'rounded-full' for circular, 'rounded-xl' for rounded corners, 'rounded-none' for square"
      ),
    date_format: z
      .enum([
        "LLL yyyy",
        "LL/yyyy",
        "dd/LL/yyyy",
        "LL/dd/yyyy",
        "dd.LL.yyyy",
        "yyyy",
      ])
      .optional()
      .describe(
        "Date format for displaying dates. LLL=month name, LL=month number, dd=day, yyyy=year"
      ),

    // #### Document language
    document_language: z
      .enum(["en", "es", "fr", "de", "it", "pt", "nl", "pl", "lt"])
      .optional()
      .describe(
        "Document language for localization. Affects section headings and date formatting"
      ),

    // #### Page format
    page_format: z
      .enum(["a4", "letter"])
      .optional()
      .describe("Page format. 'a4' for international, 'letter' for US"),
  })
  .optional()
  .describe("Configuration options for resume formatting and styling");

export type ResumeStyle = z.infer<typeof schemaResumeStyle>;
