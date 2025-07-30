"use client";

import { Footer, Background } from "./components"
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [currentText, setCurrentText] = useState("claft.studio")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const textArray = [
    "claft.studio",
    `We don't just build applications, 
we craft experiences that transform ordinary days into extraordinary moments`,
  ]

  useEffect(() => {
    // ซ่อน scrollbar ของ body
    document.body.style.overflow = 'hidden'

    return () => {
      // คืนค่า scrollbar เมื่อ component unmount
      document.body.style.overflow = 'auto'
    }
  }, [])

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

    // Desktop wheel event
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scrollAmount = e.deltaY * 2
      const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + scrollAmount))
      setScrollPosition(newPosition)
      updateText(newPosition)
    }

    // Mobile touch events
    let touchStartY = 0
    let isScrolling = false

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      isScrolling = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) {
        const touchCurrentY = e.touches[0].clientY
        const touchDiff = touchStartY - touchCurrentY
        
        // ตรวจสอบว่าเป็นการ scroll จริงๆ (ไม่ใช่การแตะเพียงอย่างเดียว)
        if (Math.abs(touchDiff) > 5) {
          e.preventDefault()
          isScrolling = true
          
          const scrollAmount = touchDiff * 5 // เพิ่มความไว
          const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + scrollAmount))
          
          setScrollPosition(newPosition)
          updateText(newPosition)
          
          touchStartY = touchCurrentY
        }
      } else {
        e.preventDefault()
        const touchCurrentY = e.touches[0].clientY
        const touchDiff = touchStartY - touchCurrentY
        
        const scrollAmount = touchDiff * 5
        const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + scrollAmount))
        
        setScrollPosition(newPosition)
        updateText(newPosition)
        
        touchStartY = touchCurrentY
      }
    }

    const handleTouchEnd = () => {
      isScrolling = false
    }

    // Add event listeners
    if (containerRef.current) {
      const container = containerRef.current
      
      // Desktop events
      container.addEventListener('wheel', handleWheel, { passive: false })
      
      // Mobile events
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })

      return () => {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [scrollPosition, textArray, currentText])

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden h-screen w-full"
      style={{ 
        touchAction: 'pan-y',
        WebkitOverflowScrolling: 'touch'
      }}
    >
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