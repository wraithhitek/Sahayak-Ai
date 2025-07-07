"use client"

import { useEffect, useState } from "react"
import { BookOpen, Sparkles, Heart, Star, Zap } from "lucide-react"

export default function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      icon: any
      x: number
      y: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const icons = [BookOpen, Sparkles, Heart, Star, Zap]
    const newElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        const Icon = element.icon
        return (
          <div
            key={element.id}
            className="absolute opacity-10 text-blue-500"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            <Icon
              className="w-6 h-6 animate-bounce"
              style={{
                animationDelay: `${element.delay}s`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
