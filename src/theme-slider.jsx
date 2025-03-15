"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

export function ThemeSlider({ themes, onSelect, themePageSettings }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
// console.log(themes);
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === themes.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? themes.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  const handleThemeSelect = () => {
    setIsAnimating(true)
    
    // After animation completes, call onSelect
    setTimeout(() => {
      onSelect(themes[activeIndex])
    }, 800)
  }

  return (
    <div className="flex  flex-col items-center justify-center mt-20">
      <div className=" text-center">
        <h2 
          className="text-center mb-2"
          style={{ 
            color: themePageSettings?.title_color || '#000000',
            fontSize: `${themePageSettings?.title_font_size || 48}px`
          }}
        >
          {themePageSettings?.theme_page_title || "Select your theme"}
        </h2>
      </div>

      <div className="relative flex items-center justify-center px-20">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-36 z-10 rounded-full p-2  text-blue-900 transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Previous slide"
        >
          <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 relative">
            <img src="/assets/left.png" alt="Previous" className="h-full w-full object-contain" />
            <div className="absolute inset-0 mix-blend-overlay" />
          </div>
        </button>
      
        <div className="relative" style={{
            
              height: `${themePageSettings?.theme_card_height || 410}px`,
              width: `${themePageSettings?.theme_card_width || 230}px`
        }}>
          {themes.map((theme, index) => {
            // Calculate position relative to active slide
            const position = index - activeIndex

            return (
              <div
                key={theme.id}
                className={cn(
                  "absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out", 
                  {
                    "z-30 scale-100 rotate-0": position === 0,
                    "z-20 -translate-x-[30%] scale-80 rotate-[-10deg]": position === -1 || position === 2,
                    "z-10 translate-x-[30%] scale-80 rotate-[10deg]": position === 1 || position === -2,
                  },
                  // Replace pulse with a fade effect
                  position === 0 && isAnimating ? "animate-spin-slow" : ""
                )}
              >
                <div 
                  className={cn(
                    "relative h-full w-full overflow-hidden cursor-pointer"
                  )}
                  onClick={position === 0 ? handleThemeSelect : undefined}
                >
                  <img
                    src={theme.image || "/placeholder.svg"}
                    alt={theme.name}
                    className={cn(
                      "h-full w-full object-cover transition-transform",
                      // Replace bounce with a scale effect
                      // In your image element, replace:
                      position === 0 && isAnimating ? "scale-105 transition-all duration-500" : ""
                      
                      // // With:
                      // position === 0 && isAnimating ? "animate-zoom-contained" : ""
                    )}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute -right-36 z-10 rounded-full p-2  text-blue-900 transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Next slide"
        >
          <img src="/assets/right.png" alt="Next" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex gap-2">
        {themes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-colors",
              activeIndex === index ? "bg-violet-600" : "bg-white opacity-50 hover:opacity-75",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Theme Name */}
      {themePageSettings?.show_theme_name && (
        <div 
          onClick={handleThemeSelect} 
          className={cn(
            "mt-8 rounded-4xl px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 cursor-pointer transition-all duration-300",
            isAnimating ? "scale-110 animate-ping-once" : "hover:scale-105"
          )}
          style={{
            backgroundColor: themePageSettings?.button_bg_color || '#7C3AED',
            color: themePageSettings?.button_text_color || '#FFFFFF'
          }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
            {themes[activeIndex].name}
          </span>
        </div>
      )}
    </div>
  )
}

