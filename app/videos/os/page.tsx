import { VideoCard } from "@/components/video-card"
import { EmptyState } from "@/components/empty-state"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressClient } from "@/components/progress-client"

// disable caching
export const dynamic = "force-dynamic"

export default async function OsVideosPage() {
  // 🎥 fetch OS videos
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/videos/os/os`, {
    cache: "no-store",
  })

  const data = await res.json()
  const osVideos = data?.data ?? data ?? []

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      {/* 🔹 Header */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        {/* LEFT SIDE */}
        <div>
          <Link
            href="/subjects"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Core Subjects
          </Link>

          <h1 className="text-3xl font-bold text-foreground">
            Operating Systems
          </h1>

          <p className="mt-2 text-muted-foreground">
            Learn OS concepts like processes, scheduling, memory management, and more.
          </p>
        </div>

        {/* RIGHT SIDE — Progress (CLIENT SIDE) */}
        <div className="relative min-w-[240px] max-w-[340px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl shadow-lg">

          {/* glow overlay */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[150%] -translate-x-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent blur-2xl" />

          {/* 🔥 this fetches progress correctly */}
          <ProgressClient subject="os" />
        </div>

      </div>

      {/* 🔹 Videos Section */}
      {osVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {osVideos.map((video: any) => (
            <VideoCard
              key={video._id}
              id={video._id}
              title={video.title}
              url={video.videoUrl}
              duration={video.duration}
              subject="os"
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

    </div>
  )
}