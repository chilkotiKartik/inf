"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

// Deterministic star positions to avoid hydration mismatch
const starPositions = [
  { width: 2.5, height: 2.1, left: 15, top: 20, duration: 3.2 },
  { width: 1.8, height: 1.5, left: 85, top: 10, duration: 4.1 },
  { width: 3.2, height: 2.8, left: 25, top: 80, duration: 2.8 },
  { width: 1.5, height: 1.2, left: 70, top: 65, duration: 3.8 },
  { width: 2.8, height: 2.3, left: 45, top: 15, duration: 3.5 },
  { width: 1.9, height: 1.7, left: 90, top: 45, duration: 4.2 },
  { width: 2.2, height: 1.9, left: 10, top: 55, duration: 3.1 },
  { width: 3.1, height: 2.6, left: 60, top: 25, duration: 2.9 },
  { width: 1.6, height: 1.4, left: 35, top: 70, duration: 3.7 },
  { width: 2.7, height: 2.2, left: 80, top: 85, duration: 3.3 },
  { width: 1.3, height: 1.1, left: 55, top: 40, duration: 4.0 },
  { width: 2.9, height: 2.4, left: 20, top: 90, duration: 2.7 },
  { width: 1.7, height: 1.6, left: 75, top: 30, duration: 3.6 },
  { width: 2.4, height: 2.0, left: 40, top: 60, duration: 3.4 },
  { width: 1.4, height: 1.3, left: 65, top: 75, duration: 3.9 },
  { width: 3.0, height: 2.5, left: 30, top: 35, duration: 2.6 },
  { width: 1.8, height: 1.5, left: 85, top: 50, duration: 4.3 },
  { width: 2.6, height: 2.1, left: 15, top: 75, duration: 3.0 },
  { width: 1.2, height: 1.0, left: 50, top: 85, duration: 4.1 },
  { width: 2.3, height: 1.8, left: 95, top: 20, duration: 3.2 },
]

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 space-dots"></div>
      <div className="absolute inset-0 z-0 cosmic-bg"></div>

      <div className="container relative z-10 px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl font-bold font-space glow-text">404</div>
            <div className="text-2xl md:text-3xl font-bold font-space mb-4">
              Lost in <span className="cosmic-gradient">Space</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mb-8"
          >
            The page you're looking for has drifted beyond our reach. It might have been moved, deleted, or never
            existed in this dimension.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Link href="/">
              <Button size="lg" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated space objects - only render after mount to avoid hydration issues */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Stars with deterministic positions */}
            {starPositions.map((star, i) => (
              <motion.div
                key={i}
                className="absolute bg-primary rounded-full"
                style={{
                  width: star.width + "px",
                  height: star.height + "px",
                  left: star.left + "%",
                  top: star.top + "%",
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}

            {/* Floating astronaut */}
            <motion.div
              className="absolute w-20 h-20 text-primary"
              style={{ top: "30%", left: "15%" }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                <path d="M16 12v2a4 4 0 0 1-8 0v-2" />
                <path d="M12 16v3" />
                <path d="M8 19h8" />
                <path d="M12 3v2" />
                <path d="M5 7l1.5 1.5" />
                <path d="M19 7l-1.5 1.5" />
              </svg>
            </motion.div>

            {/* Floating satellite */}
            <motion.div
              className="absolute w-24 h-24 text-secondary"
              style={{ bottom: "20%", right: "15%" }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, -15, 0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10a4 4 0 0 1 4-4c2 0 4 1 6 3 2 2 3 4 3 6a4 4 0 0 1-4 4c-2 0-4-1-6-3-2-2-3-4-3-6z" />
                <path d="M10 4a4 4 0 0 1 4 4c0 2-1 4-3 6-2 2-4 3-6 3a4 4 0 0 1-4-4c0-2 1-4 3-6 2-2 4-3 6-3z" />
                <line x1="15" y1="15" x2="19" y2="19" />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
