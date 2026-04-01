import Image from "next/image"
import BottomNav from "@modules/common/components/bottom-nav"
import type { NavLabels } from "@modules/common/components/bottom-nav"

type HeroProps = {
  navLabels?: NavLabels
  heroImageUrl?: string
}

const FALLBACK_HERO_IMAGE = "/images/universalLanding.png"

const Hero = ({ navLabels, heroImageUrl }: HeroProps) => {
  const imageSrc = heroImageUrl ?? FALLBACK_HERO_IMAGE
  return (
    <div className="hero-shell">
      <Image
        src={imageSrc}
        alt="Universal space"
        fill
        priority
        className="hero-image"
        sizes="100vw"
        unoptimized={imageSrc.startsWith("http")}
      />
      <BottomNav variant="inside-hero" navLabels={navLabels} />
    </div>
  )
}

export default Hero
