"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || "development", process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        redisUrl: process.env.REDIS_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        },
    },
    modules: [
        {
            resolve: "@medusajs/medusa/caching",
            options: {
                providers: [
                    {
                        resolve: "@medusajs/caching-redis",
                        id: "caching-redis",
                        is_default: true,
                        options: {
                            redisUrl: process.env.REDIS_URL || process.env.CACHE_REDIS_URL,
                        },
                    },
                ],
            },
        },
        {
            resolve: "@medusajs/medusa/event-bus-redis",
            options: {
                redisUrl: process.env.REDIS_URL || process.env.EVENTS_REDIS_URL,
                jobOptions: {
                    removeOnComplete: { age: 3600, count: 1000 },
                    removeOnFail: { age: 3600, count: 1000 },
                },
            },
        },
        {
            resolve: "@medusajs/medusa/locking",
            options: {
                providers: [
                    {
                        resolve: "@medusajs/medusa/locking-redis",
                        id: "locking-redis",
                        is_default: true,
                        options: {
                            redisUrl: process.env.REDIS_URL || process.env.LOCKING_REDIS_URL,
                        },
                    },
                ],
            },
        },
        {
            resolve: "./src/modules/sanity",
            options: {
                api_token: process.env.SANITY_API_TOKEN || "",
                project_id: process.env.SANITY_PROJECT_ID || "",
                api_version: process.env.SANITY_API_VERSION || "",
                dataset: process.env.SANITY_DATASET || "production",
                studio_url: process.env.SANITY_STUDIO_URL || "http://localhost:3000/studio",
                type_map: {
                    booking_resource: "event",
                },
            },
        },
    ],
    plugins: [
        {
            resolve: "@rsc-labs/medusa-booking-system",
            options: {},
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBa0U7QUFFbEUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztRQUMvQixJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVc7WUFDbEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBVTtZQUNoQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksYUFBYTtZQUNsRCxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksYUFBYTtTQUN6RDtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1A7WUFDRSxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLHlCQUF5Qjt3QkFDbEMsRUFBRSxFQUFFLGVBQWU7d0JBQ25CLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixPQUFPLEVBQUU7NEJBQ1AsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTt5QkFDL0Q7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQy9ELFVBQVUsRUFBRTtvQkFDVixnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDNUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2lCQUN6QzthQUNGO1NBQ0Y7UUFDRDtZQUNFLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsZ0NBQWdDO3dCQUN6QyxFQUFFLEVBQUUsZUFBZTt3QkFDbkIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUCxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7eUJBQ2pFO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRTtnQkFDN0MsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRTtnQkFDL0MsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksRUFBRTtnQkFDakQsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLFlBQVk7Z0JBQ25ELFVBQVUsRUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLDhCQUE4QjtnQkFDakUsUUFBUSxFQUFFO29CQUNSLGdCQUFnQixFQUFFLE9BQU87aUJBQzFCO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1A7WUFDRSxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLE9BQU8sRUFBRSxFQUFFO1NBQ1o7S0FDRjtDQUNGLENBQUMsQ0FBQyJ9