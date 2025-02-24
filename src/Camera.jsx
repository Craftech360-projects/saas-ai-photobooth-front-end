// /* eslint-disable no-dupe-keys */
// // eslint-disable-next-line no-unused-vars
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import female from "/assets/female.png";
// import male from "/assets/male.png";
// import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
// import glamour from "/glamour.png"; // Import the PNG image
// import outerspace from "/outerspace.png"; // Import the PNG image
// import scifi from "/scifi.png"; // Import the PNG image
// import sports from "/sports.png"; // Import the PNG image
// import underwater from "/underwater.png"; // Import the PNG image

// import SceneSlider from "./SceneSlider"; // Import the new component
// import { ThemeSlider } from "./theme-slider"; // Import ThemeSlider

// const imgStyle = {
//   width: "auto", // Keep the width auto to preserve the aspect ratio
//   height: "auto", // Keep the height auto to preserve the aspect ratio
//   maxWidth: "400px", // Increase the max-width for a bigger image
//   maxHeight: "250px", // Increase the max-height for a bigger image
//   objectFit: "contain", // Ensure the image fits within the box without distortion
//   justifyContent: "center",
//   alignItems: "center",
//   cursor: "pointer",
//   border: "5px solid #FFCE00", // Border around the image
// };

// const CaptureButton = styled.button`
//   background-image: url(${captureImageIcon});
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-color: transparent;
//   border: none;
//   width: 270px; /* Adjust width and height according to your image dimensions */
//   height: 100px;
//   cursor: pointer;
//   text-indent: -9999px; /* Hide text visually but keep it for accessibility */
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
//   border-left: 15px solid #53b5ed;
//   border-right: 15px solid #53b5ed;
//   &::placeholder {
//     color: #182060; /* Apply placeholder color */
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
//   border-left: 15px solid #53b5ed;
//   border-right: 15px solid #53b5ed;
//   appearance: none; /* Remove default select box styling */

//   &::placeholder {
//     color: #182060; /* Apply placeholder color */
//   }
// `;
// const backgroundImage = "/Login.png"; // Import the background image

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
//     name: "rahul",
//     email: "rahul@gmail.com",
//     gender: "male",
//   });
//   const [selectedOption, setSelectedOption] = useState(null);
//     const [selectedTheme, setSelectedTheme] = useState(null); // new state
//   const [showScene, setShowScene] = useState(false);
//   const [imageFolder, setImageFolder] = useState(null);

//   const themes = [
//     {
//       id: 1,
//       name: "Glamour",
//       image: glamour,
//     },
//     {
//       id: 2,
//       name: "Outer Space",
//       image: outerspace,
//     },
//     {
//       id: 3,
//       name: "Underwater",
//       image: underwater,
//     },
//     {
//       id: 4,
//       name: "Sci-Fi",
//       image: scifi,
//     },
//     {
//       id: 5,
//       name: "Sports",
//       image: sports,
//     },
//   ];

//   const startProcess = (selectedGender) => {
//     setIsStarted(false);
//     setIsGenderShow(false);
//     setIsGender(selectedGender);
//     setGender(selectedOption);
//     console.log(selectedOption, selectedGender);
//     setSelectedOption(null);
//     // setShowScene(true);  // REMOVE THIS LINE
//     // setImageFolder(`${selectedOption}/${selectedGender}`); // REMOVE THIS LINE
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
//         // Add animation before navigation
//         const section = document.querySelector("section");
//         if (section) {
//           section.classList.add("animate__animated", "animate__fadeOut");
//           setTimeout(() => {
//             navigate("/swap", {
//               state: { sourceImage: blob, userDetails, selectedImage: isImg },
//             });
//           }, 1000); // Adjust timing as needed
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
//     // setIsGender(userDetails.gender)
//     setIsStarted(false);
//     console.log(userDetails, "userDetails");
//   };

//   const handleSelection = (option) => {
//     setSelectedOption(option); // Set the selected option
//   };

//   const handleThemeSelect = (theme) => {
//     setSelectedTheme(theme);
//     setIsGenderShow(false);
//     setShowScene(true);
//     setImageFolder(`${theme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`);
//   };

//   // 'animate__animated animate__bounceOut'
//   const scenes = imageFolder ? [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`, `${imageFolder}/4.png`, `${imageFolder}/5.png`] : [];

//   const handleSceneSelection = (scene) => {
//     setSelectedOption(scene);
//     setIsImg(scene);
//     setIsCameraOn(true);
//     setShowScene(false);
//   };

//   return (
//     <section
//       className="text-center w-screen h-screen"
//       style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//       {/* Start button code  */}
//       {isStarted && (
//         <>
//           <div
//             className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
//           >
//             <StyledInput
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               value={userDetails.name}
//               onChange={handleChange}
//               required
//             />

//             <StyledInput
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={userDetails.email}
//               onChange={handleChange}
//               required
//             />

//             <button
//               onClick={() => setIsGenderShow(true)}
//               className="w-[428px] h-[104px] cursor-pointer border-none text-5xl font-bolder bg-white text-blue-900 transition-colors absolute top-[70%]"
//             >
//               Continue
//             </button>
//           </div>
//         </>
//       )}

//       {/* Gender Selection Code */}
//       {isGenderShow && (
//         <div
//           className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat"
//         >
//           <div
//             className="text-3xl text-white tracking-wide mb-4"
//           >
//             Select Gender
//           </div>

//           <div
//             className="flex flex-col items-center justify-center gap-5 mt-6"
//           >
//             <button
//               className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
//               style={{ backgroundImage: `url(${male})` }}
//               onClick={(e) => {
//                 e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
//                 setTimeout(() => startProcess("male"), 500);
//               }}
//             ></button>

//             <button
//               className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
//               style={{ backgroundImage: `url(${female})` }}
//               onClick={(e) => {
//                 e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
//                 setTimeout(() => startProcess("female"), 500);
//               }}
//             ></button>
//           </div>
//         </div>
//       )}

//       {/* Theme Selection Code */}
//       {isGender && !showScene && (
//         <ThemeSlider themes={themes} onSelect={handleThemeSelect} />
//       )}

//       {/* Camera Capture Code  */}
//       {isCameraOn && (
//         <div
//           className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat"
//         >
//           <video
//             ref={videoRef}
//             autoPlay
//             className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
//           ></video>

//           <canvas ref={canvasRef} className="hidden"></canvas>
//           <button
//             onClick={(e) => {
//               e.target.classList.add("bg-blue-900", "text-white");
//               setTimeout(captureImage, 500);
//             }}
//             className="w-[428px] h-[104px] cursor-pointer border-none text-4xl font-bold bg-white text-blue-900 transition-colors absolute top-[73%]"
//           >
//             Capture{" "}
//           </button>
//         </div>
//       )}

//       {showScene && (
//         <SceneSlider scenes={scenes} onSelect={handleSceneSelection} />
//       )}

  
//     </section>
//   );
// }

// export default Camer;

// almost workig
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import SceneSlider from "./SceneSlider";
// import { ThemeSlider } from "./theme-slider";
// import female from "/assets/female.png";
// import male from "/assets/male.png";
// import captureImageIcon from "/assets/pcp.png";
// import glamour from "/glamour.png";
// import outerspace from "/outerspace.png";
// import scifi from "/scifi.png";
// import sports from "/sports.png";
// import underwater from "/underwater.png";

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
//   border-left: 15px solid #53b5ed;
//   border-right: 15px solid #53b5ed;
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
//   border-left: 15px solid #53b5ed;
//   border-right: 15px solid #53b5ed;
//   appearance: none;
//   &::placeholder {
//     color: #182060;
//   }
// `;

// const backgroundImage = "/Login.png";

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

//   const themes = [
//     { id: 1, name: "Glamour", image: glamour },
//     { id: 2, name: "Outer Space", image: outerspace },
//     { id: 3, name: "Underwater", image: underwater },
//     { id: 4, name: "Sci-Fi", image: scifi },
//     { id: 5, name: "Sports", image: sports },
//   ];

//   const startProcess = (selectedGender) => {
//     console.log(selectedGender);
//     userDetails.gender=selectedGender;
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
//     setSelectedTheme(theme);
//     setIsGenderShow(false);
//     setShowScene(true);
//     setImageFolder(`${theme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`);
//     console.log(imageFolder);
//   };

//   const scenes = imageFolder ? [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`, `${imageFolder}/4.png`, `${imageFolder}/5.png`] : [];

//   const handleSceneSelection = (scene) => {
//     setSelectedOption(scene);
//     setIsImg(scene);
//     setIsCameraOn(true);
//     setShowScene(false);
//   };

//   return (
//     <section
//       className="text-center w-screen h-screen"
//       style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//       {isStarted && (
//         <>
//           <div className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center">
//             <StyledInput
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               value={userDetails.name}
//               onChange={handleChange}
//               required
//             />

//             <StyledInput
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={userDetails.email}
//               onChange={handleChange}
//               required
//             />

//             <button
//               onClick={handleSubmit}
//               className="w-[428px] h-[104px] cursor-pointer border-none text-5xl font-bolder bg-white text-blue-900 transition-colors absolute top-[70%]"
//             >
//               Continue
//             </button>
//           </div>
//         </>
//       )}

//       {isGenderShow && (
//         <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
//           <div className="text-3xl text-white tracking-wide mb-4">Select Gender</div>

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
//               className="rounded-lg bg-cover bg-center bg-no-repeat w-[298px] h-[291px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
//               style={{ backgroundImage: `url(${female})` }}
//               onClick={(e) => {
//                 e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(255,255,255,0.5)]");
//                 setTimeout(() => startProcess("female"), 500);
//               }}
//             ></button>
//           </div>
//         </div>
//       )}

//       {isGender && !showScene && (
//         <ThemeSlider themes={themes} onSelect={handleThemeSelect} />
//       )}

//       {isCameraOn && (
//         <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
//           <video
//             ref={videoRef}
//             autoPlay
//             className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
//           ></video>

//           <canvas ref={canvasRef} className="hidden"></canvas>
//           <button
//             onClick={(e) => {
//               e.target.classList.add("bg-blue-900", "text-white");
//               setTimeout(captureImage, 500);
//             }}
//             className="w-[428px] h-[104px] cursor-pointer border-none text-4xl font-bold bg-white text-blue-900 transition-colors absolute top-[73%]"
//           >
//             Capture
//           </button>
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
import glamour from "/glamour.png";
import outerspace from "/outerspace.png";
import scifi from "/scifi.png";
import sports from "/sports.png";
import underwater from "/underwater.png";

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
    name: "Rahul",
    email: "rahul@gmail.com",
    gender: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showScene, setShowScene] = useState(false);
  const [imageFolder, setImageFolder] = useState(null);
  const [isThemeSelected, setIsThemeSelected] = useState(false); // New state
  const camera= "/camera.png";
  const submit= "/submit.png";
  const themes = [
    { id: 1, name: "Glamour", image: glamour },
    { id: 2, name: "Outer Space", image: outerspace },
    { id: 3, name: "Underwater", image: underwater },
    { id: 4, name: "Sci-Fi", image: scifi },
    { id: 5, name: "Sports", image: sports },
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenderShow(true);
    setIsStarted(false);
    console.log(userDetails, "userDetails");
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
    setImageFolder(`${theme.name.toLowerCase().replace(" ", "")}/${userDetails.gender}`);
    console.log("folder for theme" ,imageFolder);
  };

  const scenes = imageFolder ? [`${imageFolder}/1.png`, `${imageFolder}/2.png`, `${imageFolder}/3.png`, `${imageFolder}/4.png`, `${imageFolder}/5.png`] : [];

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
      >
        <img
          src={submit}
          alt="Submit"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </button>
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
    e.target.classList.add("bg-blue-900");
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