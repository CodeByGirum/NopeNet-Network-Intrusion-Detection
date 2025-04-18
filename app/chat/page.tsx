"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useChat } from "ai/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Crosshair, Bot, User, Sparkles } from "lucide-react"
import { useDetection } from "@/context/detection-context"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ChatPage() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { detectionData } = useDetection()

  // Use the AI SDK's useChat hook with detection data
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: {
      detectionData,
    },
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: detectionData
          ? "Hello! I'm your NopeNet Assistant. I've analyzed your scan results and I'm ready to help you understand the detected threats."
          : "Hello! I'm your NopeNet Assistant. How can I help you analyze your network security today?",
      },
    ],
  })

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px" // Reset height
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + "px"
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col chat-page">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a20]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4 text-gray-400 hover:text-white hover:bg-gray-800 h-8 px-2 rounded-lg font-light"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span className="text-xs tracking-wide">Back</span>
            </Button>
            <div className="flex items-center">
              <Crosshair className="h-4 w-4 text-blue-400 mr-1.5" />
              <h1 className="text-sm font-normal tracking-wide">NopeNet Chat</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {detectionData && (
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full mr-2 font-light tracking-wide">
                Scan Results Available
              </span>
            )}
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-light tracking-wide">Online</span>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 message-bubble ${
                      message.role === "assistant"
                        ? "bg-gray-800/60 text-white border border-gray-700/30"
                        : "bg-blue-600/70 text-white border border-blue-500/30"
                    }`}
                  >
                    <div className="text-sm sm:text-base">
                      {message.role === "assistant" ? (
                        <div className="prose prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                    </div>
                    <div className="mt-1 text-[10px] opacity-60 text-right">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 ml-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-gray-800/80 text-white border border-gray-700/50">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
                  Error: {error.message || "Failed to communicate with the AI. Please try again."}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area - modernized with auto-expanding and shimmer effect */}
        <div className="relative z-10 border-t border-gray-800/20 p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              {/* Input container with subtle shimmer */}
              <div
                className="relative rounded-2xl p-[1px] bg-gradient-to-r from-gray-800/50 via-blue-800/30 to-gray-800/50 overflow-hidden"
                style={{
                  animation: "glow 3s ease-in-out infinite",
                }}
              >
                {/* Thin shimmer light effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 w-[20px] h-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
                    style={{
                      animation: "shimmer 1.5s linear infinite",
                      boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)",
                    }}
                  ></div>
                </div>

                <div className="relative flex items-end bg-gray-900/70 backdrop-blur-sm rounded-2xl">
                  <textarea
                    ref={textareaRef}
                    placeholder={detectionData ? "Ask about your scan results..." : "Type your message..."}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none py-3 pl-4 pr-12 text-white placeholder:text-gray-500 min-h-[40px] max-h-[120px] overflow-auto font-light"
                    style={{ height: "40px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.015em" }}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 bottom-2 bg-blue-600 hover:bg-blue-500 rounded-lg h-8 w-8 p-0 flex items-center justify-center shadow-sm"
                    disabled={isLoading || !input.trim()}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Sparkles className="h-3 w-3" />
              <span className="font-light tracking-wide">
                {detectionData
                  ? "Try asking about detected threats or security recommendations"
                  : "Try asking about DOS attacks, probing, or security recommendations"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact footer for chat page */}
      <div className="relative z-10 h-6 text-[10px] text-center text-gray-500 bg-transparent font-light tracking-wide">
        NopeNet © {new Date().getFullYear()}
      </div>

      {/* Add global CSS for markdown animations */}
      <style jsx global>{`
        /* Font imports */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');
        
        @keyframes glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
        
        /* Modern Font Styling */
        .prose {
          color: white;
          font-size: 0.875rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-weight: 300;
          line-height: 1.6;
          letter-spacing: 0.015em;
        }
        
        .prose h1 {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 0.75rem 0 0.5rem;
          color: white;
          letter-spacing: -0.01em;
        }
        
        .prose h2 {
          font-size: 1.125rem;
          font-weight: 500;
          margin: 0.75rem 0 0.5rem;
          color: white;
          letter-spacing: -0.01em;
        }
        
        .prose h3 {
          font-size: 1rem;
          font-weight: 500;
          margin: 0.5rem 0 0.25rem;
          color: white;
          letter-spacing: -0.01em;
        }
        
        .prose p {
          margin: 0.25rem 0 0.5rem;
          font-weight: 300;
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin: 0.25rem 0 0.5rem;
        }
        
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.25rem;
          margin: 0.25rem 0 0.5rem;
        }
        
        .prose li {
          margin: 0.125rem 0;
          font-weight: 300;
        }
        
        .prose a {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.15s ease;
        }
        
        .prose a:hover {
          color: #93c5fd;
          text-decoration: none;
          border-bottom: 1px solid #93c5fd;
        }
        
        .prose strong {
          font-weight: 500;
          color: #93c5fd;
        }
        
        .prose code {
          font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.75rem;
          font-weight: 400;
        }
        
        .prose :not(pre) > code {
          background-color: rgba(31, 41, 55, 0.5);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          color: #e2e8f0;
        }
        
        .prose pre {
          background-color: rgba(17, 24, 39, 0.8);
          border-radius: 0.375rem;
          padding: 0.75rem;
          margin: 0.75rem 0;
          overflow-x: auto;
          border: 1px solid rgba(55, 65, 81, 0.3);
        }
        
        .prose blockquote {
          border-left: 2px solid rgba(99, 102, 241, 0.6);
          padding-left: 0.75rem;
          font-style: italic;
          color: #cbd5e1;
          margin: 0.75rem 0;
          font-weight: 300;
        }
        
        .prose table {
          border-collapse: collapse;
          border: 1px solid rgba(55, 65, 81, 0.5);
          margin: 0.75rem 0;
          font-size: 0.75rem;
          width: 100%;
        }
        
        .prose th {
          border: 1px solid rgba(55, 65, 81, 0.5);
          padding: 0.375rem 0.5rem;
          background-color: rgba(30, 41, 59, 0.5);
          font-weight: 500;
          text-align: left;
        }
        
        .prose td {
          border: 1px solid rgba(55, 65, 81, 0.5);
          padding: 0.375rem 0.5rem;
          font-weight: 300;
        }
        
        .prose hr {
          border-color: rgba(75, 85, 99, 0.3);
          margin: 1rem 0;
        }

        /* Modern message styling */
        .message-bubble {
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }
      `}</style>
    </main>
  )
}
