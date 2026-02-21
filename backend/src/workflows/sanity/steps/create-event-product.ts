import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { IProductModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { upsertVariantPricesWorkflow } from "@medusajs/medusa/core-flows"

type CreateEventProductInput = {
  title: string
  handle: string
  description?: string
  price: number
  currency_code: string
  metadata?: Record<string, unknown>
}

export const createEventProductStep = createStep(
  "create-event-product",
  async (input: CreateEventProductInput, { container }) => {
    const productModuleService: IProductModuleService = container.resolve(
      Modules.PRODUCT
    )

    // Create the product
    const product = await productModuleService.createProducts({
      title: input.title,
      handle: input.handle,
      description: input.description,
      is_giftcard: false,
      discountable: true,
      metadata: {
        ...input.metadata,
        is_event: true,
      },
    })

    // Create a variant for the product
    const variant = await productModuleService.createProductVariants({
      title: "Default",
      product_id: product.id,
      manage_inventory: true,
      allow_backorder: false,
      metadata: {
        is_event_ticket: true,
      },
    })

    // Create price for the variant via Pricing Module
    await upsertVariantPricesWorkflow(container).run({
      input: {
        variantPrices: [
          {
            variant_id: variant.id,
            product_id: product.id,
            prices: [
              {
                amount: input.price,
                currency_code: input.currency_code,
              },
            ],
          },
        ],
        previousVariantIds: [],
      },
    })

    return new StepResponse(
      {
        product_id: product.id,
        variant_id: variant.id,
      },
      product.id
    )
  },
  // Compensation function - rollback on failure
  async (productId: string, { container }) => {
    if (!productId) return

    const productModuleService: IProductModuleService = container.resolve(
      Modules.PRODUCT
    )

    await productModuleService.deleteProducts([productId])
  }
)
