import {
  getResources as getResourcesQuery,
  getResource as getResourceQuery,
  getResourcesByType as getResourcesByTypeQuery,
  getStudioSpaces as getStudioSpacesQuery,
  getEquipment as getEquipmentQuery,
} from "@universal/sanity"
import { sanityClient } from "./client"

export async function getResources(type?: string) {
  return getResourcesQuery(sanityClient, type)
}

export async function getResource(slug: string) {
  return getResourceQuery(sanityClient, slug)
}

export async function getResourcesByType(type: string) {
  return getResourcesByTypeQuery(sanityClient, type)
}

export async function getStudioSpaces() {
  return getStudioSpacesQuery(sanityClient)
}

export async function getEquipment() {
  return getEquipmentQuery(sanityClient)
}
