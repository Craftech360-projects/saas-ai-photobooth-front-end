/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Sample modified data structure

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import imageData from '../imageData.json'
import buttonBg from '/ai.png'

import bg001 from '/assets/bg01.png';
import bg02 from '/assets/bg02.png';
import bg03 from '/assets/bg03.png';
import bg04 from '/assets/bg04.png';
import bg05 from '/assets/bg05.png';
import bg00 from '/assets/bg00.png';

function ImageSelectionForm({ handleSubmit, enhance, setEnhance, selectImage }) {
  const [gender, setGender] = useState('');
  const [character, setCharacter] = useState('');
  const [magic, setMagic] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [imageClicked, setImageClicked] = useState(false);
  const handleGenderChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      console.log(index);
      setGender(e.target.value);
      setCharacter('');
      setLocation('');
      setLocations({});
      setActiveIndex(null)
    }, 600);
  };

  const handleCharacterChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setCharacter(e.target.value);
      const selectedCharacterLocations = imageData[gender][e.target.value];
      setLocations(selectedCharacterLocations);
      setLocation('');
      setActiveIndex(null)
    }, 600);
  };

  const handleLocationChange = (e, locationOption, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      e.preventDefault(); // Prevent form submission
      // setLocation(locationOption); // Set the selected location
      setImageClicked(true);
      setEnhance(true); // Set enhance to true
      selectImage(locations[locationOption]); // Select the corresponding image setLocation(e.target.value);
      setLocations({});
      setMagic(e.target.value);
      setLocations({});
      setActiveIndex(null)
    }, 600);
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
            // selectImage(imageData[gender][character][location]);
            // setEnhance(true);

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

  function getImageUrl2(imageName) {
    console.log(imageName);
    // Assuming you have images named according to character names, for example, "character1.jpg", "character2.jpg", etc.
    return `/${imageName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  }

  const GenderContainer = styled.div`
  width: 180px;
height: 180px;
background-size: 100% 100%;
background-repeat: no-repeat;
background-position:center;
border-radius: 21px;
cursor: pointer;
  background-image: ${({ imageName }) => `url(${getImageUrl(imageName)})`};
`;

  // Define styled component for CardContainer
  const CharacterContainer = styled.div`
  width: 180px;
  height: 180px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 21px;
  cursor: pointer;
  /* Set background image based on character name */
  background-image: ${({ imageName }) => `url(${getImageUrl2(imageName)})`};
`;

  // Define styled component for CardContainer
  const LocationContainer = styled.div`
width: 180px;
height: 180px;
background-size: 100% 100%;
background-repeat: no-repeat;
background-position:center;
border-radius: 21px;
cursor: pointer;
/* Set background image based on character name */
background-image: ${({ imageName }) => `url(${getImageUrl2(imageName)})`};
`;

  return (
    <form onSubmit={enhancedSubmit} style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

      {gender === '' && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height:'100vh',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundImage: `url(${bg02})`
        }}>
          {/* <h1 style={{ position: 'absolute', top: '20%', fontSize: '35px', textTransform: 'uppercase', color:'#fff' }}>Select Your Universe</h1> */}
          {Object.keys(imageData).map((genderOption, index) => (
            <div key={genderOption} style={{ margin: '40px', textAlign: 'center', marginTop:"220px" }}>
              <GenderContainer
                className={activeIndex === index ? 'animate__animated animate__heartBeat' : ''}
                active={index === activeIndex}
                imageName={genderOption}
                onClick={() => handleGenderChange({ target: { value: genderOption } }, index)}
               style={{border:"10px solid #FFDA7A"}}
              />
              <p style={{ textTransform: 'uppercase', color:'#000'}}>{genderOption.replace(/_/g, ' ')}</p> {/* Remove underscores */}
            </div>
          ))}
        </div>
      )}


      {gender !== '' && character === '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60vw' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height:"100vh",
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundImage: `url(${bg03})`
          }}
          >
            {/* <h1 style={{ position: 'absolute', top: '20%', fontSize: '35px', textTransform: 'uppercase',color:'#fff' }}>Select Your Character</h1> */}
            {Object.keys(imageData[gender]).map((characterOption, index) => (
              <div key={characterOption} style={{ margin: '30px', textAlign: 'center', marginTop:"220px"  }}>
                <CharacterContainer
                  className={activeIndex === index ? 'animate__animated animate__heartBeat' : ''}
                  active={index === activeIndex}
                  imageName={characterOption}
                  onClick={() => handleCharacterChange({ target: { value: characterOption } }, index)}
               style={{border:"10px solid #FFDA7A"}}
           
                />
                <p style={{ textTransform: 'uppercase',color:'#000' }}>{characterOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {character !== '' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60vw',  }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height:"100vh",
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundImage: `url(${bg04})`
          }}>
            {!imageClicked && ( // Render the h1 only if imageClicked is false
              <h1 style={{ position: 'absolute', top: '20%', fontSize: '35px', textTransform: 'uppercase' ,color:'#fff'}}></h1>
            )}
            {Object.keys(locations).map((locationOption, index) => (
              <div key={locationOption} style={{ margin: '20px', marginTop:"200px" }}>
                <LocationContainer
                  className={activeIndex === index ? 'animate__animated animate__heartBeat' : ''}
                  active={index === activeIndex}
                  type="submit"
                  imageName={locationOption}
                  onClick={(e) => handleLocationChange(e, locationOption, index)}
                  style={{ border:"10px solid #FFDA7A" }}
                />
                <p style={{ textTransform: 'uppercase',color:'#000' }}>{locationOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}


      {magic !== '' && (
        <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height:"100vh",
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundImage: `url(${bg05})`,
          position:'absolute'
        }}
        >

     
        <button
          type="submit"
          className='animate__animated animate__pulse animate__infinite	infinite'
          style={{
            backgroundImage: `url(${buttonBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '380px', // Adjust width as needed
            height: '120px', // Adjust height as needed
            border: 'none',
            cursor: 'pointer', // Show pointer cursor on hover
            borderRadius: '9px',
            position: 'absolute',
            bottom:'45%',
            backgroundColor:"transparent"
          }}
        >
        </button>
        </div>
      )}

    </form>



  );
}

export default ImageSelectionForm;
