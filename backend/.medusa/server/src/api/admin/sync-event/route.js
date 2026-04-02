"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const sanity_1 = require("../../../workflows/sanity");
const POST = async (req, res) => {
    const { eventId, title, slug, description, price, currency, capacity, locationId, eventDate, notifyAdmins, } = req.validatedBody;
    try {
        // Execute the workflow to sync event to product
        const { result } = await (0, sanity_1.syncEventToProductWorkflow)(req.scope).run({
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
        });
        res.json({
            message: "Event synced successfully",
            product_id: result.product_id,
            variant_id: result.variant_id,
            event_id: result.event_id,
            inventory_set: result.inventory_set,
            notification_sent: result.notification_sent,
        });
    }
    catch (error) {
        console.error("Error syncing event to product:", error);
        res.status(500).json({
            message: "Failed to sync event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N5bmMtZXZlbnQvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0RBQXNFO0FBRy9ELE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBZ0QsRUFDaEQsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sRUFDSixPQUFPLEVBQ1AsS0FBSyxFQUNMLElBQUksRUFDSixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixRQUFRLEVBQ1IsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEdBQ2IsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFBO0lBRXJCLElBQUksQ0FBQztRQUNILGdEQUFnRDtRQUNoRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFBLG1DQUEwQixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDakUsS0FBSyxFQUFFO2dCQUNMLE9BQU87Z0JBQ1AsS0FBSztnQkFDTCxXQUFXO2dCQUNYLEtBQUs7Z0JBQ0wsUUFBUTtnQkFDUixJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IsVUFBVTtnQkFDVixTQUFTO2dCQUNULFlBQVk7YUFDYjtTQUNGLENBQUMsQ0FBQTtRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUCxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtZQUM3QixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO1NBQzVDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN2RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLEtBQUssRUFBRSxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFlO1NBQ2hFLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFqRFksUUFBQSxJQUFJLFFBaURoQiJ9