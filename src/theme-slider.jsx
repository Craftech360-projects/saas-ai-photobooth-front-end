"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

export function ThemeSlider({ themes, onSelect }) {
  const [activeIndex, setActiveIndex] = React.useState(0)

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
    onSelect(themes[activeIndex])
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-7xl font-bold text-white">Select your theme</h1>
      </div>

      <div className="relative flex items-center justify-center px-20">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-32 z-10 rounded-full bg-yellow-400 p-2 text-blue-900 transition-colors hover:bg-yellow-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-16 w-16" />
        </button>

        {/* Slides */}
        {/* <div className="relative h-[500px] w-[300px]">
          {themes.map((theme, index) => {
            // Calculate position relative to active slide
            const position = index - activeIndex

            return (
              <div
                key={theme.id}
                className={cn("absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out", {
                  "z-30 scale-100 rotate-0": position === 0,
                  "z-20 -translate-x-[20%] scale-90 rotate-[-5deg]": position === -1 || position === 2,
                  "z-10 translate-x-[20%] scale-90 rotate-[5deg]": position === 1 || position === -2,
                })}
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-yellow-400 bg-gray-900 shadow-xl">
                  <img
                    src={theme.image || "/placeholder.svg"}
                    alt={theme.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )
          })}
        </div> */}
        <div className="relative h-[750px] w-[450px]">
  {themes.map((theme, index) => {
    // Calculate position relative to active slide
    const position = index - activeIndex

    return (
      <div
        key={theme.id}
        className={cn("absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out", {
          "z-30 scale-100 rotate-0": position === 0,
          "z-20 -translate-x-[30%] scale-80 rotate-[-10deg]": position === -1 || position === 2,
          "z-10 translate-x-[30%] scale-80 rotate-[10deg]": position === 1 || position === -2,
        })}
      >
        <div className="relative h-full w-full overflow-hidden rounded-4xl border-4 border-yellow-400 bg-gray-900 shadow-xl">
          <img  onClick={handleThemeSelect}
            src={theme.image || "/placeholder.svg"}
            alt={theme.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    )
  })}
</div>
        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute -right-32 z-10 rounded-full bg-yellow-400 p-2 text-blue-900 transition-colors hover:bg-yellow-300 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="h-16 w-16" />
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
              activeIndex === index ? "bg-yellow-400" : "bg-white opacity-50 hover:opacity-75",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Theme Name */}
      <div className="mt-8 rounded-lg bg-yellow-400 px-12 py-4">
        <span className="text-3xl font-bold uppercase text-blue-900">{themes[activeIndex].name}</span>
      </div>
      {/* <button
        onClick={handleThemeSelect}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Select Theme
      </button> */}
    </div>
  )
}

