import React, { useState } from "react";
import imageData from "../assets/test.json"; // Adjust the import path as necessary
import captureImageIcon from "/assets/pmagic.png"; // Import the PNG imag
const ImageSelectionForm = ({ selectImage, handleSubmit, setIsGender }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(setIsGender, "setIsGender");
  selectImage(`${setIsGender}.jpg`);

  return (
    <div
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={handleSubmit} // Added the onClick event to handle submit
        style={{
          backgroundImage: `url(${captureImageIcon})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "321px", // Adjust width as needed
          height: "392px", // Adjust height as needed
          border: "none",
          cursor: "pointer", // Show pointer cursor on hover
          backgroundColor: "transparent",
        }}
      >
        AI MAGIC
      </button>
    </div>
  );
};

export default ImageSelectionForm;
