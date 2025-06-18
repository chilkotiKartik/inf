"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange, signIn, signOutUser, getUserProfile, type UserProfile } from "@/lib/auth-service"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
  isAuthenticated: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Check for stored auth in localStorage (for mock auth) first
        const storedAuth = localStorage.getItem("mockAuth")
        if (storedAuth && mounted) {
          try {
            const { mockUser, mockProfile } = JSON.parse(storedAuth)
            setUser(mockUser as User)
            setProfile(mockProfile as UserProfile)
            setIsAuthenticated(true)
            setLoading(false) // Set loading to false immediately for mock auth
            return // Exit early for mock auth
          } catch (error) {
            console.error("Failed to parse stored auth:", error)
            localStorage.removeItem("mockAuth")
          }
        }

        // Set up Firebase auth state listener with timeout
        const authTimeout = setTimeout(() => {
          if (mounted) {
            setLoading(false) // Stop loading after 3 seconds max
          }
        }, 3000)

        const unsubscribe = onAuthStateChange(async (authUser) => {
          if (!mounted) return
          
          clearTimeout(authTimeout) // Clear timeout if auth resolves

          if (authUser) {
            try {
              // Use Promise.race to timeout profile loading
              const userProfile = await Promise.race([
                getUserProfile(authUser.uid, authUser.email || ""),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error("Profile loading timeout")), 5000)
                )
              ]) as UserProfile

              if (mounted) {
                setUser(authUser)
                setProfile(userProfile)
                setIsAuthenticated(true)
              }
            } catch (error) {
              console.error("Error fetching user profile:", error)
              setUser(null)
              setProfile(null)
              setIsAuthenticated(false)
              toast({
                title: "Error",
                description: "Failed to load user profile",
                variant: "destructive",
              })
            }
          } else {
            setUser(null)
            setProfile(null)
            setIsAuthenticated(false)
          }

          setLoading(false)
        })

        // If no stored auth, set a shorter timeout
        if (!storedAuth) {
          setTimeout(() => {
            if (mounted) {
              setLoading(false)
            }
          }, 2000)
        }

        return unsubscribe
      } catch (error) {
        console.error("Auth initialization error:", error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    const unsubscribe = initializeAuth()

    return () => {
      mounted = false
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [toast])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user: authUser, profile: userProfile } = await signIn(email, password)

      setUser(authUser)
      setProfile(userProfile)
      setIsAuthenticated(true)

      // Store mock auth in localStorage if needed
      if (authUser.uid.startsWith("mock-")) {
        localStorage.setItem(
          "mockAuth",
          JSON.stringify({
            mockUser: { uid: authUser.uid, email: authUser.email },
            mockProfile: userProfile,
          }),
        )
      }

      return true
    } catch (error) {
      console.error("Login error:", error)
      setIsAuthenticated(false)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      
      // Clear local state first
      setUser(null)
      setProfile(null)
      setIsAuthenticated(false)
      localStorage.removeItem("mockAuth")
      
      // Then attempt Firebase signout
      try {
        await signOutUser()
      } catch (error) {
        console.warn("Firebase signout error (expected for mock users):", error)
      }

      // Force navigation to home page
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
      throw error // Re-throw to trigger error handling in components
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
