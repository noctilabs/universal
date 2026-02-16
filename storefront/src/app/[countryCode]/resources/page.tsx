import { Metadata } from "next"
import { getResources } from "../../../sanity/lib/fetch"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Studio Resources & Bookings",
  description: "Browse our studio spaces, equipment rentals, and meeting rooms",
}

export default async function ResourcesPage() {
  const resources = await getResources()

  const resourceTypes = [
    { value: "studio_space", label: "Studio Spaces", icon: "🎙️" },
    { value: "recording_studio", label: "Recording Studios", icon: "🎵" },
    { value: "rehearsal_room", label: "Rehearsal Rooms", icon: "🎸" },
    { value: "meeting_room", label: "Meeting Rooms", icon: "🏢" },
    { value: "equipment", label: "Equipment", icon: "🎧" },
  ]

  return (
    <div className="content-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Studio Resources & Bookings</h1>
        <p className="text-ui-fg-subtle mt-2">
          Book studio spaces, rent equipment, or reserve meeting rooms
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/resources"
          className="px-4 py-2 rounded-lg border bg-ui-bg-base hover:bg-ui-bg-subtle transition-colors text-sm font-medium"
        >
          All Resources
        </Link>
        {resourceTypes.map((type) => (
          <Link
            key={type.value}
            href={`/resources?type=${type.value}`}
            className="px-4 py-2 rounded-lg border hover:bg-ui-bg-subtle transition-colors text-sm"
          >
            {type.icon} {type.label}
          </Link>
        ))}
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ui-fg-subtle">No resources available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource: any) => (
            <Link
              key={resource._id}
              href={`/resources/${resource.slug}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {resource.featuredImage && (
                <div className="aspect-video overflow-hidden bg-ui-bg-subtle">
                  <img
                    src={resource.featuredImage}
                    alt={resource.featuredImageAlt || resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="text-xs text-ui-fg-subtle uppercase mb-2">
                  {resource.resourceType.replace("_", " ")}
                </div>
                <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                {resource.shortDescription && (
                  <p className="text-ui-fg-subtle text-sm mb-3 line-clamp-2">
                    {resource.shortDescription}
                  </p>
                )}

                <div className="space-y-1 text-sm">
                  {resource.hourlyRate && (
                    <div className="flex items-center justify-between">
                      <span className="text-ui-fg-subtle">Hourly:</span>
                      <span className="font-semibold">
                        ${resource.hourlyRate} {resource.currency?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {resource.dailyRate && (
                    <div className="flex items-center justify-between">
                      <span className="text-ui-fg-subtle">Daily:</span>
                      <span className="font-semibold">
                        ${resource.dailyRate} {resource.currency?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {resource.capacity && (
                    <div className="text-ui-fg-subtle mt-2">
                      Capacity: {resource.capacity} people
                    </div>
                  )}
                  {resource.squareFootage && (
                    <div className="text-ui-fg-subtle">
                      {resource.squareFootage} sq ft
                    </div>
                  )}
                </div>

                {resource.features && resource.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {resource.features.slice(0, 3).map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-ui-bg-subtle rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {resource.features.length > 3 && (
                      <span className="text-xs text-ui-fg-subtle px-2 py-1">
                        +{resource.features.length - 3} more
                      </span>
                    )}
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
