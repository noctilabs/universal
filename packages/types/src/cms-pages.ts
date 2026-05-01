// ── Site Settings ────────────────────────────────────────────────────────────

export interface SiteSettingsFooter {
  contactText_en?: string
  contactText_es?: string
  email?: string
  address?: string
  instagramUrl?: string
  instagramLabel?: string
  copyright_en?: string
  copyright_es?: string
}

export interface SiteSettingsNavigation {
  aboutLabel_en?: string
  aboutLabel_es?: string
  archiveLabel_en?: string
  archiveLabel_es?: string
  agendaLabel_en?: string
  agendaLabel_es?: string
}

export interface SiteSettings {
  _type: "siteSettings"
  footer?: SiteSettingsFooter
  navigation?: SiteSettingsNavigation
  landingImageUrl?: string
}

// ── About Page ────────────────────────────────────────────────────────────────

export interface AboutPageData {
  _type: "aboutPage"
  featuredImageUrl?: string
  hoverLogoUrl?: string
  hoverGlobeUrl?: string
  hoverHotelUrl?: string
  paragraph1_en?: string
  paragraph1_es?: string
  paragraph2_en?: string
  paragraph2_es?: string
  descriptionText_en?: string
  descriptionText_es?: string
}

// ── Agenda Page ───────────────────────────────────────────────────────────────

export interface AgendaRowItemData {
  text: string
  leftPx: number
  topPx: number
  size: "large" | "small"
  hoverImageUrl?: string
  hoverImagePosition?: "above" | "right" | "below" | "left"
}

export interface AgendaRowData {
  rowId: string
  href: string
  items: AgendaRowItemData[]
}

export interface AgendaPageData {
  _type: "agendaPage"
  rows?: AgendaRowData[]
}

// ── Archive Page ──────────────────────────────────────────────────────────────

export interface ArchiveFrameData {
  title: string
  imageUrl: string
  phi: number
  theta: number
  tiltX: number
  tiltY: number
  tiltZ: number
  scale: number
  aspect: number
  slug?: string
  year?: string
  typeOfProject?: string
  artDirection?: string
  photography?: string
  description_en?: string
  description_es?: string
}

export interface ArchivePageData {
  _type: "archivePage"
  frames?: ArchiveFrameData[]
}
