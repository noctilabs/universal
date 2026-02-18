import Image from "next/image"
import BottomNav from "@modules/common/components/bottom-nav"

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/universalLanding.png"
        alt="Universal space"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <BottomNav variant="inside-hero" />
    </div>
  )
}

export default Hero
