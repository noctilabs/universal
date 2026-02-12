import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMediaItem } from "@lib/sanity/queries"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const media = await getMediaItem(slug)

  if (!media) {
    return {
      title: "Media Not Found",
    }
  }

  return {
    title: media.title,
    description: media.shortDescription || media.seo?.metaDescription,
  }
}

export default async function MediaDetailPage({ params }: Props) {
  const { slug } = await params
  const media = await getMediaItem(slug)

  if (!media) {
    notFound()
  }

  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/media" className="text-ui-fg-subtle hover:text-ui-fg-base">
          Media Library
        </Link>
        <span className="mx-2 text-ui-fg-subtle">/</span>
        <span>{media.title}</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-ui-fg-subtle uppercase mb-2">
            {media.category}
          </div>
          <h1 className="text-4xl font-bold mb-4">{media.title}</h1>

          {media.shortDescription && (
            <p className="text-lg text-ui-fg-subtle mb-4">
              {media.shortDescription}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-ui-fg-subtle">
            {media.author && <span>By {media.author}</span>}
            {media.publishedDate && (
              <>
                <span>•</span>
                <span>
                  {new Date(media.publishedDate).toLocaleDateString()}
                </span>
              </>
            )}
            {(media.downloadCount ?? 0) > 0 && (
              <>
                <span>•</span>
                <span>{media.downloadCount} downloads</span>
              </>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {media.featuredImage && (
          <div className="mb-8">
            <img
              src={media.featuredImage}
              alt={media.featuredImageAlt || media.title}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none mb-8">
          <p className="text-ui-fg-subtle">
            {media.shortDescription || "Content description coming soon..."}
          </p>
        </div>

        {/* Download/View CTA */}
        {(media.fileUrl || media.videoUrl) && (
          <div className="border-t pt-8">
            {media.fileUrl && (
              <a
                href={media.fileUrl}
                download
                className="inline-block bg-ui-bg-interactive text-white px-6 py-3 rounded-lg font-semibold hover:bg-ui-bg-interactive-hover transition-colors"
              >
                Download {media.category}
              </a>
            )}

            {media.videoUrl && (
              <div className="aspect-video">
                <iframe
                  src={media.videoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )}

            {media.fileSize && (
              <div className="mt-4 text-sm text-ui-fg-subtle">
                File size: {(media.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {media.tags && media.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {media.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-ui-bg-subtle rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
