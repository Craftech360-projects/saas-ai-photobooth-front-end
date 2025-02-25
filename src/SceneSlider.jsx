import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';

const SceneSlider = ({ scenes, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    onSelect(scenes[activeIndex]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-7xl font-semibold text-white"  style={{ fontFamily: 'Oswald, sans-serif' }}>Select the character</h1>
      </div>

      <div className="relative flex items-center justify-center px-20">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-42 z-10 rounded-full bg-[#FFC462] p-2 text-black transition-colors hover:bg-yellow-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-16 w-16" />
        </button>

        {/* Slides */}
        <div className="relative h-[750px] w-[450px]">
          {scenes.map((scene, index) => {
            // Calculate position relative to active slide
            const position = index - activeIndex;

            return (
              <div
                key={scene}
                 className={cn("absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out", {
                         "z-30 scale-100 rotate-0": position === 0,
                         "z-20 -translate-x-[40%] scale-80 rotate-[-0deg]": position === -1 || position === 2,
                         "z-10 translate-x-[40%] scale-80 rotate-[0deg]": position === 1 || position === -2,
                       })}
              >
                <div className="relative h-full w-full overflow-hidden  border-2 border-yellow-400 bg-gray-900 shadow-xl">
                  <img
                    onClick={handleSceneSelect}
                    src={scene}
                    alt={`Scene ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute -right-42 z-10 rounded-full bg-[#FFC462] p-2 text-black transition-colors hover:bg-yellow-300 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight  className="h-16 w-16" />
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
              activeIndex === index ? "bg-[#FFC462]" : "bg-white opacity-50 hover:opacity-75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scene Name */}
      {scenes[activeIndex] && (
        <div className="mt-8 rounded-lg bg-[#FFC462] px-6 py-2">
          <span className="text-xl font-bold uppercase text-black">
            {scenes[activeIndex].split('/').pop().split('.')[0]}
          </span>
        </div>
      )}
{/* 
      <button
        onClick={handleSceneSelect}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Select Scene
      </button> */}
    </div>
  );
};

export default SceneSlider;