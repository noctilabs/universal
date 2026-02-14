import imageUrlBuilder from "@sanity/image-url"
import type { SanityClient } from "@sanity/client"

/**
 * Creates an image URL builder for the given Sanity client.
 */
export function createImageUrlBuilder(client: SanityClient) {
  return imageUrlBuilder(client)
}

/**
 * Builds a URL for a Sanity image reference.
 */
export function urlFor(client: SanityClient, source: string) {
  return imageUrlBuilder(client).image(source)
}
