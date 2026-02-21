import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"
import { MediaCategory } from "@universal/types"

export default defineType({
  name: "media",
  title: "Media",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: (
          Object.entries(MediaCategory) as [keyof typeof MediaCategory, string][]
        )
          .filter(([key]) => key === key.toUpperCase())
          .map(([key, value]) => ({
            title: key.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
            value,
          })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief description for media cards and previews",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Full media description with rich text",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      description: "Upload PDF, document, or other file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      },
    }),
    defineField({
      name: "fileUrl",
      title: "File URL",
      type: "url",
      description: "Or provide an external file URL",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or other video URL",
      hidden: ({ document }) => document?.category !== "video",
    }),
    defineField({
      name: "videoDuration",
      title: "Video Duration (seconds)",
      type: "number",
      description: "Duration in seconds",
      hidden: ({ document }) => document?.category !== "video",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      description: "Number of times this media has been downloaded",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "fileSize",
      title: "File Size (bytes)",
      type: "number",
      description: "File size in bytes",
      readOnly: true,
    }),
    defineField({
      name: "fileType",
      title: "File Type",
      type: "string",
      description: "MIME type of the file",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "featuredImage",
      author: "author",
    },
    prepare(selection) {
      const { title, category, media, author } = selection
      return {
        title: title,
        subtitle: `${category}${author ? ` • ${author}` : ""}`,
        media: media,
      }
    },
  },
})
