"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface EmailFormProps {
  onSubmit: (email: string) => void
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxeAfOaSmoiFJpRYRrAPQxHIPzkCvKfh199anPJHgjicu5OBUtDuPqaQrvCYiJBzdn2/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `email=${encodeURIComponent(email)}`,
        },
      )

      if (response.ok) {
        onSubmit(email)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to submit. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-black text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">EXCLUSIVE FASHION OFFERS</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your email for a chance to win luxury fashion deals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 border-2 border-pink-500/50 focus:border-pink-500 bg-gray-900 text-white"
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold transition-all bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0"
            disabled={isLoading}
          >
            {isLoading ? (
              "Submitting..."
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                UNLOCK FASHION DEALS
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

