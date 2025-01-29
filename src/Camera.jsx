// /* eslint-disable no-dupe-keys */
// // eslint-disable-next-line no-unused-vars
// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
// import one from "/assets/one.png";
// import two from "/assets/two.png";
// import male from "/assets/male.png";
// import female from "/assets/female.png";
// import buttonBg from "/assets/startbg.png";
// import f1 from "/space.png";
// import f2 from "/cyberpunk.png";
// import f3 from "/retro.png";
// import f4 from "/neon.png";

// import m1 from "/spacem1.png";
// import m2 from "/cyberm2.png";
// import m3 from "/retrom3.png";
// import m4 from "/neonm4.png";


// const imgStyle = {
//   width: "666px",
//   height: "997px",
//   objectFit: "contain",
//   justifyContent: "center",
//   alignItems: "center",
//   // border: '5px solid #fff',
//   cursor: "pointer",
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
// function Camer() {
//   const maleAvatars = ["m1", "m2", "m3", "m4"];
//   const femaleAvatars = ["f1", "f2", "f3", "f4"];
//   const [index, setIndex] = useState(0);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const navigate = useNavigate();
//   const [flash, setFlash] = useState(false);
//   const [gender, setGender] = useState(null);
//   const [isGender, setIsGender] = useState("");
//   const [isStarted, setIsStarted] = useState(true);
//   const [isGenderShow, setIsGenderShow] = useState(true);
//   const [isOptions, setIsOptions] = useState(false);
//   const [isImg, setIsImg] = useState(false);
//   const [userDetails, setUserDetails] = useState({ name: "", email: "" });
//   const getRandomImage = (images) => {
//     return images[Math.floor(Math.random() * images.length)];
//   };

//   const startProcess = (value) => {
//     setIsStarted(false);
//     setIsGenderShow(false);
//     setIsGender(value);
//     // setIsCameraOn(true);
//     // const selectedImg =
//     //   value === "male"
//     //     ? getRandomImage(maleImages)
//     //     : getRandomImage(femaleImages);
//     setGender(value);
//   };

//   const handleAvatarClick = (avatar) => {
//     console.log(avatar);
//     setSelectedAvatar(avatar);
//   };

//   const goToSwap = () => {
//     navigate("/swap", { state: { selectedAvatar } });
//   };


//   const AvatarContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   height: 100vh;
//   background-color: #000;
// `;

//   const AvatarWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 300px;
//   height: 400px;
//   position: relative;
//   overflow: hidden;
// `;

//   const AvatarImage = styled.img`
//   width: 100%;
//   height: auto;
//   position: absolute;
//   transition: transform 0.5s ease-in-out, opacity 0.5s;
//   opacity: ${({ active }) => (active ? 1 : 0)};
//   transform: ${({ active }) => (active ? "scale(1) translateX(0)" : "scale(0.8) translateX(100%)")};
// `;
//   const NextButton = styled.button`
//   background-color: #30A6EC;
//   border: none;
//   color: white;
//   font-size: 18px;
//   font-weight: bold;
//   padding: 12px 24px;
//   border-radius: 10px;
//   cursor: pointer;
//   margin-top: 20px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #1C78B1;
//   }
// `;
//   const NavButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 2rem;
//   color: white;
//   cursor: pointer;
//   padding: 10px;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 10;
//   ${({ left }) => (left ? "left: 20px;" : "right: 20px;")}
// `;

//   const GenderSelectionContainer = styled.div`
//   text-align: center;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: center;
// `;

//   const GenderButton = styled.button`
//   border-radius: 10px;
//   background-size: cover;
//   background-position: center;
//   width: 298px;
//   height: 291px;
//   border: none;
//   cursor: pointer;
//   background-color: transparent;
//   margin: 0 20px;
//   transition: box-shadow 0.3s ease;

//   &:hover {
//     box-shadow: 0px 0px 19px 16px rgba(255,255,255,0.5);
//   }
// `;

//   const CaptureButton = styled.button`
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

//   // Avatar Selection Component
//   const AvatarSelection = ({ isGender }) => {
//     const maleAvatars = [m1, m2, m3, m4];
//     const femaleAvatars = [f1, f2, f3, f4];
//     const [index, setIndex] = useState(0);

//     const avatars = isGender === "male" ? maleAvatars : femaleAvatars;
//     const totalAvatars = avatars.length;

//     const nextAvatar = () => {
//       setIndex((prevIndex) => (prevIndex + 1) % totalAvatars);
//     };

//     const prevAvatar = () => {
//       setIndex((prevIndex) => (prevIndex - 1 + totalAvatars) % totalAvatars);
//     };

//     return (
//       <AvatarContainer>
//         <NavButton left onClick={prevAvatar}>❮</NavButton>

//         <AvatarWrapper>
//           {avatars.map((avatar, i) => (
//             <AvatarImage
//               key={i}
//               src={avatar}
//               alt={`Avatar ${i + 1}`}
//               active={i === index}
//               onClick={() => handleAvatarClick(avatar)}
//             />
//           ))}
//         </AvatarWrapper>

//         <NavButton onClick={nextAvatar}>❯</NavButton>

//         {selectedAvatar && <NextButton onClick={goToSwap}>Next</NextButton>}
//       </AvatarContainer>
//     );
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
//           section.classList.add("animate__animated", "animate__bounceOut");
//           setTimeout(() => {
//             navigate("/swap", {
//               state: { sourceImage: blob, isImg, userDetails },
//             });
//           }, 1000); // Adjust timing as needed
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
//   // 'animate__animated animate__bounceOut'
//   return (
//     <section
//       style={{
//         textAlign: "center",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       {/* Start button code  */}
//       {isStarted && (

//         <>
//           <style>
//             {`
//         input::placeholder {
//           color: #9A9A9A; /* Placeholder text color */
//           font-weight: bold;
//         }

//         input {
//           outline: none;
//         }

//         button:hover {
//           background-color: #2A3AB5; /* Hover background color */
//           color: #E6E6E6; /* Hover text color */
//         }
//       `}
//           </style>

//         </>
//       )}

//       {/* Gender Selcet Code  */}
//       {isGenderShow && (
//         <div
//           style={{
//             textAlign: "center",
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             // backgroundImage: `url(${two})`,
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               height: "720px",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//           >
//             <button
//               style={{
//                 borderRadius: "10px",
//                 backgroundImage: `url(${male})`,
//                 backgroundSize: "cover", // Ensure the image covers the button entirely
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 width: "298px",
//                 height: "291px",
//                 border: "none", // Start with no border
//                 cursor: "pointer",
//                 backgroundColor: "transparent", // Transparent to show background image
//                 transition: "border 0.3s ease", // Smooth border transition
//                 boxSizing: "border-box",
//                 marginRight: "20px", // Ensures the border is included in the button's size
//               }}
//               onClick={(e) => {
//                 // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)";
//                 setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
//               }}
//             ></button>

//             <button
//               style={{
//                 borderRadius: "10px",
//                 backgroundImage: `url(${female})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 width: "298px",
//                 height: "291px",
//                 border: "none",
//                 cursor: "pointer", // Show pointer cursor on hover
//                 backgroundColor: "transparent",
//                 transition: "border 0.3s ease", // Smooth border transition
//                 boxSizing: "border-box", // Ensures the border is included in the button's size
//                 marginLeft: "20px",
//               }}
//               onClick={(e) => {
//                 // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)";
//                 setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
//               }}
//             ></button>
//           </div>
//         </div>
//       )}
//       {isCameraOn && (
//         <div
//           style={{
//             textAlign: "center",
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <video
//             ref={videoRef}
//             autoPlay
//             style={{
//               display: "block",
//               boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0, 0.5)" : "none",
//               objectFit: "cover", // Ensures the video fills the container while maintaining aspect ratio
//               width: "100%", // Makes the video responsive
//               height: "100%", // Fills the parent container
//               maxWidth: "950px", // Restrict maximum width for better control
//               maxHeight: "500px", // Restrict maximum height for better control
//             }}
//           ></video>

//           <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//           <button
//             style={{
//               width: "250px",
//               height: "80px",
//               cursor: "pointer",
//               // borderRadius: "10px",
//               border: "none",
//               fontSize: "40px",
//               fontWeight: "bold",
//               backgroundColor: "#3A49D4", // Default color
//               color: "#fff", // Default text color
//               transition: "background-color 0.3s ease, color 0.3s ease",
//               position: "absolute",
//               top: "80%",
//             }}
//             onClick={(e) => {
//               e.target.style.backgroundColor = "#3A49D0"; // Change background
//               e.target.style.color = "#ffffff"; // Change text color
//               setTimeout(captureImage, 500); // Correctly invoke captureImage after 500ms
//             }}
//           >
//             Capture
//           </button>
//         </div>
//       )}
//       {/* Options Selcet Code  */}
//       {isOptions && (
//         <div
//           style={{
//             textAlign: "center",
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             // backgroundImage: `url(${two})`,
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <img
//             src={two}
//             alt=""
//             style={{
//               width: "100%",
//               position: "absolute",
//               zIndex: "-100",
//             }}
//           />
//           <div
//             style={{
//               width: "100%",
//               height: "720px",
//               display: "flex",
//               justifyContent: "flex-start",
//             }}
//           >
//             <button
//               style={{
//                 borderRadius: "10px",
//                 backgroundImage: `url(${male})`,
//                 backgroundSize: "cover", // Ensure the image covers the button entirely
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 width: "293px",
//                 height: "358px",
//                 border: "none", // Start with no border
//                 cursor: "pointer",
//                 backgroundColor: "transparent", // Transparent to show background image
//                 transition: "border 0.3s ease", // Smooth border transition
//                 boxSizing: "border-box",
//                 marginRight: "80px", // Ensures the border is included in the button's size
//                 marginLeft: "165px", // Ensures the border is included in the button's size
//               }}
//               onClick={(e) => {
//                 e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
//                 setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
//               }}
//             ></button>

//             <button
//               style={{
//                 borderRadius: "10px",
//                 backgroundImage: `url(${female})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 width: "293px", // Adjust width as needed
//                 height: "358px", // Adjust height as needed
//                 border: "none",
//                 cursor: "pointer", // Show pointer cursor on hover
//                 backgroundColor: "transparent",
//                 transition: "border 0.3s ease", // Smooth border transition
//                 boxSizing: "border-box", // Ensures the border is included in the button's size
//               }}
//               onClick={(e) => {
//                 e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
//                 setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
//               }}
//             ></button>
//           </div>
//         </div>
//       )}

//       {/* Camera Capture Code  */}

//       {isGender === "male" && (
//         <section style={{ textAlign: "center", width: "100vw", height: "100vh" }}>
//           {/* Gender Selection UI */}
//           {isGenderShow && (
//             <GenderSelectionContainer>
//               <div style={{ width: "100%", height: "720px", display: "flex", justifyContent: "center" }}>
//                 <GenderButton style={{ backgroundImage: `url(${male})` }} onClick={() => setTimeout(() => startProcess("male"), 500)}></GenderButton>
//                 <GenderButton style={{ backgroundImage: `url(${female})` }} onClick={() => setTimeout(() => startProcess("female"), 500)}></GenderButton>
//               </div>
//             </GenderSelectionContainer>
//           )}

//           {/* Avatar Selection UI (Only appears after gender is selected) */}
//           {isGender && <AvatarSelection isGender={isGender} />}
//         </section>
//       )}

//       {isGender === "female" && (
//         <section style={{ textAlign: "center", width: "100vw", height: "100vh" }}>
//           {/* Gender Selection UI */}
//           {isGenderShow && (
//             <GenderSelectionContainer>
//               <div style={{ width: "100%", height: "720px", display: "flex", justifyContent: "center" }}>
//                 <GenderButton style={{ backgroundImage: `url(${male})` }} onClick={() => setTimeout(() => startProcess("male"), 500)}></GenderButton>
//                 <GenderButton style={{ backgroundImage: `url(${female})` }} onClick={() => setTimeout(() => startProcess("female"), 500)}></GenderButton>
//               </div>
//             </GenderSelectionContainer>
//           )}

//           {/* Avatar Selection UI (Only appears after gender is selected) */}
//           {isGender && <AvatarSelection isGender={isGender} />}
//         </section>
//       )}
//     </section>
//   );
// }

// export default Camer;


// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import male from "/male.png";
import female from "/female.png";
import f1 from "/spacef.png";
import f2 from "/cyberf.png";
import f3 from "/retrof.png";
import f4 from "/neonf.png";
import m1 from "/spacem.png";
import m2 from "/cyberm.png";
import m3 from "/retrom.png";
import m4 from "/neonm.png";
import bg from "/bg.png";

// Styled Components
const GenderSelectionContainer = styled.div`
    text-align: center;

    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 106px;
    align-items: center;
`;

const GenderButton = styled.button`
  border-radius: 10px;
  background-size: cover;
  background-position: center;
    width: 393px;
    height: 471px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin: 0 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 19px 16px rgba(255, 255, 255, 0.5);
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background-color: #000;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  transition: transform 0.5s ease-in-out, opacity 0.5s;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) =>
    active ? "scale(1) translateX(0)" : "scale(0.8) translateX(100%)"};
`;

const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 270px;
  height: 100px;
  cursor: pointer;
  margin-top: 90px;
`;

const NextButton = styled.button`
  background-color: #30a6ec;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c78b1;
  }
`;

function Camer() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isGender, setIsGender] = useState(null);
  const [isAvatarSelection, setIsAvatarSelection] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start Camera
  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Camera error:", err);
          setIsCameraOn(false);
        });
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  // Capture Image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    canvas.toBlob((blob) => {
      setCapturedImage(blob);
      setIsCameraOn(false);
      setIsAvatarSelection(true); // Move to Avatar Selection
    }, "image/jpeg");
  };




  const AvatarSelection = () => {
    const maleAvatars = [m1, m2, m3, m4];
    const femaleAvatars = [f1, f2, f3, f4];
    const avatars = isGender === "male" ? maleAvatars : femaleAvatars;
    const [index, setIndex] = useState(0);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const nextAvatar = () => {
      setIndex((prev) => (prev + 1) % avatars.length);
    };

    const prevAvatar = () => {
      setIndex((prev) => (prev - 1 + avatars.length) % avatars.length);
    };

    const handleAvatarClick = (i) => {
      setIndex(i); // Update the index directly on click
      setSelectedAvatar(avatars[i]); // Set the clicked avatar as selected
    };
    // Camera.jsx - AvatarSelection component
    const goToSwap = () => {
      // Log the captured image and selected avatar
      console.log('Captured Image Blob:', capturedImage);
      console.log('Selected Avatar:', selectedAvatar);
      const themes = ["space", "cyber", "retro", "neon"];
      const selectedTheme = themes[index];

      navigate("/swap", {
        state: {
          sourceImageBlob: capturedImage,
          gender: isGender,
          selectedTheme: selectedTheme // Use theme from index mapping
        }
      });
    };

    return (
      <div className="avatar-container">
        <div className="avatar-content">
          <button className="nav-button left" onClick={prevAvatar}>❮</button>
          <div className="avatar-wrapper">
            {avatars.map((avatar, i) => {
              let className = "avatar";
              if (i === index) {
                className += " active"; // The clicked avatar gets the active class
              } else if (i === (index - 1 + avatars.length) % avatars.length) {
                className += " left-side"; // Previous avatar
              } else if (i === (index + 1) % avatars.length) {
                className += " right-side"; // Next avatar
              }
              return (
                <img
                  key={i}
                  src={avatar}
                  alt={`Avatar ${i + 1}`}
                  className={className}
                  onClick={() => handleAvatarClick(i)} // Pass index on click
                />
              );
            })}
          </div>
          <button className="nav-button right" onClick={nextAvatar}>❯</button>
          {selectedAvatar && <button className="next-button" onClick={goToSwap}>Submit</button>}
        </div>
      </div>
    );
  };




  // UI Rendering
  return (
    <div style={{
      textAlign: "center", width: "100vw", height: "100vh", backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      {/* Gender Selection */}
      {!isGender && (
        <GenderSelectionContainer>
          <GenderButton
            style={{ backgroundImage: `url(${male})` }}
            onClick={() => setIsGender("male")}
          ></GenderButton>
          <GenderButton
            style={{ backgroundImage: `url(${female})` }}
            onClick={() => setIsGender("female")}
          ></GenderButton>
        </GenderSelectionContainer>
      )}

      {/* Camera Capture */}
      {isGender && !isAvatarSelection && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: "url('your-background-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isCameraOn ? (
            <div style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center", // Fixed spacing issue
              alignItems: "center", // Fixed spacing issue
              flexDirection: "column", // Fixed key name
              marginTop: "100px",
              gap: "58px", // Fixed closing brace and spacing
            }}>
              <video
                ref={videoRef}
                autoPlay
                style={{
                  width: "648px",
                  height: "960px",
                  borderRadius: "10px",
                  border: "5px solid white", // White border
                  objectFit: "cover", // Ensures video fills the container
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <button
                onClick={captureImage}
                style={{
                  width: "250px",  // Increased width
                  height: "250px", // Increased height

                  backgroundImage: "url('/capture.png')", // Replace with your image URL
                  backgroundSize: "cover", // Ensures full coverage of the button
                  backgroundPosition: "center",
                  marginTop: "20px",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent"
                }}
              >
              </button>

            </div>
          ) : (
            <button
              onClick={() => setIsCameraOn(true)}
              style={{
                width: "343px",
                height: "343px",
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                backgroundImage: "url('/cap.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >

            </button>
          )}

        </div>
      )
      }


      {/* Avatar Selection */}
      {isAvatarSelection && <AvatarSelection />}
    </div >
  );
}

export default Camer;
