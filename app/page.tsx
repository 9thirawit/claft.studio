"use client";

import { Footer, Background } from "./components"
import { useEffect, useState, useCallback, useRef } from 'react'

export default function Home() {
  const [currentText, setCurrentText] = useState("claft.studio")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Touch handling refs
  const touchStartY = useRef(0)
  const isScrolling = useRef(false)

  const textArray = [
    "claft.studio",
    `we don't just build applications, 
we craft experiences that transform ordinary days into extraordinary moments`,
  ]

  const maxScroll = 2000
  const scrollSensitivity = 2
  const touchSensitivity = 3

  // Memoized text update function
  const updateText = useCallback((position: number) => {
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
  }, [currentText, textArray, maxScroll])

  // Update scroll position helper
  const updateScrollPosition = useCallback((deltaY: number) => {
    const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + deltaY))
    setScrollPosition(newPosition)
    updateText(newPosition)
  }, [scrollPosition, maxScroll, updateText])

  // Mouse wheel handler
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const scrollAmount = e.deltaY * scrollSensitivity
    updateScrollPosition(scrollAmount)
  }, [updateScrollPosition, scrollSensitivity])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    isScrolling.current = false
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isScrolling.current) {
      e.preventDefault()
      
      const touchCurrentY = e.touches[0].clientY
      const deltaY = (touchStartY.current - touchCurrentY) * touchSensitivity
      
      updateScrollPosition(deltaY)
      touchStartY.current = touchCurrentY
      isScrolling.current = true
    }
  }, [updateScrollPosition, touchSensitivity])

  const handleTouchEnd = useCallback(() => {
    isScrolling.current = false
  }, [])

  // Keyboard handler for accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const keyScrollAmount = 100
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        updateScrollPosition(keyScrollAmount)
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        updateScrollPosition(-keyScrollAmount)
        break
      case 'Home':
        e.preventDefault()
        setScrollPosition(0)
        updateText(0)
        break
      case 'End':
        e.preventDefault()
        setScrollPosition(maxScroll)
        updateText(maxScroll)
        break
    }
  }, [updateScrollPosition, updateText, maxScroll])

  useEffect(() => {
    const element = document.documentElement

    // Add event listeners
    element.addEventListener('wheel', handleWheel, { passive: false })
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    element.addEventListener('keydown', handleKeyDown, { passive: false })

    // Cleanup
    return () => {
      element.removeEventListener('wheel', handleWheel)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown])

  // Text animation classes
  const textClasses = `
    transition-all duration-300 ease-in-out whitespace-pre-line transform
    ${isAnimating 
      ? 'opacity-0 scale-95 blur-sm' 
      : 'opacity-100 scale-100 blur-0'
    }
  `.trim()

  return (
    <div className="overflow-hidden h-screen touch-none select-none">
      <div className="fixed inset-0 z-0">
        <Background>
          <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-8 sm:gap-16 lg:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center justify-center text-center">
              <div className="font-mono text-sm leading-6 sm:text-base sm:leading-7">
                <p className="mb-2 tracking-tight">
                  <span 
                    className={textClasses}
                    role="banner"
                    aria-live="polite"
                  >
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
  )
}