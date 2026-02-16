import { defineField, defineType } from "sanity"
import { CubeIcon } from "@sanity/icons"
import { ResourceType } from "@universal/types"

export default defineType({
  name: "resource",
  title: "Bookable Resource",
  type: "document",
  icon: CubeIcon,
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
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          ...(
            Object.entries(ResourceType) as [keyof typeof ResourceType, string][]
          )
            .filter(([key]) => key === key.toUpperCase())
            .map(([key, value]) => ({
              title: key.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
              value,
            })),
          { title: "Room", value: "room" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "blockContent",
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
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
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
        },
      ],
    }),
    defineField({
      name: "hourlyRate",
      title: "Hourly Rate",
      type: "number",
      description: "Price per hour (leave empty if not applicable)",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "dailyRate",
      title: "Daily Rate",
      type: "number",
      description: "Price per day (leave empty if not applicable)",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "USD", value: "usd" },
          { title: "EUR", value: "eur" },
          { title: "GBP", value: "gbp" },
        ],
      },
      initialValue: "usd",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      description: "Maximum number of people/items",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "squareFootage",
      title: "Square Footage",
      type: "number",
      description: "Size in square feet (for spaces)",
      hidden: ({ document }) =>
        document?.resourceType === "equipment",
    }),
    defineField({
      name: "features",
      title: "Features & Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "List of features, amenities, or included items",
    }),
    defineField({
      name: "technicalSpecs",
      title: "Technical Specifications",
      type: "object",
      fields: [
        {
          name: "soundproofing",
          title: "Soundproofing",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "acousticTreatment",
          title: "Acoustic Treatment",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "controlRoom",
          title: "Control Room",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "instruments",
          title: "Available Instruments",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      hidden: ({ document }) =>
        document?.resourceType === "equipment" ||
        document?.resourceType === "meeting_room",
    }),
    defineField({
      name: "equipmentDetails",
      title: "Equipment Details",
      type: "object",
      fields: [
        {
          name: "brand",
          title: "Brand",
          type: "string",
        },
        {
          name: "model",
          title: "Model",
          type: "string",
        },
        {
          name: "quantity",
          title: "Quantity Available",
          type: "number",
          validation: (Rule) => Rule.min(1),
        },
        {
          name: "condition",
          title: "Condition",
          type: "string",
          options: {
            list: [
              { title: "New", value: "new" },
              { title: "Good", value: "good" },
              { title: "Fair", value: "fair" },
            ],
          },
        },
        {
          name: "requiresDeposit",
          title: "Requires Deposit",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "depositAmount",
          title: "Deposit Amount",
          type: "number",
          hidden: ({ parent }) => !parent?.requiresDeposit,
        },
      ],
      hidden: ({ document }) =>
        document?.resourceType !== "equipment",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Is this resource available for booking?",
      initialValue: true,
    }),
    defineField({
      name: "medusaResourceId",
      title: "Medusa Resource ID",
      type: "string",
      description: "Auto-populated when synced to booking system",
      readOnly: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      resourceType: "resourceType",
      media: "featuredImage",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, resourceType, media, isActive } = selection
      return {
        title: title,
        subtitle: `${resourceType}${!isActive ? " • Inactive" : ""}`,
        media: media,
      }
    },
  },
})
