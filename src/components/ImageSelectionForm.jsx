import React, { useState } from "react";
import imageData from "../assets/test.json"; // Adjust the import path as necessary

const ImageSelectionForm = ({ selectImage, handleSubmit, setIsGender }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(setIsGender, "setIsGender");
  selectImage(`${setIsGender}.jpg`);

  return (
    <div>
      <button
        onClick={handleSubmit} // Added the onClick event to handle submit
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        AI MAGIC
      </button>
    </div>
  );
};

export default ImageSelectionForm;
