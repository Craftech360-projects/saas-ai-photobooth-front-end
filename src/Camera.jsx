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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [gender, setGender] = useState(null);
  const [isStarted, setIsStarted] = useState(true);

  const startProcess = (value) => {
    setGender(value);
    setIsStarted(false);
    setIsCameraOn(true);
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
            navigate("/swap", { state: { sourceImage: blob, gender } });
          }, 1000); // Adjust timing as needed
        }
      }, "image/jpeg");
    }, 200);
  };

  // 'animate__animated animate__bounceOut'
  return (
    <section
    style={{
      textAlign: "center",
      width: "100vw",
      height: "100vh",
    }}>
      {isStarted && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            // backgroundImage: `url(${one})`,
          }}
        >
          <img src={one} alt="" style={{
            width: "100%",
          }}/>
          <button
            style={{
              backgroundImage: `url(${buttonBg})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "250px", // Adjust width as needed
              height: "407px", // Adjust height as needed
              border: "none",
              cursor: "pointer", // Show pointer cursor on hover
              bottom: "5%",
              backgroundColor: "transparent",
              marginTop: "30px",
              left: "11%",
              position: "absolute",
            }}
            onClick={() => setIsStarted("")}
          ></button>
        </div>
      )}

      {isStarted === "" && (
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
          <img src={two} alt="" style={{
            width: "100%",
            position:'absolute',
            zIndex:'-100'
          }}/>
          <div
            style={{
              width: "600px",
              height: "480px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button
              style={{
                backgroundImage: `url(${male})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "250px", // Adjust width as needed
                height: "300px", // Adjust height as needed
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
              }}
              onClick={() => startProcess("male")}
            ></button>
            <button
              style={{
                backgroundImage: `url(${female})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "250px", // Adjust width as needed
                height: "300px", // Adjust height as needed
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
              }}
              onClick={() => startProcess("female")}
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
        {isCameraOn && (
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0)" : "none",
              aspectRatio: "1080 / 1920",
              objectFit: "cover",
              width: "400px",
              borderRadius: "16px",
              marginTop: "160px",
              // border: "5px solid #62D84E",
            }}
          ></video>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        {isCameraOn && <CaptureButton onClick={captureImage}></CaptureButton>}
      </div>
    </section>
  );
}

export default Camer;
