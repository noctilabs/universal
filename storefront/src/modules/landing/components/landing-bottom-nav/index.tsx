"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getLandingTranslations } from "@modules/landing/data/landing-translations"

const NAV_HREFS = [
  { href: "/about", key: "about" as const },
  { href: "/media", key: "archive" as const },
  { href: "/events", key: "agenda" as const },
] as const

type LandingBottomNavProps = {
  /** When "inside-hero", nav is absolute inside hero (home). Otherwise fixed at viewport bottom. */
  variant?: "inside-hero" | "fixed"
}

/**
 * Bottom nav per Figma: 479×60px bar, opacity 0.80 white, logo 66×23, links 18px Neue Haas.
 */
const LandingBottomNav = ({ variant = "fixed" }: LandingBottomNavProps) => {
  const { locale } = useLandingLocale()
  const t = getLandingTranslations(locale)
  const isInsideHero = variant === "inside-hero"
  const wrapperClass = isInsideHero
    ? "absolute bottom-0 left-0 right-0 z-10 w-full flex justify-center px-3 small:px-4 pb-10"
    : "fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center px-4 small:px-6 pb-3"
  const barClass =
    "w-[479px] max-w-[calc(100vw-2rem)] h-[60px] bg-white opacity-80 flex items-center gap-[62.66px] px-[30px]"

  const linkClass =
    "font-neue-haas font-[450] text-[18px] leading-[20.25px] text-black hover:opacity-70 transition-opacity"

  return (
    <div className={wrapperClass}>
      <div className={barClass}>
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
          {NAV_HREFS.map(({ href, key }) => (
            <LocalizedClientLink
              key={href}
              href={href}
              className={linkClass}
            >
              {t.nav[key]}
            </LocalizedClientLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default LandingBottomNav
