/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Sample modified data structure

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import imageData from '../imageData.json'
import buttonBg from '../../public/ai.png'
function ImageSelectionForm({ handleSubmit, enhance, setEnhance, selectImage }) {
  const [gender, setGender] = useState('');
  const [character, setCharacter] = useState('');
  const [magic, setMagic] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState({});

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setCharacter('');
    setLocation('');
    setLocations({});
  };

  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
    const selectedCharacterLocations = imageData[gender][e.target.value];
    setLocations(selectedCharacterLocations);
    setLocation('');
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setLocations({});
    setMagic(e.target.value);
  };

  const enhancedSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e); // Assuming handleSubmit can handle this new structure
  };

  // useEffect to log the value of the selected location
  useEffect(() => {
    // Ensure location is not empty
    if (location) {
      // Find the selected location's value from imageData
      for (const gender in imageData) {
        for (const character in imageData[gender]) {
          // Check if the selected location exists for the current character
          if (imageData[gender][character][location]) {
            console.log(`Selected Location Value:`, imageData[gender][character][location]);
            // Call selectImage with the selected location
            selectImage(imageData[gender][character][location]);
            setEnhance(true);

            return; // Exit the loop once the location is found
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function getImageUrl(imageName) {
    console.log(imageName);
    // Assuming you have images named according to character names, for example, "character1.jpg", "character2.jpg", etc.
    return `/${imageName.toLowerCase().replace(/\s+/g, '-')}.jpeg`;
  }

  const GenderContainer = styled.div`
  width: 228px;
  height:228px;
  cursor: pointer;
  border-radius: 21px;
  background-image: ${({ imageName }) => `url(${getImageUrl(imageName)})`};
`;

  // Define styled component for CardContainer
  const CharacterContainer = styled.div`
  width: 228px;
  height: 228px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 21px;
  cursor: pointer;
  /* Set background image based on character name */
  background-image: ${({ imageName }) => `url(${getImageUrl(imageName)})`};
`;

  // Define styled component for CardContainer
  const LocationContainer = styled.div`
width: 228px;
height: 228px;
background-size: cover;
background-repeat: no-repeat;
border-radius: 21px;
cursor: pointer;
/* Set background image based on character name */
background-image: ${({ imageName }) => `url(${getImageUrl(imageName)})`};
`;

  return (
    <form onSubmit={enhancedSubmit} style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

      {gender === '' && (
        <div style={{
          display: 'flex',
          width: '50vw',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {Object.keys(imageData).map((genderOption) => (
            <div key={genderOption} style={{ margin: '10px', textAlign: 'center' }}>
              <GenderContainer
                imageName={genderOption}
                onClick={() => handleGenderChange({ target: { value: genderOption } })}
              />
              <p>{genderOption}</p>
            </div>
          ))}
        </div>
      )}


      {gender !== '' && character === '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50vw' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(imageData[gender]).map((characterOption, index) => (
              <div key={characterOption} style={{ margin: '10px' }}>
                <CharacterContainer
                  imageName={characterOption}
                  onClick={() => handleCharacterChange({ target: { value: characterOption } })}
                />
                <p>{characterOption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {character !== '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '68vw' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(locations).map((locationOption) => (
              <div key={locationOption} style={{ margin: '10px' }}>
                <LocationContainer
                  type="submit"
                  imageName={locationOption}
                  onClick={() => handleLocationChange({ target: { value: locationOption } })}
                />
                <p>{locationOption}</p>
              </div>
            ))}
          </div>
        </div>
      )}


      {magic !== '' && (
        <button
          type="submit"
          style={{
            backgroundImage: `url(${buttonBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '250px', // Adjust width as needed
            height: '80px', // Adjust height as needed
            border: 'none',
            cursor: 'pointer', // Show pointer cursor on hover
            borderRadius: '9px',
            position: 'absolute'
          }}
        >
        </button>
      )}

    </form>



  );
}

export default ImageSelectionForm;
