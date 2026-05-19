import RegisterStep from "@modules/event-checkout/components/register-step"

export const metadata = { title: "Register" }

export default function RegisterPage() {
  return (
    <>
      <div className="px-[56px] pt-[160px] pb-0">
        <ol className="list-decimal ml-[42px] uppercase text-black text-[28px] font-neue-haas" start={2}>
          <li><span className="leading-none">REGISTER</span></li>
        </ol>
      </div>
      <hr className="event-checkout-divider mt-[44px]" />
      <RegisterStep />
    </>
  )
}
