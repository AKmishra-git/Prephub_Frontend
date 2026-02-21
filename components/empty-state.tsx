import { FolderOpen } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = "No videos yet",
  description = "Videos will be added here soon. Check back later!",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/50 py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
