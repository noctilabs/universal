import { ReactNode } from "react"
import LanguageSelectorLanding from "@modules/common/components/language-selector-landing"
import BottomNav from "@modules/common/components/bottom-nav"
import { LandingLocaleProvider } from "@modules/landing/context/landing-locale-context"
import { getSiteSettings } from "@/sanity/lib/fetch"

type Props = {
  children: ReactNode
}

export default async function EventCheckoutLayout({ children }: Props) {
  const siteSettings = await getSiteSettings()
  const nav = siteSettings?.navigation
  const navLabels = {
    about_en: nav?.aboutLabel_en ?? undefined,
    about_es: nav?.aboutLabel_es ?? undefined,
    archive_en: nav?.archiveLabel_en ?? undefined,
    archive_es: nav?.archiveLabel_es ?? undefined,
    agenda_en: nav?.agendaLabel_en ?? undefined,
    agenda_es: nav?.agendaLabel_es ?? undefined,
  }

  return (
    <LandingLocaleProvider>
      <div className="event-checkout-shell pb-20 small:pb-24">
        <LanguageSelectorLanding tone="dark" />
        {children}
        <BottomNav variant="fixed" navLabels={navLabels} />
      </div>
    </LandingLocaleProvider>
  )
}
