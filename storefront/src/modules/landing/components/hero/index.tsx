import Image from "next/image"
import BottomNav from "@modules/common/components/bottom-nav"

const Hero = () => {
  return (
    <div className="hero-shell">
      <Image
        src="/images/universalLanding.png"
        alt="Universal space"
        fill
        priority
        className="hero-image"
        sizes="100vw"
      />
      <BottomNav variant="inside-hero" />
    </div>
  )
}

export default Hero
