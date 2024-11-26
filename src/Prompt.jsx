import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Ensure supabaseClient is properly configured
import styled, { keyframes } from "styled-components";

function Prompt() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sourceImageBlob) {
      console.error("Source image is not provided.");
      navigate("/"); // Redirect if no image
    }
  }, [sourceImageBlob, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", inputValue || "default");
      formData.append(
        "sourceImage",
        new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
      );

      const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
        method: "POST",
        body: formData,
      });

      if (!swapResponse.ok) {
        throw new Error("Swap API call failed");
      }

      const swappedImageBlob = await swapResponse.blob();
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { data, error } = await supabase.storage
        .from("test-bucket")
        .upload(fileName, convertedBlob, { contentType: "image/jpeg" });

      if (error) {
        console.error("Supabase Upload Error:", error.message);
        throw error;
      }

      // const { error: uploadError } = await supabase.storage
      //   .from("test-bucket")
      //   .upload(fileName, convertedBlob, {
      //     contentType: "image/jpeg",
      //   });

      // if (uploadError) {
      //   throw uploadError;
      // }

      const publicURL = `https://aimistcqlndneimalstl.supabase.co/storage/v1/object/public/test-bucket/${fileName}`;
      console.log(publicURL);

      navigate("/resultdisplay", { state: { resultImageUrl: publicURL } }); // Navigate with result
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
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

  // Styled component for loader
  const Loader = styled.div`
    width: 150px;
    height: 150px;
    display: inline-block;
    position: relative;
    border: 3px solid #fff;
    box-sizing: border-box;
    animation: ${rotation} 1.5s linear infinite;

    &::after,
    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 2px solid rgb(186 193 208);
      width: 100px;
      height: 100px;
      animation: ${rotationBack} 1s linear infinite;
      transform-origin: center center;
    }

    &::before {
      width: 150px;
      height: 150px;
      border-color: 3px #0fb7e1;
      box-sizing: border-box;
      animation: ${rotation} 0.5s linear infinite;
    }
  `;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!loading ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column", // Stack input and button vertically
            alignItems: "center", // Center align input and button horizontally
            width: "100%",
            maxWidth: "400px", // Limit the width of the form
            margin: "0 auto", // Center the form on the page
            padding: "20px",
          }}
        >
          <textarea
            placeholder="Describe your fantasy character and watch the magic come to life."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "674px", // Fixed width
              height: "200px", // Height adjusted to allow for multiple lines
              padding: "20px", // Add padding inside the textarea
              fontSize: "26px", // Increase font size for better visibility
              borderRadius: "15px", // Rounded corners
              border: "2px solid #30A6EC", // Border color
              marginBottom: "30px", // Space between textarea and button
              outline: "none", // Remove outline
              boxSizing: "border-box", // Ensure padding doesn't affect width/height
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Light transparent background for input
              color: "#fff", // Text color inside the textarea
              textAlign: "center", // Center the text inside the input
              resize: "none", // Disable resizing the textarea
            }}
          />

          {/* Placeholder Color using a <style> tag */}
          <style>
            {`
          input::placeholder {
            color: #fff; /* Placeholder color */
            opacity: 1; /* Ensure placeholder color is visible (override browser defaults) */
          }
        `}
          </style>
          <button
            type="submit"
            style={{
              width: "670px",
              height: "80px",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: "rgb(186 193 208)", // Default color
              color: "#000", // Default text color
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            AI MAGIC
          </button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Prompt;
