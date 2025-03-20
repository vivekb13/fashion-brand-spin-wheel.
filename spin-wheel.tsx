"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Gift } from "lucide-react"
import confetti from "canvas-confetti"

interface SpinWheelProps {
  email: string
}

const prizes = [
  { name: "20% OFF", color: "#FF6384", textColor: "white" },
  { name: "FREE SHIPPING", color: "#36A2EB", textColor: "white" },
  { name: "BUY 1 GET 1", color: "#FFCD56", textColor: "black" },
  { name: "GIFT CARD", color: "#4BC0C0", textColor: "white" },
  { name: "EXCLUSIVE DEAL", color: "#9966FF", textColor: "white" },
  { name: "50% OFF", color: "#FF9F40", textColor: "black" },
]

export default function SpinWheel({ email }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const triggerConfetti = () => {
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      })

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Random number of full rotations (2-5) plus a random angle
    const spinDegrees = 1800 + Math.floor(Math.random() * 1080)
    setRotation(spinDegrees)

    setTimeout(() => {
      // Calculate which prize was won based on final position
      const finalRotation = spinDegrees % 360
      const prizeIndex = Math.floor(finalRotation / (360 / prizes.length))
      const prize = prizes[prizeIndex].name

      setResult(prize)
      setIsSpinning(false)
      triggerConfetti()
    }, 3000)
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-black text-white">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">FASHION EXCLUSIVE</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Spin the wheel for luxury fashion offers
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full max-w-[320px] aspect-square mb-6">
          {/* Wheel */}
          <div
            ref={wheelRef}
            className="absolute inset-0 rounded-full shadow-lg overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {/* Prize segments */}
            {prizes.map((prize, index) => {
              const angle = 360 / prizes.length
              const rotation = index * angle

              return (
                <div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 - 50 * Math.sin((angle * Math.PI) / 180)}%)`,
                    backgroundColor: prize.color,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    style={{
                      transform: `rotate(${angle / 2}deg)`,
                      transformOrigin: "bottom center",
                      paddingBottom: "50%",
                      color: prize.textColor,
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      marginTop: "15%",
                    }}
                  >
                    {prize.name}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Center button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border-2 border-gold shadow-md flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-20">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-gold mx-auto" />
          </div>
        </div>

        {result ? (
          <div className="text-center mb-4 animate-fade-in">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-2">
              <Gift className="mr-2 h-5 w-5" />
              <span className="font-bold">CONGRATULATIONS!</span>
            </div>
            <p className="text-xl font-bold text-white">{result}</p>
            <p className="text-sm text-gray-400 mt-1">Check your email ({email}) for your exclusive fashion offer</p>
          </div>
        ) : (
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            size="lg"
            className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0"
          >
            {isSpinning ? "Spinning..." : "SPIN FOR STYLE"}
          </Button>
        )}

        {result && (
          <Button
            onClick={spinWheel}
            variant="outline"
            className="mt-4 border-pink-500 text-pink-500 hover:bg-pink-950 hover:text-pink-300"
          >
            Spin Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

