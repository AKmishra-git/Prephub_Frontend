"use client"

import { useEffect, useState } from "react"
import { ProgressBar } from "./progressbar"

export function ProgressClient({ subject }: { subject: string }) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/prep/progress/${subject}`,
          {
            credentials: "include",   // 🔥 works in client
          }
        )

        const data = await res.json()

        setPercent(data.percent || 0)
      } catch (err) {
        console.error("Error fetching progress", err)
      }
    }

    loadProgress()
  }, [subject])

  return <ProgressBar value={percent} label="Your Progress" />
}