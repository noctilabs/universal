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

      {/* Title row: 3 columns — left margin | title+year | metadata */}
      {/* Figma: left=2.67%, year at 34.72%, metadata at 58.68% */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2.67% 56.01% 1fr",
        paddingTop: "70px",
        alignItems: "start",
      }}>
        <div />
        {/* Title + Year inline */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h1 style={{
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: 1.125,
            margin: 0,
            textTransform: "uppercase",
            color: "#000",
            whiteSpace: "nowrap",
            width: "32.06vw", /* 500px/1440px — year starts here */
          }}>
            {project.title}
          </h1>
          {project.year && (
            <span style={{
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: 1.125,
              color: "#000",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              {project.year}
            </span>
          )}
        </div>
        {/* Metadata */}
        <div style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1, color: "#000", paddingRight: "40px" }}>
          {project.typeOfProject && <p style={{ margin: 0 }}>TYPE OF PROJECT: {project.typeOfProject.toUpperCase()}</p>}
          {project.year && <p style={{ margin: 0 }}>YEAR: {project.year}</p>}
          {project.artDirection && <p style={{ margin: 0 }}>ART DIRECTION: {project.artDirection.toUpperCase()}</p>}
          {project.photography && <p style={{ margin: 0 }}>PHOTOGRAPHY: {project.photography.toUpperCase()}</p>}
        </div>
      </div>

      {/* Description + Next Project row */}
      {/* Figma: description top=227px from hero bottom, title top=70px → gap=157px from title top, title height=73px → marginTop=84px */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2.67% 56.01% 1fr",
        paddingTop: "84px",
        paddingBottom: "6rem",
        alignItems: "start",
      }}>
        <div />
        {/* Description: 46.63% wide (671.5/1440), stays in left portion */}
        <p style={{
          fontSize: "28px",
          fontWeight: 400,
          lineHeight: 1.4,
          color: "#000",
          margin: 0,
          whiteSpace: "pre-wrap",
          width: "48.79vw",
        }}>
          {description}
        </p>
        {/* Next Project aligned with metadata */}
        {nextSlug && (
          <button onClick={goToNext} style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "24px",
            fontWeight: 400,
            color: "#000",
            padding: 0,
            paddingRight: "40px",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}>
            Next Project →
          </button>
        )}
      </div>
    </div>
  )
}
