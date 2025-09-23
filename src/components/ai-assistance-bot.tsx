"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Calendar, Home, MapPin, Phone, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-action"
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
}

export function AIAssistanceBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant for property management. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: "schedule",
      label: "Schedule Viewing",
      icon: <Calendar className="h-4 w-4" />,
      action: () => handleQuickAction("I'd like to schedule a property viewing"),
    },
    {
      id: "properties",
      label: "Browse Properties",
      icon: <Home className="h-4 w-4" />,
      action: () => handleQuickAction("Show me available properties"),
    },
    {
      id: "location",
      label: "Find by Location",
      icon: <MapPin className="h-4 w-4" />,
      action: () => handleQuickAction("Help me find properties in a specific area"),
    },
    {
      id: "contact",
      label: "Contact Agent",
      icon: <Phone className="h-4 w-4" />,
      action: () => handleQuickAction("I need to speak with an agent"),
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleQuickAction = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    handleBotResponse(message)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    handleBotResponse(inputValue)
  }

  const handleBotResponse = (userInput: string) => {
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      let botResponse = ""

      if (userInput.toLowerCase().includes("schedule") || userInput.toLowerCase().includes("viewing")) {
        botResponse =
          "I'd be happy to help you schedule a property viewing! I can check available time slots and connect you with our agents. What type of property are you interested in, and do you have any preferred dates?"
      } else if (userInput.toLowerCase().includes("properties") || userInput.toLowerCase().includes("browse")) {
        botResponse =
          "Great! I can help you browse our property listings. We have various options including apartments, houses, and commercial spaces. What's your budget range and preferred location?"
      } else if (userInput.toLowerCase().includes("location") || userInput.toLowerCase().includes("area")) {
        botResponse =
          "I can help you find properties in specific areas! Which neighborhoods or cities are you interested in? I can also provide information about local amenities, schools, and transportation."
      } else if (userInput.toLowerCase().includes("contact") || userInput.toLowerCase().includes("agent")) {
        botResponse =
          "I'll connect you with one of our experienced agents right away! They can provide personalized assistance and answer any specific questions you have. Would you prefer a phone call or email contact?"
      } else if (userInput.toLowerCase().includes("price") || userInput.toLowerCase().includes("cost")) {
        botResponse =
          "I can help you understand our pricing and find properties within your budget. What's your price range? I can also explain our financing options and any current promotions."
      } else {
        botResponse =
          "Thank you for your message! I'm here to help with property searches, scheduling viewings, connecting with agents, and answering questions about our services. How can I assist you today?"
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            {/* Pulse Ring Animation */}
            <div className="absolute inset-0 bg-primary rounded-full animate-pulse-ring"></div>

            <Button
              onClick={toggleChat}
              size="lg"
              className="relative h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle"
            >
              <MessageCircle className="h-6 w-6" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Chat Header */}
            <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-foreground text-primary text-sm font-semibold">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Property Assistant</h3>
                  <p className="text-xs opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="h-8 w-8 p-0 hover:bg-primary-foreground/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="h-8 w-8 p-0 hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0">
                {/* Messages Area */}
                <ScrollArea className="h-80 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-typing-dots"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-typing-dots"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-typing-dots"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Quick Actions */}
                <div className="p-4 border-t bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="justify-start text-xs h-8 bg-transparent"
                      >
                        {action.icon}
                        <span className="ml-1 truncate">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm" disabled={!inputValue.trim()} className="px-3">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Powered by AI • Available 24/7</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
