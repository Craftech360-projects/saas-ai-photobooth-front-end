import React from "react";
import "../styles/CharacterImage.css";

const CharacterImage = ({ src, borderColor, onClick }) => {
  return (
    <div
      className="character-image-container"
      style={{ borderColor: `#${borderColor}` }}
      onClick={onClick}
    >
      <img src={src} alt="Character" className="character-image" />
    </div>
  );
};

export default CharacterImage;
