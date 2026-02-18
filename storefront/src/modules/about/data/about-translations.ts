import type { LandingLocale } from "@modules/landing/data/landing-translations"

/**
 * About page copy keyed by landing locale (en / es).
 */
const aboutTranslations = {
  en: {
    paragraph1:
      "Universal is a multidisciplinary space and home for contemporary culture. Situated in the lobby of an old Hotel from 1870 in the centre of Montevideo.",
    paragraph2:
      "Universal houses art exhibitions, a creative studio and office space.",
  },
  es: {
    paragraph1:
      "Universal es un espacio multidisciplinario y hogar de la cultura contemporánea. Situado en el lobby de un antiguo Hotel de 1870 en el centro de Montevideo.",
    paragraph2:
      "Universal alberga exposiciones de arte, un estudio creativo y espacio de oficinas.",
  },
} as const

export type AboutTranslations = (typeof aboutTranslations)[LandingLocale]

/**
 * Returns about page copy for the given landing locale.
 */
export function getAboutTranslations(locale: LandingLocale): AboutTranslations {
  return aboutTranslations[locale]
}
