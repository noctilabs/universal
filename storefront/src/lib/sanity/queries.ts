import {
  getEvents as getEventsQuery,
  getEvent as getEventQuery,
  getMedia as getMediaQuery,
  getMediaItem as getMediaItemQuery,
} from "@universal/sanity"
import { sanityClient } from "./client"

export async function getEvents() {
  return getEventsQuery(sanityClient)
}

export async function getEvent(slug: string) {
  return getEventQuery(sanityClient, slug)
}

export async function getMedia(category?: string) {
  return getMediaQuery(sanityClient, category)
}

export async function getMediaItem(slug: string) {
  return getMediaItemQuery(sanityClient, slug)
}
