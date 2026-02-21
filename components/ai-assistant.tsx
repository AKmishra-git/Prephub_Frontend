"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your PrepHub AI Assistant. Ask me anything about DSA, OOPs, DBMS, Computer Networks, or Operating Systems!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         message: trimmed,
        subject: "dsa",
        topic: "arrays",
        videoTitle: "Merge Two Sorted Arrays",
      }),
})


      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I could not process that request.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/40 sm:bottom-6 sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">PrepHub AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask your doubts</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close AI Assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Bot className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border/50 bg-secondary/30 p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 rounded-xl border border-border/50 bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/25"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
