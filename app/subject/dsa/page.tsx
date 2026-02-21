import { dsaTopics } from "@/lib/data"
import { TopicCard } from "@/components/topic-card"
import { ArrowLeft } from "lucide-react"
import { ProgressClient } from "@/components/progress-client"
import Link from "next/link"

export default function DsaTopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      {/* 🔹 Header + Progress */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        {/* LEFT SIDE */}
        <div>
          <Link
            href="/subjects"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Subjects
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Data Structures & Algorithms
          </h1>

          <p className="mt-2 text-muted-foreground">
            Select a topic to view curated video lectures
          </p>
        </div>

        {/* RIGHT SIDE → Progress */}
        <div className="relative min-w-[240px] max-w-[340px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl shadow-lg">

          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

          <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[150%] -translate-x-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent blur-2xl" />

          {/* 🔥 overall DSA progress */}
          <ProgressClient subject="dsa" />
        </div>

      </div>

      {/* 🔹 Topic Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {dsaTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            href={`/videos/dsa/${topic.id}`}
          />
        ))}
      </div>

    </div>
  )
}