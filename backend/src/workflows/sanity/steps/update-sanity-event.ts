import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { SANITY_MODULE } from "../../../modules/sanity/service"

type UpdateSanityEventInput = {
  eventId: string
  productId: string
  variantId: string
}

export const updateSanityEventStep = createStep(
  "update-sanity-event",
  async (input: UpdateSanityEventInput, { container }) => {
    const sanityModuleService = container.resolve(SANITY_MODULE)

    await sanityModuleService.update(input.eventId, {
      medusaProductId: input.productId,
      medusaVariantId: input.variantId,
    })

    return new StepResponse({
      eventId: input.eventId,
      updated: true,
    })
  }
)
