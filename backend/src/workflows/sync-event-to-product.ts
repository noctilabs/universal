import {
  createWorkflow,
  WorkflowResponse,
  transform,
  when,
} from "@medusajs/framework/workflows-sdk"
import { createEventProductStep } from "./steps/create-event-product"
import { updateSanityEventStep } from "./steps/update-sanity-event"
import { setEventCapacityStep } from "./steps/set-event-capacity"
import { sendEventNotificationStep } from "./steps/send-event-notification"

type SyncEventToProductInput = {
  eventId: string
  title: string
  description?: string
  price: number
  currency: string
  slug: string
  capacity?: number
  locationId?: string
  eventDate?: string
  notifyAdmins?: boolean
}

export const syncEventToProductWorkflow = createWorkflow(
  "sync-event-to-product",
  function (input: SyncEventToProductInput) {
    // Transform input for product creation
    const productInput = transform({ input }, (data) => ({
      title: data.input.title,
      handle: data.input.slug,
      description: data.input.description,
      price: data.input.price,
      currency_code: data.input.currency.toLowerCase(),
      metadata: {
        sanity_event_id: data.input.eventId,
      },
    }))

    // Step 1: Create product in Medusa
    const productResult = createEventProductStep(productInput)

    // Step 2: Update Sanity event with product IDs
    const sanityInput = transform(
      { eventId: input.eventId, productResult },
      (data) => ({
        eventId: data.eventId,
        productId: data.productResult.product_id,
        variantId: data.productResult.variant_id,
      })
    )

    const sanityResult = updateSanityEventStep(sanityInput)

    // Step 3: Set event capacity (inventory) if provided
    const inventoryResult = when(
      { input },
      (data) => !!data.input.capacity && !!data.input.locationId
    ).then(() => {
      const capacityInput = transform(
        { input, productResult },
        (data) => ({
          variantId: data.productResult.variant_id,
          locationId: data.input.locationId!,
          capacity: data.input.capacity!,
        })
      )

      return setEventCapacityStep(capacityInput)
    })

    // Step 4: Send notification if requested
    const notificationResult = when(
      { input },
      (data) => !!data.input.notifyAdmins
    ).then(() => {
      const notificationInput = transform(
        { input, productResult },
        (data) => ({
          eventTitle: data.input.title,
          productId: data.productResult.product_id,
          eventDate: data.input.eventDate,
          notifyAdmins: data.input.notifyAdmins,
        })
      )

      return sendEventNotificationStep(notificationInput)
    })

    return new WorkflowResponse({
      product_id: productResult.product_id,
      variant_id: productResult.variant_id,
      event_id: sanityResult.eventId,
      inventory_set: inventoryResult,
      notification_sent: notificationResult,
    })
  }
)
