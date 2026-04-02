"use client"

import { useParams, usePathname } from "next/navigation"

type ConditionalFooterProps = {
  children: React.ReactNode
  /** Pass the Footer from the server layout so server-only code is not bundled in the client. */
  footer: React.ReactNode
}

/**
 * Renders children and Footer only when not on the home page (so landing has no footer).
 */
const ConditionalFooter = ({ children, footer }: ConditionalFooterProps) => {
  const pathname = usePathname()
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)
  const isArchive = pathname?.includes("/archive")

  return (
    <>
      {children}
      {!isHome && !isArchive && footer}
    </>
  )
}

export default ConditionalFooter
