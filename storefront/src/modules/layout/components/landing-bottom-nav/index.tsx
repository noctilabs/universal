import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/media", label: "Archive" },
  { href: "/events", label: "Agenda" },
  { href: "/store", label: "Store" },
] as const

/**
 * Bottom navigation bar for the landing layout: logo left, nav links and cart/account right.
 */
const LandingBottomNav = () => {
  return (
    <header className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-grey-20">
      <nav className="content-container flex items-center justify-between h-14 small:h-16">
        <LocalizedClientLink
          href="/"
          className="flex items-center gap-2 text-grey-90 hover:text-grey-70 transition-colors"
          aria-label="Home"
        >
          <Image
            src="/images/logo.svg"
            alt=""
            width={120}
            height={32}
            className="h-6 small:h-8 w-auto"
          />
        </LocalizedClientLink>
        <div className="flex items-center gap-4 small:gap-8 text-small-regular text-grey-80 flex-shrink-0">
          {navLinks.map(({ href, label }) => (
            <LocalizedClientLink
              key={href}
              href={href}
              className="hover:text-grey-90 transition-colors uppercase tracking-wide whitespace-nowrap"
            >
              {label}
            </LocalizedClientLink>
          ))}
          <LocalizedClientLink
            href="/account"
            className="hover:text-grey-90 transition-colors uppercase tracking-wide hidden small:inline whitespace-nowrap"
          >
            Account
          </LocalizedClientLink>
          <div className="flex items-center ml-2">
            <CartButton />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default LandingBottomNav
