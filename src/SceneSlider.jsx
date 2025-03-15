import { cn } from "@/lib/utils";
import { useState } from "react";

function SceneSlider({ scenes, onSelect, scenePageSettings }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
console.log(scenePageSettings)
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === scenes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? scenes.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleSceneSelect = () => {
    setIsAnimating(true);
    
    // After animation completes, call onSelect
    setTimeout(() => {
      onSelect(scenes[activeIndex]);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 
          className="mb-2 text-5xl md:text-7xl font-semibold text-white"
          style={{ 
            color: scenePageSettings?.title_color || '#FFFFFF',
            fontSize: scenePageSettings?.title_font_size ? `${scenePageSettings.title_font_size}px` : undefined
          }}
        >
          {scenePageSettings?.scene_page_title || "Select your scene"}
        </h1>
      </div>

      <div className="relative  flex items-center justify-center px-4 md:px-20 w-full">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className=" left-0 md:-left-10 lg:-left-10 z-10 rounded-full p-1 md:p-2  text-blue-900 transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Previous slide"
        >
          <div className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 relative">
            <img src="/assets/left.png" alt="Previous" className="h-full w-full object-contain" />
            <div className="absolute inset-0 mix-blend-overlay" />
          </div>
        </button>
      
        <div 
          className="relative w-full max-w-[450px] mx-auto"
          style={{ 
            height: scenePageSettings?.scene_card_height ? `${scenePageSettings.scene_card_height}px` : '750px',
            width: scenePageSettings?.scene_card_width ? `${scenePageSettings.scene_card_width}px` : '450px',
            maxHeight: '80vh'
          }}
        >
          {scenes.map((scene, index) => {
            // Calculate position relative to active slide
            const position = index - activeIndex;

            return (
              <div
                key={index}
                className={cn(
                  "absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out", 
                  {
                    "z-30 scale-100 rotate-0": position === 0,
                    "z-20 -translate-x-[30%] scale-80 rotate-[-10deg]": position === -1 || position === scenes.length - 1,
                    "z-10 translate-x-[30%] scale-80 rotate-[10deg]": position === 1 || position === -(scenes.length - 1),
                  },
                  position === 0 && isAnimating ? "animate-spin-slow" : ""
                )}
              >
                <div 
                  className="relative h-full w-full overflow-hidden shadow-xl rounded-[4rem] border-transparent bg-gradient-to-b from-[#32BBB9] to-[#ffffff6e] p-2 cursor-pointer"
                  onClick={position === 0 ? handleSceneSelect : undefined}
                >
                  <img
                    src={scene}
                    alt={`Scene ${index + 1}`}
                    className={cn(
                      "h-full w-full object-cover transition-transform rounded-[4rem]",
                      position === 0 && isAnimating ? "animate-zoom-contained scale-105 transition-all duration-500" : ""
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className=" right-0 md:-right-10 lg:-right-36 z-10 rounded-full p-1 md:p-2 text-blue-900 transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Next slide"
        >
          <img src="/assets/right.png" alt="Next" className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 object-contain" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex gap-2">
        {scenes.map((_, index) => (
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

      {/* Select Button */}
      <div 
        onClick={handleSceneSelect} 
        className={cn(
          "mt-8 rounded-4xl px-8 md:px-12 py-3 md:py-4 cursor-pointer transition-all duration-300",
          isAnimating ? "bg-yellow-500 scale-110 animate-ping-once" : "hover:scale-105"
        )}
        style={{
          backgroundColor: scenePageSettings?.button_bg_color || '#7C3AED',
          color: scenePageSettings?.button_text_color || '#FFFFFF'
        }}
      >
        <span className="text-2xl md:text-4xl font-bold uppercase text-white">
          {scenePageSettings?.button_text || "Select Scene"}
        </span>
      </div>
    </div>
  );
}

export default SceneSlider;