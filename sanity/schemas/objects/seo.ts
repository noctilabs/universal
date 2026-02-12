import { defineType } from "sanity"

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines and social media (50-60 characters)",
      validation: (Rule) => Rule.max(60).warning("Should be under 60 characters"),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines and social media (150-160 characters)",
      validation: (Rule) => Rule.max(160).warning("Should be under 160 characters"),
    },
    {
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing (1200x630px recommended)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
  ],
})
