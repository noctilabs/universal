import { notFound } from "next/navigation"
import { getEvent } from "sanity/lib/fetch"
import TicketStep, { type TicketType } from "@modules/event-checkout/components/ticket-step"

export const metadata = { title: "Tickets" }

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export default async function TicketsPage({ params }: Props) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) notFound()

  const ticketTypes: TicketType[] =
    event.ticketTypes && event.ticketTypes.length > 0
      ? event.ticketTypes
      : [
          {
            id: "ticket",
            label: "TICKET",
            price: event.ticketPrice ?? 0,
            currency: (event.currency ?? "usd").toUpperCase(),
          },
        ]

  return (
    <>
      <div className="px-[56px] pt-[160px] pb-0">
        <ol className="list-decimal ml-[42px] uppercase text-black text-[28px] font-neue-haas" start={1}>
          <li><span className="leading-none">TICKETS</span></li>
        </ol>
      </div>
      <hr className="event-checkout-divider mt-[44px]" />
      <TicketStep ticketTypes={ticketTypes} />
    </>
  )
}
