import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { IInventoryService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

type SetEventCapacityInput = {
  variantId: string
  locationId: string
  capacity: number
}

export const setEventCapacityStep = createStep(
  "set-event-capacity",
  async (input: SetEventCapacityInput, { container }) => {
    const inventoryService: IInventoryService = container.resolve(
      Modules.INVENTORY
    )

    // Create inventory item for the variant
    const inventoryItem = await inventoryService.createInventoryItems({
      sku: `event-ticket-${input.variantId}`,
    })

    // Set inventory level for the location
    const inventoryLevel = await inventoryService.createInventoryLevels([
      {
        inventory_item_id: inventoryItem.id,
        location_id: input.locationId,
        stocked_quantity: input.capacity,
      },
    ])

    return new StepResponse(
      {
        inventory_item_id: inventoryItem.id,
        inventory_level_id: inventoryLevel[0].id,
        capacity: input.capacity,
      },
      {
        inventoryItemId: inventoryItem.id,
        inventoryLevelId: inventoryLevel[0].id,
      }
    )
  },
  // Compensation function - delete inventory on rollback
  async (compensationData, { container }) => {
    if (!compensationData) return

    const inventoryService: IInventoryService = container.resolve(
      Modules.INVENTORY
    )

    // Delete inventory level
    if (compensationData.inventoryLevelId) {
      await inventoryService.deleteInventoryLevels([
        compensationData.inventoryLevelId,
      ])
    }

    // Delete inventory item
    if (compensationData.inventoryItemId) {
      await inventoryService.deleteInventoryItems([
        compensationData.inventoryItemId,
      ])
    }
  }
)
