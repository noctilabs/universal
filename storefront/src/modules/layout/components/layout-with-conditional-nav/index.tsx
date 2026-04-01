"use client"

import { useParams, usePathname } from "next/navigation"
import BottomNav from "@modules/common/components/bottom-nav"
import type { NavLabels } from "@modules/common/components/bottom-nav"

type LayoutWithConditionalNavProps = {
  children: React.ReactNode
  navLabels?: NavLabels
}

/**
 * Renders children and the fixed bottom nav only when not on the home page.
 * On home, the nav is inside the Hero component.
 */
const LayoutWithConditionalNav = ({ children, navLabels }: LayoutWithConditionalNavProps) => {
  const pathname = usePathname()
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)

  return (
    <>
      {children}
      {!isHome && <BottomNav variant="fixed" navLabels={navLabels} />}
    </>
  )
}

export default LayoutWithConditionalNav
