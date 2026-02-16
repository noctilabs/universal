import { Logger } from "@medusajs/framework/types";
import {
  FirstDocumentMutationOptions,
  SanityClient,
  createClient,
} from "@sanity/client";
import {
  SyncDocumentInputs,
  type SyncDocumentTypes as SyncDocumentTypesType,
  SyncDocumentTypes,
  TransformMap,
} from "../types";

export const SANITY_MODULE = "sanity";

type ModuleOptions = {
  api_token: string;
  project_id: string;
  api_version: string;
  dataset: "production" | "development";
  // TODO: type after we have defined the types we will use in Sanity
  type_map?: Record<SyncDocumentTypes, string>;
  studio_url?: string;
};

type InjectedDependencies = {
  logger: Logger;
};

class SanityModuleService {
  private client: SanityClient;
  private logger: Logger;
  private studioUrl?: string;
  // Maps Medusa entities to Sanity document types
  private typeMap: Record<SyncDocumentTypes, string>;
  // Maps Medusa entities to Sanity document types for create operations
  private createTransformMap: TransformMap<SyncDocumentTypes>;
  // Maps Medusa entities to Sanity document types for update operations
  private updateTransformMap: TransformMap<SyncDocumentTypes>;

  constructor({ logger }: InjectedDependencies, options: ModuleOptions) {
    this.logger = logger;
    this.client = createClient({
      projectId: options.project_id,
      dataset: options.dataset,
      apiVersion: options.api_version || "2024-01-01",
      token: options.api_token,
    });
    this.studioUrl = options.studio_url;
    this.logger.info("Sanity online");
    this.typeMap = {
      [SyncDocumentTypes.BOOKING_RESOURCE]: "event",
      ...(options.type_map || {}),
    };
    this.createTransformMap = {
      [SyncDocumentTypes.BOOKING_RESOURCE]: (data) => ({
        // TODO: This should be implemented with actual shape to be sent when creating an event in Sanity
        _type: this.typeMap[SyncDocumentTypes.BOOKING_RESOURCE],
        ...data,
      }),
    };
    this.updateTransformMap = {
      [SyncDocumentTypes.BOOKING_RESOURCE]: (data) => ({
        // TODO: This should be implemented with actual shape to be sent when updating an event in Sanity
        set: {
          start_at: data.start_at,
        },
      }),
    };
  }

  async upsertSyncDocument<T extends SyncDocumentTypesType>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    const existing = await this.client.getDocument(data.id);
    if (existing) {
      return await this.updateSyncDocument(type, data);
    }

    return await this.createSyncDocument(type, data);
  }

  async createSyncDocument<T extends SyncDocumentTypesType>(
    type: T,
    data: SyncDocumentInputs<T>,
    options?: FirstDocumentMutationOptions
  ) {
    const doc = this.createTransformMap[type](data);
    return await this.client.create(doc, options);
  }

  async updateSyncDocument<T extends SyncDocumentTypesType>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    const operations = this.updateTransformMap[type](data);
    return await this.client.patch(data.id, operations).commit();
  }

  async retrieve(id: string) {
    return this.client.getDocument(id);
  }

  async delete(id: string) {
    return this.client.delete(id);
  }

  async update(id: string, data: any) {
    return await this.client
      .patch(id, {
        set: data,
      })
      .commit();
  }

  async list(filter: { id: string | string[] }) {
    const data = await this.client.getDocuments(
      Array.isArray(filter.id) ? filter.id : [filter.id]
    );

    return data.map((doc) => ({
      id: doc?._id,
      ...doc,
    }));
  }
}

export default SanityModuleService;
