/* eslint-disable no-dupe-keys */
import React, { useRef, useEffect, useState, forwardRef } from "react";
import QRCode from "qrcode.react";
import styled, { keyframes } from "styled-components";
import { supabase } from "./supabaseClient";
import one from "/one.png";
import login from "/login.png";
import output from "/output.png";
import ReactToPrint from "react-to-print";

// Forward ref for the component to print
const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "4in", // Set max width for 4x6 printing
        maxHeight: "6in", // Set max height for 4x6 printing
        margin: "0 auto", // Center the image
        overflow: "hidden",
      }}
    >
      <img
        ref={ref}
        src={resultImageUrl}
        alt="Swapped Result"
        style={{
          width: "100%",
          height: "96%",
          objectFit: "contain", // Ensure the image fits within the specified area without getting cut off
        }}
      />
    </div>
  );
});

function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [userDetails, setUserDetails] = useState({ name: "", age: "" });
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const printRef = useRef(); // Ref for the printable component

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
      stopCamera();
    }

    return () => stopCamera();
  }, [isCameraOn]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob((blob) => {
        processImage(blob);
      }, "image/jpeg");
    }, 500);
  };

  const processImage = async (sourceImageBlob) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append(
        "sourceImage",
        new File([sourceImageBlob], "sourceImage.jpeg", { type: "image/jpeg" })
      );
      formData.append("name", userDetails.name);
      formData.append("age", userDetails.age);

      const response = await fetch("http://127.0.0.1:5000/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image processing failed.");

      // const processedImageBlob = await response.blob();
      // const processedImageUrl = URL.createObjectURL(processedImageBlob);
      // setResultImageUrl(processedImageUrl);
      const swappedImageBlob = await response.blob();
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("test-bucket")
        .upload(fileName, convertedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      const publicURL = `https://aimistcqlndneimalstl.supabase.co/storage/v1/object/public/test-bucket/${fileName}`;
      if (publicURL) {
        setResultImageUrl(publicURL); // Set the result image URL
        setLoading(false); // Hide loading animation
      } else {
        console.error("Failed to get public URL");
        navigate("/error");
      }
    } catch (error) {
      console.error("Error in image processing:", error);
    } finally {
      setLoading(false);
      stopCamera();
    }
  };
  function convertImageToJPEG(blob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, "image/jpeg");
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsStarted(false);
    setIsCameraOn(true);
  };
  const startProcess = () => {
    setIsStarted(true);
    setIsShow(false);
  };

  const animloader = keyframes`
    0% { height: 48px; }
    100% { height: 4px; }
  `;

  const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `;

  const Bar = styled.div`
    width: 8px;
    height: 40px;
    border-radius: 4px;
    background-color: ${(props) => props.color};
    animation: ${animloader} 0.3s ${(props) => props.delay}s linear infinite
      alternate;
  `;

  const LoadingAnimation = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoaderContainer>
        <Bar color="rgb(31 187 238)" delay={0.3} />
        <Bar color="rgb(176 210 55)" delay={0.2} />
        <Bar color="rgb(255 202 7)" delay={0.1} />
        <Bar color="rgb(212 58 42)" delay={0} />
      </LoaderContainer>
    </div>
  );

  return (
    <section style={{ textAlign: "center", width: "100vw", height: "100vh" }}>
      {isShow && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={one}
            alt=""
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-100",
              position: "absolute",
            }}
          />
          <button
            // onClick={() => {
            //   setIsStarted(true);
            //   console.log("Button clicked, isStarted set to:", isStarted); // Check state update
            // }} // Start camera
            style={{
              marginTop: "350px",
              width: "272px",
              height: "82px",
              fontSize: "44px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              color: "#d61e24",
              border: "none",
              cursor: "pointer",
              borderRadius: "100px",
            }}
            onClick={(e) => {
              e.target.style.transition =
                "color 0.5s ease, background-color 0.5s ease";
              e.target.style.color = "#fff";
              setTimeout(startProcess, 500);
            }}
          >
            Start
          </button>
        </div>
      )}
      {isStarted && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <img
            src={login}
            alt=""
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-100",
              position: "absolute",
            }}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userDetails.name}
            onChange={handleChange}
            style={{
              padding: "20px",
              paddingLeft: "50px",
              fontSize: "34px",
              border: "none",
              textAlign: "left",
              color: "#000",
              fontWeight: "bold",
              width: "35%",
              borderRadius: "10px",
              textTransform: "capitalize",
            }}
            required
          />
          {/* <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={handleChange}
            style={{
              padding: "20px",
              paddingLeft: "50px",
              fontSize: "34px",
              border: "none",
              textAlign: "left",
              color: "#000",
              fontWeight: "bold",
              width: "35%",
              borderRadius: "10px",
            }}
            required
          /> */}
          <input
            type="text"
            name="age"
            placeholder="Enter your age"
            value={userDetails.age}
            onChange={handleChange}
            style={{
              padding: "20px",
              paddingLeft: "50px",
              fontSize: "34px",
              border: "none",
              textAlign: "left",
              color: "#000",
              fontWeight: "bold",
              width: "35%",
              borderRadius: "10px",
            }}
            required
          />

          <button
            type="submit"
            style={{
              width: "272px",
              height: "82px",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#FFFFFF",
              color: "#DF1E24",
              border: "none",
              cursor: "pointer",
              marginTop: "50px",
              borderRadius: "100px",
            }}
            // onClick={(e) => {
            //   e.target.style.transition =
            //     "color 0.5s ease, background-color 0.5s ease";
            //   e.target.style.color = "#fff";
            //   setTimeout(handleSubmit, 500);
            // }}
          >
            Next
          </button>
        </form>
      )}

      {isCameraOn && !loading && !resultImageUrl && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <img
            src={login}
            alt=""
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-100",
              position: "absolute",
            }}
          />
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0, 0.5)" : "none",
              objectFit: "cover", // Ensures the video fills the container while maintaining aspect ratio
              width: "50%", // Makes the video responsive
              height: "50%", // Fills the parent container
              maxWidth: "304", // Restrict maximum width for better control
              maxHeight: "600", // Restrict maximum height for better control
              transform: "rotate(90deg)", // Rotates the video 90 degrees
              transformOrigin: "center center", // Sets the rotation origin
              marginLeft: "250px",
            }}
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            onClick={captureImage}
            style={{
              width: "250px",
              height: "80px",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#FFFFFF",
              color: "#DF1E24",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              left: "65%",
            }}
          >
            Capture
          </button>
        </div>
      )}

      {loading && <LoadingAnimation />}

      {resultImageUrl && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={output}
            alt=""
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-100",
              position: "absolute",
            }}
          />

          <img
            src={resultImageUrl}
            alt="Processed Result"
            style={{ width: "45vw", marginTop: "100px" }}
          />
          <div
            style={{
              textAlign: "center",
              width: "40vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode
              value={resultImageUrl}
              size={180}
              style={{ border: "8px solid #CE1D23", padding: "5px" }}
            />
            <h1 style={{ color: "#CB1E24", fontSize: "30px" }}>
              Scan the QR CODE <br />
              to download image
            </h1>

            <ReactToPrint
              trigger={() => (
                <button
                  type="button"
                  style={{
                    width: "230px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "#E11E24",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "10px",
                    fontWeight:'bold'
                  }}
                >
                  Print
                </button>
              )}
              content={() => printRef.current} // Correct reference to PrintableImage
            />
            <br />
            <button
              onClick={() => window.location.reload()}
              style={{
                width: "230px",
                height: "60px",
                fontSize: "20px",
                backgroundColor: "#E11E24",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "10px",
                fontWeight:'bold'
              }}
            >
              Home
            </button>
          </div>
          {/* The PrintableImage component */}
          <div style={{ display: "none" }}>
            <PrintableImage ref={printRef} resultImageUrl={resultImageUrl} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Camer;
