type ContinueButtonProps = {
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export default function ContinueButton({
  onClick,
  type = "button",
  disabled = false,
}: ContinueButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="event-checkout-continue-btn disabled:opacity-50"
    >
      Continue
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="white" />
      </svg>
    </button>
  )
}
