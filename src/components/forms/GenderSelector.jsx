import { useState, useEffect } from "react";
import female from "/assets/female.jpg";
import male from "/assets/male.jpg";

export function GenderSelector({ onSelect }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [buttonSize, setButtonSize] = useState({ width: 425, height: 483 });

  // Check screen orientation on mount and when window resizes
  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeView = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeView);
      
      // Adjust button size based on orientation
      if (isLandscapeView) {
        // In landscape, make buttons smaller but maintain aspect ratio
        setButtonSize({ width: 350, height: 400 });
      } else {
        // In portrait, use original size
        setButtonSize({ width: 425, height: 483 });
      }
    };
    
    // Initial check
    checkOrientation();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkOrientation);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setTimeout(() => onSelect(gender), 500);
  };

  return (
    <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
      <div className="text-6xl font-semibold text-white tracking-wide mb-4">Select Gender</div>

      <div className={`flex ${isLandscape ? 'flex-row' : 'flex-col'} items-center justify-center ${isLandscape ? 'gap-20' : 'gap-12'} mt-6`}>
        <button
          className="rounded-lg p-2 bg-cover bg-center bg-no-repeat border-none cursor-pointer bg-transparent transition-shadow duration-300"
          style={{ 
            backgroundImage: `url(${male})`,
            width: `${buttonSize.width}px`,
            height: `${buttonSize.height}px`
          }}
          onClick={(e) => {
            e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
            handleGenderSelect("male");
          }}
        ></button>

        <button
          className="rounded-lg p-2 bg-cover bg-center bg-no-repeat border-none cursor-pointer bg-transparent transition-shadow duration-300"
          style={{ 
            backgroundImage: `url(${female})`,
            width: `${buttonSize.width}px`,
            height: `${buttonSize.height}px`
          }}
          onClick={(e) => {
            e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
            handleGenderSelect("female");
          }}
        ></button>
      </div>
    </div>
  );
}