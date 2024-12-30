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
  const selectedImage = location.state?.selectedImage;
  const userDetails = location.state?.userDetails;
  const isGender = ""; // Static gender value from location state
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const [resultImageUrl, setResultImageUrl] = useState(null); // Store the result image URL
  const [imageLoaded, setImageLoaded] = useState(false); // State to check if image has been loaded
  const printRef = useRef(); // Ref for printable image

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    console.log(userDetails, "userDetails");

    if (!sourceImageBlob) {
      console.error("Source image is not provided.");
      navigate("/");
    }
  }, [sourceImageBlob]); // Dependency array

  // Function to handle image submission and swapping
  const handleSubmit = async () => {
    setLoading(true); // Show loading animation
    try {
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
      );

      const response = await fetch("/couple/5.png");
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

      const fileName = `swapped-images/sattva/${Date.now()}-result.jpg`;
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
        const { error: insertError } = await supabase
          .from("users")
          .insert([{ ...userDetails, publicURL }]);
        if (insertError) {
          throw new Error(
            `Failed to save user details: ${insertError.message}`
          );
        } else {
          setResultImageUrl(publicURL); // Set the result image URL
          setLoading(false); // Hide loading animation
        }
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
        <button onClick={handleSubmit}>SEE THE MAGIC</button>
      </div>
    );
  };

  const animloader = keyframes`
    0% { height: 48px; }
    100% { height: 4px; }
  `;

  const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Spacing between bars */
  `;

  const Bar = styled.div`
    width: 8px;
    height: 40px;
    border-radius: 4px;
    background-color: ${(props) => props.color};
    animation: ${animloader} 0.3s ${(props) => props.delay}s linear infinite
      alternate;
  `;

  const LoadingAnimation = () => {
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
        <LoaderContainer>
          <Bar color="rgb(31 187 238)" delay={0.3} /> {/* Blue */}
          <Bar color="rgb(176 210 55)" delay={0.2} /> {/* Green */}
          <Bar color="rgb(255 202 7)" delay={0.1} /> {/* Yellow */}
          <Bar color="rgb(212 58 42)" delay={0} /> {/* Red */}
        </LoaderContainer>
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
      <div>
        {imageLoaded && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "200px",
              }}
            >
              <img
                className="animate__animated animate__zoomIn"
                src={resultImageUrl}
                alt="Swapped Result"
                style={{
                  width: "85%", // Set to 100% to fill the container
                  height: "auto", // Use auto for height to maintain aspect ratio
                  objectFit: "cover", // Ensure the image covers the container
                  // borderRadius: "16px",
                  border: "10px solid #FFF",
                }}
              />
            </div>
            <div
              style={{
                width: "70vw",
                display: "flex",
                flexDirection: "rpow",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "50vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20vh",
                  marginTop: "65px",
                }}
              >
                <QRCode
                  value={resultImageUrl}
                  size={270}
                  style={{
                    // border: "20px solid #30A6EC",
                    // borderRadius: "16px",
                    padding: "15px",
                    backgroundColor: "#fff",
                    marginBottom: "25px",
                    textAlign: "center",
                  }}
                />
              </div>

              <div
                style={{
                  width: "50vw",
                  height: "20vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "35px",
                    lineHeight: "40px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {" "}
                  Scan QR code
                </h1>
                <h1
                  style={{
                    fontSize: "25px",
                    lineHeight: "25px",
                    marginTop: "-16px",
                    color: "#fff",
                    letterSpacing: "5px",
                  }}
                >
                  to download image
                </h1>
                {/* <div
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
              </div> */}
                {/* ReactToPrint with a reference to the rendered PrintableImage */}
                <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      style={{
                        width: "312px",
                        height: "80px",
                        cursor: "pointer",
                        // borderRadius: "10px",
                        border: "none",
                        fontSize: "40px",
                        fontWeight: "bold",
                        backgroundColor: "#3A49D4", // Default color
                        color: "#fff", // Default text color
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
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
                    width: "312px",
                    height: "80px",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "40px",
                    fontWeight: "bold",
                    backgroundColor: "#3A49D4", // Default color
                    color: "#fff", // Default text color
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onClick={(e) => {
                    e.target.style.backgroundColor = "#30A6EC"; // Change background
                    e.target.style.color = "#ffffff"; // Change text color
                    setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
                  }}
                >
                  Home
                </button>
                {/* <button
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
              </button> */}
              </div>
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
