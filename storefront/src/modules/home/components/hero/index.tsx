import Image from "next/image"

/**
 * Full-viewport hero with industrial/gallery background.
 * Hero image: set NEXT_PUBLIC_HERO_IMAGE_URL or use default placeholder.
 */
const Hero = () => {
  const heroSrc =
    process.env.NEXT_PUBLIC_HERO_IMAGE_URL ||
    "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1920&q=80"

  const isExternal = heroSrc.startsWith("http")

  return (
    <div className="relative min-h-screen w-full">
      {isExternal ? (
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized={isExternal}
        />
      ) : (
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
    </div>
  )
}

export default Hero
