/* eslint-disable no-unused-vars */
import QRCode from "qrcode.react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { supabase } from "./supabaseClient";

import m1 from "/assets/m1.png"; // Import the PNG image
import m2 from "/assets/m2.png"; // Import the PNG image
import m3 from "/assets/m3.png"; // Import the PNG image
import m4 from "/assets/m4.png"; // Import the PNG image
function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const selectedImage = location.state?.isImg;
  const userDetails = location.state?.userDetails;
  const isGender = ""; // Static gender value from location state
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const [resultImageUrl, setResultImageUrl] = useState(null); // Store the result image URL
  const [imageLoaded, setImageLoaded] = useState(false); // State to check if image has been loaded
  const printRef = useRef(); // Ref for printable image

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) return; // Prevent re-execution
    console.log("this one is working1")
    const fetchData = async () => {
      setHasFetched(true); // Mark as executed
      if (!sourceImageBlob) {
        console.error("Source image is not provided.");
        navigate("/");
      }
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append(
          "src_image",
          new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
        );

        const response = await fetch(selectedImage);
        const targetImageBlob = await response.blob();
        formData.append(
          "bgr_image",
          new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
        );
        formData.append("name", userDetails.name);
        formData.append("email", userDetails.email);
        console.log('Name:', userDetails.name); // Check if name is defined
        console.log('Email:', userDetails.email); // Check if email is defined
        console.log("formdata",formData);

        const swapResponse = await fetch(
          "http://localhost:3000/upload-images",
          {
            method: "POST",
            body: formData,
          }
        );

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

    fetchData(); // Call the async function
  }, [sourceImageBlob]); // Dependency array

  // Function to handle image submission and swapping
  const handleSubmit = async (e, selectedImage) => {
  console.log("this one is working2")
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
      formData.append("name", userDetails.name);
      formData.append("email", userDetails.email);

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
              src={m3}
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
                  handleSubmit(e, `m3.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />

            <img
              src={m4}
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
                  handleSubmit(e, `m4.jpg`);
                }, 500); // Wait 50ms then proceed
              }}
            />
          </>
        )}
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
    animation: ${animloader} 0.3s ${(props) => props.delay}s linear infinite alternate;
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
        {/* Display the loading bars */}
        <LoaderContainer>
          <Bar color="#fff" delay="0" />
          <Bar color="#fff" delay="0.2" />
          <Bar color="#fff" delay="0.4" />
        </LoaderContainer>
        <h2
          style={{
            fontSize: "40px",
            color: "#fff",
            marginTop: "20px",
          }}
        >
          {/* Loading... */}
        </h2>
      </div>
    );
  };
  
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
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "200px",
            }}
          >
          
            <img
            
              className="animate__animated animate__zoomIn animate__delay-2s"
              src={resultImageUrl}
              alt="Swapped Result"
              style={{
                width: "50%", // Set to 100% to fill the container
                height: "auto", // Use auto for height to maintain aspect ratio
                objectFit: "cover", 
                display: "flex",
                justifyContent: "center",

                // Ensure the image covers the container
                // borderRadius: "16px",
                border: "15px solid #fff",
                // borderRadius: "16px",
            
              }}
            />
              <div
              style={{
                width: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <QRCode
                value={resultImageUrl}
                size={200}
                style={{
                   border: "15px solid #710100",
                  // borderRadius: "16px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                
                
                }}
              />
              <h1
                style={{
                  fontSize: "30px",
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
                  fontSize: "20px",
                  lineHeight: "25px",
                  marginTop: "-16px",
                  color: "#fff",
                }}
              >
                to download image
              </h1>
              <button
                type="submit"
                style={{
                  width: "250px",
                  height: "70px",
                  cursor: "pointer",
                  border: "2px solid white",  // Add a border to make it visible
                  fontSize: "40px",
                  backgroundColor: "#fff",  // Transparent background
                  color: "#710100",  // White text color
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  position: "absolute",
                  top: "78%",
                  borderRadius: "40px",
                 
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#b7b7b7"; // Change background
                  e.target.style.color = "#ffffff"; // Change text color
                  setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
                }}
              >
                RESTART
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
