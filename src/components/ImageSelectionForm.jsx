/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Sample modified data structure

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import imageData from '../imageData.json'
import buttonBg from '/magic.png'
import { useNavigate } from 'react-router-dom';
import './styles.css'; 
import logo from '/assets/previous.png'; // Import the PNG image
function ImageSelectionForm({ handleSubmit, enhance, setEnhance, selectImage }) {
  const [universe, setUniverse] = useState('');
  const [character, setCharacter] = useState('');
  const [magic, setMagic] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [imageClicked, setImageClicked] = useState(false);
  const navigate = useNavigate();
  const [headName, setHeadName] = useState('Universeee');
  const [isShowHead, setIsShowHead] = useState('');
  const nav = 0;
  const goBack = () => {
    if(nav == 0){
      navigate("/");
    } // Navigate to the previous route
  };

  const handleBackToUniverse = () => {
    setUniverse('');
    setCharacter('');
    setLocation('');
    setLocations({});
    setHeadName('Universe')
  };

  const handleBackToCharacter = () => {
    setCharacter('');
    setLocation('');
    setLocations({});
    setHeadName('Character')
  };

  const handleBackToLocation = () => {
    setMagic('');
    setImageClicked(false);
    setLocations(imageData[universe][character]);
    setIsShowHead("");
  };
  const handleUniverseChange = (e, index) => {
    setActiveIndex(index);

    setTimeout(() => {
      console.log(index);
      setUniverse(e.target.value);
      setCharacter('');
      setLocation('');
      setLocations({});
      setActiveIndex(null);
      setHeadName('Character');
    }, 600);
  };

  const handleCharacterChange = (e, index) => {
    setActiveIndex(index);
    setTimeout(() => {
      setCharacter(e.target.value);
      const selectedCharacterLocations = imageData[universe][e.target.value];
      setLocations(selectedCharacterLocations);
      setLocation('');
      setActiveIndex(null);
      setHeadName('Location');
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
      setActiveIndex(null);
      setIsShowHead("hh");
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
      for (const universe in imageData) {
        for (const character in imageData[universe]) {
          // Check if the selected location exists for the current character
          if (imageData[universe][character][location]) {
            console.log(`Selected Location Value:`, imageData[universe][character][location]);
            // Call selectImage with the selected location
            // selectImage(imageData[universe][character][location]);
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

  const UniverseContainer = styled.div`
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position:center;
  border-radius: 21px;
  cursor: pointer;
  background-image: ${({ imageName }) => `url(${getImageUrl(imageName)})`};
`;

  // Define styled component for CardContainer
  const CharacterContainer = styled.div`
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position:center;
  border-radius: 21px;
  cursor: pointer;
  /* Set background image based on character name */
  background-image: ${({ imageName }) => `url(${getImageUrl2(imageName)})`};
`;

  // Define styled component for CardContainer
  const LocationContainer = styled.div`
width: 200px;
height: 200px;
background-size: 100% 100%;
background-repeat: no-repeat;
background-position:center;
border-radius: 21px;
cursor: pointer;
/* Set background image based on character name */
background-image: ${({ imageName }) => `url(${getImageUrl2(imageName)})`};
`;



  return (
    <form onSubmit={enhancedSubmit} style={{  display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100vw',
    height:'100vh',}} >
    
    {isShowHead === '' && <h1 className='head-name'>Select Your {headName}</h1>}

      {universe === '' && (
        <div className="comman-div">
          <button onClick={goBack} style={{ margin: '15px', backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer',position:'absolute', bottom:'0',left:'0'}}>
            <img src={logo} style={{width:'50px'}}></img>
          </button>
          {Object.keys(imageData).map((universeOption, index) => (
            <div key={universeOption} style={{ margin: '20px',textAlign:'center'}}>
              <UniverseContainer
                className={activeIndex === index ? 'animate__animated animate__bounceOutUp' : ''}
                active={index === activeIndex}
                imageName={universeOption}
                onClick={() => handleUniverseChange({ target: { value: universeOption } }, index)}
              />
              <p style={{ textTransform: 'uppercase', color:'#fff',marginTop:'15px'}}>{universeOption.replace(/_/g, ' ')}</p> {/* Remove underscores */}
            </div>
          ))}
        </div>
      )}


      {universe !== '' && character === '' && (
          <div className="comman-div"
          >

          <button onClick={handleBackToUniverse} style={{ margin: '15px', backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer',position:'absolute', bottom:'0',left:'0'}}>
            <img src={logo} style={{width:'50px'}}></img>
          </button>
            {Object.keys(imageData[universe]).map((characterOption, index) => (
              <div key={characterOption} style={{ margin: '20px', textAlign: 'center' }}>
                <CharacterContainer
                  className={activeIndex === index ? 'animate__animated animate__bounceOutUp' : ''}
                  active={index === activeIndex}
                  imageName={characterOption}
                  onClick={() => handleCharacterChange({ target: { value: characterOption } }, index)}
                />
                <p style={{ textTransform: 'uppercase',color:'#fff',marginTop:'15px' }}>{characterOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
      )}

      {character !== '' && magic === '' &&(
          <div className="comman-div">
          <button onClick={handleBackToCharacter} style={{ margin: '15px', backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer',position:'absolute', bottom:'0',left:'0'}}>
            <img src={logo} style={{width:'50px'}}></img>
          </button>
            {Object.keys(locations).map((locationOption, index) => (
              <div key={locationOption} style={{ margin: '20px',textAlign:'center' }}>
                <LocationContainer
                  className={activeIndex === index ? 'animate__animated animate__bounceOutUp' : ''}
                  active={index === activeIndex}
                  type="submit"
                  imageName={locationOption}
                  onClick={(e) => handleLocationChange(e, locationOption, index)}
                />
                <p style={{ textTransform: 'uppercase',color:'#fff',marginTop:'15px' }}>{locationOption.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
      )}


      {magic !== '' && (
    <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', width: '100vw' }}>
          <button
          type="submit"
          className='animate__animated animate__pulse animate__infinite	infinite'
          style={{
            width: '300px', // Adjust width as needed
            height: '80px', // Adjust height as needed
            border: 'none',
            cursor: 'pointer', // Show pointer cursor on hover
            borderRadius: '9px',
            position: 'absolute',
            fontWeight:'bolder',
            fontSize:'30px',
            color:'#fff',
            backgroundColor:'#000',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >AI MAGIC
         <img src={buttonBg} alt="Small Image" style={{ marginLeft: '10px' , height:'50px'}} />
        </button>
          <button onClick={handleBackToLocation} style={{ margin: '15px', backgroundColor: 'transparent', color: '#fff', border: 'none', cursor: 'pointer',position:'absolute', bottom:'0',left:'0'}}>
            <img src={logo} style={{width:'50px'}}></img>
          </button>

    </div>
        
      )}

    </form>



  );
}

export default ImageSelectionForm;
