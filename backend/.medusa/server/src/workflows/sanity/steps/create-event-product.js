"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventProductStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
exports.createEventProductStep = (0, workflows_sdk_1.createStep)("create-event-product", async (input, { container }) => {
    const productModuleService = container.resolve(utils_1.Modules.PRODUCT);
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
    });
    // Create a variant for the product
    const variant = await productModuleService.createProductVariants({
        title: "Default",
        product_id: product.id,
        manage_inventory: true,
        allow_backorder: false,
        metadata: {
            is_event_ticket: true,
        },
    });
    // Create price for the variant via Pricing Module
    await (0, core_flows_1.upsertVariantPricesWorkflow)(container).run({
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
    });
    return new workflows_sdk_1.StepResponse({
        product_id: product.id,
        variant_id: variant.id,
    }, product.id);
}, 
// Compensation function - rollback on failure
async (productId, { container }) => {
    if (!productId)
        return;
    const productModuleService = container.resolve(utils_1.Modules.PRODUCT);
    await productModuleService.deleteProducts([productId]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV2ZW50LXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Nhbml0eS9zdGVwcy9jcmVhdGUtZXZlbnQtcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFFNUUscURBQW1EO0FBQ25ELDREQUF5RTtBQVc1RCxRQUFBLHNCQUFzQixHQUFHLElBQUEsMEJBQVUsRUFDOUMsc0JBQXNCLEVBQ3RCLEtBQUssRUFBRSxLQUE4QixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN0RCxNQUFNLG9CQUFvQixHQUEwQixTQUFTLENBQUMsT0FBTyxDQUNuRSxlQUFPLENBQUMsT0FBTyxDQUNoQixDQUFBO0lBRUQscUJBQXFCO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsY0FBYyxDQUFDO1FBQ3hELEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07UUFDcEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQzlCLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFFBQVEsRUFBRTtZQUNSLEdBQUcsS0FBSyxDQUFDLFFBQVE7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGLENBQUMsQ0FBQTtJQUVGLG1DQUFtQztJQUNuQyxNQUFNLE9BQU8sR0FBRyxNQUFNLG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO1FBQy9ELEtBQUssRUFBRSxTQUFTO1FBQ2hCLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtRQUN0QixnQkFBZ0IsRUFBRSxJQUFJO1FBQ3RCLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFFBQVEsRUFBRTtZQUNSLGVBQWUsRUFBRSxJQUFJO1NBQ3RCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsa0RBQWtEO0lBQ2xELE1BQU0sSUFBQSx3Q0FBMkIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0MsS0FBSyxFQUFFO1lBQ0wsYUFBYSxFQUFFO2dCQUNiO29CQUNFLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtvQkFDdEIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFO29CQUN0QixNQUFNLEVBQUU7d0JBQ047NEJBQ0UsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLOzRCQUNuQixhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWE7eUJBQ25DO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxrQkFBa0IsRUFBRSxFQUFFO1NBQ3ZCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQ3JCO1FBQ0UsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQ3RCLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtLQUN2QixFQUNELE9BQU8sQ0FBQyxFQUFFLENBQ1gsQ0FBQTtBQUNILENBQUM7QUFDRCw4Q0FBOEM7QUFDOUMsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3pDLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTTtJQUV0QixNQUFNLG9CQUFvQixHQUEwQixTQUFTLENBQUMsT0FBTyxDQUNuRSxlQUFPLENBQUMsT0FBTyxDQUNoQixDQUFBO0lBRUQsTUFBTSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ3hELENBQUMsQ0FDRixDQUFBIn0=