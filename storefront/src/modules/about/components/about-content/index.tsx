"use client"

import Image from "next/image"
import { useState } from "react"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getAboutTranslations } from "@modules/about/data/about-translations"

const LOGO_ABOUT_SRC = "/images/universalLogoAbout.svg"
const LOGO_HOTEL_SRC = "/images/universalHotelAbout.svg"

/**
 * Renders the word "Universal" and replaces it with the about logo on hover.
 */
function HoverableUniversal() {
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
          src={LOGO_ABOUT_SRC}
          alt="Universal"
          width={151}
          height={80}
          className="h-[80px] w-[151px] object-contain drop-shadow-md"
          priority
        />
      </span>
    </span>
  )
}

/**
 * Renders the word "Hotel" and replaces it with the hotel image on hover (image sits on the word).
 */
function HoverableHotel({ label }: { label: string }) {
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
          src={LOGO_HOTEL_SRC}
          alt="Hotel"
          width={246}
          height={174}
          className="h-[174px] w-[246px] object-contain drop-shadow-md"
          priority
        />
      </span>
    </span>
  )
}

/**
 * Splits text by "Universal" and "Hotel" and returns React nodes with hoverable components for each match.
 */
function paragraphWithHoverableBrand(text: string): React.ReactNode[] {
  const parts = text.split(/(Universal|Hotel)/g)
  return parts.map((part, i) => {
    if (part === "Universal") return <HoverableUniversal key={`u-${i}`} />
    if (part === "Hotel") return <HoverableHotel key={`h-${i}`} label={part} />
    return part
  })
}

/**
 * About page content: full-viewport grey background, centered description in Neue Haas 40/450.
 * Language selector and bottom nav are provided by (main) layout.
 */
const AboutContent = () => {
  const { locale } = useLandingLocale()
  const t = getAboutTranslations(locale)

  return (
    <div className="about-page-shell" style={{ minHeight: "100dvh" }}>
      <div className="about-content-inner">
        <p className="about-description">
          {paragraphWithHoverableBrand(t.paragraph1)}
          <br />
          {paragraphWithHoverableBrand(t.paragraph2)}
        </p>
      </div>
    </div>
  )
}

export default AboutContent
