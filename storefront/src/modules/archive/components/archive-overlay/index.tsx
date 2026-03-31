"use client"

import { useEffect } from "react"
import type { ArchiveFrame } from "@modules/archive/components/archive-content"

type ArchiveOverlayProps = {
  frame: ArchiveFrame | null
  onClose: () => void
}

export default function ArchiveOverlay({ frame, onClose }: ArchiveOverlayProps) {
  useEffect(() => {
    if (!frame) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [frame, onClose])

  if (!frame) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <button
        className="absolute top-8 right-8 z-10 text-white font-neue-haas text-3xl leading-none hover:opacity-60 transition-opacity"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <div
        className="relative flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frame.url}
          alt={frame.title}
          style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain" }}
        />
        <p className="font-neue-haas text-white text-xl tracking-wide">
          {frame.title}
        </p>
      </div>
    </div>
  )
}
