"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SANITY_MODULE = void 0;
const client_1 = require("@sanity/client");
const types_1 = require("../types");
exports.SANITY_MODULE = "sanity";
class SanityModuleService {
    constructor({ logger }, options) {
        this.logger = logger;
        this.client = (0, client_1.createClient)({
            projectId: options.project_id,
            dataset: options.dataset,
            apiVersion: options.api_version || "2024-01-01",
            token: options.api_token,
        });
        this.studioUrl = options.studio_url;
        this.logger.info("Sanity online");
        this.typeMap = {
            [types_1.SyncDocumentTypes.BOOKING_RESOURCE]: "event",
            ...(options.type_map || {}),
        };
        this.createTransformMap = {
            [types_1.SyncDocumentTypes.BOOKING_RESOURCE]: (data) => ({
                // TODO: This should be implemented with actual shape to be sent when creating an event in Sanity
                _type: this.typeMap[types_1.SyncDocumentTypes.BOOKING_RESOURCE],
                ...data,
            }),
        };
        this.updateTransformMap = {
            [types_1.SyncDocumentTypes.BOOKING_RESOURCE]: (data) => ({
                // TODO: This should be implemented with actual shape to be sent when updating an event in Sanity
                set: {
                    start_at: data.start_at,
                },
            }),
        };
    }
    async upsertSyncDocument(type, data) {
        const existing = await this.client.getDocument(data.id);
        if (existing) {
            return await this.updateSyncDocument(type, data);
        }
        return await this.createSyncDocument(type, data);
    }
    async createSyncDocument(type, data, options) {
        const doc = this.createTransformMap[type](data);
        return await this.client.create(doc, options);
    }
    async updateSyncDocument(type, data) {
        const operations = this.updateTransformMap[type](data);
        return await this.client.patch(data.id, operations).commit();
    }
    async retrieve(id) {
        return this.client.getDocument(id);
    }
    async delete(id) {
        return this.client.delete(id);
    }
    async update(id, data) {
        return await this.client
            .patch(id, {
            set: data,
        })
            .commit();
    }
    async list(filter) {
        const data = await this.client.getDocuments(Array.isArray(filter.id) ? filter.id : [filter.id]);
        return data.map((doc) => ({
            id: doc?._id,
            ...doc,
        }));
    }
}
exports.default = SanityModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Nhbml0eS9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUl3QjtBQUN4QixvQ0FLa0I7QUFFTCxRQUFBLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFnQnRDLE1BQU0sbUJBQW1CO0lBV3ZCLFlBQVksRUFBRSxNQUFNLEVBQXdCLEVBQUUsT0FBc0I7UUFDbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLHFCQUFZLEVBQUM7WUFDekIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzdCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxZQUFZO1lBQy9DLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLENBQUMseUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxPQUFPO1lBQzdDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztTQUM1QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHO1lBQ3hCLENBQUMseUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0MsaUdBQWlHO2dCQUNqRyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDdkQsR0FBRyxJQUFJO2FBQ1IsQ0FBQztTQUNI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