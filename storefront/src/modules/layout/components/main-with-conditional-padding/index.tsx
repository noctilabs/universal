"use client"

import { useParams, usePathname } from "next/navigation"

type MainWithConditionalPaddingProps = {
  children: React.ReactNode
}

/**
 * On home: no bottom padding and overflow-hidden so the page fills the viewport with no white space below.
 * On other pages: bottom padding to clear the fixed nav.
 */
const MainWithConditionalPadding = ({ children }: MainWithConditionalPaddingProps) => {
  const pathname = usePathname()
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined
  const isHome =
    !!countryCode &&
    (pathname === `/${countryCode}` || pathname === `/${countryCode}/`)
  const isAbout = pathname?.includes("/about")
  const isArchive = pathname?.includes("/archive")
  const isAgenda = pathname?.includes("/agenda")

  return (
    <main
      className={
        isHome || isAbout || isArchive || isAgenda
          ? "min-h-screen overflow-hidden"
          : "pb-20 small:pb-24"
      }
    >
      {children}
    </main>
  )
}

export default MainWithConditionalPadding
