import { Metadata } from "next"
import AgendaContent from "@modules/agenda/components/agenda-content"
import { getAgendaPage } from "../../../../sanity/lib/fetch"

export const metadata: Metadata = {
  title: "Agenda | Universal",
  description: "Upcoming events at Universal.",
}

export default async function AgendaPage() {
  const cmsData = await getAgendaPage()
  return <AgendaContent cmsData={cmsData} />
}
