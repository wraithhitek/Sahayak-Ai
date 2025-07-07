"use client"

import { useEffect, useRef } from "react"

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawDotGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dotSize = 1
      const spacing = 30
      const opacity = 0.3

      ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const animate = () => {
      drawDotGrid()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f4ff 100%)",
      }}
    />
  )
}
