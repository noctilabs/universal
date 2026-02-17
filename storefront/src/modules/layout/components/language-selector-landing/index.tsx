"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"

const ESP_COUNTRY = "es"
const ENG_COUNTRY = "us"

/**
 * Minimal top-center language selector for the landing layout.
 * Renders "ESP / ENG" and switches by navigating to the other country code while preserving path.
 * Uses light text on home (over hero), dark text on inner pages.
 */
const LanguageSelectorLanding = () => {
  const params = useParams()
  const pathname = usePathname()
  const countryCode = (params?.countryCode as string) ?? ENG_COUNTRY
  const pathWithoutCountry = pathname ? pathname.replace(/^\/[^/]+/, "") || "/" : "/"
  const isSpanish = countryCode?.toLowerCase() === ESP_COUNTRY
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)
  const textClass = isHome ? "text-white" : "text-grey-80"

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 text-small-regular tracking-wide ${textClass}`}
    >
      <span className="flex items-center gap-1">
        {isSpanish ? (
          <>
            <span className="opacity-100 font-medium">ESP</span>
            <span className="opacity-60">/</span>
            <Link
              href={`/${ENG_COUNTRY}${pathWithoutCountry}`}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              ENG
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/${ESP_COUNTRY}${pathWithoutCountry}`}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              ESP
            </Link>
            <span className="opacity-60">/</span>
            <span className="opacity-100 font-medium">ENG</span>
          </>
        )}
      </span>
    </div>
  )
}

export default LanguageSelectorLanding
