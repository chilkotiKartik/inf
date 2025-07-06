"use client"

import { useEffect, useRef, useCallback } from "react"

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const starsRef = useRef<{ x: number; y: number; radius: number; opacity: number; speed: number }[]>([])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const createStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    starsRef.current = []
    const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 3000), 200) // Limit stars

    for (let i = 0; i < starCount; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.4,
        speed: Math.random() * 0.3 + 0.1,
      })
    }
  }, [])

  const drawStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw stars with better performance
    ctx.fillStyle = "white"
    starsRef.current.forEach((star) => {
      ctx.globalAlpha = star.opacity
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fill()

      // Move stars
      star.y += star.speed

      // Reset stars that go off screen
      if (star.y > canvas.height + 10) {
        star.y = -10
        star.x = Math.random() * canvas.width
      }
    })

    ctx.globalAlpha = 1

    animationRef.current = requestAnimationFrame(drawStars)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize
    resizeCanvas()
    createStars()
    drawStars()

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resizeCanvas, createStars, drawStars])

  return <canvas ref={canvasRef} className="fixed inset-0 z-space-bg bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900" />
}
