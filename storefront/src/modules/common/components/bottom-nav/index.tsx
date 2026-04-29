"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getLandingTranslations } from "@modules/landing/data/landing-translations"

const NAV_HREFS = [
  { href: "/about", key: "about" as const },
  { href: "/archive", key: "archive" as const },
  { href: "/agenda", key: "agenda" as const },
] as const

export type NavLabels = {
  about_en?: string
  about_es?: string
  archive_en?: string
  archive_es?: string
  agenda_en?: string
  agenda_es?: string
}

type BottomNavProps = {
  /** When "inside-hero", nav is absolute inside hero (home). Otherwise fixed at viewport bottom. */
  variant?: "inside-hero" | "fixed"
  /** Nav labels from CMS (optional). Falls back to hardcoded translations. */
  navLabels?: NavLabels
}

/**
 * Main bottom nav: 479×60px bar, opacity 0.80 white, logo 66×23, links 18px Neue Haas.
 * Shared across landing, about, and other (main) pages.
 */
const BottomNav = ({ variant = "fixed", navLabels }: BottomNavProps) => {
  const pathname = usePathname()
  const { locale } = useLandingLocale()
  const t = getLandingTranslations(locale)
  const isInsideHero = variant === "inside-hero"
  const wrapperClass = isInsideHero
    ? "nav-wrapper-inside-hero"
    : "nav-wrapper-fixed"

  const basePath =
    (pathname?.replace(/^\/[a-z]{2}(?:\/|$)/i, "/").replace(/\/$/, "") ?? "/") ||
    "/"
  const linkClass = "nav-link"

  const labels = {
    about: (locale === "es" ? navLabels?.about_es : navLabels?.about_en) ?? t.nav.about,
    archive: (locale === "es" ? navLabels?.archive_es : navLabels?.archive_en) ?? t.nav.archive,
    agenda: (locale === "es" ? navLabels?.agenda_es : navLabels?.agenda_en) ?? t.nav.agenda,
  }

  return (
    <div className={wrapperClass}>
      <div className="nav-bar">
        <LocalizedClientLink
          href="/"
          className="flex items-center hover:opacity-70 transition-opacity shrink-0"
          aria-label={t.aria.home}
        >
          <Image
            src="/images/universalBrand.svg"
            alt=""
            width={66}
            height={23}
            className="h-[23px] w-auto"
          />
        </LocalizedClientLink>
        <nav
          className="w-[291.5px] h-5 flex items-center justify-between shrink-0"
          aria-label={t.aria.secondaryNav}
        >
          {NAV_HREFS.map(({ href, key }) => {
            const isActive = basePath === href
            return (
              <LocalizedClientLink
                key={href}
                href={href}
                className={
                  isActive
                    ? `${linkClass} underline decoration-1 underline-offset-[3px]`
                    : linkClass
                }
              >
                {labels[key]}
              </LocalizedClientLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default BottomNav
