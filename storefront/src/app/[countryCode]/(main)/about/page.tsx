import { Metadata } from "next"

import AboutContent from "@modules/about/components/about-content"

export const metadata: Metadata = {
  title: "About | Universal",
  description:
    "Universal is a multidisciplinary space and home for contemporary culture in Montevideo.",
}

/**
 * About page: grey full-viewport layout, centered description. Nav and language selector from (main) layout.
 */
export default function AboutPage() {
  return <AboutContent />
}
