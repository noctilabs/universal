"use client"

import { useLandingLocale } from "@modules/landing/context/landing-locale-context"

type LanguageSelectorLandingProps = {
  /** "light" for dark backgrounds (default). "dark" for light backgrounds like checkout. */
  tone?: "light" | "dark"
}

/**
 * Language selector: 18px, Neue Haas Grotesk Display Std, fontWeight 450, uppercase, lineHeight 18.
 * Toggles landing language in place (no navigation); preference is stored in client state and localStorage.
 * Used across all (main) pages.
 */
const LanguageSelectorLanding = ({ tone = "light" }: LanguageSelectorLandingProps) => {
  const { locale, setLocale } = useLandingLocale()
  const isSpanish = locale === "es"
  const textClass = tone === "dark" ? "text-black" : "text-white"

  const handleSelectEsp = () => setLocale("es")
  const handleSelectEng = () => setLocale("en")

  return (
    <div className={`language-selector ${textClass}`}>
      <div className="flex items-center gap-1">
        {isSpanish ? (
          <>
            <span className="underline underline-offset-2">esp</span>
            <span className="opacity-60">/</span>
            <button
              type="button"
              onClick={handleSelectEng}
              className="hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer p-0 font-inherit text-inherit uppercase"
              aria-label="Switch to English"
            >
              ENG
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSelectEsp}
              className="hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer p-0 font-inherit text-inherit uppercase"
              aria-label="Cambiar a español"
            >
              esp
            </button>
            <span className="opacity-60">/</span>
            <span className="underline underline-offset-2">ENG</span>
          </>
        )}
      </div>
    </div>
  )
}

export default LanguageSelectorLanding
