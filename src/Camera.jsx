// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import SceneSlider from "./SceneSlider";
// import captureImageIcon from "/assets/pcp.png";
// import junglesafari from "/junglesafari.png";
// import outerspace from "/outerspace.png";
// import scifi from "/scifi.png";
// import sports from "/sports.png";
// import superheros from "/superheros.png";

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
//   border: 4px solid #FFC462;
//   width: 270px;
//   height: 100px;
//   cursor: pointer;
//   text-indent: -9999px;
//   position: relative;
//   margin-top: 90px;
//   fontFamily: 'Inter, sans-serif'
// `;

// const StyledInput = styled.input`
//   padding-left: 35px;
//   font-size: 34px;
//   border: 4px solid #FFC462;
//   text-align: left;
//   color: #fff;
//   font-weight: semi-bold;
//   width: 760px;
//   height: 110px;
//   text-transform: capitalize;
//   background-color: #000000;
//   fontFamily: 'Inter, sans-serif'
//   &::placeholder {
//     color: #fff;
//   }
// `;

// const StyledSelect = styled.select`
//   padding-left: 35px;
//   font-size: 34px;
//   border: 4px solid #FFC462;
//   text-align: left;
//   color: #fff;
//   font-weight: semi-bold;
//   width: 760px;
//   height: 110px;
//   text-transform: capitalize;
//   background-color: #000000;
//   fontFamily: 'Inter, sans-serif'
//   appearance: none;
//   &::placeholder {
//     color: #fff;
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
//   const [isThemeSelected, setIsThemeSelected] = useState(false); // New state
//   const camera= "/camera.png";
//   const submit= "/submit.png";
//   const themes = [
//     { id: 1, name: "Sci-Fi", image: scifi },
//     { id: 2, name: "Sports", image: sports },
//     { id: 3, name: "Superheros", image: superheros },
//     { id: 4, name: "Outer Space", image: outerspace },
//     { id: 5, name: "junglesafari", image: junglesafari },
   
//   ];

//   const startProcess = () => {
//     setIsStarted(false);
//     setIsGenderShow(false);
//     setIsGender(userDetails.gender);
//     setGender(userDetails.gender);
//     console.log(userDetails.gender);
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
//     startProcess();
//     setIsStarted(false);
//     console.log(userDetails, "userDetails");
//   };

//   // const handleSelection = (option) => {
//   //   setSelectedOption(option);
//   // };

//   const handleSelection = (theme) => { 
//     console.log("htemmmmmmee",theme);
//     setSelectedTheme(theme);
//     setIsThemeSelected(true); // Set theme as selected
//     setIsGenderShow(false);
//     setShowScene(true);
//     setImageFolder(`${theme.toLowerCase().replace(" ", "")}/${userDetails.gender}`);
//     console.log("folder for theme" ,imageFolder);
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
//       style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//     {isStarted && (
//   <>
//     <div
//       className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
//       style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
//       <StyledInput
//         className="border-orange-400 border-4"
//         type="text"
//         name="name"
//         placeholder="Enter name"
//         value={userDetails.name}
//         onChange={handleChange}
//         required
//         style={{ fontFamily: 'Oswald, sans-serif' }}
//       />
     
//       <StyledInput
//        className="border-orange-400 border-4"
//         type="email"
//         name="email"
//         placeholder="Enter email"
//         value={userDetails.email}
//         onChange={handleChange}
//         required
//         style={{ fontFamily: 'Oswald, sans-serif' }}
//       />
//        <StyledSelect
//         className="border-orange-400 border-4"
//               name="gender"
//               value={userDetails.gender}
//               onChange={handleChange}
//               required
//               style={{ fontFamily: 'Oswald, sans-serif' }}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </StyledSelect>

//       <button
//         onClick={handleSubmit}
//         className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[65%]"
//       >
//         <img
//           src={submit}
//           alt="Submit"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//         />
//       </button>
//     </div>
//   </>
// )}

    

//       {/* Show ThemeSlider only if theme is not selected and showScene is false */}
//       {isGender && !isThemeSelected && !showScene && (
           
//                 <div
//                   style={{
//                     textAlign: "center",
//                     width: "100vw",
//                     height: "100vh",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
              
//                   <h1  style={{ fontFamily: 'Oswald, sans-serif' } } className="mb-8 semi-bold text-white font-sans text-6xl">Select your theme</h1>
//                     {/* style={{ 
                      
//                       textAlign: "center",
//                       fontSize: "48px",
//                       letterSpacing: "3px",
//                       color: "#fff",
//                     }}
//                   >
//                     Select the theme
//                   </h1> */}
//                   <div
//                     style={{
//                       textAlign: "center",
//                       width: "100vw",
//                       height: "350px",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <button
//                       style={{
//                         margin: "10px",
//                         backgroundImage: `url(${superheros})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         width: "240px",
//                         height: "320px",
//                         border: "none",
//                         cursor: "pointer",
//                         backgroundColor: "transparent",
//                         transition: "border 0.3s ease",
//                         boxSizing: "border-box",
//                         boxShadow:
//                           selectedOption === "superheros"
//                             ? "0px 0px 19px 16px #3A49D4"
//                             : "none", // Shadow when selected
//                       }}
//                       onClick={() => handleSelection("superheros")}
//                     ></button>
        
//                     <button
//                       style={{
//                         margin: "10px",
//                         backgroundImage: `url(${outerspace})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         width: "240px",
//                         height: "320px",
//                         border: "none",
//                         cursor: "pointer",
//                         backgroundColor: "transparent",
//                         transition: "border 0.3s ease",
//                         boxSizing: "border-box",
//                         boxShadow:
//                           selectedOption === "outerspace"
//                             ? "0px 0px 19px 16px #3A49D4"
//                             : "none", // Shadow when selected
//                       }}
//                       onClick={() => handleSelection("outerspace")}
//                     ></button>
        
//                     <button
//                       style={{
//                         margin: "10px",
//                         backgroundImage: `url(${junglesafari})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         width: "240px",
//                         height: "320px",
//                         border: "none",
//                         cursor: "pointer",
//                         backgroundColor: "transparent",
//                         transition: "border 0.3s ease",
//                         boxSizing: "border-box",
//                         boxShadow:
//                           selectedOption === "junglesafari"
//                             ? "0px 0px 19px 16px #3A49D4"
//                             : "none", // Shadow when selected
//                       }}
//                       onClick={() => handleSelection("junglesafari")}
//                     ></button>
        
//                     {/* Show the continue button only if an option is selected */}
//                     {selectedOption && isGenderShow && (
//                       <button
//                         type="submit"
//                         style={{
//                           width: "286px",
//                           height: "80px",
//                           cursor: "pointer",
//                           border: "none",
//                           fontSize: "45px",
//                           fontWeight: "bold",
//                           backgroundColor: "#FFF",
//                           color: "#002992",
//                           transition: "background-color 0.3s ease, color 0.3s ease",
//                           position: "absolute",
//                           top: "77%",
//                         }}
//                         onClick={() => startProcess()}
//                       >
//                         Next
//                       </button>
//                     )}
//                   </div>
//                   <div
//                     style={{
//                       width: "100vw",
//                       height: "350px",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <button
//                       style={{
//                         margin: "10px",
//                         backgroundImage: `url(${scifi})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         width: "240px",
//                         height: "320px",
//                         border: "none",
//                         cursor: "pointer",
//                         backgroundColor: "transparent",
//                         transition: "border 0.3s ease",
//                         boxSizing: "border-box",
//                         boxShadow:
//                           selectedOption === "scifi"
//                             ? "0px 0px 19px 16px #3A49D4"
//                             : "none", // Shadow when selected
//                       }}
//                       onClick={() => handleSelection("scifi")}
//                     ></button>
        
//                     <button
//                       style={{
//                         margin: "10px",
//                         backgroundImage: `url(${sports})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         width: "240px",
//                         height: "320px",
//                         border: "none",
//                         cursor: "pointer",
//                         backgroundColor: "transparent",
//                         transition: "border 0.3s ease",
//                         boxSizing: "border-box",
//                         boxShadow:
//                           selectedOption === "sports"
//                             ? "0px 0px 19px 16px #3A49D4"
//                             : "none", // Shadow when selected
//                       }}
//                       onClick={() => handleSelection("sports")}
//                     ></button>
//                   </div>
//                 </div>
              
        
//                     )
//       }

//       {isCameraOn && (
//         <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
//           <div className="text-center text-6xl font-semibold mb-6  text-white"   style={{ fontFamily: 'Oswald, sans-serif' }}>Strike a Pose</div>
          
//           <video
//             ref={videoRef}
//             autoPlay
//             className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
//           ></video>

//           <canvas ref={canvasRef} className="hidden"></canvas>
        
// <button
//   onClick={(e) => {
//     const button = e.currentTarget;
//     if (!button) return; // Prevent error if button is null

//     button.classList.add("scale-95");
    
//     setTimeout(() => {
//       if (button) button.classList.remove("scale-95");
//       captureImage();
//     }, 500);
//   }}
//   className="w-[365px] h-[102px] cursor-pointer absolute top-[73%] transition transform active:scale-95"
// >
//   <img
//     src={camera}
//     alt="Capture"
//     style={{ width: "100%", height: "100%", objectFit: "contain" }}
//   />
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
import captureImageIcon from "/assets/pcp.png";
import junglesafari from "/junglesafari.png";
import outerspace from "/outerspace.png";
import scifi from "/scifi.png";
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

const StyledSelect = styled.select`
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
  appearance: none;
  opacity: 0.5;
  &::placeholder {
    color: #fff;
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
  const [errors, setErrors] = useState({}); // State to track errors
  const camera= "/camera.png";
  const submit= "/submit.png";
  const themes = [
    { id: 1, name: "Sci-Fi", image: scifi },
    { id: 2, name: "Sports", image: sports },
    { id: 3, name: "Superheros", image: superheros },
    { id: 4, name: "Outer Space", image: outerspace },
    { id: 5, name: "junglesafari", image: junglesafari },
   
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.name) newErrors.name = "Name is required";
    if (!userDetails.email) newErrors.email = "Email is required";
    if (!userDetails.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startProcess = () => {
    if (!validateForm()) return;
    setIsStarted(false);
    setIsGenderShow(false);
    setIsGender(userDetails.gender);
    setGender(userDetails.gender);
    console.log(userDetails.gender);
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
    if (!validateForm()) return;
    startProcess();
    setIsStarted(false);
    console.log(userDetails, "userDetails");
  };

  const handleSelection = (theme) => { 
    console.log("htemmmmmmee",theme);
    setSelectedTheme(theme);
    setIsThemeSelected(true); // Set theme as selected
    setIsGenderShow(false);
    setShowScene(true);
    setImageFolder(`${theme.toLowerCase().replace(" ", "")}/${userDetails.gender}`);
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
        className="border-orange-400 border-4"
        type="text"
        name="name"
        placeholder="Enter name"
        value={userDetails.name}
        onChange={handleChange}
        required
        style={{ fontFamily: 'Oswald, sans-serif' }}
      />
      {errors.name && <p className="text-red-500 text-2xl">{errors.name}</p>}
     
      <StyledInput
       className="border-orange-400 border-4"
        type="email"
        name="email"
        placeholder="Enter email"
        value={userDetails.email}
        onChange={handleChange}
        required
        style={{ fontFamily: 'Oswald, sans-serif' }}
      />
      {errors.email && <p className="text-red-500 text-2xl">{errors.email}</p>}
       {/* <StyledSelect
        className="border-orange-400 border-4"
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
              required
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </StyledSelect> */}

<StyledSelect
  className="border-orange-400 border-4 bg-white bg-opacity-70"
  name="gender"
  value={userDetails.gender}
  onChange={handleChange}
  required
  style={{ fontFamily: 'Oswald, sans-serif', opacity: 0.8 }}
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</StyledSelect>

            {errors.gender && <p className="text-red-500 text-2xl">{errors.gender}</p>}

      <button
        onClick={handleSubmit}
        className="w-[428px] h-[104px] cursor-pointer border-none transition-colors absolute top-[65%]"
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

    

      {/* Show ThemeSlider only if theme is not selected and showScene is false */}
      {isGender && !isThemeSelected && !showScene && (
           
                <div
                  style={{
                    textAlign: "center",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
              
                  <h1  style={{ fontFamily: 'Oswald, sans-serif' } } className="mb-8 semi-bold text-white font-sans text-6xl">Select your theme</h1>
                    {/* style={{ 
                      
                      textAlign: "center",
                      fontSize: "48px",
                      letterSpacing: "3px",
                      color: "#fff",
                    }}
                  >
                    Select the theme
                  </h1> */}
                  <div
                    style={{
                      textAlign: "center",
                      width: "100vw",
                      height: "350px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        margin: "10px",
                        backgroundImage: `url(${superheros})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "240px",
                        height: "320px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "border 0.3s ease",
                        boxSizing: "border-box",
                        boxShadow:
                          selectedOption === "superheros"
                            ? "0px 0px 19px 16px #3A49D4"
                            : "none", // Shadow when selected
                      }}
                      onClick={() => handleSelection("superheros")}
                    ></button>
        
                    <button
                      style={{
                        margin: "10px",
                        backgroundImage: `url(${outerspace})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "240px",
                        height: "320px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "border 0.3s ease",
                        boxSizing: "border-box",
                        boxShadow:
                          selectedOption === "outerspace"
                            ? "0px 0px 19px 16px #3A49D4"
                            : "none", // Shadow when selected
                      }}
                      onClick={() => handleSelection("outerspace")}
                    ></button>
        
                    <button
                      style={{
                        margin: "10px",
                        backgroundImage: `url(${junglesafari})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "240px",
                        height: "320px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "border 0.3s ease",
                        boxSizing: "border-box",
                        boxShadow:
                          selectedOption === "junglesafari"
                            ? "0px 0px 19px 16px #3A49D4"
                            : "none", // Shadow when selected
                      }}
                      onClick={() => handleSelection("junglesafari")}
                    ></button>
        
                    {/* Show the continue button only if an option is selected */}
                    {selectedOption && isGenderShow && (
                      <button
                        type="submit"
                        style={{
                          width: "286px",
                          height: "80px",
                          cursor: "pointer",
                          border: "none",
                          fontSize: "45px",
                          fontWeight: "bold",
                          backgroundColor: "#FFF",
                          color: "#002992",
                          transition: "background-color 0.3s ease, color 0.3s ease",
                          position: "absolute",
                          top: "77%",
                        }}
                        onClick={() => startProcess()}
                      >
                        Next
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      width: "100vw",
                      height: "350px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        margin: "10px",
                        backgroundImage: `url(${scifi})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "240px",
                        height: "320px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "border 0.3s ease",
                        boxSizing: "border-box",
                        boxShadow:
                          selectedOption === "scifi"
                            ? "0px 0px 19px 16px #3A49D4"
                            : "none", // Shadow when selected
                      }}
                      onClick={() => handleSelection("scifi")}
                    ></button>
        
                    <button
                      style={{
                        margin: "10px",
                        backgroundImage: `url(${sports})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "240px",
                        height: "320px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        transition: "border 0.3s ease",
                        boxSizing: "border-box",
                        boxShadow:
                          selectedOption === "sports"
                            ? "0px 0px 19px 16px #3A49D4"
                            : "none", // Shadow when selected
                      }}
                      onClick={() => handleSelection("sports")}
                    ></button>
                  </div>
                </div>
              
        
                    )
      }

      {isCameraOn && (
        <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
          <div className="text-center text-6xl font-semibold mb-48   text-white"   style={{ fontFamily: 'Oswald, sans-serif' }}>Strike a Pose</div>
          
          <video
            ref={videoRef}
            autoPlay
            className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>
        
<button
  onClick={(e) => {
    const button = e.currentTarget;
    if (!button) return; // Prevent error if button is null

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

      {showScene && (
        <SceneSlider scenes={scenes} onSelect={handleSceneSelection} />
      )}
    </section>
  );
}

export default Camer;