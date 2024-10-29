/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import one from "/assets/one.png";
import two from "/assets/two.png";
import male from "/assets/male.png";
import female from "/assets/female.png";
import QRCode from "qrcode.react";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const LoaderWrapper = styled.div`
  width: 200px; /* Increased size */
  height: 200px; /* Increased size */
  border: 16px dotted #fff; /* Increased size */
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotation} 2s linear infinite;
`;

const LoaderInner = styled.div`
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 16px dotted #30a6ec; /* Increased size */
  border-style: solid solid dotted;
  width: 100px; /* Increased size */
  height: 100px; /* Increased size */
  border-radius: 50%;
  animation: ${rotationBack} 0.5s linear infinite;
  transform-origin: center center;
`;
const buttonStyle = {
  marginTop: "20px",
  width: "350px",
  height: "120px",
  cursor: "pointer",
  borderRadius: "10px",
  border: "none",
  fontSize: "48px",
  fontWeight: "bold",
  backgroundColor: "#ffffff",
  color: "#000000",
  transition: "background-color 0.3s ease, color 0.3s ease",
};
function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [template, setTemplate] = useState(null);
  const [isStarted, setIsStarted] = useState(true);
  const [isGenderShow, setIsGenderShow] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const startProcess = (value) => {
    setIsStarted(false);
    setIsGenderShow(false);
    setIsCameraOn(true);
    setTemplate(value);
  };

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1920 }, // Set high resolution for better quality
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
        })
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

      const portraitWidth = video.videoWidth;
      const portraitHeight = video.videoHeight;

      canvas.width = portraitWidth;
      canvas.height = portraitHeight;

      context.drawImage(video, 0, 0, portraitWidth, portraitHeight);

      // Capture high-quality image in JPEG format
      canvas.toBlob(
        (blob) => {
          setCapturedImage(URL.createObjectURL(blob)); // Store the captured image as a preview URL
          setIsCameraOn(false);
          setIsPreview(true); // Show the preview
        },
        "image/jpeg",
        0.9
      );
    }, 500);
  };

  const retakeImage = () => {
    setIsCameraOn(true); // Restart the camera
    setIsPreview(false); // Hide the preview
    setCapturedImage(null); // Clear the preview image
  };

  const submitImage = async () => {
    const formData = new FormData();
    const response = await fetch(capturedImage);
    const blob = await response.blob();

    formData.append("image", blob, "captured-image.jpg");
    formData.append("template", template);

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data.video_url);
      setIsLoading(false);
      setVideoURL(data.video_url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isStarted && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
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
              bottom: "15%",
              left: "15%",
              position: "absolute",
              borderRadius: "10px",
              border: "none",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              color: "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#30A6EC";
              e.target.style.color = "#ffffff";
              setTimeout(() => {
                setIsGenderShow(true);
                setIsStarted(false);
              }, 500);
            }}
          >
            Start
          </button>
        </div>
      )}

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
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px",
                height: "358px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                marginRight: "80px",
                marginLeft: "165px",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("1.mp4"), 500);
              }}
            ></button>

            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${female})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px",
                height: "358px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("2.mp4"), 500);
              }}
            ></button>
          </div>
        </div>
      )}

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
            backgroundRepeat: "no-repeat",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              aspectRatio: "1080 / 1920",
              objectFit: "cover",
              width: "960px",
              height: "540px",
              borderRadius: "15px",
              marginTop: "160px",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          ></video>
          <button
            style={{
              marginTop: "250px",
              width: "350px",
              height: "120px",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              color: "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#30A6EC";
              e.target.style.color = "#ffffff";
              setTimeout(captureImage, 500);
            }}
          >
            Capture
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {isPreview && (
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
          <img
            src={capturedImage}
            alt="Captured Preview"
            style={{
              width: "1200px", // Adjusted width for larger display
              height: "675px", // Adjusted height to maintain 16:9 aspect ratio
              borderRadius: "15px",
              marginTop: "160px",
              transform: "rotate(-90deg)",
              boxShadow: "0px 0px 10px 10px rgba(255, 255, 255, 0.7)", // Stronger shadow effect
            }}
          />

          <div
            style={{
              marginTop: "250px",
              width: "100%",
              height: "120px",
              borderRadius: "10px",
              border: "none",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              onClick={retakeImage}
              style={{
                width: "100px",
                height: "50px",
                cursor: "pointer",
                borderRadius: "10px",
                border: "none",
                fontSize: "48px",
                fontWeight: "bold",
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              Retake
            </button>
            <button
              onClick={submitImage}
              style={{
                width: "100px",
                height: "50px",
                cursor: "pointer",
                borderRadius: "10px",
                border: "none",
                fontSize: "48px",
                fontWeight: "bold",
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <LoaderWrapper>
            <LoaderInner />
          </LoaderWrapper>
        </div>
      )}

      {videoURL && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <video
            autoPlay
            muted
            loop
            src={videoURL}
            style={{
              width: "100%",
              maxWidth: "540px",
              marginTop: "20px",
            }}
          ></video>
          <div style={{ marginTop: "20px" }}>
            <QRCode value={videoURL} size={200} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Camer;
