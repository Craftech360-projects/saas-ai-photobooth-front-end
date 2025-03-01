import { cn } from "@/lib/utils";
import { useState } from 'react';

const SceneSlider = ({ scenes, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
console.log(scenes.length);
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
        <h1 className="mb-2 text-7xl font-semibolde text-white">Select your Avatar</h1>
      </div>

      <div className="relative flex items-center justify-center px-20">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-36 z-10 rounded-full p-2 text-blue-900 transition-colors hover:bg-yellow-300 "
          aria-label="Next slide"
        >
          <img src="/assets/left.png" alt="Next" className="h-24 w-24 object-contain" />
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
                         "z-20 -translate-x-[30%] scale-80 rotate-[-10deg]": position === -1 || position === 2,
                         "z-10 translate-x-[30%] scale-80 rotate-[10deg]": position === 1 || position === -2,
                       })}
              >
                {/* <div className="relative h-full w-full overflow-hidden  shadow-xl rounded-[4rem] border-4 border-transparent bg-gradient-to-br from-[#32BBB9] to-[#FFFFFF] p-[4px]">
                  <img
                    onClick={handleSceneSelect}
                    src={scene}
                    alt={`Scene ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div> */}

<div className="relative h-full w-full overflow-hidden shadow-xl rounded-[4rem]  border-transparent bg-gradient-to-b from-[#32BBB9] to-[#ffffff6e] p-2">
  <div className="h-full w-full  rounded-[3.8rem] overflow-hidden">
    <img
      onClick={handleSceneSelect}
      src={scene}
      alt={`Scene ${index + 1}`}
      className="h-full w-full object-cover"
    />
  </div>
</div>

              </div>
            );
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
        {scenes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-colors",
              activeIndex === index ? "bg-violet-600" : "bg-white opacity-50 hover:opacity-75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scene Name */}
      {scenes[activeIndex] && (
        <div className="mt-8 rounded-lg bg-violet-600 px-6 py-2">
          <span className="text-4xl font-bold uppercase text-white">
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