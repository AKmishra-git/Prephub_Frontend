import Link from "next/link"
import { ArrowRight, BookOpen, Brain, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          <span>Your Placement Prep Companion</span>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Master Placement Preparation
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Learn curated topics and best videos for coding and core CS subjects
        </p>

        <Link
          href="/subjects"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          {"Start Learning"}
          <ArrowRight className="h-5 w-5" />
        </Link>

        {/* Feature Highlights */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureItem
            icon={BookOpen}
            title="Curated Content"
            description="Handpicked videos and resources"
          />
          <FeatureItem
            icon={Brain}
            title="AI Assistant"
            description="Get instant doubt resolution"
          />
          <FeatureItem
            icon={GraduationCap}
            title="Core Subjects"
            description="DSA, OOPs, DBMS, CN & OS"
          />
        </div>
      </section>
    </div>
  )
}

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
