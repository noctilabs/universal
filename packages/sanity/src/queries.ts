import type { SanityClient } from "@sanity/client"
import groq from "groq"
import type {
  EventListItem,
  EventDetail,
  MediaListItem,
  MediaDetail,
  ResourceListItem,
  ResourceDetail,
} from "@universal/types"

const eventsQuery = groq`
  *[_type == "event" && status == "published"] | order(eventDate desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    eventDate,
    eventEndDate,
    venue,
    address,
    city,
    country,
    capacity,
    ticketPrice,
    currency,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    status,
    tags,
    medusaProductId,
    medusaVariantId,
    seo
  }
`

const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    eventDate,
    eventEndDate,
    venue,
    address,
    city,
    country,
    capacity,
    ticketPrice,
    currency,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "gallery": gallery[].asset->url,
    status,
    tags,
    medusaProductId,
    medusaVariantId,
    seo
  }
`

const mediaQuery = groq`
  *[_type == "media" && (!defined($category) || category == $category)] | order(publishedDate desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "fileUrl": file.asset->url,
    publishedDate,
    author,
    tags,
    videoUrl,
    videoDuration,
    downloadCount,
    fileSize,
    fileType,
    seo
  }
`

const mediaBySlugQuery = groq`
  *[_type == "media" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "fileUrl": file.asset->url,
    publishedDate,
    author,
    tags,
    videoUrl,
    videoDuration,
    downloadCount,
    fileSize,
    fileType,
    seo
  }
`

const resourcesQuery = groq`
  *[_type == "resource" && isActive == true && (!defined($type) || resourceType == $type)] | order(title asc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    resourceType,
    shortDescription,
    hourlyRate,
    dailyRate,
    currency,
    capacity,
    squareFootage,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    features,
    isActive,
    medusaResourceId
  }
`

const resourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    resourceType,
    shortDescription,
    description,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "gallery": gallery[].asset->url,
    hourlyRate,
    dailyRate,
    currency,
    capacity,
    squareFootage,
    features,
    technicalSpecs,
    equipmentDetails,
    isActive,
    medusaResourceId,
    seo
  }
`

const studioSpacesQuery = groq`
  *[_type == "resource" && isActive == true && resourceType in ["studio_space", "recording_studio", "rehearsal_room"]] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    resourceType,
    shortDescription,
    hourlyRate,
    dailyRate,
    currency,
    capacity,
    squareFootage,
    "featuredImage": featuredImage.asset->url,
    features,
    technicalSpecs
  }
`

const equipmentQuery = groq`
  *[_type == "resource" && isActive == true && resourceType == "equipment"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    hourlyRate,
    dailyRate,
    currency,
    "featuredImage": featuredImage.asset->url,
    equipmentDetails
  }
`

export async function getEvents(client: SanityClient): Promise<EventListItem[]> {
  return await client.fetch<EventListItem[]>(eventsQuery)
}

export async function getEvent(
  client: SanityClient,
  slug: string
): Promise<EventDetail | null> {
  return await client.fetch<EventDetail | null>(eventBySlugQuery, { slug })
}

export async function getMedia(
  client: SanityClient,
  category?: string
): Promise<MediaListItem[]> {
  return await client.fetch<MediaListItem[]>(mediaQuery, {
    category: category ?? undefined,
  })
}

export async function getMediaItem(
  client: SanityClient,
  slug: string
): Promise<MediaDetail | null> {
  return await client.fetch<MediaDetail | null>(mediaBySlugQuery, { slug })
}

export async function getResources(
  client: SanityClient,
  type?: string
): Promise<ResourceListItem[]> {
  return await client.fetch<ResourceListItem[]>(resourcesQuery, {
    type: type ?? undefined,
  })
}

export async function getResource(
  client: SanityClient,
  slug: string
): Promise<ResourceDetail | null> {
  return await client.fetch<ResourceDetail | null>(resourceBySlugQuery, {
    slug,
  })
}

export async function getResourcesByType(
  client: SanityClient,
  type: string
): Promise<ResourceListItem[]> {
  return getResources(client, type)
}

export async function getStudioSpaces(
  client: SanityClient
): Promise<ResourceListItem[]> {
  return await client.fetch<ResourceListItem[]>(studioSpacesQuery)
}

export async function getEquipment(
  client: SanityClient
): Promise<ResourceListItem[]> {
  return await client.fetch<ResourceListItem[]>(equipmentQuery)
}
