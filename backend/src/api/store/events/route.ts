import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { createSanityClient, getEvents } = await import("@universal/sanity")
  const sanityClient = createSanityClient({
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: true,
  })

  try {
    const events = await getEvents(sanityClient)
    res.json({ events })
  } catch (error) {
    console.error("Error fetching events from Sanity:", error)
    res.status(500).json({
      message: "Failed to fetch events",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
