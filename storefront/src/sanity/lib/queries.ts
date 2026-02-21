import { groq } from 'next-sanity'

export const eventsQuery = groq`
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

export const eventBySlugQuery = groq`
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

export const mediaQuery = groq`
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

export const mediaBySlugQuery = groq`
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

export const resourcesQuery = groq`
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

export const resourceBySlugQuery = groq`
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

export const studioSpacesQuery = groq`
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

export const equipmentQuery = groq`
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
