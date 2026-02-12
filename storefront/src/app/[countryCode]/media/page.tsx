import { Metadata } from "next"
import { getMedia } from "@lib/sanity/queries"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Media Library",
  description: "Browse white papers, case studies, and other resources",
}

export default async function MediaPage() {
  const media = await getMedia()

  const categories = [
    { value: "whitePaper", label: "White Papers" },
    { value: "caseStudy", label: "Case Studies" },
    { value: "guide", label: "Guides" },
    { value: "report", label: "Reports" },
    { value: "article", label: "Articles" },
    { value: "video", label: "Videos" },
  ]

  return (
    <div className="content-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-ui-fg-subtle mt-2">
          Explore our collection of resources and insights
        </p>
      </div>

      {/* Category Filter - Simplified for now */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className="px-4 py-2 rounded-lg border hover:bg-ui-bg-subtle transition-colors text-sm"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {media.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ui-fg-subtle">No media available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <Link
              key={item._id}
              href={`/media/${item.slug}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.featuredImage && (
                <div className="aspect-video overflow-hidden bg-ui-bg-subtle">
                  <img
                    src={item.featuredImage}
                    alt={item.featuredImageAlt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="text-xs text-ui-fg-subtle uppercase mb-2">
                  {item.category}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                {item.shortDescription && (
                  <p className="text-ui-fg-subtle text-sm mb-3 line-clamp-2">
                    {item.shortDescription}
                  </p>
                )}
                {item.author && (
                  <div className="text-sm text-ui-fg-subtle">
                    By {item.author}
                  </div>
                )}
                {item.publishedDate && (
                  <div className="text-xs text-ui-fg-subtle mt-2">
                    {new Date(item.publishedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
