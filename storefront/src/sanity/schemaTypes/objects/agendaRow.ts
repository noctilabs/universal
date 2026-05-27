import { defineField, defineType } from "sanity"

export default defineType({
  name: "agendaRow",
  title: "Agenda Row",
  type: "object",
  fields: [
    defineField({
      name: "rowId",
      title: "Row ID",
      type: "string",
      description: "Unique identifier for this row (e.g. e1, e2).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "The event this row links to. Clicking the row goes to that event's ticket checkout.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hoverImage",
      title: "Hover Image",
      type: "image",
      options: { hotspot: true },
      description: "Image shown when hovering anywhere on this row.",
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
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "agendaRowItem" }],
      description: "2–4 positioned items in this row.",
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: {
      rowId: "rowId",
      eventTitle: "event.title",
      items: "items",
    },
    prepare({ rowId, eventTitle, items }) {
      const titles = (items ?? [])
        .filter((i: { size?: string }) => i.size === "large")
        .map((i: { text?: string }) => i.text?.split("\n")[0])
        .join(" / ")
      return {
        title: eventTitle ? `Row ${rowId} → ${eventTitle}` : `Row ${rowId}`,
        subtitle: titles || "(no items)",
      }
    },
  },
})
