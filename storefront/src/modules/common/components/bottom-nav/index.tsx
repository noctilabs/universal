"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getLandingTranslations } from "@modules/landing/data/landing-translations"

const NAV_HREFS = [
  { href: "/about", key: "about" as const },
  { href: "/media", key: "archive" as const },
  { href: "/events", key: "agenda" as const },
] as const

type BottomNavProps = {
  /** When "inside-hero", nav is absolute inside hero (home). Otherwise fixed at viewport bottom. */
  variant?: "inside-hero" | "fixed"
}

/**
 * Main bottom nav: 479×60px bar, opacity 0.80 white, logo 66×23, links 18px Neue Haas.
 * Shared across landing, about, and other (main) pages.
 */
const BottomNav = ({ variant = "fixed" }: BottomNavProps) => {
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
                    ? `${linkClass} underline underline-offset-2`
                    : linkClass
                }
              >
                {t.nav[key]}
              </LocalizedClientLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default BottomNav
