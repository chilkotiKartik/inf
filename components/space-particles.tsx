"use client"

import { useEffect, useRef, useCallback } from "react"

export function SpaceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<{
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
  }[]>([])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    particlesRef.current = []
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 50) // Limit particles

    const colors = [
      "rgba(59, 130, 246, 0.6)", // primary blue
      "rgba(139, 92, 246, 0.6)", // secondary purple
      "rgba(255, 255, 255, 0.4)", // white
    ]

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
  }, [])

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      // Move particles
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap particles around screen
      if (particle.x < -10) particle.x = canvas.width + 10
      if (particle.x > canvas.width + 10) particle.x = -10
      if (particle.y < -10) particle.y = canvas.height + 10
      if (particle.y > canvas.height + 10) particle.y = -10
    })

    animationRef.current = requestAnimationFrame(drawParticles)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize
    resizeCanvas()
    createParticles()
    drawParticles()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resizeCanvas, createParticles, drawParticles])

  return <canvas ref={canvasRef} className="fixed inset-0 z-space-particles pointer-events-none opacity-50" />
}
