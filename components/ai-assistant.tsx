"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, X, MessageCircle, Users, Coffee, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import { GEMINI_API_KEY, isGeminiConfigured, getGeminiModel, getApiKey } from "@/lib/gemini-config"
import { GoogleGenAI } from '@google/genai'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  options?: string[]
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hi, I'm your personal AI Customer Support Agent here to help answer any question you have. May I ask if its any of the 3 below?",
      timestamp: new Date(),
      options: [
        "Need help setting up your account?",
        "Invite a new colleague?",
        "Start a new project?"
      ]
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Debug logging
  console.log("AI Assistant Config:", {
    apiKey: GEMINI_API_KEY ? `Present (${GEMINI_API_KEY.substring(0, 10)}...)` : "Missing",
    model: getGeminiModel(),
    isConfigured: isGeminiConfigured()
  })

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Check if Gemini API is configured
    if (!isGeminiConfigured()) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `AI Assistant is not properly configured. API Key: ${GEMINI_API_KEY ? 'Present' : 'Missing'}, Model: ${getGeminiModel()}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("Attempting API call with:", {
        model: getGeminiModel(),
        apiKey: GEMINI_API_KEY ? "Present" : "Missing",
        prompt: input
      })

      // Initialize Google GenAI
      const ai = new GoogleGenAI({
        apiKey: getApiKey(),
      })

      const model = ai.models.generateContent({
        model: getGeminiModel(),
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an AI Customer Support Agent. 
                Your role is to help customers with their questions and provide excellent customer service.
                
                Please provide helpful, friendly responses. Keep responses concise and professional.
                
                User question: ${input}`,
              },
            ],
          },
        ],
      })

      const response = await model
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

    } catch (error) {
      console.error("Error generating response:", error)
      
      // More specific error messages based on error type
      let errorContent = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorContent = "API key error. Please check your Gemini API configuration."
        } else if (error.message.includes("quota")) {
          errorContent = "API quota exceeded. Please try again later."
        } else if (error.message.includes("network")) {
          errorContent = "Network error. Please check your internet connection."
        } else if (error.message.includes("model")) {
          errorContent = "Model error. Please check your Gemini model configuration."
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: option,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    
    // Simulate AI response for demo
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Okay, I can help you with that ${option.includes("account") ? "account setup" : option.includes("colleague") ? "inviting colleagues" : "starting a new project"} ✨`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes === 1) return "1 minute ago"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours === 1) return "1 hour ago"
    return `${diffInHours} hours ago`
  }

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-brand bg-gradient-brand-hover z-40"
        size="icon"
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* Full Screen Chat Popup */}
              {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end">
            <Card className="w-full h-full max-w-sm bg-white dark:bg-black shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-300 dark:bg-teal-400 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Customer Support</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="underline cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">Provide feedback here</span>
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <ScrollArea className="flex-1 p-4 overflow-hidden">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                                                 className={`max-w-[85%] rounded-lg p-3 break-words ${
                           message.role === "user" 
                             ? "bg-teal-700 text-white" 
                             : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                         }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        
                        {/* Show options for assistant messages */}
                        {message.role === "assistant" && message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, index) => (
                              <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                                                 className="bg-white dark:bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors"
                              >
                                <div className="flex items-center space-x-2">
                                  {index === 0 && <MessageCircle className="h-4 w-4 text-blue-600" />}
                                  {index === 1 && <Users className="h-4 w-4 text-yellow-600" />}
                                  {index === 2 && <Coffee className="h-4 w-4 text-red-600" />}
                                                                     <span className="text-sm text-gray-700 dark:text-gray-200">{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Timestamp and feedback for assistant messages */}
                        {message.role === "assistant" && (
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <ThumbsUp className="h-3 w-3 text-gray-500" />
                              </button>
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <ThumbsDown className="h-3 w-3 text-gray-500" />
                              </button>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(message.timestamp)}
                            </span>
                          </div>
                        )}
                        
                        {/* Timestamp for user messages */}
                        {message.role === "user" && (
                          <p className="text-xs opacity-70 mt-2">
                            {formatTimeAgo(message.timestamp)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[85%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Field */}
              <div className="border-t p-4 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write your message.."
                    disabled={isLoading}
                                         className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
