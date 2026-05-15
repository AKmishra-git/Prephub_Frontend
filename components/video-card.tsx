"use client"

import { Play, Clock, Code2 } from "lucide-react"

interface VideoCardProps {
  id: string
  title: string
  url: string
  duration?: string
  subject: string
  leetcodeUrl?: string   // optional — button hidden when absent
}

export function VideoCard({ id, title, url, duration, subject, leetcodeUrl }: VideoCardProps) {

  async function markWatched(videoId: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ videoId, subject })
      })

      const data = await res.json()

      if (data.success) {
        alert("Marked as watched ✅")
        window.location.href = window.location.href
      } else {
        alert(data.message || "Something went wrong")
      }

    } catch (err) {
      console.error(err)
      alert("Error marking video")
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card p-4 hover:shadow-md transition">

      {/* LEFT SIDE — icon + title */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Play className="h-5 w-5 text-primary" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-medium text-foreground">
            {title}
          </h3>

          {duration && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </a>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Solve on LeetCode — only shown when leetcodeUrl is provided */}
        {leetcodeUrl && (
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-orange-400 px-3 py-1 text-xs text-orange-400 hover:bg-orange-400/10 transition"
          >
            <Code2 className="h-3.5 w-3.5" />
            Solve
          </a>
        )}

        <button
          onClick={() => markWatched(id)}
          className="rounded-md border border-green-500 px-3 py-1 text-xs text-green-400 hover:bg-green-500/10 transition"
        >
          Mark watched ✔
        </button>

      </div>

    </div>
  )
}