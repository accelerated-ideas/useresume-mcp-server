import { z } from "zod";
import type {
  Template,
  ColorVariant,
  DocumentFont,
  BackgroundColor,
} from "./resume-style.js";

// Cover letter templates (subset of resume templates)
export type CoverLetterTemplate =
  | "atlas"
  | "classic"
  | "clean"
  | "default"
  | "executive"
  | "horizon"
  | "meridian"
  | "modern-pro"
  | "nova"
  | "prism"
  | "zenith";

export const schemaCoverLetterStyle = z
  .object({
    // #### Styling
    template: z
      .enum(
        [
          "atlas" as CoverLetterTemplate,
          "classic" as CoverLetterTemplate,
          "clean" as CoverLetterTemplate,
          "default" as CoverLetterTemplate,
          "executive" as CoverLetterTemplate,
          "horizon" as CoverLetterTemplate,
          "meridian" as CoverLetterTemplate,
          "modern-pro" as CoverLetterTemplate,
          "nova" as CoverLetterTemplate,
          "prism" as CoverLetterTemplate,
          "zenith" as CoverLetterTemplate,
        ],
        {
          message:
            "Please select a valid template. (e.g. 'default', 'clean', 'classic', 'executive', 'modern-pro', 'meridian', 'horizon', 'atlas', 'prism', 'nova', 'zenith')",
        }
      )
      .optional()
      .describe("Cover letter template to use"),

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
      .describe("Template color variant"),
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
      .describe("Font family for the cover letter"),
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
      .describe("Background color of the cover letter"),
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
        "Gap multiplier between sections. Controls spacing between cover letter sections"
      ),
    font_size_multiplier: z
      .number({
        message: "Font size multiplier is required",
      })
      .min(0.8, "Font size multiplier must be at least 0.8")
      .max(1.2, "Font size multiplier cannot exceed 1.2")
      .optional()
      .describe("Font size multiplier. Controls overall text size"),

    // #### Document language
    document_language: z
      .enum(["en", "es", "fr", "de", "it", "pt", "nl", "pl", "lt"])
      .optional()
      .describe(
        "Document language for localization. Affects headings and date formatting"
      ),

    // #### Page format
    page_format: z
      .enum(["a4", "letter"])
      .optional()
      .describe("Page format. 'a4' for international, 'letter' for US"),
  })
  .optional()
  .describe(
    "Visual styling options for the cover letter including template, colors, fonts, and spacing"
  );

export type CoverLetterStyle = z.infer<typeof schemaCoverLetterStyle>;
