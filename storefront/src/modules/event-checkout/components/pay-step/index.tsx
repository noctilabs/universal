"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import CheckoutInput from "../checkout-input"
import ContinueButton from "../continue-button"

type PayFormState = {
  cardNumber: string
  cvv: string
  expiryDate: string
  nameOnCard: string
}

export default function PayStep() {
  const router = useRouter()
  const params = useParams<{ countryCode: string; slug: string }>()
  const searchParams = useSearchParams()

  const [form, setForm] = useState<PayFormState>({
    cardNumber: searchParams.get("cardNumber") ?? "",
    cvv: searchParams.get("cvv") ?? "",
    expiryDate: searchParams.get("expiryDate") ?? "",
    nameOnCard: searchParams.get("nameOnCard") ?? "",
  })

  const set = (field: keyof PayFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleContinue = () => {
    const qs = new URLSearchParams(searchParams.toString())
    Object.entries(form).forEach(([k, v]) => qs.set(k, v))
    router.push(`/${params.countryCode}/events/${params.slug}?booked=1`)
  }

  return (
    <div className="px-[80px] py-[44px]">
      <p className="uppercase text-black text-[28px] font-neue-haas mb-8">
        YOU ALMOST HAVE YOUR TICKETS
      </p>

      {/* Card number — full width */}
      <div className="mb-4">
        <CheckoutInput
          label="CARD NUMBER"
          name="cardNumber"
          value={form.cardNumber}
          onChange={set("cardNumber")}
          className="w-full"
        />
      </div>

      {/* CVV + EXPIRY — split row */}
      <div className="grid grid-cols-2 gap-x-[54px] mb-4">
        <CheckoutInput
          label="CVV"
          name="cvv"
          value={form.cvv}
          onChange={set("cvv")}
        />
        <CheckoutInput
          label="EXPIRY DATE"
          name="expiryDate"
          value={form.expiryDate}
          onChange={set("expiryDate")}
        />
      </div>

      {/* Name on card — full width */}
      <div className="mb-8">
        <CheckoutInput
          label="NAME ON CARD"
          name="nameOnCard"
          value={form.nameOnCard}
          onChange={set("nameOnCard")}
          className="w-full"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            const qs = new URLSearchParams(searchParams.toString())
            Object.entries(form).forEach(([k, v]) => qs.set(k, v))
            router.push(`/${params.countryCode}/events/${params.slug}/checkout/register?${qs.toString()}`)
          }}
          className="uppercase text-black text-[18px] font-neue-haas underline underline-offset-4"
        >
          ← Back
        </button>
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  )
}
