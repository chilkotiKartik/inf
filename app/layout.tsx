import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk"
})

export const metadata: Metadata = {
  title: "Infinity Tech Society - Innovation Hub",
  description:
    "Join IIT Madras students in building the future through cutting-edge AI research and collaborative innovation projects.",
  keywords: "IIT Madras, technology, research, innovation, AI, machine learning, collaboration, projects, students",
  authors: [{ name: "Infinity Tech Society" }],
  creator: "Infinity Tech Society",
  publisher: "Infinity Tech Society",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://infinity-tech-society.com",
    title: "Infinity Tech Society - Innovation Hub",
    description:
      "Join IIT Madras students in building the future through cutting-edge AI research and collaborative innovation projects.",
    siteName: "Infinity Tech Society",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Tech Society - Innovation Hub",
    description:
      "Join IIT Madras students in building the future through cutting-edge AI research and collaborative innovation projects.",
    creator: "@infinitytech",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16 md:pt-20 relative z-main-content">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
