import React, { useState } from "react";
import imageData from "../assets/test.json"; // Adjust the import path as necessary

const ImageSelectionForm = ({ selectImage, handleSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
    selectImage(src);
  };

  return (
    <div>
      {selectedImage ? (
        <button
          onClick={handleSubmit} // Added the onClick event to handle submit
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Submit
        </button>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Object.entries(imageData).map(([name, src]) => (
            <div key={name} style={{ margin: '10px', cursor: 'pointer' }}>
              <img
                src={`/${src}`} // Adjust the path as necessary
                alt={name}
                style={{ width: '100px', height: '100px' }}
                onClick={() => handleImageClick(`/${src}`)} // Adjust the path as necessary
              />
              <p>{name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSelectionForm;
