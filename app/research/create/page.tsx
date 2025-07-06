"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { EnhancedSubmissionForm } from "@/components/enhanced-submission-form"
import { EnhancedFloatingAstronaut } from "@/components/enhanced-floating-astronaut"

export default function CreateResearchPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // Add to localStorage for demo purposes
    const newResearch = {
      id: Date.now(),
      title: data.title,
      excerpt: data.description,
      category: data.category,
      author: "Current User",
      date: new Date().toLocaleDateString(),
      image: data.image ? URL.createObjectURL(data.image) : "/placeholder.svg?height=300&width=500",
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
      },
    }

    const existingResearch = JSON.parse(localStorage.getItem("avasya_research") || "[]")
    existingResearch.unshift(newResearch)
    localStorage.setItem("avasya_research", JSON.stringify(existingResearch.slice(0, 20)))

    setTimeout(() => {
      router.push("/research")
    }, 3000)
  }

  const handleCancel = () => {
    router.push("/research")
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        {/* Enhanced floating astronauts */}
        <EnhancedFloatingAstronaut
          style="3d-purple"
          size="lg"
          position="top-right"
          withGlow
          className="hidden lg:block"
        />
        <EnhancedFloatingAstronaut
          style="modern"
          size="md"
          position="bottom-left"
          className="hidden lg:block"
          delay={0.5}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Publish Your <span className="cosmic-gradient">Research</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Share your findings with the aerospace research community.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <EnhancedSubmissionForm type="research" onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  )
}
