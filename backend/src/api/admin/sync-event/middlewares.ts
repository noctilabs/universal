import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework"
import { authenticate } from "@medusajs/framework"
import { z } from "zod"

export const SyncEventSchema = z.object({
  eventId: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
  currency: z.string().default("usd"),
  // Optional inventory management
  capacity: z.number().min(0).optional(),
  locationId: z.string().optional(),
  // Optional event metadata
  eventDate: z.string().optional(),
  // Optional notifications
  notifyAdmins: z.boolean().default(false),
})

export type SyncEventSchema = z.infer<typeof SyncEventSchema>

export const syncEventMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sync-event",
    method: "POST",
    middlewares: [
      authenticate("user", ["session", "bearer"]),
      validateAndTransformBody(SyncEventSchema),
    ],
  },
]
