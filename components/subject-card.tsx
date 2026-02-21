import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface SubjectCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  href: string
}

export function SubjectCard({
  title,
  description,
  icon: Icon,
  color,
  href,
}: SubjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">

      {/* Icon */}
      <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${color} p-3`}>
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* 🔥 Start Preparing Button */}
      <Link href={href}>
        <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          Start Preparing →
        </button>
      </Link>

      {/* Hover Glow Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}