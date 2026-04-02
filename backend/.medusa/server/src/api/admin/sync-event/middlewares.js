"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncEventMiddlewares = exports.SyncEventSchema = void 0;
const framework_1 = require("@medusajs/framework");
const framework_2 = require("@medusajs/framework");
const zod_1 = require("zod");
exports.SyncEventSchema = zod_1.z.object({
    eventId: zod_1.z.string(),
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0),
    currency: zod_1.z.string().default("usd"),
    // Optional inventory management
    capacity: zod_1.z.number().min(0).optional(),
    locationId: zod_1.z.string().optional(),
    // Optional event metadata
    eventDate: zod_1.z.string().optional(),
    // Optional notifications
    notifyAdmins: zod_1.z.boolean().default(false),
});
exports.syncEventMiddlewares = [
    {
        matcher: "/admin/sync-event",
        method: "POST",
        middlewares: [
            (0, framework_2.authenticate)("user", ["session", "bearer"]),
            (0, framework_1.validateAndTransformBody)(exports.SyncEventSchema),
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3N5bmMtZXZlbnQvbWlkZGxld2FyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQStFO0FBQy9FLG1EQUFrRDtBQUNsRCw2QkFBdUI7QUFFVixRQUFBLGVBQWUsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RDLE9BQU8sRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0lBQ25CLEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0lBQ2pCLElBQUksRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0lBQ2hCLFdBQVcsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2xDLEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4QixRQUFRLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDbkMsZ0NBQWdDO0lBQ2hDLFFBQVEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUN0QyxVQUFVLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNqQywwQkFBMEI7SUFDMUIsU0FBUyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDaEMseUJBQXlCO0lBQ3pCLFlBQVksRUFBRSxPQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztDQUN6QyxDQUFDLENBQUE7QUFJVyxRQUFBLG9CQUFvQixHQUFzQjtJQUNyRDtRQUNFLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsTUFBTSxFQUFFLE1BQU07UUFDZCxXQUFXLEVBQUU7WUFDWCxJQUFBLHdCQUFZLEVBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLElBQUEsb0NBQXdCLEVBQUMsdUJBQWUsQ0FBQztTQUMxQztLQUNGO0NBQ0YsQ0FBQSJ9