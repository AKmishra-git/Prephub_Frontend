"use client"

interface ProgressBarProps {
  value: number
  label?: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="mt-4">

      {/* 🔹 Label */}
      {label && (
        <p className="mb-1 text-sm font-semibold text-white/80 tracking-wide drop-shadow-[0_0_6px_rgba(139,92,246,0.35)]">
          {label}
        </p>
      )}

      {/* 🔹 Progress Track */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">

        {/* actual progress fill */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />

        {/* glow layer */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 blur-md"
          style={{ width: `${value}%` }}
        />
      </div>

      {/* 🔹 Percentage Text */}
      <div className="mt-1 text-right text-xs font-medium text-white/70 tracking-wide drop-shadow-[0_0_6px_rgba(99,102,241,0.35)]">
        {value}% completed
      </div>

    </div>
  )
}