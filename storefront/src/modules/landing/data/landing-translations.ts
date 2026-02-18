/**
 * Landing UI translations keyed by locale (en / es).
 * Used for navigation and other landing-specific copy based on countryCode (us -> en, es -> es).
 */
export type LandingLocale = "en" | "es"

export const LANDING_LOCALE_ES = "es" as const
export const LANDING_LOCALE_EN = "en" as const

const landingTranslations = {
  en: {
    nav: {
      about: "About",
      archive: "Archive",
      agenda: "Agenda",
    },
    aria: {
      home: "Home",
      secondaryNav: "Secondary",
    },
  },
  es: {
    nav: {
      about: "Sobre",
      archive: "Archivo",
      agenda: "Agenda",
    },
    aria: {
      home: "Inicio",
      secondaryNav: "Secundario",
    },
  },
} as const

export type LandingTranslations = (typeof landingTranslations)[LandingLocale]

/**
 * Returns the landing locale from the URL country code (e.g. es -> "es", us -> "en").
 */
export function getLandingLocale(countryCode: string | undefined): LandingLocale {
  return countryCode?.toLowerCase() === "es" ? "es" : "en"
}

/**
 * Returns translations for the given landing locale.
 */
export function getLandingTranslations(locale: LandingLocale): LandingTranslations {
  return landingTranslations[locale]
}
