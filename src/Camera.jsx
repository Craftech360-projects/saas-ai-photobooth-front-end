import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SceneSlider from "./SceneSlider";
import captureImageIcon from "/assets/pcp.png";
import maleImage from "/male.png";
import femaleImage from "/female.png";

const imgStyle = {
  width: "auto",
  height: "auto",
  maxWidth: "400px",
  maxHeight: "250px",
  objectFit: "contain",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "5px solid #FFCE00",
};

const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: 4px solid #FFC462;
  width: 270px;
  height: 100px;
  cursor: pointer;
  text-indent: -9999px;
  position: relative;
  margin-top: 90px;
  fontFamily: 'Inter, sans-serif'
`;

const StyledInput = styled.input`
  padding-left: 35px;
  font-size: 34px;
  border: 4px solid #FFC462;
  text-align: left;
  color: #fff;
  font-weight: semi-bold;
  width: 760px;
  height: 110px;
  text-transform: capitalize;
  background-color: #000000;
  fontFamily: 'Inter, sans-serif'
  &::placeholder {
    color: #fff;
  }
`;

const backgroundImage = "/background2.jpg";
const backgroundImage2 = "/background.jpg";

function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [showGenderSelection, setShowGenderSelection] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "rahul",
    email: "rahul@gamil.com",
    gender: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScene, setShowScene] = useState(false);
  const [imageFolder, setImageFolder] = useState(null);
  const [errors, setErrors] = useState({});
  const camera = "/camera.png";
  const submit = "/submit.png";  
  const superheroPrompts = {
    male: {
      "superheros/male/1.png": "superman",
      "superheros/male/2.png": "Male superhero with lightning powers, electrifying aura, sleek costume, intense gaze",
      "superheros/male/3.png": "Male superhero with flight ability, soaring through the sky, heroic pose, confident smile",
      "superheros/male/4.png": "Male superhero with telekinetic powers, mind over matter, focused concentration, powerful stance",
      "superheros/male/5.png": "Male superhero with super speed, blurring motion, aerodynamic suit, determined sprint",
    },
    female: {
      "superheros/female/1.png": "Female superhero with incredible agility, acrobatic prowess, flexible suit, graceful movements",
      "superheros/female/2.png": "Female superhero with energy blasts, radiant energy, protective armor, fierce determination",
      "superheros/female/3.png": "Female superhero with invisibility powers, cloaked in shadows, stealthy presence, mysterious allure",
      "superheros/female/4.png": "Female superhero with healing abilities, soothing aura, compassionate expression, nurturing touch",
      "superheros/female/5.png": "Female superhero with weather control, commanding the elements, flowing cape, powerful presence",
    },
  };

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("error:", err);
          setIsCameraOn(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.name) newErrors.name = "Name is required";
    if (!userDetails.email) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowGenderSelection(true);
    setIsStarted(false);
  };

  const selectGender = (gender) => {
    setUserDetails(prev => ({...prev, gender}));
    setShowGenderSelection(false);
    setImageFolder(`superheros/${gender}`);
    setShowScene(true);
  };

  const captureImage = () => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        const section = document.querySelector("section");
        if (section) {
          section.classList.add("animate__animated", "animate__fadeOut");
          setTimeout(() => {
            const selectedImagePrompt = superheroPrompts[userDetails.gender][isImg];
            navigate("/swap", {
              state: { 
                sourceImage: blob, 
                userDetails, 
                selectedImage: isImg, 
                gender: userDetails.gender, 
                selectedImagePrompt 
              },
            });
          }, 1000);
        }
      }, "image/jpeg");
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSceneSelection = (scene) => {
    setSelectedOption(scene);
    setIsImg(scene);
    setIsCameraOn(true);
    setShowScene(false);
  };

  const scenes = imageFolder ? [
    `${imageFolder}/1.png`, 
    `${imageFolder}/2.png`, 
    `${imageFolder}/3.png`, 
    `${imageFolder}/4.png`, 
    `${imageFolder}/5.png`
  ] : [];

  return (
    <section
      className="text-center w-screen h-screen"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Initial Form - Name and Email */}
      {isStarted && (
        <div
          className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
         

          <button
            onClick={handleInitialSubmit}
            className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[75%]"
          >
            <img
              src={submit}
              alt="Submit"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </button>
        </div>
      )}

      {/* Gender Selection Screen */}
      {showGenderSelection && (
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          style={{ backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="text-white text-6xl mb-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Select Your Gender
          </h1>
          
          <div className="flex flex-col gap-8 items-center">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => selectGender("male")}
            >
              <img 
                src={maleImage} 
                alt="Male" 
                style={{ 
                  width: "300px", 
                  height: "300px", 
                  objectFit: "cover",
                  border: userDetails.gender === "male" ? "5px solid #FFCE00" : "none"
                }} 
              />
              <p className="text-white text-4xl mt-4 font-bold">MALE</p>
            </div>
            
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => selectGender("female")}
            >
              <img 
                src={femaleImage} 
                alt="Female" 
                style={{ 
                  width: "300px", 
                  height: "300px", 
                  objectFit: "cover",
                  border: userDetails.gender === "female" ? "5px solid #FFCE00" : "none"
                }} 
              />
              <p className="text-white text-4xl mt-4 font-bold">FEMALE</p>
            </div>
          </div>
        </div>
      )}

      {/* Camera View */}
      {isCameraOn && (
        <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
          <div className="text-center text-6xl font-semibold mb-48 text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Strike a Pose
          </div>
          
          <video
            ref={videoRef}
            autoPlay
            className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>
        
          <button
            onClick={(e) => {
              const button = e.currentTarget;
              if (!button) return;
              button.classList.add("scale-95");
              setTimeout(() => {
                if (button) button.classList.remove("scale-95");
                captureImage();
              }, 500);
            }}
            className="w-[365px] h-[102px] cursor-pointer absolute top-[80%] transition transform active:scale-95"
          >
            <img
              src={camera}
              alt="Capture"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </button>
        </div>
      )}

      {/* Scene Selection */}
      {showScene && (
        <SceneSlider scenes={scenes} onSelect={handleSceneSelection} />
      )}
    </section>
  );
}

export default Camer;