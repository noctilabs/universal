"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import type { ArchiveFrame } from "@modules/archive/components/archive-content"
import ArchiveFrameMesh from "@modules/archive/components/archive-frame"

type ArchiveSceneProps = {
  frames: ArchiveFrame[]
  onFrameClick: (frame: ArchiveFrame) => void
}

export default function ArchiveScene({ frames, onFrameClick }: ArchiveSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0.01], fov: 80, near: 0.01, far: 100 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, #b8d4e8, #e8f0f5)",
        cursor: "grab",
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        makeDefault
      />
      <Suspense fallback={null}>
        {frames.map((frame) => (
          <ArchiveFrameMesh
            key={frame.id}
            frame={frame}
            onSelect={onFrameClick}
          />
        ))}
      </Suspense>
    </Canvas>
  )
}
