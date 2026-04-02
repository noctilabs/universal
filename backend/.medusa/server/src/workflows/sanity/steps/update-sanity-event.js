"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSanityEventStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const service_1 = require("../../../modules/sanity/service");
exports.updateSanityEventStep = (0, workflows_sdk_1.createStep)("update-sanity-event", async (input, { container }) => {
    const sanityModuleService = container.resolve(service_1.SANITY_MODULE);
    await sanityModuleService.update(input.eventId, {
        medusaProductId: input.productId,
        medusaVariantId: input.variantId,
    });
    return new workflows_sdk_1.StepResponse({
        eventId: input.eventId,
        updated: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXNhbml0eS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2FuaXR5L3N0ZXBzL3VwZGF0ZS1zYW5pdHktZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBQzVFLDZEQUErRDtBQVFsRCxRQUFBLHFCQUFxQixHQUFHLElBQUEsMEJBQVUsRUFDN0MscUJBQXFCLEVBQ3JCLEtBQUssRUFBRSxLQUE2QixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRCxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsdUJBQWEsQ0FBQyxDQUFBO0lBRTVELE1BQU0sbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDOUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTO1FBQ2hDLGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUztLQUNqQyxDQUFDLENBQUE7SUFFRixPQUFPLElBQUksNEJBQVksQ0FBQztRQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9