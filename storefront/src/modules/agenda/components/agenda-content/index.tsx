"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// All positions derived from Figma at 1440px canvas width.
// Using vw units (val / 1440 * 100) so layout scales with viewport.

const toVw = (px: number) => `${((px / 1440) * 100).toFixed(3)}vw`

const ROWS = [
  {
    id: "e1",
    href: "/events",
    items: [
      { text: "CREATURA",   left: toVw(35),    top: toVw(6),  size: "large" },
      { text: "EXP. NO. 01", left: toVw(732),  top: toVw(6),  size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", left: toVw(1139), top: toVw(6), size: "small" },
    ],
  },
  {
    id: "e2",
    href: "/events",
    items: [
      { text: "NOCHE OSCURA",      left: toVw(35),   top: toVw(6), size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", left: toVw(587), top: toVw(6), size: "small" },
      { text: "MUSICASIÓN 4 1/2", left: toVw(863),  top: toVw(6), size: "large" },
    ],
  },
  {
    id: "e3",
    href: "/events",
    items: [
      { text: "SUSETTE KOK",   left: toVw(35),   top: toVw(6), size: "large" },
      { text: "SCHAT (TESORO)", left: toVw(587),  top: toVw(6), size: "large" },
      { text: "03 OCT, 2026\n08:30 PM", left: toVw(1138), top: toVw(6), size: "small" },
    ],
  },
  {
    id: "e4",
    href: "/events",
    items: [
      { text: "03 OCT, 2026\n08:30 PM",              left: toVw(35),  top: toVw(7), size: "small" },
      { text: "SOFÍA CÓRDOBA",                        left: toVw(311), top: toVw(6), size: "large" },
      { text: "YACIMIENTO, FICCIONES\nSUPERPUESTAS", left: toVw(863), top: toVw(7), size: "small" },
    ],
  },
]

export default function AgendaContent() {
  return (
    <div className="agenda-shell">
      <div className="agenda-list">
        {ROWS.map((row) => (
          <LocalizedClientLink key={row.id} href={row.href} className="block">
            <div className="agenda-row">
              {row.items.map((item, i) => (
                <span
                  key={i}
                  className={item.size === "large" ? "agenda-title" : "agenda-date"}
                  style={{ left: item.left }}
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
