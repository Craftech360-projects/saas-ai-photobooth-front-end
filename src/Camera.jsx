/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import one from "/assets/one.png";
import two from "/assets/two.png";
import male from "/assets/male.png";
import female from "/assets/female.png";
import buttonBg from "/assets/startbg.png";

const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 270px; /* Adjust width and height according to your image dimensions */
  height: 100px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: relative;
  margin-top: 90px;
`;
function Camer() {
  const maleImages = ["male1", "male1"];
  const femaleImages = ["female1", "female1"];
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [gender, setGender] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isGenderShow, setIsGenderShow] = useState(false);
  const [isOptions, setIsOptions] = useState(false);

  const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const startProcess = (value) => {
    setIsStarted(false);
    // setIsGenderShow(false);
    setIsCameraOn(true);
    // const selectedImg =
    //   value === "male"
    //     ? getRandomImage(maleImages)
    //     : getRandomImage(femaleImages);
    setGender(value);
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
        // Add animation before navigation
        const section = document.querySelector("section");
        if (section) {
          section.classList.add("animate__animated", "animate__bounceOut");
          setTimeout(() => {
            navigate("/prompt", { state: { sourceImage: blob } });
          }, 1000); // Adjust timing as needed
        }
      }, "image/jpeg");
    }, 500);
  };

  // 'animate__animated animate__bounceOut'
  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Start button code  */}
      {isStarted && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            // backgroundImage: `url(${one})`,
          }}
        >
          {/* <img
            src={one}
            alt=""
            style={{
              width: "100%",
            }}
          /> */}
          <button
            style={{
              width: "350px",
              height: "120px",
              cursor: "pointer",
              bottom: "45%",
              left: "35%",
              position: "absolute",
              borderRadius: "10px",
              border: "none",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: "rgb(20 119 222)", // Default color
              color: "rgb(189 215 12)#000", // Default text color
              // backgroundColor: "rgb(186 193 208)", // Default color
              // color: "#000", // Default text color
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={(e) => {
              console.log("clicked");
              e.target.style.backgroundColor = "rgb(20 119 222)"; // Change background
              e.target.style.color = "rgb(189 215 12)"; // Change text color
              setTimeout(() => {
                // setIsGenderShow(true);
                setIsCameraOn(true);
                setIsStarted(false);
              }, 500); // Wait 500ms then proceed
            }}
          >
            Start
          </button>
        </div>
      )}

      {/* Gender Selcet Code  */}
      {isGenderShow && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundImage: `url(${two})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img
            src={two}
            alt=""
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "-100",
            }}
          /> */}
          <div
            style={{
              width: "100%",
              height: "720px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${male})`,
                backgroundSize: "cover", // Ensure the image covers the button entirely
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px",
                height: "358px",
                border: "none", // Start with no border
                cursor: "pointer",
                backgroundColor: "transparent", // Transparent to show background image
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box",
                marginRight: "80px", // Ensures the border is included in the button's size
                marginLeft: "165px", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
              }}
            ></button>

            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${female})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px", // Adjust width as needed
                height: "358px", // Adjust height as needed
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
              }}
            ></button>
          </div>
        </div>
      )}
      {/* Options Selcet Code  */}
      {isOptions && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundImage: `url(${two})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img
            src={two}
            alt=""
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "-100",
            }}
          /> */}
          <div
            style={{
              width: "100%",
              height: "720px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${male})`,
                backgroundSize: "cover", // Ensure the image covers the button entirely
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px",
                height: "358px",
                border: "none", // Start with no border
                cursor: "pointer",
                backgroundColor: "transparent", // Transparent to show background image
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box",
                marginRight: "80px", // Ensures the border is included in the button's size
                marginLeft: "165px", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
              }}
            ></button>

            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${female})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px", // Adjust width as needed
                height: "358px", // Adjust height as needed
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
              }}
            ></button>
          </div>
        </div>
      )}

      <div
        style={{
          textAlign: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Camera Capture Code  */}
        {isCameraOn && (
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0)" : "none",
              aspectRatio: "1080 / 1920",
              objectFit: "cover",
              width: "600px",
              height: "704px",
            //  borderRadius: "15px",
              marginTop: "160px",
               // Apply radius only to the top-right and bottom-left corners
    borderTopRightRadius: "50px",  // Top-right corner radius
    borderBottomLeftRadius: "50px",  // Bottom-left corner radius
              border: "3px solid rgb(220 220 220)",
              boxShadow:"0px 0px 10px 4px rgb(220 220 220)"
            }}
          ></video>
//           <div
//   style={{
//     display: "inline-block",  // Ensure the container respects the video aspect ratio
//     borderRadius: "15px",
//     boxShadow: "0px 0px 10px 4px rgb(220 220 220)",  // Apply the box shadow here
//     overflow: "hidden",  // Hide overflow to keep the video inside the container
//   }}
// >
//   <video
//     ref={videoRef}
//     autoPlay
//     style={{
//       display: "block",
//       aspectRatio: "1080 / 1920",
//       objectFit: "cover",
//       width: "600px",
//       height: "704px",
//       clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",  // Apply clip-path here
//     }}
//   ></video>
// </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        {isCameraOn && (
          <button
          style={{
            marginTop: "80px",
            width: "450px",
            height: "80px",
            cursor: "pointer",
            border: "2px solid #fff", // Add white border with 2px thickness
            fontSize: "48px",
            fontWeight: "bold",
            backgroundColor: "transparent", // Make background transparent
            color: "#fff", // White text color
            transition: "background-color 0.3s ease, color 0.3s ease",
            display: "flex", // Use flexbox for alignment
            alignItems: "center", // Center content vertically
            justifyContent: "center", // Center content horizontally
            gap: "10px", // Space between icon and text
          }}
          onClick={(e) => {
            e.target.style. backgroundColor="transparent"; // Change background
            e.target.style.color="#fff", // Change text color
            setTimeout(captureImage, 500); // Correctly invoke captureImage after 500ms
          }}
        >
          {/* Image Icon */}
          <img
            src="/assets/camera.png" // Replace with your icon URL
            alt="Capture Icon"
            style={{ width: "40px", height: "40px" }} // Adjust size of the icon
          />
          CAPTURE
        </button>
        
        )}
      </div>
    </section>
  );
}

export default Camer;
