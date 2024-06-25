import React, { useState } from 'react';
import styled from 'styled-components';
import imageData from '../imageData.json';
import buttonBg from '/ai.png';

import bg03 from '/assets/bg03.png';
import bg04 from '/assets/bg04.png';
import bg05 from '/assets/bg05.png';

function ImageSelectionForm({ handleSubmit, enhance, setEnhance, selectImage }) {
  const [character, setCharacter] = useState('');
  const [location, setLocation] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCharacterChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setCharacter(e.target.value);
      setLocation('');
      setActiveIndex(null);
    }, 600);
  };

  const handleLocationChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setLocation(e.target.value);
      const imageUrl = getImageUrl(character, e.target.value);
      selectImage(imageUrl); // Call selectImage with the image URL from the JSON data
      setActiveIndex(null);
    }, 600);
  };

  const enhancedSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  function getImageUrl(character, location) {
    return imageData[character][location];
  }

  const CharacterContainer = styled.div`
    width: 180px;
    height: 180px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 21px;
    cursor: pointer;
    background-image: ${({ imageName }) => `url(${getImageUrl(imageName, Object.keys(imageData[imageName])[0])})`}; // Display the first location's image as a preview
  `;

  const LocationContainer = styled.div`
    width: 180px;
    height: 180px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 21px;
    cursor: pointer;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  `;

  return (
    <form onSubmit={enhancedSubmit} style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
      {character === '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60vw' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', backgroundImage: `url(${bg03})` }}>
            {Object.keys(imageData).map((characterOption, index) => (
              <div key={characterOption} style={{ margin: '30px', textAlign: 'center', marginTop: '220px' }}>
                <CharacterContainer
                  className={activeIndex === index ? 'animate__animated animate__heartBeat' : ''}
                  active={index === activeIndex}
                  imageName={characterOption}
                  onClick={() => handleCharacterChange({ target: { value: characterOption } }, index)}
                  style={{ border: "10px solid #FFDA7A" }}
                />
                <p style={{ textTransform: 'uppercase', color: '#000' }}>{characterOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {character !== '' && location === '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60vw' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', backgroundImage: `url(${bg04})` }}>
            {Object.keys(imageData[character]).map((locationOption, index) => (
              <div key={locationOption} style={{ margin: '30px', textAlign: 'center', marginTop: '220px' }}>
                <LocationContainer
                  className={activeIndex === index ? 'animate__animated animate__heartBeat' : ''}
                  active={index === activeIndex}
                  imageUrl={imageData[character][locationOption]}
                  onClick={() => handleLocationChange({ target: { value: locationOption } }, index)}
                  style={{ border: "10px solid #FFDA7A" }}
                />
                <p style={{ textTransform: 'uppercase', color: '#000' }}>{locationOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {location !== '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60vw' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', backgroundImage: `url(${bg05})` }}>
            <button
              type="submit"
              className='animate__animated animate__pulse animate__infinite infinite'
              style={{
                backgroundImage: `url(${buttonBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '380px',
                height: '120px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '9px',
                position: 'absolute',
                bottom: '45%',
                backgroundColor: "transparent"
              }}
            >
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default ImageSelectionForm;
