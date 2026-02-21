import { dsaTopics } from "@/lib/data"
import { VideoCard } from "@/components/video-card"
import { EmptyState } from "@/components/empty-state"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"


export const dynamic = "force-dynamic"

export default async function DsaTopicVideosPage({
  params,
}: {
  params: { topic: string }
}) {
  // ✅ FIX 1: await params
  const { topic: topicId } = await params

  // 🔹 find topic from local data
  const topic = dsaTopics.find((t) => t.id === topicId)

  if (!topic) {
    notFound()
  }

  // 🔥 FIX 2: lowercase for DB match
  const topicIdLower = topicId.toLowerCase()

  // 🔥 fetch videos
  let topicVideos: any[] = []

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/prep/videos/dsa/${topicIdLower}`,
      {
        cache: "no-store",
      }
    )

    const data = await res.json()
    topicVideos = data.data || []
  } catch (err) {
    console.log("Error fetching videos:", err)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      
      {/* 🔹 Header */}
      <div className="mb-10 flex items-start justify-between gap-6">

        {/* LEFT SIDE */}
        <div>
          <Link
            href="/subject/dsa"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to DSA Topics
          </Link>

          <h1 className="text-3xl font-bold text-foreground">
            {topic.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {topic.description}
          </p>
        </div>

       

      </div>

      {/* 🔹 Videos Section */}
      {topicVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {topicVideos.map((video) => (
            <VideoCard
              key={video._id}
              id={video._id}
              title={video.title}
              url={video.videoUrl}
              duration={video.duration}
              subject="dsa"
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

    </div>
  )
}