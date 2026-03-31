import { Metadata } from "next"
import ArchiveContent from "@modules/archive/components/archive-content"

export const metadata: Metadata = {
  title: "Archive | Universal",
  description:
    "Explore the Universal archive — an immersive collection of editorial photography, art, and culture.",
}

export default function ArchivePage() {
  return <ArchiveContent />
}
