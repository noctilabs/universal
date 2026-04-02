import { defineField, defineType } from "sanity"
import { InfoOutlineIcon } from "@sanity/icons"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── Featured image (hero + about section) ───────────────
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      description: "Main hero image shown on the About page and landing page.",
      options: { hotspot: true },
    }),

    // ── Hover images ─────────────────────────────────────────
    defineField({
      name: "hoverLogoImage",
      title: "Hover Logo Image (shown when hovering 'Universal' in paragraph 1)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "hoverGlobeImage",
      title: "Hover Globe Image (shown when hovering 'Universal' in paragraph 2)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "hoverHotelImage",
      title: "Hover Hotel Image (shown when hovering 'Hotel')",
      type: "image",
      options: { hotspot: false },
    }),

    // ── Copy ─────────────────────────────────────────────────
    defineField({
      name: "paragraph1_en",
      title: "Paragraph 1 (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "paragraph1_es",
      title: "Paragraph 1 (Spanish)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "paragraph2_en",
      title: "Paragraph 2 (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "paragraph2_es",
      title: "Paragraph 2 (Spanish)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "descriptionText_en",
      title: "Description Text (English)",
      type: "text",
      rows: 6,
      description: "Longer description shown below the main image.",
    }),
    defineField({
      name: "descriptionText_es",
      title: "Description Text (Spanish)",
      type: "text",
      rows: 6,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" }
    },
  },
})
