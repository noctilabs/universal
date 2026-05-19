type CheckoutInputProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

export default function CheckoutInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  className = "",
}: CheckoutInputProps) {
  return (
    <div className={`event-checkout-input flex-col justify-end ${className}`}>
      <label htmlFor={name} className="event-checkout-input-label">
        {value ? "" : label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-transparent outline-none text-black text-[18px] uppercase w-full font-neue-haas"
        style={{ fontFamily: "Neue Haas Grotesk Display Std, sans-serif" }}
      />
    </div>
  )
}
