"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import CheckoutInput from "../checkout-input"
import ContinueButton from "../continue-button"

type PayFormState = {
  cardNumber: string
  cardNumber2: string
  expiryDate: string
  nameOnCard: string
}

export default function PayStep() {
  const router = useRouter()
  const params = useParams<{ countryCode: string; slug: string }>()

  const [form, setForm] = useState<PayFormState>({
    cardNumber: "",
    cardNumber2: "",
    expiryDate: "",
    nameOnCard: "",
  })

  const set = (field: keyof PayFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleContinue = () => {
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

      {/* Card number + Expiry — split row */}
      <div className="grid grid-cols-2 gap-x-[54px] mb-4">
        <CheckoutInput
          label="CARD NUMBER"
          name="cardNumber2"
          value={form.cardNumber2}
          onChange={set("cardNumber2")}
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

      {/* Continue */}
      <div className="flex justify-end">
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  )
}
