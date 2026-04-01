import { defineField, defineType } from "sanity"

export default defineType({
  name: "archiveFrame",
  title: "Archive Frame",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phi",
      title: "Phi (vertical angle, radians)",
      type: "number",
      description: "Vertical position on the sphere (0 = top, PI = bottom). E.g. PI/2 ≈ 1.5708 for equator.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theta",
      title: "Theta (horizontal angle, radians)",
      type: "number",
      description: "Horizontal rotation on the sphere (0 to 2*PI). E.g. PI ≈ 3.1416 for back.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tiltX",
      title: "Tilt X",
      type: "number",
      description: "Rotation offset around X axis (small values like 0.05).",
      initialValue: 0,
    }),
    defineField({
      name: "tiltY",
      title: "Tilt Y",
      type: "number",
      description: "Rotation offset around Y axis.",
      initialValue: 0,
    }),
    defineField({
      name: "tiltZ",
      title: "Tilt Z",
      type: "number",
      description: "Rotation offset around Z axis.",
      initialValue: 0,
    }),
    defineField({
      name: "scale",
      title: "Scale",
      type: "number",
      description: "Size multiplier. 1.0 = default, range typically 0.9–1.3.",
      initialValue: 1.0,
      validation: (Rule) => Rule.required().min(0.1).max(3),
    }),
    defineField({
      name: "aspect",
      title: "Aspect Ratio",
      type: "number",
      description: "Width/height ratio. 0.75 = portrait 3:4, 1.333 = landscape 4:3, 1.0 = square.",
      initialValue: 0.75,
      validation: (Rule) => Rule.required().min(0.1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
})
