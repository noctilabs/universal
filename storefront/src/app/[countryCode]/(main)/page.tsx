import { Metadata } from "next"

import Hero from "@modules/landing/components/hero"
import { getSiteSettings } from "../../../sanity/lib/fetch"

export const metadata: Metadata = {
  title: "Universal",
  description: "Studio and venue platform for events, media, and bookings.",
}

export default async function Home(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const locale = countryCode === "es" ? "es" : "en"

  const siteSettings = await getSiteSettings()
  const nav = siteSettings?.navigation
  const navLabels = {
    about: (locale === "es" ? nav?.aboutLabel_es : nav?.aboutLabel_en) ?? undefined,
    archive: (locale === "es" ? nav?.archiveLabel_es : nav?.archiveLabel_en) ?? undefined,
    agenda: (locale === "es" ? nav?.agendaLabel_es : nav?.agendaLabel_en) ?? undefined,
  }

  return <Hero navLabels={navLabels} heroImageUrl={siteSettings?.landingImageUrl} />
}
