import { defineField, defineType } from "sanity"

export default defineType({
  name: "agendaRowItem",
  title: "Agenda Row Item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
      description: "Use a new line for a line break within the item.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leftPx",
      title: "Left Position (px at 1440px canvas)",
      type: "number",
      description: "Horizontal position in pixels, as measured in Figma at 1440px canvas width.",
      validation: (Rule) => Rule.required().min(0).max(1440),
    }),
    defineField({
      name: "topPx",
      title: "Top Position (px at 1440px canvas)",
      type: "number",
      description: "Vertical position in pixels, as measured in Figma at 1440px canvas width.",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "hoverImage",
      title: "Hover Image",
      type: "image",
      options: { hotspot: true },
      description: "Image that appears when hovering over this item.",
    }),
    defineField({
      name: "hoverImagePosition",
      title: "Hover Image Position",
      type: "string",
      options: {
        list: [
          { title: "Above", value: "above" },
          { title: "Right", value: "right" },
          { title: "Below", value: "below" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "above",
      description: "Where to show the image relative to the cursor.",
      hidden: ({ parent }) => !parent?.hoverImage,
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Large (event title, 64px)", value: "large" },
          { title: "Small (date/info, 28px)", value: "small" },
        ],
        layout: "radio",
      },
      initialValue: "large",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: "text",
      size: "size",
    },
    prepare({ text, size }) {
      return {
        title: text?.split("\n")[0] ?? "(no text)",
        subtitle: size,
      }
    },
  },
})
