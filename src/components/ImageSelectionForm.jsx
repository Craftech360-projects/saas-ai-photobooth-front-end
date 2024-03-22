import React from 'react';
import imageData from '../data.json';

function ImageSelectionForm({ handleSubmit, enhance, setEnhance, selectRandomImage }) {
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(imageData).map((key, index) => (
        <button
          key={index}
          type="button"
          onClick={() => selectRandomImage(imageData[key])}
        >
          Set {index + 1}
        </button>
      ))}
      <div>
        <label>
          <input
            type="checkbox"
            checked={enhance}
            onChange={(e) => setEnhance(e.target.checked)}
          />
          Enhance Image
        </label>
      </div>
      <button type="submit">Swap Faces</button>
    </form>
  );
}

export default ImageSelectionForm;
