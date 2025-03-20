"use client"

import { useState } from "react"
import EmailForm from "@/components/email-form"
import SpinWheel from "@/components/spin-wheel"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [showWheel, setShowWheel] = useState(false)
  const [email, setEmail] = useState("")

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setShowWheel(true)
  }

  return (
    <ThemeProvider attribute="class">
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="w-full max-w-md">
          {!showWheel ? <EmailForm onSubmit={handleEmailSubmit} /> : <SpinWheel email={email} />}
        </div>
      </main>
    </ThemeProvider>
  )
}

