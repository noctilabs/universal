"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEventCapacityStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
exports.setEventCapacityStep = (0, workflows_sdk_1.createStep)("set-event-capacity", async (input, { container }) => {
    const inventoryService = container.resolve(utils_1.Modules.INVENTORY);
    // Create inventory item for the variant
    const inventoryItem = await inventoryService.createInventoryItems({
        sku: `event-ticket-${input.variantId}`,
    });
    // Set inventory level for the location
    const inventoryLevel = await inventoryService.createInventoryLevels([
        {
            inventory_item_id: inventoryItem.id,
            location_id: input.locationId,
            stocked_quantity: input.capacity,
        },
    ]);
    return new workflows_sdk_1.StepResponse({
        inventory_item_id: inventoryItem.id,
        inventory_level_id: inventoryLevel[0].id,
        capacity: input.capacity,
    }, {
        inventoryItemId: inventoryItem.id,
        inventoryLevelId: inventoryLevel[0].id,
    });
}, 
// Compensation function - delete inventory on rollback
async (compensationData, { container }) => {
    if (!compensationData)
        return;
    const inventoryService = container.resolve(utils_1.Modules.INVENTORY);
    // Delete inventory level
    if (compensationData.inventoryLevelId) {
        await inventoryService.deleteInventoryLevels([
            compensationData.inventoryLevelId,
        ]);
    }
    // Delete inventory item
    if (compensationData.inventoryItemId) {
        await inventoryService.deleteInventoryItems([
            compensationData.inventoryItemId,
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWV2ZW50LWNhcGFjaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zYW5pdHkvc3RlcHMvc2V0LWV2ZW50LWNhcGFjaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUU1RSxxREFBbUQ7QUFRdEMsUUFBQSxvQkFBb0IsR0FBRyxJQUFBLDBCQUFVLEVBQzVDLG9CQUFvQixFQUNwQixLQUFLLEVBQUUsS0FBNEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDcEQsTUFBTSxnQkFBZ0IsR0FBc0IsU0FBUyxDQUFDLE9BQU8sQ0FDM0QsZUFBTyxDQUFDLFNBQVMsQ0FDbEIsQ0FBQTtJQUVELHdDQUF3QztJQUN4QyxNQUFNLGFBQWEsR0FBRyxNQUFNLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1FBQ2hFLEdBQUcsRUFBRSxnQkFBZ0IsS0FBSyxDQUFDLFNBQVMsRUFBRTtLQUN2QyxDQUFDLENBQUE7SUFFRix1Q0FBdUM7SUFDdkMsTUFBTSxjQUFjLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRTtZQUNFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQ25DLFdBQVcsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM3QixnQkFBZ0IsRUFBRSxLQUFLLENBQUMsUUFBUTtTQUNqQztLQUNGLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUNyQjtRQUNFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxFQUFFO1FBQ25DLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtLQUN6QixFQUNEO1FBQ0UsZUFBZSxFQUFFLGFBQWEsQ0FBQyxFQUFFO1FBQ2pDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQ3ZDLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFDRCx1REFBdUQ7QUFDdkQsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4QyxJQUFJLENBQUMsZ0JBQWdCO1FBQUUsT0FBTTtJQUU3QixNQUFNLGdCQUFnQixHQUFzQixTQUFTLENBQUMsT0FBTyxDQUMzRCxlQUFPLENBQUMsU0FBUyxDQUNsQixDQUFBO0lBRUQseUJBQXlCO0lBQ3pCLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1lBQzNDLGdCQUFnQixDQUFDLGdCQUFnQjtTQUNsQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckMsTUFBTSxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztZQUMxQyxnQkFBZ0IsQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQ0YsQ0FBQSJ9