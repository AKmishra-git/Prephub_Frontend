"use client"

import { Play, Clock, Code2, NotebookPen, X, Save } from "lucide-react"
import { useState, useEffect } from "react"

interface VideoCardProps {
  id: string
  title: string
  url: string
  duration?: string
  subject: string
}

function toLeetcodeUrl(title: string): string {
  return `https://leetcode.com/problems/${title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")}/`
}

export function VideoCard({ id, title, url, duration, subject }: VideoCardProps) {
  const isDSA = subject.toLowerCase() === "dsa"
  const leetcodeUrl = isDSA ? toLeetcodeUrl(title) : null

  const [showNotes, setShowNotes] = useState(false)
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // load existing note when opened
  useEffect(() => {
    if (!showNotes) return

    async function fetchNote() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
          credentials: "include",
        })
        const data = await res.json()
        if (data.success) setNote(data.note)
      } catch (err) {
        console.error(err)
      }
    }

    fetchNote()
  }, [showNotes, id])

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

  async function handleSaveNote() {
    setSaving(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ note })
      })
      const data = await res.json()
      if (data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card transition hover:shadow-md">

      {/* TOP ROW */}
      <div className="flex items-center justify-between gap-4 p-4">

        {/* LEFT — icon + title */}
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
            <h3 className="truncate font-medium text-foreground">{title}</h3>
            {duration && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{duration}</span>
              </div>
            )}
          </div>
        </a>

        {/* RIGHT — buttons */}
        <div className="flex shrink-0 items-center gap-2">

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
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition ${
              showNotes
                ? "border-indigo-400 bg-indigo-400/10 text-indigo-400"
                : "border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
            }`}
          >
            {showNotes ? <X className="h-3.5 w-3.5" /> : <NotebookPen className="h-3.5 w-3.5" />}
            {showNotes ? "Close" : "Notes"}
          </button>

          <button
            onClick={() => markWatched(id)}
            className="rounded-md border border-green-500 px-3 py-1 text-xs text-green-400 hover:bg-green-500/10 transition"
          >
            Mark watched ✔
          </button>

        </div>
      </div>

      {/* NOTES SECTION */}
      {showNotes && (
        <div className="border-t border-border/50 px-4 pb-4 pt-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Your notes</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes here..."
            rows={4}
            className="w-full rounded-lg border border-border/50 bg-black/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSaveNote}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Note"}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}