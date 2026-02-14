import { createClient, type SanityClient } from "@sanity/client"

/**
 * Configuration for creating a Sanity client
 */
export interface SanityClientConfig {
  projectId: string
  dataset: string
  apiVersion?: string
  token?: string
  useCdn?: boolean
}

/**
 * Creates a configured Sanity client.
 * Use projectId and dataset from env (e.g. SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID).
 */
export function createSanityClient(config: SanityClientConfig): SanityClient {
  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion ?? "2024-01-01",
    token: config.token,
    useCdn: config.useCdn ?? true,
  })
}
