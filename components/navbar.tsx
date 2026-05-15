"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

type User = {
  name: string
  email: string
}

export function Navbar() {
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/me`, {
          credentials: "include",
        })

        if (!res.ok) return

        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.log("User not logged in")
      }
    }

    fetchUser()
  }, [])

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prep/logout`, {
      method: "POST",
      credentials: "include",
    })

    window.location.reload()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            PrepHub
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-1">

          {/* Home */}
          <Link
            href="/"
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>

          {/* Subjects */}
          <Link
            href="/subjects"
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith("/subjects") ||
              pathname.startsWith("/subject") ||
              pathname.startsWith("/videos")
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Subjects
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
          </Link>

          {/* User UI */}
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  pathname === "/register"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}