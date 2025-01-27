
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
// import m1 from "/m1l.png"; // Import the PNG image
// import m2 from "/m2l.png"; // Import the PNG image
// import m3 from "/m3l.png"; // Import the PNG image
// import m4 from "/m4l.png"; // Import the PNG image

// const imgStyle = {
//   width: "auto",
//   height: "337px",
//   objectFit: "contain",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "30px",
//   cursor: "pointer",
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

// function Camer() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const navigate = useNavigate();
//   const [isImg, setIsImg] = useState(false);
//   const [userDetails, setUserDetails] = useState({ name: "", email: "" });

//   const getRandomImage = (images) => {
//     return images[Math.floor(Math.random() * images.length)];
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
//           section.classList.add("animate__animated", "animate__bounceOut");
//           setTimeout(() => {
//             navigate("/swap", {
//               state: { sourceImage: blob, isImg, userDetails },
//             });
//           }, 1000);
//         }
//       }, "image/jpeg");
//     }, 500);
//   };

//   const handleImageSelection = (imageName) => {
//     setIsImg(imageName);
//     setIsCameraOn(true);
//   };

//   return (
//     <section
//       style={{
//         textAlign: "center",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       {/* Camera Capture */}
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
//           }}
//         >
//           <video
//             ref={videoRef}
//             autoPlay
//             style={{
//               display: "block",
//               boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0, 0.5)" : "none",
//               objectFit: "cover",
//               width: "100%",
//               height: "100%",
//               maxWidth: "950px",
//               maxHeight: "500px",
//             }}
//           ></video>
//           <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//           <button
//             style={{
//               width: "250px",
//               height: "80px",
//               cursor: "pointer",
//               border: "solid white",
//               fontSize: "40px",
//               fontWeight: "bold",
//               backgroundColor: "#fff",  // Transparent background
//               color: "#710100",   // White text color
//               transition: "background-color 0.3s ease, color 0.3s ease",
//               position: "absolute",
//               top: "80%",
//               borderRadius: "40px",
//             }}
//             onClick={() => {
//               setTimeout(captureImage, 500);
//             }}
//           >
//             CAPTURE
//           </button>
//         </div>
//       )}

//       {/* Character Selection */}
//       {!isCameraOn && (
//         <div
//           style={{
//             textAlign: "center",
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "20px",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "40px",
//               color: "#fff",
//               letterSpacing: "2px",
//               marginBottom: "30px",
//             }}
//           >
//             Choose your background
//           </div>

//           <div
//             style={{
//               width: "100%",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               gap: "30px",
//             }}
//           >
//             {[m1, m2, m3, m4,].map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Character ${index + 1}`}
//                 style={imgStyle}
//                 onClick={() => handleImageSelection(`m${index + 1}.png`)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Camer;


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import m1 from "/m1l.png"; // Import the PNG image
import m2 from "/m2l.png"; // Import the PNG image
import m3 from "/m3l.png"; // Import the PNG image
import m4 from "/m4l.png"; // Import the PNG image

const imgStyle = {
  width: "auto",
  height: "337px",
  objectFit: "contain",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  cursor: "pointer",
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

function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [isImg, setIsImg] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [countdown, setCountdown] = useState(0);

  const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
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
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob((blob) => {
      const section = document.querySelector("section");
      if (section) {
        section.classList.add("animate__animated", "animate__bounceOut");
        setTimeout(() => {
          navigate("/swap", {
            state: { sourceImage: blob, isImg, userDetails },
          });
        }, 1000);
      }
    }, "image/jpeg");
  };

  const startCountdown = () => {
    setCountdown(5);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval);
          captureImage();
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handleImageSelection = (imageName) => {
    setIsImg(imageName);
    setIsCameraOn(true);
  };

  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Camera Capture */}
      {isCameraOn && (
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
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0, 0.5)" : "none",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxWidth: "950px",
              maxHeight: "500px",
            }}
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          {countdown > 0 && (
  <>
    <div
      style={{
        fontSize: "40px", // Smaller font size for the caption
        fontWeight: "bold", // Make the text bold
        color: "#fff",
        position: "absolute",
        top: "15%", // Position above the countdown
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Adjust for exact center
        zIndex: 10, // Ensure it's above other elements
      }}
    >
     Give us your best smile, the camera’s waiting!
    </div>
    <div
      style={{
        fontSize: "120px", // Increased font size
        fontWeight: "bold", // Make the text bold
        color: "#fff",
        position: "absolute",
        top: "50%", // Center vertically
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Adjust for exact center
        zIndex: 10, // Ensure it's above other elements
      }}
    >
      {countdown}
    </div>
  </>
)}
         {countdown === 0 && (
            <button
              style={{
                width: "250px",
                height: "80px",
                cursor: "pointer",
                border: "solid white",
                fontSize: "40px",
                fontWeight: "bold",
                backgroundColor: "#fff",  // Transparent background
                color: "#710100",   // White text color
                transition: "background-color 0.3s ease, color 0.3s ease",
                position: "absolute",
                top: "80%",
                borderRadius: "40px",
              }}
              onClick={startCountdown}
            >
              CAPTURE
            </button>
          )}
        </div>
      )}

      {/* Character Selection */}
      {!isCameraOn && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              color: "#fff",
              letterSpacing: "2px",
              marginBottom: "30px",
            }}
          >
            Choose your background
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {[m1, m2, m3, m4,].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Character ${index + 1}`}
                style={imgStyle}
                onClick={() => handleImageSelection(`m${index + 1}.png`)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Camer;