import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface TopicCardProps {
  title: string
  description: string
  href: string
}

export function TopicCard({ title, description, href }: TopicCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="ml-4 h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  )
}
