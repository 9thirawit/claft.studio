"use client";

import { Footer, Background } from "./components"
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentText, setCurrentText] = useState("claft.studio")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const textArray = [
    "claft.studio",
    `we don't just build applications, 
we craft experiences that transform ordinary days into extraordinary moments`,
  ]

  useEffect(() => {
    const maxScroll = 2000

    const updateText = (position: number) => {
      const scrollPercentage = position / maxScroll
      const textIndex = Math.min(
        Math.floor(scrollPercentage * textArray.length),
        textArray.length - 1
      )
      
      const newText = textArray[textIndex]
      if (newText !== currentText) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentText(newText)
          setTimeout(() => setIsAnimating(false), 50)
        }, 150)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      const scrollAmount = e.deltaY * 2
      const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + scrollAmount))
      
      setScrollPosition(newPosition)
      updateText(newPosition)
    }
    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [scrollPosition, textArray])

  return (
    <div className="overflow-hidden h-screen">
      <div className="fixed inset-0 z-0">
        <Background>
          <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
              <div className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-center">
                <p className="mb-2 tracking-[-.01em]">
                  <span className={`transition-all duration-300 ease-in-out whitespace-pre-line transform ${
                    isAnimating 
                      ? 'opacity-0 scale-95 blur-sm' 
                      : 'opacity-100 scale-100 blur-0'
                  }`}>
                    {currentText}
                  </span>
                </p>
              </div>
            </main>
            <Footer />
          </div>
        </Background>
      </div>
    </div>
  );
}