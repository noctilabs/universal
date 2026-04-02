"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncEventToProductWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const steps_1 = require("../steps");
exports.syncEventToProductWorkflow = (0, workflows_sdk_1.createWorkflow)("sync-event-to-product", function (input) {
    // Transform input for product creation
    const productInput = (0, workflows_sdk_1.transform)({ input }, (data) => ({
        title: data.input.title,
        handle: data.input.slug,
        description: data.input.description,
        price: data.input.price,
        currency_code: data.input.currency.toLowerCase(),
        metadata: {
            sanity_event_id: data.input.eventId,
        },
    }));
    // Step 1: Create product in Medusa
    const productResult = (0, steps_1.createEventProductStep)(productInput);
    // Step 2: Update Sanity event with product IDs
    const sanityInput = (0, workflows_sdk_1.transform)({ eventId: input.eventId, productResult }, (data) => ({
        eventId: data.eventId,
        productId: data.productResult.product_id,
        variantId: data.productResult.variant_id,
    }));
    const sanityResult = (0, steps_1.updateSanityEventStep)(sanityInput);
    // Step 3: Set event capacity (inventory) if provided
    const inventoryResult = (0, workflows_sdk_1.when)({ input }, (data) => !!data.input.capacity && !!data.input.locationId).then(() => {
        const capacityInput = (0, workflows_sdk_1.transform)({ input, productResult }, (data) => ({
            variantId: data.productResult.variant_id,
            locationId: data.input.locationId,
            capacity: data.input.capacity,
        }));
        return (0, steps_1.setEventCapacityStep)(capacityInput);
    });
    // Step 4: Send notification if requested
    const notificationResult = (0, workflows_sdk_1.when)({ input }, (data) => !!data.input.notifyAdmins).then(() => {
        const notificationInput = (0, workflows_sdk_1.transform)({ input, productResult }, (data) => ({
            eventTitle: data.input.title,
            productId: data.productResult.product_id,
            eventDate: data.input.eventDate,
            notifyAdmins: data.input.notifyAdmins,
        }));
        return (0, steps_1.sendEventNotificationStep)(notificationInput);
    });
    return new workflows_sdk_1.WorkflowResponse({
        product_id: productResult.product_id,
        variant_id: productResult.variant_id,
        event_id: sanityResult.eventId,
        inventory_set: inventoryResult,
        notification_sent: notificationResult,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1ldmVudC10by1wcm9kdWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zYW5pdHkvd29ya2Zsb3dzL3N5bmMtZXZlbnQtdG8tcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFLMEM7QUFDMUMsb0NBS2lCO0FBZUosUUFBQSwwQkFBMEIsR0FBRyxJQUFBLDhCQUFjLEVBQ3RELHVCQUF1QixFQUN2QixVQUFVLEtBQThCO0lBQ3RDLHVDQUF1QztJQUN2QyxNQUFNLFlBQVksR0FBRyxJQUFBLHlCQUFTLEVBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDdkIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztRQUNuQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDaEQsUUFBUSxFQUFFO1lBQ1IsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztTQUNwQztLQUNGLENBQUMsQ0FBQyxDQUFBO0lBRUgsbUNBQW1DO0lBQ25DLE1BQU0sYUFBYSxHQUFHLElBQUEsOEJBQXNCLEVBQUMsWUFBWSxDQUFDLENBQUE7SUFFMUQsK0NBQStDO0lBQy9DLE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQVMsRUFDM0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFDekMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTtRQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVO0tBQ3pDLENBQUMsQ0FDSCxDQUFBO0lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBQSw2QkFBcUIsRUFBQyxXQUFXLENBQUMsQ0FBQTtJQUV2RCxxREFBcUQ7SUFDckQsTUFBTSxlQUFlLEdBQUcsSUFBQSxvQkFBSSxFQUMxQixFQUFFLEtBQUssRUFBRSxFQUNULENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUMzRCxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixNQUFNLGFBQWEsR0FBRyxJQUFBLHlCQUFTLEVBQzdCLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUN4QixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7WUFDeEMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVztZQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTO1NBQy9CLENBQUMsQ0FDSCxDQUFBO1FBRUQsT0FBTyxJQUFBLDRCQUFvQixFQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYseUNBQXlDO0lBQ3pDLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxvQkFBSSxFQUM3QixFQUFFLEtBQUssRUFBRSxFQUNULENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ3BDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNWLE1BQU0saUJBQWlCLEdBQUcsSUFBQSx5QkFBUyxFQUNqQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDeEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDVCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO1NBQ3RDLENBQUMsQ0FDSCxDQUFBO1FBRUQsT0FBTyxJQUFBLGlDQUF5QixFQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDckQsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLElBQUksZ0NBQWdCLENBQUM7UUFDMUIsVUFBVSxFQUFFLGFBQWEsQ0FBQyxVQUFVO1FBQ3BDLFVBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtRQUNwQyxRQUFRLEVBQUUsWUFBWSxDQUFDLE9BQU87UUFDOUIsYUFBYSxFQUFFLGVBQWU7UUFDOUIsaUJBQWlCLEVBQUUsa0JBQWtCO0tBQ3RDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=