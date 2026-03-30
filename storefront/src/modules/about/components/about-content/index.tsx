"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getAboutTranslations } from "@modules/about/data/about-translations"
import styles from "@modules/about/about.module.css"

const LOGO_ABOUT_SRC = "/images/universalLogoAbout.svg"
const LOGO_HOTEL_SRC = "/images/universalHotelAbout.svg"
const GLOBE_ABOUT_SRC = "/images/universalGlobeAbout.svg"

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
 * Renders the word "Universal" and replaces it with the globe image on hover.
 */
function HoverableUniversalGlobe() {
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
          src={GLOBE_ABOUT_SRC}
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

/**
 * Splits text by "Universal", "Hotel" and "Montevideo" and returns React nodes with hoverable components for each match.
 * @param text - The text to process
 * @param useGlobeForUniversal - If true, uses the globe image for "Universal" instead of the logo
 */
function paragraphWithHoverableBrand(text: string, useGlobeForUniversal: boolean = false): React.ReactNode[] {
  const parts = text.split(/(Universal|Hotel|Montevideo)/g)
  return parts.map((part, i) => {
    if (part === "Universal") {
      return useGlobeForUniversal ? (
        <HoverableUniversalGlobe key={`ug-${i}`} />
      ) : (
        <HoverableUniversal key={`u-${i}`} />
      )
    }
    if (part === "Hotel") return <HoverableHotel key={`h-${i}`} label={part} />
    if (part === "Montevideo") return <HoverableMontevideo key={`m-${i}`} label={part} />
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
    <div className="about-page-shell">
      <div className="about-content-inner">
        <p className="about-description">
          {paragraphWithHoverableBrand(t.paragraph1)}
          <br />
          {paragraphWithHoverableBrand(t.paragraph2, true)}
        </p>
      </div>
      <div className={styles["about-image-section"]}>
        <Image
          src="/images/universalLanding.png"
          alt="Universal space"
          width={1362}
          height={1090}
          className={styles["about-landing-image"]}
          priority={false}
        />
        <div className={styles["about-image-icon"]}>
          <div className={styles["about-image-icon-inner"]} />
        </div>
      </div>
      <div className={styles["about-description-section"]}>
        <p className={styles["about-description-text"]}>{t.descriptionText}</p>
      </div>
    </div>
  )
}

export default AboutContent
