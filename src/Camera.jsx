


// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import SceneSlider from "./SceneSlider";
// import { ThemeSlider } from "./theme-slider";
// import female from "/assets/female.png";
// import male from "/assets/male.png";
// import captureImageIcon from "/assets/pcp.png";
// import outerspace from "/outerspace.png";
// import redcarpet from "/redcarpet.png";
// // import scifi from "/scifi.png";
// // import sports from "/sports.png";
// import Futuristic from "/Futuristic.png";

// const imgStyle = {
//   width: "auto",
//   height: "auto",
//   maxWidth: "400px",
//   maxHeight: "250px",
//   objectFit: "contain",
//   justifyContent: "center",
//   alignItems: "center",
//   cursor: "pointer",
//   border: "5px solid #FFCE00",
// };

// const CaptureButton = styled.button`
//   background-image: url(${captureImageIcon});
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-color: transparent;
//   border: none;
//   width: 270px;
//   height: 100px;
//   cursor: pointer;
//   text-indent: -9999px;
//   position: relative;
//   margin-top: 90px;
// `;

// const StyledInput = styled.input`
//   padding-left: 35px;
//   font-size: 34px;
//   border: none;
//   text-align: left;
//   color: #182060;
//   font-weight: bold;
//   width: 760px;
//   height: 110px;
//   text-transform: capitalize;
//   background-color: #fff;
  
//   &::placeholder {
//     color: #182060;
//   }
// `;

// const StyledSelect = styled.select`
//   padding-left: 35px;
//   font-size: 34px;
//   border: none;
//   text-align: left;
//   color: #182060;
//   font-weight: bold;
//   width: 830px;
//   height: 110px;
//   text-transform: capitalize;
//   background-color: #fff;

//   appearance: none;
//   &::placeholder {
//     color: #182060;
//   }
// `;

// //const backgroundImage = "/Login.png";
// const backgroundImage = "/background2.jpg";
// function Camer() {
//   const maleImages = ["male1", "male1"];
//   const femaleImages = ["female1", "female1"];
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const navigate = useNavigate();
//   const [flash, setFlash] = useState(false);
//   const [gender, setGender] = useState(null);
//   const [isGender, setIsGender] = useState("");
//   const [isStarted, setIsStarted] = useState(true);
//   const [isGenderShow, setIsGenderShow] = useState(false);
//   const [isOptions, setIsOptions] = useState(false);
//   const [isImg, setIsImg] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     gender: "",
//   });
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedTheme, setSelectedTheme] = useState(null);
//   const [showScene, setShowScene] = useState(false);
//   const [imageFolder, setImageFolder] = useState(null);
//   const [isThemeSelected, setIsThemeSelected] = useState(false); 
//   const [showWarning, setShowWarning] = useState(false); 
//   // New state
//   const camera= "/camera.png";
//   const submit= "/submit.png";
//   const themes = [
//     { id: 1, name: "Red Carpet", image: redcarpet },
//     { id: 2, name: "Outer Space", image: outerspace },
//     { id: 3, name: "Futuristic", image: Futuristic },
//     // { id: 4, name: "Sci-Fi", image: scifi },
//     // { id: 5, name: "Sports", image: sports },
//   ];

//   const startProcess = (selectedGender) => {
//     console.log(selectedGender);
//     userDetails.gender = selectedGender;
//     setIsStarted(false);
//     setIsGenderShow(false);
//     setIsGender(selectedGender);
//     setGender(selectedOption);
//     console.log(selectedOption, selectedGender);
//     setSelectedOption(null);
//   };

//   useEffect(() => {
//     if (isCameraOn) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => {
//           console.error("error:", err);
//           setIsCameraOn(false);
//         });
//     } else {
//       if (videoRef.current && videoRef.current.srcObject) {
//         let tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     }

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         let tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, [isCameraOn]);

//   const captureImage = () => {
//     setTimeout(() => {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       const video = videoRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       canvas.toBlob((blob) => {
//         const section = document.querySelector("section");
//         if (section) {
//           section.classList.add("animate__animated", "animate__fadeOut");
//           console.log(">>>>>>>>",blob, userDetails, isImg);
//           setTimeout(() => {
//             navigate("/swap", {
//               state: { sourceImage: blob, userDetails, selectedImage: isImg },
//             });
//           }, 1000);
//           console.log(isImg, userDetails);
//         }
//       }, "image/jpeg");
//     }, 500);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsGenderShow(true);
//     setIsStarted(false);
//     console.log(userDetails, "userDetails");
//   };

//   const handleSelection = (option) => {
//     setSelectedOption(option);
//   };

//   const handleThemeSelect = (theme) => { 
//     console.log("htemmmmmmee",theme);
//     setSelectedTheme(theme);
//     setIsThemeSelected(true); // Set theme as selected
//     setIsGenderShow(false);
//     setShowScene(true);
//     console.log(`theeme, ${theme.name.toLowerCase().replace(" ", "")}`);
    
//        setImageFolder(`${theme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`);

//     console.log("folder for theme" ,imageFolder);
//   };

//   const scenes = imageFolder ? [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`] : [];

//   const handleSceneSelection = (scene) => {
//     setSelectedOption(scene);
//     setIsImg(scene);
//     setIsCameraOn(true);
//     setShowScene(false);
//   };

//   return (
//     <section
//       className="text-center w-screen h-screen"
//       style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//     {isStarted && (
//   <>
//     <div
//       className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
//       style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//       <StyledInput
//         type="text"
//         name="name"
//         placeholder="Enter name"
//         value={userDetails.name}
//         onChange={handleChange}
//         required
//       />

//       <StyledInput
//         type="email"
//         name="email"
//         placeholder="Enter email"
//         value={userDetails.email}
//         onChange={handleChange}
//         required
//       />

//       {/* <button
//         onClick={handleSubmit}
//         className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[60%]"
//       >
//         <img
//           src={submit}
//           alt="Submit"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//         />
//       </button> */}

// <button
//   onClick={handleSubmit}
//   className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[60%]"
//   disabled={!userDetails.name || !userDetails.email} // Disable button if name or email is empty
// >
//   <img
//     src={submit}
//     alt="Submit"
//     style={{ width: "100%", height: "100%", objectFit: "contain" }}
//   />
// </button>
//     </div>
//   </>
// )}

//       {isGenderShow && (
//         <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
//           <div className="text-6xl font-semibold text-white tracking-wide mb-4">Select Gender</div>

//           <div className="flex flex-col items-center justify-center gap-5 mt-6">
//             <button
//               className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
//               style={{ backgroundImage: `url(${male})` }}
//               onClick={(e) => {
//                 e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
//                 setTimeout(() => startProcess("male"), 500);
//               }}
//             ></button>

//             <button
//               className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] mt-5 h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
//               style={{ backgroundImage: `url(${female})` }}
//               onClick={(e) => {
//                 e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
//                 setTimeout(() => startProcess("female"), 500);
//               }}
//             ></button>
//           </div>
//         </div>
//       )}

//       {/* Show ThemeSlider only if theme is not selected and showScene is false */}
//       {isGender && !isThemeSelected && !showScene && (
//         <ThemeSlider themes={themes} onSelect={handleThemeSelect} />
//       )}

//       {isCameraOn && (
//         <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
//           <div className="text-center text-6xl font-semibold mb-2 text-white">Smile for the</div>
//           <div className="text-center text-6xl font-semibold mb-8 text-white">camera</div>
//           <video
//             ref={videoRef}
//             autoPlay
//             className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
//           ></video>

//           <canvas ref={canvasRef} className="hidden"></canvas>
//           <button
//   onClick={(e) => {
  
//     setTimeout(captureImage, 500);
//   }}
//   className="w-[194px] h-[194px] cursor-pointer  absolute top-[73%]"
// >
//   <img src={camera} alt="Capture" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
// </button>
//         </div>
//       )}

//       {showScene && (
//         <SceneSlider scenes={scenes} onSelect={handleSceneSelection} />
//       )}
//     </section>
//   );
// }

// export default Camer;



import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SceneSlider from "./SceneSlider";
import { ThemeSlider } from "./theme-slider";
import female from "/assets/female.png";
import male from "/assets/male.png";
import captureImageIcon from "/assets/pcp.png";
import outerspace from "/outerspace.png";
import redcarpet from "/redcarpet.png";
// import scifi from "/scifi.png";
// import sports from "/sports.png";
import Futuristic from "/Futuristic.png";

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

  appearance: none;
  &::placeholder {
    color: #182060;
  }
`;

//const backgroundImage = "/Login.png";
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
    name: "",
    email: "",
    gender: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showScene, setShowScene] = useState(false);
  const [imageFolder, setImageFolder] = useState(null);
  const [isThemeSelected, setIsThemeSelected] = useState(false); // New state
  const [showWarning, setShowWarning] = useState(false); // New state for warning message
  const camera= "/camera.png";
  const submit= "/submit.png";
  const themes = [
    { id: 1, name: "Red Carpet", image: redcarpet },
    { id: 2, name: "Outer Space", image: outerspace },
    { id: 3, name: "Futuristic", image: Futuristic },
    // { id: 4, name: "Sci-Fi", image: scifi },
    // { id: 5, name: "Sports", image: sports },
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
              state: { sourceImage: blob, userDetails, selectedImage: isImg },
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
    setShowWarning(false); // Hide warning message when user starts typing
  };

  const handleSubmit = (e) => {
    console.log("here")
    e.preventDefault();
    if (!userDetails.name || !userDetails.email) {
      setShowWarning(true); // Show warning message if name or email is empty
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
      <StyledInput
        type="text"
        name="name"
        placeholder="Enter name"
        value={userDetails.name}
        onChange={handleChange}
        required
      />

      <StyledInput
        type="email"
        name="email"
        placeholder="Enter email"
        value={userDetails.email}
        onChange={handleChange}
        required
      />

      <button
        onClick={handleSubmit}
        className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[60%]"
        // Disable button if name or email is empty
      >
        <img
          src={submit}
          alt="Submit"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </button>

      {showWarning && (
        <div className="text-red-500 text-4xl mt-4">Please enter both name and email.</div>
      )}
    </div>
  </>
)}

      {isGenderShow && (
        <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
          <div className="text-6xl font-semibold text-white tracking-wide mb-4">Select Gender</div>

          <div className="flex flex-col items-center justify-center gap-5 mt-6">
            <button
              className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${male})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
                setTimeout(() => startProcess("male"), 500);
              }}
            ></button>

            <button
              className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] mt-5 h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${female})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
                setTimeout(() => startProcess("female"), 500);
              }}
            ></button>
          </div>
        </div>
      )}

      {/* Show ThemeSlider only if theme is not selected and showScene is false */}
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
              setTimeout(captureImage, 500);
            }}
            className="w-[194px] h-[194px] cursor-pointer  absolute top-[73%]"
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