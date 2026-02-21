import { subjects } from "@/lib/data"
import { SubjectCard } from "@/components/subject-card"

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Subjects</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a subject to start learning
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            title={subject.title}
            description={subject.description}
            icon={subject.icon}
            color={subject.color}
            href={subject.href}
          />
        ))}
      </div>
    </div>
  )
}
