"use client"

import { useRef, useState, useLayoutEffect, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { ArchiveFrame } from "@modules/archive/components/archive-content"

type ArchiveFrameMeshProps = {
  frame: ArchiveFrame
  onSelect: (frame: ArchiveFrame) => void
}

const RADIUS = 8
const ORIGIN = new THREE.Vector3(0, 0, 0)

function toXYZ(phi: number, theta: number): [number, number, number] {
  return [
    RADIUS * Math.sin(phi) * Math.cos(theta),
    RADIUS * Math.cos(phi),
    RADIUS * Math.sin(phi) * Math.sin(theta),
  ]
}

export default function ArchiveFrameMesh({ frame, onSelect }: ArchiveFrameMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  const pos = toXYZ(frame.phi, frame.theta)

  // Point the mesh face toward the origin after it mounts
  useLayoutEffect(() => {
    if (!meshRef.current) return
    meshRef.current.lookAt(ORIGIN)
    // Apply tilt on top
    meshRef.current.rotation.x += frame.tilt[0]
    meshRef.current.rotation.y += frame.tilt[1]
    meshRef.current.rotation.z += frame.tilt[2]
  }, [frame.tilt])

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      frame.url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
      undefined,
      () => {}
    )
  }, [frame.url])

  useFrame(() => {
    if (!meshRef.current) return
    const t = hovered ? frame.scale * 1.07 : frame.scale
    meshRef.current.scale.lerp(new THREE.Vector3(t, t, t), 0.1)
  })

  const w = 1.8
  const h = w / frame.aspect

  return (
    <mesh
      ref={meshRef}
      position={pos}
      scale={[frame.scale, frame.scale, frame.scale]}
      onClick={(e) => { e.stopPropagation(); onSelect(frame) }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "grab" }}
    >
      <planeGeometry args={[w, h]} />
      {texture && (
        <meshStandardMaterial map={texture} toneMapped={false} color={hovered ? "#ffffff" : "#e8e8e8"} />
      )}
    </mesh>
  )
}
