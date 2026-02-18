import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import ConditionalFooter from "@modules/layout/components/conditional-footer"
import LanguageSelectorLanding from "@modules/landing/components/language-selector-landing"
import LayoutWithConditionalNav from "@modules/layout/components/layout-with-conditional-nav"
import MainWithConditionalPadding from "@modules/layout/components/main-with-conditional-padding"
import { LandingLocaleProvider } from "@modules/landing/context/landing-locale-context"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import Footer from "@modules/layout/templates/footer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
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
        <LayoutWithConditionalNav>
          <ConditionalFooter footer={<Footer />}>{props.children}</ConditionalFooter>
        </LayoutWithConditionalNav>
      </MainWithConditionalPadding>
    </LandingLocaleProvider>
  )
}
