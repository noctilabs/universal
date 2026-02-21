import { client } from './client'
import {
  eventsQuery,
  eventBySlugQuery,
  mediaQuery,
  mediaBySlugQuery,
  resourcesQuery,
  resourceBySlugQuery,
  studioSpacesQuery,
  equipmentQuery,
} from './queries'
import type {
  EventListItem,
  EventDetail,
  MediaListItem,
  MediaDetail,
  ResourceListItem,
  ResourceDetail,
} from '@universal/types'

export async function getEvents(): Promise<EventListItem[]> {
  return client.fetch<EventListItem[]>(eventsQuery)
}

export async function getEvent(slug: string): Promise<EventDetail | null> {
  return client.fetch<EventDetail | null>(eventBySlugQuery, { slug })
}

export async function getMedia(category?: string): Promise<MediaListItem[]> {
  return client.fetch<MediaListItem[]>(mediaQuery, {
    category: category ?? undefined,
  })
}

export async function getMediaItem(slug: string): Promise<MediaDetail | null> {
  return client.fetch<MediaDetail | null>(mediaBySlugQuery, { slug })
}

export async function getResources(type?: string): Promise<ResourceListItem[]> {
  return client.fetch<ResourceListItem[]>(resourcesQuery, {
    type: type ?? undefined,
  })
}

export async function getResource(slug: string): Promise<ResourceDetail | null> {
  return client.fetch<ResourceDetail | null>(resourceBySlugQuery, { slug })
}

export async function getResourcesByType(type: string): Promise<ResourceListItem[]> {
  return getResources(type)
}

export async function getStudioSpaces(): Promise<ResourceListItem[]> {
  return client.fetch<ResourceListItem[]>(studioSpacesQuery)
}

export async function getEquipment(): Promise<ResourceListItem[]> {
  return client.fetch<ResourceListItem[]>(equipmentQuery)
}
