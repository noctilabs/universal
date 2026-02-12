/**
 * Sanity-specific primitive types
 */

export interface Slug {
  _type: "slug"
  current: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  openGraphImage?: SanityImage
}

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityFile {
  _type: "file"
  asset: {
    _ref: string
    _type: "reference"
  }
}

export interface BlockContent {
  _type: "block"
  _key: string
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
  children: Array<{
    _type: "span"
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _key: string
    _type: string
    [key: string]: unknown
  }>
  level?: number
  listItem?: "bullet" | "number"
}

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}
