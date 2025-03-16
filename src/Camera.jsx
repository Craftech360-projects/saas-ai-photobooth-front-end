
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SceneSlider from "./SceneSlider";
import { supabase } from "./supabaseClient"; // Add this import
import { ThemeSlider } from "./theme-slider";
import female from "/assets/female.png";
import male from "/assets/male.png";
import captureImageIcon from "/assets/pcp.png";
import redcarpet from "/redcarpet.png";
import Scifi from "/scifi.png";
import outerspace from "/space.png";
import sports from "/sports.png";
import superheros from "/superheros.png";

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
  border: none;
  width: 270px;
  height: 100px;
  cursor: pointer;
  text-indent: -9999px;
  position: relative;
  margin-top: 90px;
`;

const StyledInput = styled.input`
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #182060;
  font-weight: bold;
  width: 760px;
  height: 110px;
  text-transform: capitalize;
  background-color: #fff;
  
  border-radius: 12px; /* Adjust the value as needed */

  &::placeholder {
    color: #182060;
  }
`;

const StyledSelect = styled.select`
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #182060;
  font-weight: bold;
  width: 830px;
  height: 110px;
  text-transform: capitalize;
  background-color: #fff;

  border-radius: 12px; /* Adjust the value as needed */

  appearance: none;
  &::placeholder {
    color: #182060;
  }
`;

const backgroundImage = "/background2.jpg";

function Camer() {
  const maleImages = ["male1", "male1"];
  const femaleImages = ["female1", "female1"];
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [gender, setGender] = useState(null);
  const [isGender, setIsGender] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isGenderShow, setIsGenderShow] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "rahul",
    email: "rahul@gmail.com",
    gender: "",
  });
  const [isPressed, setIsPressed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showScene, setShowScene] = useState(false);
  const [imageFolder, setImageFolder] = useState(null);
  const [isThemeSelected, setIsThemeSelected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const camera= "/camera.png";
  const submit= "/submit.png";
  const themes = [
    { id: 1, name: "Red Carpet", image: redcarpet },
    { id: 2, name: "Space", image: outerspace },
    { id: 3, name: "Sci-fi", image: Scifi },
    { id: 4, name: "Sports", image: sports },
    { id: 5, name: "Superheros", image: superheros },
  ];

  const startProcess = (selectedGender) => {
    console.log(selectedGender);
    userDetails.gender = selectedGender;
    setIsStarted(false);
    setIsGenderShow(false);
    setIsGender(selectedGender);
    setGender(selectedOption);
    console.log(selectedOption, selectedGender);
    setSelectedOption(null);
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

  const captureImage = () => {
    setTimeout(() => setIsPressed(false), 300);
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
          console.log(">>>>>>>>",blob, userDetails, isImg);
          setTimeout(() => {
            navigate("/swap", {
              state: { sourceImageBlob: blob, userDetails, selectedImage: isImg },
            });
          }, 1000);
          console.log(isImg, userDetails);
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

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    setShowWarning(false); // Hide warning message when user starts typing
  };

  const handleSubmit = (e) => {
    console.log("here")
    e.preventDefault();
    if (!userDetails.name || !userDetails.email || emailError) {
      setShowWarning(true); // Show warning message if name or email is empty or email is invalid
    } else {
      setIsGenderShow(true);
      setIsStarted(false);
      console.log(userDetails, "userDetails");
    }
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const handleThemeSelect = (theme) => { 
    console.log("htemmmmmmee",theme);
    setSelectedTheme(theme);
    setIsThemeSelected(true); // Set theme as selected
    setIsGenderShow(false);
    setShowScene(true);
    console.log(`theeme, ${theme.name.toLowerCase().replace(" ", "")}`);
    
       setImageFolder(`${theme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`);

    console.log("folder for theme" ,imageFolder);
  };

  const scenes = imageFolder ? [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`] : [];

  const handleSceneSelection = (scene) => {
    setSelectedOption(scene);
    setIsImg(scene);
    setIsCameraOn(true);
    setShowScene(false);
  };

  // Add the cameraSettings state
  const [cameraSettings, setCameraSettings] = useState({
    header_text: "Smile for the camera!",
    header_color: "#FFFFFF",
    header_font_size: 24,
    button_color: "#8b5cf6",
    button_text_color: "#FFFFFF",
    button_roundness: "rounded-3xl"
  });

  // Add this useEffect to fetch camera settings
  useEffect(() => { 
    console.log("hereeeee");
    const fetchCameraSettings = async () => {
      const { data } = await supabase
        .from('camera_page_settings')
        .select('*')
        .single();
      
      if (data) {
        setCameraSettings(data);
      }
      console.log("cameraSettings", cameraSettings);
    };
    
    fetchCameraSettings();
    
    // Listen for settings updates
    const handleCameraSettingsUpdate = (e) => {
      setCameraSettings(e.detail.settings);
    };
    
    window.addEventListener('cameraSettingsUpdated', handleCameraSettingsUpdate);
    
    return () => {
      window.removeEventListener('cameraSettingsUpdated', handleCameraSettingsUpdate);
    };
  }, []);

  return (
    <section
      className="text-center w-screen h-screen"
      style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
    {isStarted && (
  <>
    <div
      className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
   <div className="absolute top-[55%] flex flex-col gap-8 items-center w-full">
        <StyledInput
          type="text"
          name="name"
          placeholder="Enter name"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
             {emailError && (
          <div className="text-red-500 text-4xl mt-4">Please enter a valid email address.</div>
        )}
        <StyledInput
          type="email"
          name="email"
          placeholder="Enter email"
          value={userDetails.email}
          onChange={handleChange}
          required
        />
     
     {!showWarning && !emailError && (
  <button
    onClick={handleSubmit}
    className={`w-[428px] h-[104px] mt-16 cursor-pointer border-none transition-colors ${cameraSettings?.button_roundness || "rounded-3xl"}`}
    style={{
      backgroundColor: cameraSettings?.button_color || "#8b5cf6",
      color: cameraSettings?.button_text_color || "#FFFFFF"
    }}
  >
    <img
      src={submit}
      alt="Submit"
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  </button>
)}

      </div>
    </div>
  </>
)}

      {isGenderShow && (
        <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
          <div className="text-6xl font-semibold text-white tracking-wide mb-4">Select Gender</div>

          <div className="flex flex-col items-center justify-center gap-5 mt-6">
            <button
              className="rounded-lg p-2 bg-cover bg-center bg-no-repeat w-[425px] h-[483px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${male})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
                setTimeout(() => startProcess("male"), 500);
              }}
            ></button>

            <button
              className="rounded-lg p-2 bg-cover bg-center bg-no-repeat w-[425px] mt-5 h-[483px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${female})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
                setTimeout(() => startProcess("female"), 500);
              }}
            ></button>
          </div>
        </div>
      )}

      {isGender && !isThemeSelected && !showScene && (
        <ThemeSlider themes={themes} onSelect={handleThemeSelect} />
      )}

      {isCameraOn && (
        <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
          <div className="text-center text-6xl font-semibold mb-2 text-white">Smile for the</div>
          <div className="text-center text-6xl font-semibold mb-8 text-white">camera</div>
          <video
            ref={videoRef}
            autoPlay
            className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>
          <button
            onClick={(e) => {
              e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
              setTimeout(captureImage, 500);
            }}
          //   className="w-[194px] h-[194px] cursor-pointer  absolute top-[73%]"
          // >
          className={`w-[194px] h-[194px] cursor-pointer absolute top-[73%] left-1/2 -translate-x-1/2 ${cameraSettings?.button_roundness || "rounded-full"} transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none ${isPressed ? 'scale-95 opacity-75' : ''}`}
          >
            <img src={camera} alt="Capture" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </button>
        </div>
      )}

      {showScene && (
        <SceneSlider scenes={scenes} onSelect={handleSceneSelection} />
      )}
    </section>
  );
}

export default Camer;