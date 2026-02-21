import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/navbar'
import { AiAssistant } from '@/components/ai-assistant'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PrepHub - Master Placement Preparation',
  description: 'Learn curated topics and best videos for coding and core CS subjects. Prepare for placements with DSA, OOPs, DBMS, CN, and OS.',
  
}

export const viewport: Viewport = {
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950`}>
        <Navbar />
        <main>{children}</main>
        <AiAssistant />
      </body>
    </html>
  )
}
