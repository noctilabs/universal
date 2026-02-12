export { createSanityClient, type SanityClientConfig } from "./client"
export type { SanityClient } from "@sanity/client"
export {
  getEvents,
  getEvent,
  getMedia,
  getMediaItem,
  getResources,
  getResource,
  getResourcesByType,
  getStudioSpaces,
  getEquipment,
} from "./queries"
export { createImageUrlBuilder, urlFor } from "./image"
