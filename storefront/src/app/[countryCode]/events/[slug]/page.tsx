import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getEvent } from "../../../../sanity/lib/fetch"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: event.title,
    description: event.shortDescription || event.seo?.metaDescription,
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  const eventDate = new Date(event.eventDate)
  const isPastEvent = eventDate < new Date()

  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/events" className="text-ui-fg-subtle hover:text-ui-fg-base">
          Events
        </Link>
        <span className="mx-2 text-ui-fg-subtle">/</span>
        <span>{event.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          {event.featuredImage && (
            <img
              src={event.featuredImage}
              alt={event.featuredImageAlt || event.title}
              className="w-full rounded-lg"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          {event.shortDescription && (
            <p className="text-lg text-ui-fg-subtle mb-6">
              {event.shortDescription}
            </p>
          )}

          {/* Event Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <span className="text-ui-fg-subtle mr-2">📅</span>
              <div>
                <div className="font-semibold">
                  {eventDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-sm text-ui-fg-subtle">
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {event.venue && (
              <div className="flex items-start">
                <span className="text-ui-fg-subtle mr-2">📍</span>
                <div>
                  <div className="font-semibold">{event.venue}</div>
                  {event.address && (
                    <div className="text-sm text-ui-fg-subtle">{event.address}</div>
                  )}
                  {event.city && (
                    <div className="text-sm text-ui-fg-subtle">
                      {event.city}{event.country && `, ${event.country}`}
                    </div>
                  )}
                </div>
              </div>
            )}

            {event.capacity && (
              <div className="flex items-start">
                <span className="text-ui-fg-subtle mr-2">👥</span>
                <div className="font-semibold">{event.capacity} attendees</div>
              </div>
            )}
          </div>

          {/* Price and CTA */}
          <div className="border-t pt-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">
                ${event.ticketPrice}
              </span>
              <span className="text-ui-fg-subtle">
                {event.currency?.toUpperCase()} per ticket
              </span>
            </div>

            {!isPastEvent && event.medusaProductId ? (
              <Link
                href={`/products/${event.slug}`}
                className="block w-full bg-ui-bg-interactive text-center py-3 px-6 rounded-lg font-semibold hover:bg-ui-bg-interactive-hover transition-colors"
              >
                Get Tickets
              </Link>
            ) : isPastEvent ? (
              <div className="text-ui-fg-subtle text-center py-3">
                This event has already taken place
              </div>
            ) : (
              <div className="text-ui-fg-subtle text-center py-3">
                Tickets not yet available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          {/* Note: In production, you'd use a proper rich text renderer */}
          <div className="text-ui-fg-subtle">
            {event.shortDescription || "Event description coming soon..."}
          </div>
        </div>
      )}

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
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
  )
}
