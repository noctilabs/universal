import { Metadata } from "next"

import AboutContent from "@modules/about/components/about-content"
import { getAboutPage } from "../../../../sanity/lib/fetch"

export const metadata: Metadata = {
  title: "About | Universal",
  description:
    "Universal is a multidisciplinary space and home for contemporary culture in Montevideo.",
}

export default async function AboutPage() {
  const cmsData = await getAboutPage()
  return <AboutContent cmsData={cmsData} />
}
