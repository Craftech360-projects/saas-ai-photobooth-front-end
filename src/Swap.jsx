/* eslint-disable no-unused-vars */
import QRCode from "qrcode.react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { supabase } from "./supabaseClient";
import f1 from "/assets/f1.png"; // Import the PNG image
import f2 from "/assets/f2.png"; // Import the PNG image
import m1 from "/assets/m1.png"; // Import the PNG image
import m2 from "/assets/m2.png"; // Import the PNG image

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

        const swapResponse = await fetch(
          "http://localhost:8000/api/swap-face/",
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
  
  // const LoadingAnimation = () => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //         width: "100vw",
  //       }}
  //     >
  //       <LoaderContainer>
  //         <Bar color="rgb(31 187 238)" delay={0.3} /> {/* Blue */}
  //         <Bar color="rgb(176 210 55)" delay={0.2} /> {/* Green */}
  //         <Bar color="rgb(255 202 7)" delay={0.1} /> {/* Yellow */}
  //         <Bar color="rgb(212 58 42)" delay={0} /> {/* Red */}
  //       </LoaderContainer>
  //     </div>
  //   );
  // };
  
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
        {/* Display the loading text with animation */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "50px",
              color: "#fff",
              letterSpacing: "2px",
              animation: "fadeInOut 3s infinite", // Apply animation
            }}
          >
            <span style={{ fontWeight: "bold" }}>Sculpting</span>
          </h2>
          <h2
            style={{
              fontSize: "50px",
              fontWeight: "normal", // Make this part normal weight
              color: "#fff",
              letterSpacing: "2px",
              animation: "fadeInOut 3s infinite", // Apply animation to both lines
            }}
          >
            your future self...
          </h2>
        </div>
  
        {/* Add CSS for the animation */}
        <style>
          {`
            @keyframes fadeInOut {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}
        </style>
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
                // border: "16px solid #30A6EC",
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
                  // border: "20px solid #30A6EC",
                  // borderRadius: "16px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  marginBottom: "25px",
                
                
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
                height: "80px",
                cursor: "pointer",
                border: " solid white", // White border
                fontSize: "40px",
                fontWeight: "bold",
                 backgroundColor: "#001965",
                color: "#fff", // White text color
                transition: "background-color 0.3s ease, color 0.3s ease",
                position: "absolute",
                top: "80%",
                borderRadius: "40px",
                 
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#30A6EC"; // Change background
                  e.target.style.color = "#ffffff"; // Change text color
                  setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
                }}
              >
                Home
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
