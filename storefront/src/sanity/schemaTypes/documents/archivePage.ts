import { defineField, defineType } from "sanity"
import { ImagesIcon } from "@sanity/icons"

export default defineType({
  name: "archivePage",
  title: "Archive Page",
  type: "document",
  icon: ImagesIcon,
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "frames",
      title: "Archive Frames",
      type: "array",
      of: [{ type: "archiveFrame" }],
      description:
        "Images displayed in the 3D globe. Each frame has a title, image, and spherical position (phi/theta angles in radians) plus optional tilt offsets.",
    }),
  ],
  preview: {
    select: { frames: "frames" },
    prepare({ frames }) {
      return {
        title: "Archive Page",
        subtitle: `${(frames ?? []).length} frame(s)`,
      }
    },
  },
})
