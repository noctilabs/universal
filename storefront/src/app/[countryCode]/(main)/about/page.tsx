import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Universal Studio",
  description: "About Universal Studio.",
}

/**
 * Placeholder About page. Replace with Sanity-driven or static content as needed.
 */
export default function AboutPage() {
  return (
    <div className="content-container py-12 small:py-24">
      <h1 className="text-2xl small:text-3xl font-normal text-grey-90 mb-6">
        About
      </h1>
      <p className="text-base-regular text-grey-70 max-w-xl">
        Universal Studio — placeholder. Add your content here or connect to
        Sanity.
      </p>
    </div>
  )
}
