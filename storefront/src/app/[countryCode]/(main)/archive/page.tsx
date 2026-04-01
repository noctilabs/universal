import { Metadata } from "next"
import ArchiveContent from "@modules/archive/components/archive-content"
import { getArchivePage } from "../../../../sanity/lib/fetch"

export const metadata: Metadata = {
  title: "Archive | Universal",
  description:
    "Explore the Universal archive — an immersive collection of editorial photography, art, and culture.",
}

export default async function ArchivePage() {
  const cmsData = await getArchivePage()
  return <ArchiveContent cmsFrames={cmsData?.frames} />
}
