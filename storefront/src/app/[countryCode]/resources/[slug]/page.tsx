import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getResource } from "../../../../sanity/lib/fetch"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = await getResource(slug)

  if (!resource) {
    return {
      title: "Resource Not Found",
    }
  }

  return {
    title: resource.title,
    description: resource.shortDescription || resource.seo?.metaDescription,
  }
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params
  const resource = await getResource(slug)

  if (!resource) {
    notFound()
  }

  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/resources" className="text-ui-fg-subtle hover:text-ui-fg-base">
          Resources
        </Link>
        <span className="mx-2 text-ui-fg-subtle">/</span>
        <span>{resource.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {resource.featuredImage && (
            <img
              src={resource.featuredImage}
              alt={resource.featuredImageAlt || resource.title}
              className="w-full rounded-lg mb-4"
            />
          )}

          {/* Gallery */}
          {resource.gallery && resource.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {resource.gallery.slice(0, 6).map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${resource.title} ${idx + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-ui-fg-subtle uppercase mb-2">
            {resource.resourceType.replace("_", " ")}
          </div>
          <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>

          {resource.shortDescription && (
            <p className="text-lg text-ui-fg-subtle mb-6">
              {resource.shortDescription}
            </p>
          )}

          {/* Pricing */}
          <div className="border-t border-b py-4 mb-6">
            {resource.hourlyRate && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-ui-fg-subtle">Hourly Rate:</span>
                <span className="text-2xl font-bold">
                  ${resource.hourlyRate} {resource.currency?.toUpperCase()}
                </span>
              </div>
            )}
            {resource.dailyRate && (
              <div className="flex items-center justify-between">
                <span className="text-ui-fg-subtle">Daily Rate:</span>
                <span className="text-2xl font-bold">
                  ${resource.dailyRate} {resource.currency?.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="space-y-3 mb-6">
            {resource.capacity && (
              <div className="flex items-start">
                <span className="text-ui-fg-subtle mr-2">👥</span>
                <div>
                  <div className="font-semibold">Capacity</div>
                  <div className="text-sm text-ui-fg-subtle">
                    Up to {resource.capacity} people
                  </div>
                </div>
              </div>
            )}

            {resource.squareFootage && (
              <div className="flex items-start">
                <span className="text-ui-fg-subtle mr-2">📐</span>
                <div>
                  <div className="font-semibold">Size</div>
                  <div className="text-sm text-ui-fg-subtle">
                    {resource.squareFootage} square feet
                  </div>
                </div>
              </div>
            )}

            {resource.equipmentDetails && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Equipment Details</h3>
                <div className="space-y-1 text-sm">
                  {resource.equipmentDetails.brand && (
                    <div>
                      <span className="text-ui-fg-subtle">Brand:</span>{" "}
                      {resource.equipmentDetails.brand}
                    </div>
                  )}
                  {resource.equipmentDetails.model && (
                    <div>
                      <span className="text-ui-fg-subtle">Model:</span>{" "}
                      {resource.equipmentDetails.model}
                    </div>
                  )}
                  {resource.equipmentDetails.quantity && (
                    <div>
                      <span className="text-ui-fg-subtle">Available:</span>{" "}
                      {resource.equipmentDetails.quantity} units
                    </div>
                  )}
                  {resource.equipmentDetails.condition && (
                    <div>
                      <span className="text-ui-fg-subtle">Condition:</span>{" "}
                      {resource.equipmentDetails.condition}
                    </div>
                  )}
                  {resource.equipmentDetails.requiresDeposit && (
                    <div className="text-amber-600 mt-2">
                      💰 Requires ${resource.equipmentDetails.depositAmount} deposit
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {resource.medusaResourceId ? (
            <Link
              href={`/bookings/new?resource=${resource.medusaResourceId}`}
              className="block w-full bg-ui-bg-interactive text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-ui-bg-interactive-hover transition-colors"
            >
              Book This Resource
            </Link>
          ) : (
            <div className="text-center py-3 px-6 border rounded-lg text-ui-fg-subtle">
              Booking coming soon
            </div>
          )}
        </div>
      </div>

      {/* Features & Amenities */}
      {resource.features && resource.features.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {resource.features.map((feature: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-ui-bg-subtle rounded-lg text-sm"
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Technical Specs */}
      {resource.technicalSpecs && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.technicalSpecs.soundproofing && (
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Soundproofing</span>
              </div>
            )}
            {resource.technicalSpecs.acousticTreatment && (
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Acoustic Treatment</span>
              </div>
            )}
            {resource.technicalSpecs.controlRoom && (
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Control Room</span>
              </div>
            )}
            {resource.technicalSpecs.instruments && resource.technicalSpecs.instruments.length > 0 && (
              <div className="col-span-2">
                <div className="font-semibold mb-2">Available Instruments:</div>
                <div className="flex flex-wrap gap-2">
                  {resource.technicalSpecs.instruments.map((inst: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-ui-bg-subtle rounded text-sm">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {resource.description && (
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">About This Resource</h2>
          <div className="text-ui-fg-subtle">
            {resource.shortDescription || "Full description coming soon..."}
          </div>
        </div>
      )}
    </div>
  )
}
