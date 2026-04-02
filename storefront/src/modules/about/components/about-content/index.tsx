"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import styles from "@modules/about/about.module.css"
type AboutPageData = {
  featuredImageUrl?: string
  hoverLogoUrl?: string
  hoverGlobeUrl?: string
  hoverHotelUrl?: string
  paragraph1_en?: string
  paragraph1_es?: string
  paragraph2_en?: string
  paragraph2_es?: string
  descriptionText_en?: string
  descriptionText_es?: string
}

// Fallback image paths (used when CMS has no uploaded images)
const FALLBACK_LOGO_SRC = "/images/universalLogoAbout.svg"
const FALLBACK_HOTEL_SRC = "/images/universalHotelAbout.svg"
const FALLBACK_GLOBE_SRC = "/images/universalGlobeAbout.svg"
const FALLBACK_LANDING_SRC = "/images/universalLanding.png"

type AboutContentProps = {
  cmsData?: AboutPageData | null
}

/**
 * Renders the word "Universal" and replaces it with the about logo on hover.
 */
function HoverableUniversal({ logoSrc }: { logoSrc: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="relative inline-block cursor-default align-baseline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "invisible" : undefined}>Universal</span>
      <span
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center ${
          isHovered ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isHovered}
      >
        <Image
          src={logoSrc}
          alt="Universal"
          width={151}
          height={80}
          className="h-[80px] w-[151px] object-contain drop-shadow-md"
          priority
          unoptimized={logoSrc.startsWith("http")}
        />
      </span>
    </span>
  )
}

/**
 * Renders the word "Universal" and replaces it with the globe image on hover.
 */
function HoverableUniversalGlobe({ globeSrc }: { globeSrc: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="relative inline-block cursor-default align-baseline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "invisible" : undefined}>Universal</span>
      <span
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center ${
          isHovered ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isHovered}
      >
        <Image
          src={globeSrc}
          alt="Universal"
          width={151}
          height={80}
          className="h-[80px] w-[151px] object-contain drop-shadow-md"
          priority
          unoptimized={globeSrc.startsWith("http")}
        />
      </span>
    </span>
  )
}

/**
 * Renders the word "Hotel" and replaces it with the hotel image on hover.
 */
function HoverableHotel({ label, hotelSrc }: { label: string; hotelSrc: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="relative inline-block cursor-default align-baseline overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "invisible" : undefined}>{label}</span>
      <span
        className={`absolute left-1/2 top-1/2 z-50 h-[174px] w-[246px] -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isHovered}
      >
        <Image
          src={hotelSrc}
          alt="Hotel"
          width={246}
          height={174}
          className="h-[174px] w-[246px] object-contain drop-shadow-md"
          priority
          unoptimized={hotelSrc.startsWith("http")}
        />
      </span>
    </span>
  )
}

/**
 * Returns the current local time formatted as HH:MM:SS.
 */
function getLocalTimeString(): string {
  const now = new Date()
  return now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

/**
 * Renders the word "Montevideo" and shows a clock-style overlay with the user's local time on hover.
 */
function HoverableMontevideo({ label }: { label: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [localTime, setLocalTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLocalTime(getLocalTimeString())
    const interval = setInterval(() => setLocalTime(getLocalTimeString()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="relative inline-block cursor-default align-baseline overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{label}</span>
      <span
        className={`absolute left-1/2 top-1/2 z-50 h-[60px] w-[136px] -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isHovered}
      >
        {mounted && (
          <span className={styles["about-montevideo-overlay-container"]}>
            <span className={styles["about-montevideo-overlay-bg"]} />
            <span className={styles["about-montevideo-time"]}>{localTime}</span>
          </span>
        )}
      </span>
    </span>
  )
}

type HoverImages = { logoSrc: string; globeSrc: string; hotelSrc: string }

/**
 * Splits text by "Universal", "Hotel" and "Montevideo" and returns React nodes with hoverable components for each match.
 */
function paragraphWithHoverableBrand(
  text: string,
  useGlobeForUniversal: boolean = false,
  images: HoverImages
): React.ReactNode[] {
  const parts = text.split(/(Universal|Hotel|Montevideo)/g)
  return parts.map((part, i) => {
    if (part === "Universal") {
      return useGlobeForUniversal ? (
        <HoverableUniversalGlobe key={`ug-${i}`} globeSrc={images.globeSrc} />
      ) : (
        <HoverableUniversal key={`u-${i}`} logoSrc={images.logoSrc} />
      )
    }
    if (part === "Hotel") return <HoverableHotel key={`h-${i}`} label={part} hotelSrc={images.hotelSrc} />
    if (part === "Montevideo") return <HoverableMontevideo key={`m-${i}`} label={part} />
    return part
  })
}

/**
 * About page content: full-viewport grey background, centered description in Neue Haas 40/450.
 * Language selector and bottom nav are provided by (main) layout.
 */
const AboutContent = ({ cmsData }: AboutContentProps) => {
  const { locale } = useLandingLocale()

  // Text content — from CMS or fallback
  const paragraph1 =
    (locale === "es" ? cmsData?.paragraph1_es : cmsData?.paragraph1_en) ??
    (locale === "es"
      ? "Universal es un espacio multidisciplinario y hogar de la cultura contemporánea. Situado en el lobby de un antiguo Hotel de 1870 en el centro de Montevideo."
      : "Universal is a multidisciplinary space and home for contemporary culture. Situated in the lobby of an old Hotel from 1870 in the centre of Montevideo.")

  const paragraph2 =
    (locale === "es" ? cmsData?.paragraph2_es : cmsData?.paragraph2_en) ??
    (locale === "es"
      ? "Universal alberga exposiciones de arte, un estudio creativo y espacio de oficinas."
      : "Universal houses art exhibitions, a creative studio and office space.")

  const descriptionText =
    (locale === "es" ? cmsData?.descriptionText_es : cmsData?.descriptionText_en) ??
    (locale === "es"
      ? "Desde 2019, el espacio del escaparate alberga Artifact, un nuevo lugar de encuentro y exposición en constante cambio para ideas diseñadas por la firma de arquitectura con sede en Berlín Gonzalez Haase."
      : "Since 2019, the storefront space hosts Artifact, a new meeting place and ever-changing display for ideas designed by Berlin-based architecture firm Gonzalez Haase, which places emphasis on the notion of craft.")

  // Image sources — from CMS or fallback static files
  const featuredImageSrc = cmsData?.featuredImageUrl ?? FALLBACK_LANDING_SRC
  const logoSrc = cmsData?.hoverLogoUrl ?? FALLBACK_LOGO_SRC
  const globeSrc = cmsData?.hoverGlobeUrl ?? FALLBACK_GLOBE_SRC
  const hotelSrc = cmsData?.hoverHotelUrl ?? FALLBACK_HOTEL_SRC

  const hoverImages: HoverImages = { logoSrc, globeSrc, hotelSrc }

  return (
    <div className="about-page-shell">
      <div className="about-content-inner">
        <p className="about-description">
          {paragraphWithHoverableBrand(paragraph1, false, hoverImages)}
          <br />
          {paragraphWithHoverableBrand(paragraph2, true, hoverImages)}
        </p>
      </div>
      <div className={styles["about-image-section"]}>
        <Image
          src={featuredImageSrc}
          alt="Universal space"
          width={1362}
          height={1090}
          className={styles["about-landing-image"]}
          priority={false}
          unoptimized={featuredImageSrc.startsWith("http")}
        />
        <div className={styles["about-image-icon"]}>
          <div className={styles["about-image-icon-inner"]} />
        </div>
      </div>
      <div className={styles["about-description-section"]}>
        <p className={styles["about-description-text"]}>{descriptionText}</p>
      </div>
    </div>
  )
}

export default AboutContent
