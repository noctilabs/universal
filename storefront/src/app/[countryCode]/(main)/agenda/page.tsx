import { Metadata } from "next"
import AgendaContent from "@modules/agenda/components/agenda-content"

export const metadata: Metadata = {
  title: "Agenda | Universal",
  description: "Upcoming events at Universal.",
}

export default function AgendaPage() {
  return <AgendaContent />
}
