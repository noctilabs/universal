"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import CheckoutInput from "../checkout-input"
import ContinueButton from "../continue-button"

type FormState = {
  name: string
  lastName: string
  country: string
  city: string
  email: string
  phone: string
}

export default function RegisterStep() {
  const router = useRouter()
  const params = useParams<{ countryCode: string; slug: string }>()
  const searchParams = useSearchParams()

  const [form, setForm] = useState<FormState>({
    name: searchParams.get("name") ?? "",
    lastName: searchParams.get("lastName") ?? "",
    country: searchParams.get("country") ?? "",
    city: searchParams.get("city") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
  })
  const [termsAccepted, setTermsAccepted] = useState(searchParams.get("terms") === "true")
  const [newsletterAccepted, setNewsletterAccepted] = useState(searchParams.get("newsletter") === "true")

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const canContinue =
    termsAccepted &&
    Boolean(form.name.trim()) &&
    Boolean(form.lastName.trim()) &&
    Boolean(form.email.trim())

  const handleContinue = () => {
    if (!canContinue) return
    const qs = new URLSearchParams(searchParams.toString())
    Object.entries(form).forEach(([k, v]) => qs.set(k, v))
    qs.set("terms", String(termsAccepted))
    qs.set("newsletter", String(newsletterAccepted))
    router.push(
      `/${params.countryCode}/events/${params.slug}/checkout/pay?${qs.toString()}`
    )
  }

  return (
    <div className="event-checkout-step">
      <div className="event-checkout-step-body">
        {/* Row 1: Name + Last Name */}
        <div className="grid grid-cols-2 gap-x-[54px] mb-4">
          <CheckoutInput label="NAME" name="name" value={form.name} onChange={set("name")} required />
          <CheckoutInput label="LAST NAME" name="lastName" value={form.lastName} onChange={set("lastName")} required />
        </div>

        {/* Row 2: Country + City */}
        <div className="grid grid-cols-2 gap-x-[54px] mb-4">
          <CheckoutInput label="COUNTRY" name="country" value={form.country} onChange={set("country")} />
          <CheckoutInput label="CITY" name="city" value={form.city} onChange={set("city")} />
        </div>

        {/* Row 3: Email + Phone */}
        <div className="grid grid-cols-2 gap-x-[54px] mb-8">
          <CheckoutInput label="EMAIL" name="email" type="email" value={form.email} onChange={set("email")} required />
          <CheckoutInput label="PHONE" name="phone" type="tel" value={form.phone} onChange={set("phone")} />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3">
          <label className="event-checkout-checkbox-row cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <div className="bg-[#d9d9d9] size-[21px] flex-shrink-0 flex items-center justify-center border border-black/20">
              {termsAccepted && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1 5L5 9L12 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            I AGREE TO THE TERMS AND CONDITIONS
          </label>

          <label className="event-checkout-checkbox-row cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={newsletterAccepted}
              onChange={(e) => setNewsletterAccepted(e.target.checked)}
            />
            <div className="bg-[#d9d9d9] size-[21px] flex-shrink-0 flex items-center justify-center border border-black/20">
              {newsletterAccepted && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1 5L5 9L12 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            I AGREE TO SUBSCRIBE ME TO NEWSLETTER
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className="event-checkout-step-footer event-checkout-step-footer--split">
        <button
          onClick={() => {
            const qs = new URLSearchParams(searchParams.toString())
            Object.entries(form).forEach(([k, v]) => qs.set(k, v))
            qs.set("terms", String(termsAccepted))
            qs.set("newsletter", String(newsletterAccepted))
            router.push(`/${params.countryCode}/events/${params.slug}/checkout/tickets?${qs.toString()}`)
          }}
          className="uppercase text-black text-[18px] font-neue-haas underline underline-offset-4"
        >
          ← Back
        </button>
        <ContinueButton onClick={handleContinue} disabled={!canContinue} />
      </div>
    </div>
  )
}
