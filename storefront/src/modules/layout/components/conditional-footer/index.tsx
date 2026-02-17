"use client"

import { useParams, usePathname } from "next/navigation"
import Footer from "@modules/layout/templates/footer"

type ConditionalFooterProps = {
  children: React.ReactNode
}

/**
 * Renders children and Footer only when not on the home page (so landing has no footer).
 */
const ConditionalFooter = ({ children }: ConditionalFooterProps) => {
  const pathname = usePathname()
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)

  return (
    <>
      {children}
      {!isHome && <Footer />}
    </>
  )
}

export default ConditionalFooter
