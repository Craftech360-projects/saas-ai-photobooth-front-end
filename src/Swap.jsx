/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { supabase } from "./supabaseClient";
import m1 from "/assets/m1.png"; // Import the PNG image
import m2 from "/assets/m2.png"; // Import the PNG image
import f1 from "/assets/f1.png"; // Import the PNG image
import f2 from "/assets/f2.png"; // Import the PNG image
import ReactToPrint from "react-to-print";
import styled, { keyframes } from "styled-components";

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const getGender = location.state?.gender;
  const isGender = getGender; // Static gender value from location state
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const [resultImageUrl, setResultImageUrl] = useState(null); // Store the result image URL
  const [imageLoaded, setImageLoaded] = useState(false); // State to check if image has been loaded
  const printRef = useRef(); // Ref for printable image

  useEffect(() => {
    if (!sourceImageBlob) {
      console.error("Source image is not provided.");
      navigate("/"); // Navigate back to capture if no source image is found
    }
  }, [sourceImageBlob, navigate]);

  // Function to handle image submission and swapping
  const handleSubmit = async (e, selectedImage) => {
    e.preventDefault();
    setLoading(true); // Show loading animation

    try {
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
      );

      const response = await fetch(selectedImage);
      const targetImageBlob = await response.blob();
      formData.append(
        "sourceImage",
        new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
      );

      const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
        method: "POST",
        body: formData,
      });

      if (!swapResponse.ok) {
        throw new Error("Something went wrong with the swap API call");
      }

      const swappedImageBlob = await swapResponse.blob();
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
      console.error("Error:", error);
      navigate("/error");
    }
  };

  // Convert image to JPEG format
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
  // Function to reset state and show image selection
  const resetSelection = () => {
    setResultImageUrl(null); // Reset the result image URL
    setLoading(false); // Reset loading state
    setImageLoaded(false); // Reset image loaded state
  };

  // Component to render the image selection (Male/Female)
  const ImageSelectionForm = () => {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "800px",
        }}
      >
        {isGender === "male" ? (
          <>
            <img
              src={m1}
              alt="Swapped Result"
              style={{
                width: "70%",
                objectFit: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                marginBottom: "42px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  handleSubmit(e, `m1.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />

            <img
              src={m2}
              alt="Swapped Result"
              style={{
                width: "70%",
                objectFit: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  handleSubmit(e, `m2.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />
          </>
        ) : (
          <>
            <img
              src={f1}
              alt="Swapped Result"
              style={{
                width: "70%",
                objectFit: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                marginBottom: "42px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  handleSubmit(e, `f1.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />

            <img
              src={f2}
              alt="Swapped Result"
              style={{
                width: "70%",
                objectFit: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  handleSubmit(e, `f2.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />
          </>
        )}
      </div>
    );
  };

  // Component to display loading animation
  const LoadingAnimation = () => {
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
    return (
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
    );
  };

  // Create a PrintableImage component using forwardRef
  const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
    return (
      <div ref={ref}>
        <img
          src={resultImageUrl}
          alt="Swapped Result"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  });

  // Component to display result image and download/print options
  const ResultDisplay = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      if (resultImageUrl) {
        const img = new Image();
        img.onload = () => {
          setImageLoaded(true);
        };
        img.src = resultImageUrl;
      }
    }, [resultImageUrl]);

    const goHome = () => {
      navigate("/");
    };

    return (
      <div
        style={{
          textAlign: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "55%",
          }}
        >
          <img
            className="animate__animated animate__zoomIn animate__delay-2s"
            src={resultImageUrl}
            alt="Swapped Result"
            style={{
              width: "80%", // Set to 100% to fill the container
              height: "auto", // Use auto for height to maintain aspect ratio
              objectFit: "cover", // Ensure the image covers the container
              borderRadius: "16px",
              border: "16px solid #30A6EC",
            }}
          />
        </div>

        {imageLoaded && (
          <div
            style={{
              width: "70%",
              height: "40%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <QRCode
                value={resultImageUrl}
                size={300}
                style={{
                  border: "20px solid #30A6EC",
                  borderRadius: "16px",
                  padding: "15px",
                  backgroundColor: "#fff",
                }}
              />
            </div>

            <div
              style={{
                width: "35%",
                marginLeft: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  textAlign: "left",
                  backgroundColor: "rgb(0 29 131)",
                }}
              >
                <h1 style={{ fontSize: "42px", lineHeight: "40px" }}>
                  {" "}
                  Scan and Download
                </h1>
                <h1
                  style={{
                    fontSize: "20px",
                    lineHeight: "25px",
                    marginTop: "-16px",
                  }}
                >
                  your warrior alter ego.
                </h1>
              </div>
              {/* ReactToPrint with a reference to the rendered PrintableImage */}
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      cursor: "pointer",
                      borderRadius: "10px",
                      border: "none",
                      fontSize: "40px",
                      fontWeight: "bold",
                      backgroundColor: "#ffffff", // Default color
                      color: "#000000", // Default text color
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      marginBottom: "16px",
                      marginTop: "16px",
                    }}
                  >
                    Print
                  </button>
                )}
                content={() => printRef.current} // Correct reference to PrintableImage
              />

              {/* The PrintableImage component */}
              <div style={{ display: "none" }}>
                <PrintableImage
                  ref={printRef}
                  resultImageUrl={resultImageUrl}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "250px",
                  height: "80px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "40px",
                  fontWeight: "bold",
                  backgroundColor: "#ffffff", // Default color
                  color: "#000000", // Default text color
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#30A6EC"; // Change background
                  e.target.style.color = "#ffffff"; // Change text color
                  setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
                }}
              >
                Restart
              </button>
              <button
                type="submit"
                style={{
                  width: "250px",
                  height: "80px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "40px",
                  fontWeight: "bold",
                  backgroundColor: "#ffffff", // Default color
                  color: "#000000", // Default text color
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#30A6EC"; // Change background
                  e.target.style.color = "#ffffff"; // Change text color
                  setTimeout(resetSelection(), 500); // Correctly invoke captureImage after 500ms
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Show loading animation if loading, else show result, else show image selection */}
      {loading ? (
        <LoadingAnimation />
      ) : resultImageUrl ? (
        <ResultDisplay />
      ) : (
        <ImageSelectionForm />
      )}
    </div>
  );
}

export default Swap;
