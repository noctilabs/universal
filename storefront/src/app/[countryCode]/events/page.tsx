import { Metadata } from "next"
import { getEvents } from "../../../sanity/lib/fetch"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming events and book tickets",
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="content-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-ui-fg-subtle mt-2">
          Browse our upcoming events and secure your tickets
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ui-fg-subtle">No events available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event._id}
              href={`/events/${event.slug}/checkout/tickets`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {event.featuredImage && (
                <div className="aspect-video overflow-hidden bg-ui-bg-subtle">
                  <img
                    src={event.featuredImage}
                    alt={event.featuredImageAlt || event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                {event.shortDescription && (
                  <p className="text-ui-fg-subtle text-sm mb-3 line-clamp-2">
                    {event.shortDescription}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ui-fg-subtle">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                  <span className="font-semibold">
                    ${event.ticketPrice} {event.currency?.toUpperCase()}
                  </span>
                </div>
                {event.city && (
                  <div className="mt-2 text-sm text-ui-fg-subtle">
                    📍 {event.city}{event.country && `, ${event.country}`}
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
