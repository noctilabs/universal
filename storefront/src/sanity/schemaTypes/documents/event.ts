import { defineField, defineType } from "sanity"
import { CalendarIcon } from "@sanity/icons"
import { EventStatus } from "@universal/types"

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
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
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief description for event cards and previews",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Full event description with rich text",
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventEndDate",
      title: "Event End Date",
      type: "datetime",
      description: "Optional end date for multi-day events",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      description: "Maximum number of attendees",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "ticketPrice",
      title: "Ticket Price",
      type: "number",
      description: "Price per ticket (in the currency specified below)",
      validation: (Rule) => Rule.required().min(0),
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
      name: "ticketTypes",
      title: "Ticket Types",
      type: "array",
      description: "Define the available ticket tiers for this event. If empty, falls back to a single ticket using the Ticket Price field above.",
      of: [
        {
          type: "object",
          name: "ticketType",
          title: "Ticket Type",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              description: "Unique key used in URLs (e.g. 'standard', 'premium'). Lowercase, no spaces.",
              validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/, { name: "slug-safe" }),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Display name shown to the customer (e.g. 'STANDARD TICKET')",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "currency",
              title: "Currency",
              type: "string",
              options: {
                list: [
                  { title: "USD", value: "USD" },
                  { title: "EUR", value: "EUR" },
                  { title: "GBP", value: "GBP" },
                ],
              },
              initialValue: "USD",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: "label", price: "price", currency: "currency" },
            prepare({ label, price, currency }: { label: string; price: number; currency: string }) {
              return { title: label, subtitle: `${currency} ${price}` }
            },
          },
        },
      ],
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
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: (
          Object.entries(EventStatus) as [keyof typeof EventStatus, string][]
        )
          .filter(([key]) => key === key.toUpperCase())
          .map(([key, value]) => ({
            title: key.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
            value,
          })),
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
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
    // Medusa integration fields
    defineField({
      name: "medusaProductId",
      title: "Medusa Product ID",
      type: "string",
      description: "Auto-populated when synced to Medusa",
      readOnly: true,
    }),
    defineField({
      name: "medusaVariantId",
      title: "Medusa Variant ID",
      type: "string",
      description: "Auto-populated when synced to Medusa",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eventDate",
      media: "featuredImage",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : "No date"
      return {
        title: title,
        subtitle: `${date} • ${status}`,
        media: media,
      }
    },
  },
})
