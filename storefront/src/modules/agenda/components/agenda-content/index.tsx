"use client"

import Image from "next/image"
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type AgendaRowItemData = {
  text: string
  leftPx: number
  topPx: number
  size: "large" | "small"
  hoverImageUrl?: string
  hoverImagePosition?: "above" | "right" | "below" | "left"
}

type AgendaRowData = {
  rowId: string
  eventSlug?: string | null
  items: AgendaRowItemData[]
}

type AgendaPageData = {
  rows?: AgendaRowData[]
}

// All positions derived from Figma at 1440px canvas width.
// Using vw units (val / 1440 * 100) so layout scales with viewport.
const toVw = (px: number) => `${((px / 1440) * 100).toFixed(3)}vw`

// Fallback hardcoded rows used when CMS has no data
const FALLBACK_ROWS: AgendaRowData[] = [
  {
    rowId: "e1",
    eventSlug: "e1",
    items: [
      { text: "CREATURA",     leftPx: 35,   topPx: 6, size: "large" },
      { text: "EXP. NO. 01",  leftPx: 732,  topPx: 6, size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", leftPx: 1139, topPx: 6, size: "small" },
    ],
  },
  {
    rowId: "e2",
    eventSlug: "e2",
    items: [
      { text: "NOCHE OSCURA",      leftPx: 35,  topPx: 6, size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", leftPx: 587, topPx: 6, size: "small" },
      { text: "MUSICASIÓN 4 1/2", leftPx: 863,  topPx: 6, size: "large" },
    ],
  },
  {
    rowId: "e3",
    eventSlug: "e3",
    items: [
      { text: "SUSETTE KOK",   leftPx: 35,   topPx: 6, size: "large" },
      { text: "SCHAT (TESORO)", leftPx: 587,  topPx: 6, size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", leftPx: 1138, topPx: 6, size: "small" },
    ],
  },
  {
    rowId: "e4",
    eventSlug: "e4",
    items: [
      { text: "03 OCT, 2026\n08:30 PM", leftPx: 35,  topPx: 7, size: "small" },
      { text: "SOFÍA CÓRDOBA",          leftPx: 311, topPx: 6, size: "large" },
      { text: "YACIMIENTO, FICCIONES\nSUPERPUESTAS", leftPx: 863, topPx: 7, size: "small" },
    ],
  },
]

type AgendaContentProps = {
  cmsData?: AgendaPageData | null
}

export default function AgendaContent({ cmsData }: AgendaContentProps) {
  const rows = (cmsData?.rows && cmsData.rows.length > 0) ? cmsData.rows : FALLBACK_ROWS
  const [hoverImage, setHoverImage] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState<"above" | "right" | "below" | "left">("above")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <div
      className="agenda-shell"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {hoverImage && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: {
              above: "translate(-50%, -110%)",
              below: "translate(-50%, 10%)",
              left:  "translate(-110%, -50%)",
              right: "translate(10%, -50%)",
            }[hoverPosition],
          }}
        >
          <Image
            src={hoverImage}
            alt=""
            width={307}
            height={176}
            className="object-cover"
            unoptimized={hoverImage.startsWith("http")}
          />
        </div>
      )}
      <div className="agenda-list">
        {rows.map((row) => (
          <LocalizedClientLink key={row.rowId} href={`/events/${row.eventSlug ?? row.rowId}/checkout/tickets`} className="block">
            <div className="agenda-row">
              {row.items.map((item, i) => (
                <span
                  key={i}
                  className={item.size === "large" ? "agenda-title" : "agenda-date"}
                  style={{ left: toVw(item.leftPx) }}
                  onMouseEnter={() => {
                    if (item.hoverImageUrl) {
                      setHoverImage(item.hoverImageUrl)
                      setHoverPosition(item.hoverImagePosition ?? "above")
                    }
                  }}
                  onMouseLeave={() => setHoverImage(null)}
                >
                  {item.text.split("\n").map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
