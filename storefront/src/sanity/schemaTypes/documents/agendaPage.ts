import { defineField, defineType } from "sanity"
import { CalendarIcon } from "@sanity/icons"

export default defineType({
  name: "agendaPage",
  title: "Agenda Page",
  type: "document",
  icon: CalendarIcon,
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "rows",
      title: "Event Rows",
      type: "array",
      of: [{ type: "agendaRow" }],
      description:
        "Each row is one event entry in the agenda layout. Items are positioned absolutely using pixel values measured at 1440px canvas width (from Figma).",
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }) {
      return {
        title: "Agenda Page",
        subtitle: `${(rows ?? []).length} row(s)`,
      }
    },
  },
})
