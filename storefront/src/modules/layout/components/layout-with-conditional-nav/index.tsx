"use client"

import { useParams, usePathname } from "next/navigation"
import LandingBottomNav from "@modules/landing/components/landing-bottom-nav"

type LayoutWithConditionalNavProps = {
  children: React.ReactNode
}

/**
 * Renders children and the fixed bottom nav only when not on the home page.
 * On home, the nav is inside the Hero component.
 */
const LayoutWithConditionalNav = ({ children }: LayoutWithConditionalNavProps) => {
  const pathname = usePathname()
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)

  return (
    <>
      {children}
      {!isHome && <LandingBottomNav variant="fixed" />}
    </>
  )
}

export default LayoutWithConditionalNav
