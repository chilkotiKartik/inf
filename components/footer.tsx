"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Zap,
  Users,
  Globe,
  Star,
  Heart,
  Sparkles,
  Award,
  Target,
  Lightbulb,
  Activity,
  MessageSquare,
  Instagram,
  Youtube,
  Code,
  ChevronDown,
  Rocket,
  Share2,
  Download,
  Eye,
  Atom,
  Layers,
  TrendingUp,
  FileText,
  Settings,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react"

export default function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsNewsletterSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Infinity! 🚀",
        description: "You're now part of our revolutionary tech community!",
      })
      setEmail("")
      setIsNewsletterSubmitting(false)
    }, 1500)
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border relative overflow-hidden text-white">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          animate="visible"
          variants={footerVariants}
        >
          {/* Newsletter Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="mb-6 text-muted-foreground">
              Get the latest updates, news, and exclusive offers delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isNewsletterSubmitting} className="whitespace-nowrap">
                {isNewsletterSubmitting ? "Submitting..." : "Subscribe"}
              </Button>
            </form>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary transition">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition">
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Connect with Us</h3>
            <div className="flex space-x-6 mb-6">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-muted-foreground">
              &copy; {currentYear} Infinity Tech Society. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
