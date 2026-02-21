"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    })

      const data = await res.json()

      if (!res.ok) alert(data.message)
      else {
        alert("Welcome back 🚀")

         window.location.reload()
      }
    } catch {
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        
        <h1 className="mb-6 text-2xl font-bold text-white">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />

          <button
            disabled={loading}
            className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-2 font-medium text-white transition hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  )
}
