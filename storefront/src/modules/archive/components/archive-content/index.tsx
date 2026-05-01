"use client"

import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import type { ArchiveFrameData } from "@universal/types"

export type ArchiveFrame = {
  id: string
  url: string
  title: string
  slug: string
  phi: number
  theta: number
  tilt: [number, number, number]
  scale: number
  aspect: number
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

const PI = Math.PI

const FALLBACK_FRAMES: ArchiveFrame[] = [
  { id: "f1",  slug: "vogue-i",          url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", title: "Vogue I",        phi: PI/4,      theta: 0,             tilt: [0.05,  0.08, -0.03], scale: 1.1,  aspect: 3/4 },
  { id: "f2",  slug: "studio-ii",         url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", title: "Studio II",     phi: PI/3.5,    theta: PI/3,          tilt: [-0.07, 0.05,  0.04], scale: 1.2,  aspect: 3/4 },
  { id: "f3",  slug: "cover-iii",         url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", title: "Cover III",     phi: PI/2,      theta: 2*PI/3,        tilt: [0.06, -0.06,  0.02], scale: 0.95, aspect: 3/4 },
  { id: "f4",  slug: "editorial-iv",      url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80", title: "Editorial IV",  phi: 2*PI/5,    theta: PI,            tilt: [-0.04, 0.07, -0.05], scale: 1.15, aspect: 3/4 },
  { id: "f5",  slug: "mode-v",            url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80", title: "Mode V",        phi: 3*PI/5,    theta: 4*PI/3,        tilt: [0.08,  0.03,  0.06], scale: 1.0,  aspect: 3/4 },
  { id: "f6",  slug: "portrait-vi",       url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", title: "Portrait VI",   phi: PI/6,      theta: 5*PI/3,        tilt: [-0.06,-0.08,  0.01], scale: 1.3,  aspect: 3/4 },
  { id: "f7",  slug: "runway-vii",        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", title: "Runway VII",    phi: PI/2.5,    theta: PI/6,          tilt: [0.03,  0.05, -0.04], scale: 1.05, aspect: 3/4 },
  { id: "f8",  slug: "atelier-viii",      url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80", title: "Atelier VIII",  phi: 2*PI/3,    theta: PI/2,          tilt: [-0.05, 0.06,  0.03], scale: 1.1,  aspect: 3/4 },
  { id: "f9",  slug: "couture-ix",        url: "https://images.unsplash.com/photo-1529139574466-a303027614b8?w=800&q=80", title: "Couture IX",    phi: PI/3.5,    theta: 7*PI/4,        tilt: [0.07, -0.04,  0.05], scale: 0.9,  aspect: 3/4 },
  { id: "f10", slug: "noir-x",            url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80", title: "Noir X",        phi: 3*PI/4,    theta: PI/4,          tilt: [-0.03, 0.08, -0.02], scale: 1.0,  aspect: 3/4 },
  { id: "f11", slug: "blanche-xi",        url: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80", title: "Blanche XI",    phi: PI/2.2,    theta: 3*PI/2,        tilt: [0.06,  0.02,  0.07], scale: 1.2,  aspect: 3/4 },
  { id: "f12", slug: "cover-xii",         url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80", title: "Cover XII",     phi: 2*PI/5,    theta: 11*PI/6,       tilt: [-0.08,-0.03,  0.04], scale: 1.0,  aspect: 3/4 },
  { id: "f13", slug: "muse-xiii",         url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80", title: "Muse XIII",     phi: 4*PI/9,    theta: PI/3,          tilt: [0.04,  0.07, -0.06], scale: 0.95, aspect: 3/4 },
  { id: "f14", slug: "studio-xiv",        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", title: "Studio XIV",    phi: 5*PI/8,    theta: 5*PI/3,        tilt: [-0.04, 0.05,  0.02], scale: 1.15, aspect: 4/3 },
  { id: "f15", slug: "verso-xv",          url: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80", title: "Verso XV",      phi: PI/2.8,    theta: 7*PI/6,        tilt: [0.05, -0.06,  0.03], scale: 1.0,  aspect: 3/4 },
  { id: "f16", slug: "haute-xvi",         url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80", title: "Haute XVI",     phi: 3*PI/7,    theta: PI/12,         tilt: [-0.07, 0.04, -0.05], scale: 1.1,  aspect: 3/4 },
  { id: "f17", slug: "lumen-xvii",        url: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80", title: "Lumen XVII",    phi: 7*PI/10,   theta: 17*PI/12,      tilt: [0.03, -0.05,  0.06], scale: 0.95, aspect: 3/4 },
  { id: "f18", slug: "archive-xviii",     url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80", title: "Archive XVIII", phi: PI/2.4,    theta: 13*PI/6,       tilt: [-0.06, 0.07,  0.01], scale: 1.25, aspect: 3/4 },
  { id: "f19", slug: "form-xix",          url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80", title: "Form XIX",      phi: PI/3.2,    theta: 5*PI/8,        tilt: [0.04, -0.08,  0.02], scale: 1.0,  aspect: 3/4 },
  { id: "f20", slug: "ligne-xx",          url: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=800&q=80", title: "Ligne XX",      phi: 2*PI/3.5,  theta: 9*PI/5,        tilt: [-0.05, 0.03, -0.07], scale: 1.1,  aspect: 3/4 },
  { id: "f21", slug: "silhouette-xxi",    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", title: "Silhouette XXI",phi: PI/1.8,    theta: PI/4+0.3,      tilt: [0.07,  0.06, -0.03], scale: 0.9,  aspect: 3/4 },
  { id: "f22", slug: "dusk-xxii",         url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80", title: "Dusk XXII",     phi: PI/2.6,    theta: 3*PI/5,        tilt: [-0.03,-0.07,  0.05], scale: 1.15, aspect: 3/4 },
  { id: "f23", slug: "gloss-xxiii",       url: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=800&q=80", title: "Gloss XXIII",   phi: 3*PI/8,    theta: 7*PI/5,        tilt: [0.06,  0.04, -0.02], scale: 1.05, aspect: 3/4 },
  { id: "f24", slug: "ink-xxiv",          url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80", title: "Ink XXIV",      phi: PI/1.6,    theta: 11*PI/7,       tilt: [-0.06,-0.04,  0.08], scale: 1.2,  aspect: 3/4 },
  { id: "f25", slug: "iris-xxv",          url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4dbe?w=800&q=80", title: "Iris XXV",      phi: PI/3.8,    theta: PI/2+0.5,      tilt: [0.02,  0.09, -0.04], scale: 0.95, aspect: 3/4 },
  { id: "f26", slug: "arc-xxvi",          url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", title: "Arc XXVI",      phi: 2*PI/4.5,  theta: 2*PI/7,        tilt: [-0.07, 0.02,  0.06], scale: 1.0,  aspect: 4/3 },
  { id: "f27", slug: "echo-xxvii",        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", title: "Echo XXVII",    phi: PI/1.4,    theta: PI+0.7,        tilt: [0.05, -0.03,  0.07], scale: 1.1,  aspect: 3/4 },
  { id: "f28", slug: "flux-xxviii",       url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", title: "Flux XXVIII",   phi: PI/2.1,    theta: 8*PI/5,        tilt: [-0.04, 0.08, -0.03], scale: 0.9,  aspect: 3/4 },
  { id: "f29", slug: "gaze-xxix",         url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80", title: "Gaze XXIX",     phi: PI/3+0.4,  theta: 13*PI/8,       tilt: [0.08, -0.05,  0.02], scale: 1.05, aspect: 3/4 },
  { id: "f30", slug: "haze-xxx",          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", title: "Haze XXX",      phi: PI/1.9,    theta: PI/6+1.2,      tilt: [-0.02, 0.06, -0.06], scale: 1.2,  aspect: 3/4 },
]

function cmsFramesToArchiveFrames(frames: ArchiveFrameData[]): ArchiveFrame[] {
  return frames.filter((f) => !!f.imageUrl).map((f, i) => ({
    id: `f${i + 1}`,
    url: f.imageUrl,
    title: f.title,
    slug: f.slug ?? slugify(f.title),
    phi: f.phi,
    theta: f.theta,
    tilt: [f.tiltX ?? 0, f.tiltY ?? 0, f.tiltZ ?? 0] as [number, number, number],
    scale: f.scale ?? 1,
    aspect: f.aspect ?? 0.75,
  }))
}

const ArchiveScene = dynamic(
  () => import("@modules/archive/components/archive-scene"),
  {
    loading: () => (
      <div
        className="w-full h-full"
        style={{ background: "linear-gradient(to bottom, #b8d4e8, #e8f0f5)" }}
      />
    ),
    ssr: false,
  }
)

type ArchiveContentProps = {
  cmsFrames?: ArchiveFrameData[] | null
}

export default function ArchiveContent({ cmsFrames }: ArchiveContentProps) {
  const router = useRouter()
  const params = useParams()
  const countryCode = (params?.countryCode as string) ?? "en"

  const frames =
    cmsFrames && cmsFrames.length > 0
      ? cmsFramesToArchiveFrames(cmsFrames)
      : FALLBACK_FRAMES

  function handleFrameClick(frame: ArchiveFrame) {
    router.push(`/${countryCode}/archive/${frame.slug}`)
  }

  return (
    <div className="archive-page-shell">
      <ArchiveScene
        frames={frames}
        onFrameClick={handleFrameClick}
      />
    </div>
  )
}
