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
    "ticketTypes": ticketTypes[] {
      id,
      label,
      price,
      currency
    },
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

// ── Singleton page queries ────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    footer,
    navigation,
    "landingImageUrl": landingImage.asset->url
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    "featuredImageUrl": featuredImage.asset->url,
    "hoverLogoUrl": hoverLogoImage.asset->url,
    "hoverGlobeUrl": hoverGlobeImage.asset->url,
    "hoverHotelUrl": hoverHotelImage.asset->url,
    paragraph1_en,
    paragraph1_es,
    paragraph2_en,
    paragraph2_es,
    descriptionText_en,
    descriptionText_es
  }
`

export const agendaPageQuery = groq`
  *[_type == "agendaPage"][0] {
    "rows": rows[] {
      rowId,
      href,
      "items": items[] {
        text,
        leftPx,
        topPx,
        size,
        "hoverImageUrl": hoverImage.asset->url,
        hoverImagePosition
      }
    }
  }
`

export const archivePageQuery = groq`
  *[_type == "archivePage"][0] {
    "frames": frames[] {
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      phi,
      theta,
      tiltX,
      tiltY,
      tiltZ,
      scale,
      aspect,
      year,
      typeOfProject,
      artDirection,
      photography,
      description_en,
      description_es
    }
  }
`