import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import type { NotificationDTO } from "@medusajs/framework/types"
import { INotificationModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

type SendEventNotificationInput = {
  eventTitle: string
  productId: string
  eventDate?: string
  notifyAdmins?: boolean
}

export const sendEventNotificationStep = createStep(
  "send-event-notification",
  async (input: SendEventNotificationInput, { container }) => {
    const notificationService: INotificationModuleService = container.resolve(
      Modules.NOTIFICATION
    )

    const notifications: NotificationDTO[] = []

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
      })

      notifications.push(
        ...(Array.isArray(adminNotification) ? adminNotification : [adminNotification])
      )
    }

    // Log the notification for tracking
    console.log(`[Event Sync] Notification sent for event: ${input.eventTitle}`)

    return new StepResponse({
      notificationsSent: notifications.length,
      eventTitle: input.eventTitle,
    })
  }
  // Note: No compensation needed for notifications - they're informational only
)
