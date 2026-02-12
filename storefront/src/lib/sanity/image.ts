import { urlFor as urlForFn } from "@universal/sanity"
import { sanityClient } from "./client"

export function urlFor(source: string) {
  return urlForFn(sanityClient, source)
}
