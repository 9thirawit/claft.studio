"use client";

import { Footer, Background } from "./components"
import { useEffect, useState, useCallback, useRef } from 'react'

export default function Home() {
  const [currentText, setCurrentText] = useState("claft.studio")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  
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

  // ฟังก์ชันสำหรับคำนวณ viewport height ที่แท้จริง
  const updateViewportHeight = useCallback(() => {
    // ใช้ visualViewport API ถ้ามี (ใหม่กว่าและแม่นยำกว่า)
    if (window.visualViewport) {
      setViewportHeight(window.visualViewport.height)
    } else {
      // fallback สำหรับ browser เก่า
      setViewportHeight(window.innerHeight)
    }
  }, [])

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

  const updateScrollPosition = useCallback((deltaY: number) => {
    const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + deltaY))
    setScrollPosition(newPosition)
    updateText(newPosition)
  }, [scrollPosition, maxScroll, updateText])

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const scrollAmount = e.deltaY * scrollSensitivity
    updateScrollPosition(scrollAmount)
  }, [updateScrollPosition, scrollSensitivity])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault()
    touchStartY.current = e.touches[0].clientY
    isScrolling.current = false
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    
    const touchCurrentY = e.touches[0].clientY
    const deltaY = (touchStartY.current - touchCurrentY) * touchSensitivity
    
    if (Math.abs(deltaY) > 1) {
      updateScrollPosition(deltaY)
      touchStartY.current = touchCurrentY
      isScrolling.current = true
    }
  }, [updateScrollPosition, touchSensitivity])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault()
    isScrolling.current = false
  }, [])

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
    // ตั้งค่า viewport height เมื่อโหลดครั้งแรก
    updateViewportHeight()

    const element = document.body

    // เพิ่ม meta tag สำหรับ viewport ถ้ายังไม่มี
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no')
    }

    // เพิ่ม CSS custom properties สำหรับ viewport height
    const updateCSSCustomProperties = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // สำหรับ visualViewport
      if (window.visualViewport) {
        const vvh = window.visualViewport.height * 0.01
        document.documentElement.style.setProperty('--vvh', `${vvh}px`)
      }
    }

    updateCSSCustomProperties()

    element.addEventListener('wheel', handleWheel, { passive: false })
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: false })
    document.addEventListener('keydown', handleKeyDown, { passive: false })

    const preventScroll = (e: Event) => e.preventDefault()
    document.addEventListener('touchmove', preventScroll, { passive: false })

    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight)
      window.visualViewport.addEventListener('scroll', updateViewportHeight)
    }

    window.addEventListener('resize', updateCSSCustomProperties)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateCSSCustomProperties)
    }

    return () => {
      element.removeEventListener('wheel', handleWheel)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
      window.removeEventListener('resize', updateCSSCustomProperties)
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight)
        window.visualViewport.removeEventListener('scroll', updateViewportHeight)
        window.visualViewport.removeEventListener('resize', updateCSSCustomProperties)
      }
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown, updateViewportHeight])

  const textClasses = `
    transition-all duration-300 ease-in-out whitespace-pre-line transform
    ${isAnimating 
      ? 'opacity-0 scale-95 blur-sm' 
      : 'opacity-100 scale-100 blur-0'
    }
  `.trim()

  return (
    <div 
      className="overflow-hidden touch-none select-none"
      style={{
        height: 'calc(var(--vvh, var(--vh, 1vh)) * 100)',
        minHeight: '-webkit-fill-available',
        WebkitOverflowScrolling: 'touch',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="fixed inset-0 z-0">
        <Background>
          <div 
            className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 pb-20 gap-8 sm:p-8 sm:gap-16 lg:p-20"
            style={{
              minHeight: 'calc(var(--vvh, var(--vh, 1vh)) * 100)',
            }}
          >
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