import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import ConditionalFooter from "@modules/layout/components/conditional-footer"
import LanguageSelectorLanding from "@modules/common/components/language-selector-landing"
import LayoutWithConditionalNav from "@modules/layout/components/layout-with-conditional-nav"
import MainWithConditionalPadding from "@modules/layout/components/main-with-conditional-padding"
import { LandingLocaleProvider } from "@modules/landing/context/landing-locale-context"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import Footer from "@modules/layout/templates/footer"
import { getSiteSettings } from "../../../sanity/lib/fetch"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode; params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const locale = countryCode === "es" ? "es" : "en"

  const [customer, cart, siteSettings] = await Promise.all([
    retrieveCustomer(),
    retrieveCart(),
    getSiteSettings(),
  ])

  const nav = siteSettings?.navigation
  const navLabels = {
    about_en: nav?.aboutLabel_en ?? undefined,
    about_es: nav?.aboutLabel_es ?? undefined,
    archive_en: nav?.archiveLabel_en ?? undefined,
    archive_es: nav?.archiveLabel_es ?? undefined,
    agenda_en: nav?.agendaLabel_en ?? undefined,
    agenda_es: nav?.agendaLabel_es ?? undefined,
  }

  let shippingOptions: StoreCartShippingOption[] = []
  if (cart) {
    const { shipping_options } = await listCartOptions()
    shippingOptions = shipping_options
  }

  return (
    <LandingLocaleProvider>
      <LanguageSelectorLanding />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}
      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      <MainWithConditionalPadding>
        <LayoutWithConditionalNav navLabels={navLabels}>
          <ConditionalFooter footer={<Footer locale={locale} />}>{props.children}</ConditionalFooter>
        </LayoutWithConditionalNav>
      </MainWithConditionalPadding>
    </LandingLocaleProvider>
  )
}
