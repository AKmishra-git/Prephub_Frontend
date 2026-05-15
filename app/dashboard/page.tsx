"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Eye, Flame, Trophy, ChevronRight } from "lucide-react"
import Link from "next/link"

type SubjectStat = {
  subject: string
  totalVideos: number
  watchedVideos: number
  percent: number
}

type DashboardData = {
  stats: SubjectStat[]
  totalWatched: number
  totalVideos: number
  streak: number
}

const subjectColors: Record<string, string> = {
  DSA: "from-indigo-500 to-purple-600",
  OOPS: "from-pink-500 to-rose-500",
  CN: "from-blue-500 to-cyan-500",
  OS: "from-orange-500 to-amber-500",
  DBMS: "from-green-500 to-emerald-500",
}

const subjectLinks: Record<string, string> = {
  DSA: "/subjects/dsa",
  OOPS: "/subjects/oops",
  CN: "/subjects/cn",
  OS: "/subjects/os",
  DBMS: "/subjects/dbms",
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    async function load() {
      try {
        // fetch user
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/me`, {
          credentials: "include",
        })
        if (!userRes.ok) {
          router.push("/login")
          return
        }
        const userData = await userRes.json()
        setUserName(userData.user.name.split(" ")[0])

        // fetch dashboard stats
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/progress/dashboard`, {
          credentials: "include",
        })
        const json = await res.json()
        if (json.success) setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!data) return null

  const overallPercent = data.totalVideos === 0 ? 0 : Math.round((data.totalWatched / data.totalVideos) * 100)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          Hey, {userName} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's your preparation progress
        </p>
      </div>

      {/* Top Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
            <Eye className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.totalWatched}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Videos Watched</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
            <BookOpen className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.totalVideos}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Total Videos</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
            <Flame className="h-5 w-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.streak}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Day Streak 🔥</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
            <Trophy className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{overallPercent}%</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Overall Done</p>
        </div>

      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium text-white">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{data.totalWatched} / {data.totalVideos} videos</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-medium text-indigo-400">{overallPercent}% complete</p>
      </div>

      {/* Subject Cards */}
      <h2 className="mb-4 text-lg font-semibold text-white">Subject wise Progress</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.stats.map((stat) => (
          <Link
            key={stat.subject}
            href={subjectLinks[stat.subject] || "/subjects"}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${subjectColors[stat.subject]} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">{stat.subject.slice(0, 2)}</span>
                </div>
                <span className="font-semibold text-white">{stat.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{stat.percent}%</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${subjectColors[stat.subject]} transition-all duration-700`}
                style={{ width: `${stat.percent}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{stat.watchedVideos} watched</span>
              <span>{stat.totalVideos} total</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}