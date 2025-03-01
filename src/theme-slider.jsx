"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
// import left from "../assets/left.png"; // Relative path
// import right from "../assets/right.png"; // Relative path
// import right from "/right.png";
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
        <h1 className="mb-2 text-7xl font-semibold text-white">Select your theme</h1>
      </div>

      <div className="relative flex items-center justify-center px-20">
        {/* Navigation Buttons */}

        <button
  onClick={prevSlide}
  className="absolute -left-36 z-10 rounded-full p-2 text-blue-900 transition-colors hover:bg-yellow-300 "
  aria-label="Previous slide"
>
  <div className="h-24 w-24 relative">
  <img src="/assets/left.png" alt="Previous" className="h-full w-full object-contain" />

    <div
      className="absolute inset-0  mix-blend-overlay"
    />
  </div>
</button>
        {/* <button
          onClick={prevSlide}
          className="absolute -left-36 z-10 rounded-full  p-2 text-blue-900 transition-colors hover:bg-yellow-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-24 w-24" />
        </button> */}

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
        <div className="relative h-full w-full overflow-hidden ">
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
  className="absolute -right-36 z-10 rounded-full p-2 text-blue-900 transition-colors hover:bg-yellow-300 "
  aria-label="Next slide"
>
  <img src="/assets/right.png" alt="Next" className="h-24 w-24 object-contain" />
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
      <div className="mt-8  rounded-4xl bg-violet-600 px-12 py-4">
        <span className="text-4xl font-bold uppercase text-white">{themes[activeIndex].name}</span>
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

