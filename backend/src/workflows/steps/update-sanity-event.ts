import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { createClient } from "@sanity/client"

type UpdateSanityEventInput = {
  eventId: string
  productId: string
  variantId: string
}

export const updateSanityEventStep = createStep(
  "update-sanity-event",
  async (input: UpdateSanityEventInput, { container }) => {
    const sanityClient = createClient({
      projectId: process.env.SANITY_PROJECT_ID || "",
      dataset: process.env.SANITY_DATASET || "production",
      token: process.env.SANITY_API_TOKEN,
      apiVersion: "2024-01-01",
      useCdn: false,
    })

    await sanityClient
      .patch(input.eventId)
      .set({
        medusaProductId: input.productId,
        medusaVariantId: input.variantId,
      })
      .commit()

    return new StepResponse({
      eventId: input.eventId,
      updated: true,
    })
  }
)
