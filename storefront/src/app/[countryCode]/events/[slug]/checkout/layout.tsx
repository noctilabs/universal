import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function EventCheckoutLayout({ children }: Props) {
  return (
    <div className="event-checkout-shell">
      {children}
    </div>
  )
}
