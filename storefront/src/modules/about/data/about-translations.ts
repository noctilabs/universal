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
    descriptionText:
      "Since 2019, the storefront space hosts Artifact, a new meeting place and ever-changing display for ideas designed by Berlin-based architecture firm Gonzalez Haase, which places emphasis on the notion of craft. In Spring 2020, Spazio Maiocchi launched Afterimage, an online platform dedicated to moving image, aiming to carve out a space for meaningful and immersive viewing amid today's overwhelming amount of visual stimuli.",
    contactText: "Universal opens only by appointment. For inquiries or to schedule a visit, write to:",
    email: "hola@esuniversal.uy",
    address: "Piedras 544, Montevideo, Uruguay.",
    instagram: "Instagram",
    copyright: "All rights reserved ©2026. This site was designed by Pia Alive and developed by Nocti Labs.",
  },
  es: {
    paragraph1:
      "Universal es un espacio multidisciplinario y hogar de la cultura contemporánea. Situado en el lobby de un antiguo Hotel de 1870 en el centro de Montevideo.",
    paragraph2:
      "Universal alberga exposiciones de arte, un estudio creativo y espacio de oficinas.",
    descriptionText:
      "Desde 2019, el espacio del escaparate alberga Artifact, un nuevo lugar de encuentro y exposición en constante cambio para ideas diseñadas por la firma de arquitectura con sede en Berlín Gonzalez Haase, que hace hincapié en la noción de artesanía. En la primavera de 2020, Spazio Maiocchi lanzó Afterimage, una plataforma en línea dedicada a la imagen en movimiento, con el objetivo de crear un espacio para una visualización significativa e inmersiva en medio de la abrumadora cantidad de estímulos visuales de hoy.",
    contactText: "Universal abre únicamente con agenda previa. Por consultas o para agendar una visita, escribí a:",
    email: "hola@esuniversal.uy",
    address: "Piedras 544, Montevideo, Uruguay.",
    instagram: "Instagram",
    copyright: "Todos los derechos reservados ©2026. Este sitio fue diseñado por Pia Alive y desarrollado por Nocti Labs.",
  },
} as const

export type AboutTranslations = (typeof aboutTranslations)[LandingLocale]

/**
 * Returns about page copy for the given landing locale.
 */
export function getAboutTranslations(locale: LandingLocale): AboutTranslations {
  return aboutTranslations[locale]
}
