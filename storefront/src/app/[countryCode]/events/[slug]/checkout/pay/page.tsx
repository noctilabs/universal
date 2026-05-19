import PayStep from "@modules/event-checkout/components/pay-step"

export const metadata = { title: "Pay" }

export default function PayPage() {
  return (
    <>
      <div className="px-[56px] pt-[160px] pb-0">
        <ol className="list-decimal ml-[42px] uppercase text-black text-[28px] font-neue-haas" start={3}>
          <li><span className="leading-none">PAY</span></li>
        </ol>
      </div>
      <hr className="event-checkout-divider mt-[16px]" />
      <PayStep />
    </>
  )
}
