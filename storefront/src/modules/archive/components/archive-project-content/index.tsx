"use client"

import { useRouter, useParams } from "next/navigation"
import { useLandingLocale } from "@modules/landing/context/landing-locale-context"

type ArchiveProjectData = {
  title: string
  imageUrl: string
  slug: string
  year?: string
  typeOfProject?: string
  artDirection?: string
  photography?: string
  description_en?: string
  description_es?: string
}

type Props = {
  project: ArchiveProjectData
  prevSlug: string | null
  nextSlug: string | null
}

export default function ArchiveProjectContent({ project, prevSlug, nextSlug }: Props) {
  const { locale } = useLandingLocale()
  const router = useRouter()
  const params = useParams()
  const countryCode = (params?.countryCode as string) ?? "en"

  const description =
    locale === "es"
      ? project.description_es ?? project.description_en ?? ""
      : project.description_en ?? project.description_es ?? ""

  function goToNext() {
    if (nextSlug) router.push(`/${countryCode}/archive/${nextSlug}`)
  }

  return (
    <div
      style={{
        backgroundColor: "#cdcdcd",
        minHeight: "100vh",
        fontFamily: '"Neue Haas Grotesk Display Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/archiveExampleImage.svg"
          alt={project.title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Title row: padding left=38.5px, title takes ~37%, year next, metadata at 58.68% */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "38.5px 37% 21.68% 1fr",
        paddingTop: "70px",
        alignItems: "start",
      }}>
        <div />
        <h1 style={{
          fontSize: "clamp(28px, 4.44vw, 64px)",
          fontWeight: 400,
          lineHeight: 1.125,
          margin: 0,
          textTransform: "uppercase",
          color: "#000",
          minWidth: 0,
        }}>
          {project.title}
        </h1>
        {project.year ? (
          <span style={{
            fontSize: "clamp(28px, 4.44vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.125,
            color: "#000",
            textTransform: "uppercase",
            minWidth: 0,
          }}>
            {project.year}
          </span>
        ) : <div />}
        <div style={{ fontSize: "clamp(14px, 1.25vw, 18px)", fontWeight: 400, lineHeight: 1.4, color: "#000", minWidth: 0 }}>
          {project.typeOfProject && <p style={{ margin: 0 }}>TYPE OF PROJECT: {project.typeOfProject.toUpperCase()}</p>}
          {project.year && <p style={{ margin: 0 }}>YEAR: {project.year}</p>}
          {project.artDirection && <p style={{ margin: 0 }}>ART DIRECTION: {project.artDirection.toUpperCase()}</p>}
          {project.photography && <p style={{ margin: 0 }}>PHOTOGRAPHY: {project.photography.toUpperCase()}</p>}
        </div>
      </div>

      {/* Description + Next Project row */}
      {/* Description row: left=38.5px, description width=671.5px (46.63vw), gap, metadata col */}
      {/* Figma: desc ends at 710px, metadata starts at 845px */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "38.5px 46.63% 12.05% 1fr",
        paddingTop: "84px",
        paddingBottom: "6rem",
        alignItems: "start",
        overflow: "hidden",
      }}>
        <div />
        <p style={{
          fontSize: "clamp(16px, 1.94vw, 28px)",
          fontWeight: 400,
          lineHeight: "normal",
          color: "#000",
          margin: 0,
          whiteSpace: "pre-wrap",
          minWidth: 0,
        }}>
          {description}
        </p>
        <div />
        {nextSlug && (
          <button onClick={goToNext} style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "24px",
            fontWeight: 400,
            color: "#000",
            padding: "0 40px 0 0",
            fontFamily: "inherit",
            width: "100%",
            minWidth: 0,
          }}>
            <span>Next Project</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/arrow_forward.svg" alt="" width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  )
}
