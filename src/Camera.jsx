/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import one from "/assets/one.png";
import two from "/assets/two.png";
import male from "/assets/option1.png";
import female from "/assets/option2.png";
import QRCode from "qrcode.react";
import background from "../public/assets/background.png";
import logo from "../public/assets/SkodaLogo.png";

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
  const [videoURL, setVideoURL] = useState(null);
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
  const Section = styled.section`
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-image: url(${background}); // Set background image
    background-size: cover; // Cover the entire section
    background-position: center;
    background-repeat: no-repeat;
  `;
  const submitImage = async () => {
    const formData = new FormData();
    const response = await fetch(capturedImage);
    const blob = await response.blob();

    formData.append("image", blob, "captured-image.jpg");
    formData.append("template", template);
    setIsLoading(true);
    setIsPreview(false);

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

      console.log(videoURL);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Always ensure loading state is cleared
    }
  };

  return (
    <Section>
      {isStarted && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />

          <div
            style={{
              width: "350px",
              height: "140px",

              bottom: "60%",
              left: "15%",
              position: "absolute",

              fontSize: "120px",
              fontWeight: "bold",

              color: "#FFFFFFFF",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Welcome
          </div>
          <div
            style={{
              width: "850px",
              height: "140px",

              bottom: "45%",
              left: "15%",
              position: "absolute",

              fontSize: "60px",

              color: "#FFFFFFFF",
              transition: "background-color 0.3s ease, color 0.3s ease",
              textAlign: "left",
            }}
          >
            Buckle up, because
            <span style={{ display: "block", marginTop: "10px" }}>
              your transformation
            </span>
            <span style={{ display: "block", marginTop: "10px" }}>
              is about to begin!
            </span>
          </div>
          <button
            style={{
              width: "350px",
              height: "120px",
              cursor: "pointer",
              bottom: "15%",
              left: "15%",
              position: "absolute",
              borderRadius: "60px",
              border: "none",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: "#78FAAE",
              color: "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#C5FFDD";
              e.target.style.color = "#0E3A2F";
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
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />
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
                width: "351px",
                height: "509px",
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
                width: "351px",
                height: "509px",
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
          <div
            style={{
              width: "850px",
              height: "140px",

              bottom: "10%",

              position: "absolute",

              fontSize: "60px",

              color: "#FFFFFFFF",
              transition: "background-color 0.3s ease, color 0.3s ease",
              justifyContent: "flex-start",
              textAlign: "left", // Add this line to align text left
            }}
          >
            Select your video{" "}
            <span style={{ display: "block", marginTop: "10px" }}>
              template
            </span>
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
          {" "}
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              aspectRatio: "1080 / 1920",
              objectFit: "cover",
              width: "1200px", // Adjusted width for larger display
              height: "675px", // Adjusted height to maintain 16:9 aspect ratio
              borderRadius: "15px",
              marginTop: "600px",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              border: "10px solid #78FAAE", // Thickness, style, and color of the border

              borderRadius: "35px",
            }}
          ></video>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginTop: "80px",
              marginLeft: "420px",
            }}
          >
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
                backgroundColor: "#78FAAE",
                color: "#000000",
                borderRadius: "60px",
                border: "none",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
              onClick={(e) => {
                e.target.style.backgroundColor = "#C5FFDD";
                e.target.style.color = "#0E3A2F";
                setTimeout(captureImage, 500);
              }}
            >
              Capture
            </button>
          </div>
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
          {" "}
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />
          <img
            src={capturedImage}
            alt="Captured Preview"
            style={{
              width: "1200px", // Adjusted width for larger display
              height: "675px", // Adjusted height to maintain 16:9 aspect ratio
              borderRadius: "15px",
              marginTop: "550px",
              transform: "rotate(-90deg)",
              // boxShadow: "0px 0px 10px 10px rgba(255, 255, 255, 0.7)", // Stronger shadow effect
              border: "10px solid #78FAAE", // Thickness, style, and color of the border

              borderRadius: "35px",
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
            <div
              style={{
                marginTop: "10px",
                height: "260px",
                width: "100vw",
                display: "flex",
                flexDirection: "row",
                gap: "20px", // Add space between buttons
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.target.style.backgroundColor = "#C5FFDD";
                  e.target.style.color = "#0E3A2F";
                  retakeImage();
                }}
                style={{
                  width: "350px",
                  height: "120px",
                  cursor: "pointer",
                  borderRadius: "60px", // Set only once
                  border: "none",
                  fontSize: "48px",
                  fontWeight: "bold",
                  backgroundColor: "#78FAAE",
                  color: "#000000",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                Retake
              </button>

              <button
                onClick={(e) => {
                  e.target.style.backgroundColor = "#C5FFDD";
                  e.target.style.color = "#0E3A2F";
                  submitImage();
                }}
                style={{
                  width: "350px",
                  height: "120px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "48px",
                  width: "350px",
                  height: "120px",
                  cursor: "pointer",

                  border: "none",
                  fontSize: "48px",
                  fontWeight: "bold",
                  backgroundColor: "#78FAAE",
                  color: "#000000",
                  borderRadius: "60px",
                  border: "none",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                Submit
              </button>
            </div>
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
          {" "}
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />
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
          {" "}
          <img
            src={logo}
            alt=""
            style={{
              width: "500px",
              top: "10%",
              left: "15%",
              position: "absolute",
            }}
          />
          <video
            autoPlay
            muted
            loop
            src={videoURL}
            style={{
              width: "100%",
              maxWidth: "540px",
              marginTop: "450px",
              border: "10px solid #78FAAE", // Thickness, style, and color of the border

              borderRadius: "35px",
              //  width: "1200px", // Adjusted width for larger display
            }}
          ></video>
          {videoURL && (
            <>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  gap: "20px",
                }}
              >
                {/* Left half for QR code */}
                <div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      border: "10px solid #78FAAE", // Thickness, style, and color of the border

                      borderRadius: "15px",
                    }}
                  >
                    <QRCode value={videoURL} size={220} />
                  </div>
                </div>

                {/* Right half for text and button */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    textAlign: "left",
                  }}
                >
                  <h2
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#ffff",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "40px" }}>
                      Scan and Download
                    </span>{" "}
                    <span style={{ marginTop: "10px" }}>your super video</span>
                  </h2>
                  <button
                    style={{
                      width: "300px",
                      height: "80px",
                      cursor: "pointer",
                      borderRadius: "10px",
                      border: "none",
                      fontSize: "48px",
                      border: "none",
                      fontSize: "48px",
                      fontWeight: "bold",
                      backgroundColor: "#78FAAE",
                      color: "#000000",
                      borderRadius: "60px",
                      border: "none",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onClick={(e) => {
                      setTimeout(() => {
                        setIsGenderShow(false);
                        setIsStarted(true);
                      }, 500);
                    }}
                  >
                    Restart
                  </button>
                </div>
              </div>

              <div></div>
            </>
          )}
        </div>

        // <button
        //   style={{
        //     width: "50%",
        //   }}
        //   onClick={(e) => {
        //     setTimeout(() => {
        //       setIsGenderShow(true);
        //       setIsStarted(false);
        //     }, 500);
        //   }}
        // >
        //   Start
        // </button>
      )}
    </Section>
  );
}

export default Camer;
