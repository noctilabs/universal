import { defineField, defineType } from "sanity"
import { CogIcon } from "@sanity/icons"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  // Singleton: only one document of this type should exist
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── Footer ──────────────────────────────────────────────
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "contactText_en",
          title: "Contact Text (English)",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "contactText_es",
          title: "Contact Text (Spanish)",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "email",
          title: "Contact Email",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "instagramUrl",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "instagramLabel",
          title: "Instagram Link Label",
          type: "string",
          initialValue: "Instagram",
        }),
        defineField({
          name: "copyright_en",
          title: "Copyright Text (English)",
          type: "string",
        }),
        defineField({
          name: "copyright_es",
          title: "Copyright Text (Spanish)",
          type: "string",
        }),
      ],
    }),

    // ── Landing ──────────────────────────────────────────────
    defineField({
      name: "landingImage",
      title: "Landing Page Background Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Navigation ───────────────────────────────────────────
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({ name: "aboutLabel_en", title: "About Label (English)", type: "string", initialValue: "About" }),
        defineField({ name: "aboutLabel_es", title: "About Label (Spanish)", type: "string", initialValue: "Sobre" }),
        defineField({ name: "archiveLabel_en", title: "Archive Label (English)", type: "string", initialValue: "Archive" }),
        defineField({ name: "archiveLabel_es", title: "Archive Label (Spanish)", type: "string", initialValue: "Archivo" }),
        defineField({ name: "agendaLabel_en", title: "Agenda Label (English)", type: "string", initialValue: "Agenda" }),
        defineField({ name: "agendaLabel_es", title: "Agenda Label (Spanish)", type: "string", initialValue: "Agenda" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" }
    },
  },
})
