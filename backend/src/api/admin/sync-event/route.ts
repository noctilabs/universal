import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { syncEventToProductWorkflow } from "../../../workflows/sync-event-to-product"
import type { SyncEventSchema } from "./middlewares"

export const POST = async (
  req: AuthenticatedMedusaRequest<SyncEventSchema>,
  res: MedusaResponse
) => {
  const {
    eventId,
    title,
    slug,
    description,
    price,
    currency,
    capacity,
    locationId,
    eventDate,
    notifyAdmins,
  } = req.validatedBody

  try {
    // Execute the workflow to sync event to product
    const { result } = await syncEventToProductWorkflow(req.scope).run({
      input: {
        eventId,
        title,
        description,
        price,
        currency,
        slug,
        capacity,
        locationId,
        eventDate,
        notifyAdmins,
      },
    })

    res.json({
      message: "Event synced successfully",
      product_id: result.product_id,
      variant_id: result.variant_id,
      event_id: result.event_id,
      inventory_set: result.inventory_set,
      notification_sent: result.notification_sent,
    })
  } catch (error) {
    console.error("Error syncing event to product:", error)
    res.status(500).json({
      message: "Failed to sync event",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
