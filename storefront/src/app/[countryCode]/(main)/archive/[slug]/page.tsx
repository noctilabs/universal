import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getArchivePage } from "../../../../../sanity/lib/fetch"
import ArchiveProjectContent from "@modules/archive/components/archive-project-content"
import Footer from "@modules/layout/templates/footer"

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cmsData = await getArchivePage()
  const frames = cmsData?.frames ?? []
  const frame = frames.find((f) => (f.slug ?? slugify(f.title)) === slug)
  if (!frame) return { title: "Archive | Universal" }
  return {
    title: `${frame.title} | Universal`,
    description: frame.description_en ?? frame.description_es ?? undefined,
  }
}

export default async function ArchiveProjectPage({ params }: Props) {
  const { slug } = await params
  const cmsData = await getArchivePage()
  const frames = cmsData?.frames ?? []

  const index = frames.findIndex((f) => (f.slug ?? slugify(f.title)) === slug)
  if (index === -1) notFound()

  const frame = frames[index]
  const prevFrame = index > 0 ? frames[index - 1] : null
  const nextFrame = index < frames.length - 1 ? frames[index + 1] : frames[0]

  const project = {
    title: frame.title,
    imageUrl: frame.imageUrl,
    slug: frame.slug ?? slugify(frame.title),
    year: frame.year,
    typeOfProject: frame.typeOfProject,
    artDirection: frame.artDirection,
    photography: frame.photography,
    description_en: frame.description_en,
    description_es: frame.description_es,
  }

  const prevSlug = prevFrame ? (prevFrame.slug ?? slugify(prevFrame.title)) : null
  const nextSlug = nextFrame ? (nextFrame.slug ?? slugify(nextFrame.title)) : null

  return (
    <>
      <ArchiveProjectContent
        project={project}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
      <Footer />
    </>
  )
}
