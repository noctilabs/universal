import { sanityFetch } from './live'
import {
  eventsQuery,
  eventBySlugQuery,
  mediaQuery,
  mediaBySlugQuery,
  resourcesQuery,
  resourceBySlugQuery,
  studioSpacesQuery,
  equipmentQuery,
  siteSettingsQuery,
  aboutPageQuery,
  agendaPageQuery,
  archivePageQuery,
} from './queries'
import type {
  EventListItem,
  EventDetail,
  MediaListItem,
  MediaDetail,
  ResourceListItem,
  ResourceDetail,
  SiteSettings,
  AboutPageData,
  AgendaPageData,
  ArchivePageData,
} from '@universal/types'

export async function getEvents(): Promise<EventListItem[]> {
  const { data } = await sanityFetch({ query: eventsQuery })
  return data as EventListItem[]
}

export async function getEvent(slug: string): Promise<EventDetail | null> {
  const { data } = await sanityFetch({ query: eventBySlugQuery, params: { slug } })
  return data as EventDetail | null
}

export async function getMedia(category?: string): Promise<MediaListItem[]> {
  const { data } = await sanityFetch({
    query: mediaQuery,
    params: { category: category ?? undefined },
  })
  return data as MediaListItem[]
}

export async function getMediaItem(slug: string): Promise<MediaDetail | null> {
  const { data } = await sanityFetch({ query: mediaBySlugQuery, params: { slug } })
  return data as MediaDetail | null
}

export async function getResources(type?: string): Promise<ResourceListItem[]> {
  const { data } = await sanityFetch({
    query: resourcesQuery,
    params: { type: type ?? undefined },
  })
  return data as ResourceListItem[]
}

export async function getResource(slug: string): Promise<ResourceDetail | null> {
  const { data } = await sanityFetch({ query: resourceBySlugQuery, params: { slug } })
  return data as ResourceDetail | null
}

export async function getResourcesByType(type: string): Promise<ResourceListItem[]> {
  return getResources(type)
}

export async function getStudioSpaces(): Promise<ResourceListItem[]> {
  const { data } = await sanityFetch({ query: studioSpacesQuery })
  return data as ResourceListItem[]
}

export async function getEquipment(): Promise<ResourceListItem[]> {
  const { data } = await sanityFetch({ query: equipmentQuery })
  return data as ResourceListItem[]
}

// ── Singleton page fetches ────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({ query: siteSettingsQuery })
  return data as SiteSettings | null
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  const { data } = await sanityFetch({ query: aboutPageQuery })
  return data as AboutPageData | null
}

export async function getAgendaPage(): Promise<AgendaPageData | null> {
  const { data } = await sanityFetch({ query: agendaPageQuery })
  return data as AgendaPageData | null
}

export async function getArchivePage(): Promise<ArchivePageData | null> {
  const { data } = await sanityFetch({ query: archivePageQuery })
  return data as ArchivePageData | null
}
