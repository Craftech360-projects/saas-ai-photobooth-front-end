import React, { useState } from "react";
import styled from "styled-components";
import imageData from "../imageData.json";
import buttonBg from "/ai.png";

function ImageSelectionForm({ handleSubmit }) {
  const [character, setCharacter] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle character selection
  const handleCharacterChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setCharacter(e.target.value);
      setActiveIndex(null);
    }, 600);
  };

  // Handle form submission
  const enhancedSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (character) {
      const selectedImageUrl = imageData[character]; // Get the URL of the selected image
      console.log('Submitting image URL:', selectedImageUrl);
      handleSubmit(selectedImageUrl); // Pass the image URL to the submit handler
    }
  };

  // Function to get image URL from the character name
  function getImageUrl(character) {
    return imageData[character];
  }

  // Styled component for character container
  const CharacterContainer = styled.div`
    width: 280px;
    height: 280px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 21px;
    cursor: pointer;
    background-image: ${({ imageName }) =>
      `url(${getImageUrl(imageName)})`};
  `;

  return (
    <form
      onSubmit={enhancedSubmit}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {character === "" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {Object.keys(imageData).map((characterOption, index) => (
            <div key={characterOption}>
              <CharacterContainer
                className={
                  activeIndex === index
                    ? "animate__animated animate__heartBeat"
                    : ""
                }
                active={index === activeIndex}
                imageName={characterOption}
                onClick={() =>
                  handleCharacterChange(
                    { target: { value: characterOption } },
                    index
                  )
                }
                style={{ border: "10px solid #FFDA7A" }}
              />
              <p style={{ textTransform: "uppercase", color: "#000" }}>
                {characterOption.replace(/_/g, " ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {character !== "" && (
        <div>
          <button
            type="submit"
            className="animate__animated animate__pulse animate__infinite infinite"
            style={{
              backgroundImage: `url(${buttonBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "380px",
              height: "120px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          ></button>
        </div>
      )}
    </form>
  );
}

export default ImageSelectionForm;
