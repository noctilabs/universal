import { getSiteSettings } from "../../../../sanity/lib/fetch"
import FooterContent from "./footer-content"

const FALLBACK = {
  contactText_en: "Universal opens only by appointment. For inquiries or to schedule a visit, write to:",
  contactText_es: "Universal abre únicamente con agenda previa. Por consultas o para agendar una visita, escribí a:",
  email: "hola@esuniversal.uy",
  address: "Piedras 544, Montevideo, Uruguay.",
  instagramUrl: "https://www.instagram.com/esuniversal",
  instagramLabel: "Instagram",
  copyright_en: "All rights reserved ©2026. This site was designed by Pia Alive and developed by Nocti Labs.",
  copyright_es: "Todos los derechos reservados ©2026. Este sitio fue diseñado por Pia Alive y desarrollado por Nocti Labs.",
}

export default async function Footer() {
  const settings = await getSiteSettings()
  const f = settings?.footer ?? {}

  const data = {
    contactText_en: f.contactText_en ?? FALLBACK.contactText_en,
    contactText_es: f.contactText_es ?? FALLBACK.contactText_es,
    email: f.email ?? FALLBACK.email,
    address: f.address ?? FALLBACK.address,
    instagramUrl: f.instagramUrl ?? FALLBACK.instagramUrl,
    instagramLabel: f.instagramLabel ?? FALLBACK.instagramLabel,
    copyright_en: f.copyright_en ?? FALLBACK.copyright_en,
    copyright_es: f.copyright_es ?? FALLBACK.copyright_es,
  }

  return <FooterContent data={data} />
}
