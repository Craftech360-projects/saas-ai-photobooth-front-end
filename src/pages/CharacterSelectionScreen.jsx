import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharacterSelectionScreen.css";

const CharacterSelectionScreen = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const maleCharacters = [
    "/assets/m1.png",
    "/assets/m2.png",
    "/assets/m3.png",
    "/assets/m1.png",
    "/assets/m2.png",
    "/assets/m3.png",
  ];

  const femaleCharacters = [
    "/assets/f1.png",
    "/assets/f2.png",
    "/assets/f3.png",
    "/assets/f1.png",
    "/assets/f2.png",
    "/assets/f3.png",
  ];

  useEffect(() => {
    const storedGender = localStorage.getItem("selectedGender");
    if (storedGender) {
      setGender(storedGender);
    } else {
      // If no gender is stored, go back to gender selection
      navigate("/gender-selection");
    }
  }, [navigate]);

  const characters = gender === "male" ? maleCharacters : femaleCharacters;

  const handlePrevious = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? characters.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === characters.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handleCharacterSelect = (index) => {
    setSelectedCharacter(carouselIndex + index);
  };

  const handleContinue = () => {
    if (selectedCharacter !== null) {
      // Store selected character in localStorage
      localStorage.setItem("selectedCharacter", characters[selectedCharacter]);
      navigate("/capture");
    } else {
      alert("Please select a character to continue");
    }
  };

  // Get visible characters for the carousel
  const visibleCharacters = [
    characters[carouselIndex % characters.length],
    characters[(carouselIndex + 1) % characters.length],
    characters[(carouselIndex + 2) % characters.length],
  ];

  return (
    <div className="screen content-background">
      <div className="character-selection-container">
        <h1 className="title4">Select your Own Avatar</h1>

        <div className="carousel-container">
          <button className="carousel-button prev" onClick={handlePrevious}>
            &#10094;
          </button>

          <div className="character-carousel">
            {visibleCharacters.map((character, index) => (
              <div
                key={index}
                className={`character-card ${
                  selectedCharacter === carouselIndex + index ? "selected" : ""
                }`}
                onClick={() => handleCharacterSelect(index)}
              >
                <img
                  src={character}
                  alt={`Character ${carouselIndex + index + 1}`}
                />
              </div>
            ))}
          </div>

          <button className="carousel-button next" onClick={handleNext}>
            &#10095;
          </button>
        </div>

        <button
          className="button continue-button"
          onClick={handleContinue}
          disabled={selectedCharacter === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CharacterSelectionScreen;
