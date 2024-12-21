import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { supabase } from "./supabaseClient";
import ReactToPrint from "react-to-print";
import styled, { keyframes } from "styled-components";

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const userDetails = location.state?.userDetails;
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const printRef = useRef();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) return;

    const fetchData = async () => {
      setHasFetched(true);
      if (!sourceImageBlob) {
        console.error("Source image is not provided.");
        navigate("/");
        return;
      }

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append(
          "sourceImage",
          new File([sourceImageBlob], "sourceImage.jpeg", {
            type: "image/jpeg",
          })
        );

        formData.append("name", userDetails.name);

        const response = await fetch("http://127.0.0.1:5000/process-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Something went wrong with the image processing.");
        }

        const processedImageBlob = await response.blob();
        const processedImageUrl = await convertImageToJPEG(processedImageBlob);
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
        console.error("Error in fetchData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hasFetched, navigate, sourceImageBlob, userDetails.name]);

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
          <Bar color="rgb(31 187 238)" delay={0.3} />
          <Bar color="rgb(176 210 55)" delay={0.2} />
          <Bar color="rgb(255 202 7)" delay={0.1} />
          <Bar color="rgb(212 58 42)" delay={0} />
        </LoaderContainer>
      </div>
    );
  };

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
              alignItems: "center",
              paddingTop: "200px",
            }}
          >
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
            </div>
            <img
              className="animate__animated animate__zoomIn animate__delay-2s"
              src={resultImageUrl}
              alt="Swapped Result"
              style={{
                width: "50%",
                height: "auto",
                objectFit: "cover",
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
              <button
                type="submit"
                style={{
                  width: "250px",
                  height: "80px",
                  cursor: "pointer",
                  border: "none",
                  fontSize: "40px",
                  fontWeight: "bold",
                  backgroundColor: "#3A49D4",
                  color: "#fff",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#30A6EC";
                  e.target.style.color = "#ffffff";
                  setTimeout(goHome, 500);
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
      {loading ? (
        <LoadingAnimation />
      ) : resultImageUrl ? (
        <ResultDisplay />
      ) : null}
    </div>
  );
}

export default Swap;
