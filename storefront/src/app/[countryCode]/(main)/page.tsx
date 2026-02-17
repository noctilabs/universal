import { Metadata } from "next"

import Hero from "@modules/home/components/hero"

export const metadata: Metadata = {
  title: "Universal Studio",
  description: "Studio and venue platform for events, media, and bookings.",
}

export default function Home() {
  return <Hero />
}
