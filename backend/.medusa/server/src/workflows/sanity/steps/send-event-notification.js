"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEventNotificationStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
exports.sendEventNotificationStep = (0, workflows_sdk_1.createStep)("send-event-notification", async (input, { container }) => {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const notifications = [];
    // Send notification to admins if requested
    if (input.notifyAdmins) {
        const adminNotification = await notificationService.createNotifications({
            to: "admin@universal.com", // Replace with actual admin email
            channel: "email",
            template: "event-synced",
            data: {
                event_title: input.eventTitle,
                product_id: input.productId,
                event_date: input.eventDate,
                synced_at: new Date().toISOString(),
            },
        });
        notifications.push(...(Array.isArray(adminNotification) ? adminNotification : [adminNotification]));
    }
    // Log the notification for tracking
    console.log(`[Event Sync] Notification sent for event: ${input.eventTitle}`);
    return new workflows_sdk_1.StepResponse({
        notificationsSent: notifications.length,
        eventTitle: input.eventTitle,
    });
}
// Note: No compensation needed for notifications - they're informational only
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1ldmVudC1ub3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Nhbml0eS9zdGVwcy9zZW5kLWV2ZW50LW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFHNUUscURBQW1EO0FBU3RDLFFBQUEseUJBQXlCLEdBQUcsSUFBQSwwQkFBVSxFQUNqRCx5QkFBeUIsRUFDekIsS0FBSyxFQUFFLEtBQWlDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3pELE1BQU0sbUJBQW1CLEdBQStCLFNBQVMsQ0FBQyxPQUFPLENBQ3ZFLGVBQU8sQ0FBQyxZQUFZLENBQ3JCLENBQUE7SUFFRCxNQUFNLGFBQWEsR0FBc0IsRUFBRSxDQUFBO0lBRTNDLDJDQUEyQztJQUMzQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QixNQUFNLGlCQUFpQixHQUFHLE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7WUFDdEUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLGtDQUFrQztZQUM3RCxPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM3QixVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVM7Z0JBQzNCLFVBQVUsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDM0IsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsYUFBYSxDQUFDLElBQUksQ0FDaEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUNoRixDQUFBO0lBQ0gsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUU1RSxPQUFPLElBQUksNEJBQVksQ0FBQztRQUN0QixpQkFBaUIsRUFBRSxhQUFhLENBQUMsTUFBTTtRQUN2QyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7S0FDN0IsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUNELDhFQUE4RTtDQUMvRSxDQUFBIn0=