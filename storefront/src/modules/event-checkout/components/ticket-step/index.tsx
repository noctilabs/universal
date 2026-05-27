"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import ContinueButton from "../continue-button"

export type TicketType = {
  id: string
  label: string
  price: number
  currency: string
}

type Quantities = Record<string, number>

type TicketStepProps = {
  ticketTypes: TicketType[]
}

export default function TicketStep({ ticketTypes }: TicketStepProps) {
  const router = useRouter()
  const params = useParams<{ countryCode: string; slug: string }>()
  const searchParams = useSearchParams()
  const [quantities, setQuantities] = useState<Quantities>(
    Object.fromEntries(ticketTypes.map((t) => [t.id, Number(searchParams.get(t.id) ?? 1)]))
  )
  const [discountOpen, setDiscountOpen] = useState(Boolean(searchParams.get("discount")))
  const [discountCode, setDiscountCode] = useState(searchParams.get("discount") ?? "")

  const adjust = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + delta),
    }))
  }

  const handleContinue = () => {
    const qs = new URLSearchParams()
    ticketTypes.forEach((t) => qs.set(t.id, String(quantities[t.id] ?? 0)))
    if (discountCode) qs.set("discount", discountCode)
    router.push(
      `/${params.countryCode}/events/${params.slug}/checkout/register?${qs.toString()}`
    )
  }

  return (
    <div className="event-checkout-step">
      <div className="event-checkout-step-body">
        {/* Ticket grid: two columns */}
        <div className="grid grid-cols-2 gap-x-[54px] mb-6">
          {ticketTypes.map((ticket) => (
            <div key={ticket.id} className="event-checkout-ticket-card">
              <div>
                <p className="uppercase text-black text-[28px] leading-none font-neue-haas">
                  {ticket.label}
                </p>
                <p className="uppercase text-black text-[28px] leading-none font-neue-haas mt-2">
                  {ticket.currency} {ticket.price}
                </p>
              </div>
              <div className="event-checkout-qty-control">
                <button
                  onClick={() => adjust(ticket.id, -1)}
                  className="text-black text-[28px] leading-none w-8 text-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-black text-[28px] leading-none">
                  {quantities[ticket.id]}
                </span>
                <button
                  onClick={() => adjust(ticket.id, 1)}
                  className="text-black text-[28px] leading-none w-8 text-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount code row */}
        <div className="bg-[#d9d9d9] h-[59px] flex items-center justify-between px-[27.5px] w-full">
          <button
            onClick={() => setDiscountOpen((v) => !v)}
            className="uppercase text-black text-[28px] font-neue-haas text-left w-full"
          >
            HAVE A DISCOUNT CODE?
          </button>
          {discountOpen && (
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="CODE"
              className="bg-transparent border-b border-black text-black uppercase outline-none text-[18px] font-neue-haas ml-4 w-48"
              style={{ fontFamily: "Neue Haas Grotesk Display Std, sans-serif" }}
            />
          )}
        </div>
      </div>

      <div className="event-checkout-step-footer">
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  )
}
