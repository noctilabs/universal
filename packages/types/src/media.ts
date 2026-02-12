import type {
  SanityDocument,
  Slug,
  SEO,
  SanityImage,
  SanityFile,
  BlockContent,
} from "./sanity.js"

/**
 * Media category enum
 */
export enum MediaCategory {
  WHITE_PAPER = "whitePaper",
  CASE_STUDY = "caseStudy",
  GUIDE = "guide",
  REPORT = "report",
  ARTICLE = "article",
  VIDEO = "video",
  OTHER = "other",
}

/**
 * Media type definition from Sanity
 */
export interface Media extends SanityDocument {
  _type: "media"
  title: string
  slug: Slug
  category: MediaCategory
  description?: BlockContent[]
  shortDescription?: string
  featuredImage?: SanityImage
  file?: SanityFile
  fileUrl?: string
  publishedDate?: string
  author?: string
  tags?: string[]
  seo?: SEO
  // For videos
  videoUrl?: string
  videoDuration?: number
  // For downloads
  downloadCount?: number
  fileSize?: number // in bytes
  fileType?: string // e.g., 'application/pdf'
}

/**
 * Media list response with pagination
 */
export interface MediaListResponse {
  media: Media[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Media filter options
 */
export interface MediaFilters {
  category?: MediaCategory[]
  tags?: string[]
  search?: string
  author?: string
}

/**
 * Media as returned from GROQ queries (projected fields)
 */
export interface MediaListItem extends Pick<SanityDocument, "_id" | "_createdAt" | "_updatedAt"> {
  _type: "media"
  title: string
  slug: string
  category: string
  shortDescription?: string
  description?: BlockContent[]
  featuredImage?: string
  featuredImageAlt?: string
  fileUrl?: string
  publishedDate?: string
  author?: string
  tags?: string[]

  videoUrl?: string
  videoDuration?: number
  downloadCount?: number
  fileSize?: number
  fileType?: string
  seo?: SEO
}

/**
 * Media detail as returned from GROQ queries (same as MediaListItem for detail view)
 */
export type MediaDetail = MediaListItem
