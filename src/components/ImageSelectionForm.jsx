/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Sample modified data structure
const imageData = {
  male: {
    male_1: {
      male_1A: "/male_1a.jpeg",
      male_1B: "/male_1b.jpeg",
      male_1C: "/male_1c.jpeg",
      male_1D: "/male_1d.jpeg",
      male_1E: "/male_1e.jpeg",
      male_1F: "/male_1f.jpeg",
    },
    male_2: {
      male_2A: "/bb3.jpeg",
      male_2B: "/bb4.jpeg",
      male_2C: "/bb4.jpeg",
      male_2D: "/bb4.jpeg",
      male_2E: "/bb4.jpeg",
      male_2F: "/bb4.jpeg",
    },
    male_3: {
      male_3A: "/bb1.jpeg",
      male_3B: "/bb1.jpeg",
      male_3C: "/bb1.jpeg",
      male_3D: "/bb1.jpeg",
      male_3E: "/bb2.jpeg",
      male_3F: "/bb2.jpeg",
    },
    male_4: {
      male_4A: "/bb1.jpeg",
      male_4B: "/bb1.jpeg",
      male_4C: "/bb1.jpeg",
      male_4D: "/bb1.jpeg",
      male_4F: "/bb3.jpeg",
      male_4G: "/bb4.jpeg",
    },
  },
  female: {
    female_1: {
      female_1A: "/bb1.jpeg",
      female_1B: "/bb1.jpeg",
      female_1C: "/bb1.jpeg",
      female_1D: "/bb1.jpeg",
      female_1F: "/bb3.jpeg",
      female_1G: "/bb4.jpeg",
    },
    female_2: {
      female_2A: "/bb1.jpeg",
      female_2B: "/bb1.jpeg",
      female_2C: "/bb1.jpeg",
      female_2D: "/bb1.jpeg",
      female_2F: "/bb3.jpeg",
      female_2G: "/bb4.jpeg",
    },
    female_3: {
      female_3A: "/bb1.jpeg",
      female_3B: "/bb1.jpeg",
      female_3C: "/bb1.jpeg",
      female_3D: "/bb1.jpeg",
      female_3F: "/bb3.jpeg",
      female_3G: "/bb4.jpeg",
    },
    female_4: {
      female_4A: "/bb1.jpeg",
      female_4B: "/bb1.jpeg",
      female_4C: "/bb1.jpeg",
      female_4D: "/bb1.jpeg",
      female_4F: "/bb3.jpeg",
      female_4G: "/bb4.jpeg",
    },
  },
};

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import maleImage from '/assets/male.png';
import femaleImage from '/assets/female.png';
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

  const genderImages = {
    male: maleImage,
    female: femaleImage,
  };
  const GenderContainer = styled.div`
  width: 315px;
  height:315px;
  cursor: pointer;
  margin:9px;
  background-image: ${({ genderOption }) => `url(${genderImages[genderOption]})`};
`;

  function getImageUrl(characterName) {
    console.log(characterName);
    // Assuming you have images named according to character names, for example, "character1.jpg", "character2.jpg", etc.
    return `/${characterName.toLowerCase().replace(/\s+/g, '-')}.jpeg`;
  }

  // Define styled component for CardContainer
  const CharacterContainer = styled.div`
  width: 200px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  /* Set background image based on character name */
  background-image: ${({ characterName }) => `url(${getImageUrl(characterName)})`};
`;

  // Define styled component for CardContainer
  const LocationContainer = styled.div`
width: 200px;
height: 300px;
background-size: cover;
background-repeat: no-repeat;
border-radius: 8px;
margin: 10px;
cursor: pointer;
/* Set background image based on character name */
background-image: ${({ characterName }) => `url(${getImageUrl(characterName)})`};
`;

  return (
    <form onSubmit={enhancedSubmit} style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
      {gender === '' && (
        <div style={{ display: 'flex' }}>
          {Object.keys(imageData).map((genderOption) => (
            <GenderContainer
              key={genderOption}
              genderOption={genderOption}
              onClick={() => handleGenderChange({ target: { value: genderOption } })}
            >
            </GenderContainer>
          ))}
        </div>
      )}

      {gender !== '' && character === '' && (
        <div style={{ display: 'flex' }}>
          {Object.keys(imageData[gender]).map((characterOption) => (
            <CharacterContainer
              key={characterOption}
              characterName={characterOption}
              onClick={() => handleCharacterChange({ target: { value: characterOption } })}
            >
            </CharacterContainer>
          ))}
        </div>
      )}

      {character !== '' && (
        <div style={{ display: 'flex' }}>
          {Object.keys(locations).map((locationOption) => (
            <LocationContainer
              type="submit"
              key={locationOption}
              onClick={() => handleLocationChange({ target: { value: locationOption } })}
              characterName={locationOption}>
            </LocationContainer>
          ))}
        </div>
      )}

      {/* <label>
          <input
            type="checkbox"
            checked={enhance}
            onChange={(e) => setEnhance(e.target.checked)}
          />
          Enhance Image
        </label> */}
      {magic !== '' && (
        <button type="submit">Swap Faces</button>
      )}
    </form>



  );
}

export default ImageSelectionForm;
