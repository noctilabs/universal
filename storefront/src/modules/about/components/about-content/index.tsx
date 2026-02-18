"use client"

import Image from "next/image"
import { useState } from "react"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"
import { getAboutTranslations } from "@modules/about/data/about-translations"

const LOGO_ABOUT_SRC = "/images/universalLogoAbout.svg"

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
 * Splits text by "Universal" and returns React nodes with HoverableUniversal for each match.
 */
function paragraphWithHoverableBrand(text: string): React.ReactNode[] {
  const parts = text.split(/(Universal)/g)
  return parts.map((part, i) =>
    part === "Universal" ? <HoverableUniversal key={i} /> : part
  )
}

/**
 * About page content: full-viewport grey background, centered description in Neue Haas 40/450.
 * Language selector and bottom nav are provided by (main) layout.
 */
const AboutContent = () => {
  const { locale } = useLandingLocale()
  const t = getAboutTranslations(locale)

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#CDCDCD] outline outline-1 outline-black outline-offset-[-1px]"
      style={{ minHeight: "100dvh" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[900px] flex-col justify-center px-6 py-24 small:py-32">
        <p className="w-full text-center font-neue-haas text-[40px] font-[450] text-black break-words">
          {paragraphWithHoverableBrand(t.paragraph1)}
          <br />
          {paragraphWithHoverableBrand(t.paragraph2)}
        </p>
      </div>
    </div>
  )
}

export default AboutContent
