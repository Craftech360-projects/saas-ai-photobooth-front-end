/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import captureImageIcon from "/assets/cp.png"; // Import the PNG image
import retakeImageIcon from "/assets/x.png"; // Import the PNG image
import rightImageIcon from "/assets/right.png"; // Import the PNG image
import logo from "/assets/cftt.png"; // Import the PNG image
import firebase from "./firebase"; // Import your firebase.js file with Firebase initialization
import { getDatabase, ref, push } from "firebase/database";
import { supabase } from "./supabaseClient";
const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 250px; /* Adjust width and height according to your image dimensions */
  height: 250px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  boxshadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
`;

const RetakeButton = styled.button`
  background-image: url(${retakeImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 100px; /* Adjust width and height according to your image dimensions */
  height: 100px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: absolute;
  bottom: 20px;
  left: 45%;
  transform: translateX(-50%);
  boxshadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
`;

const SubmitButton = styled.button`
  background-image: url(${rightImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 100px; /* Adjust width and height according to your image dimensions */
  height: 100px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: absolute;
  bottom: 20px;
  left: 55%;
  transform: translateX(-50%);
  boxshadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 90%;
  border-top: 9px solid #fff;
  animation: ${spinAnimation} 0.5s linear infinite;
`;
const LoadingText = styled.h2`
  margin-top: 100px;
`;

function TabCamer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLogo, setIsLogo] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const database = getDatabase(firebase);

  const [name, setName] = useState(""); // Initialize state for holding the name

  const handleChange = (event) => {
    // Function to update the name state when input changes
    setName(event.target.value);
  };
  const handleForm = (event) => {
    // Function to handle form submission
    event.preventDefault();
    setIsCameraOn(true);
    setIsLogo(true);
    setIsForm(false);
    setIsClicked(true);
    // You can perform any additional actions here, like submitting the name to a database or displaying it
    console.log("Submitted name:", name);
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
    const section = document.querySelector(".cp");
    section.classList.add("animate__animated", "animate__flash");
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
      setIsClicked(false);
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image submitted");
    setCapturedImage(false);
    setIsCameraOn(false);
    setIsLoading(true);
    // navigate("/loading"); // Assume a loading route

    try {
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([dataURItoBlob(capturedImage)], "sourceImage.jpg", {
          type: "image/jpeg",
        })
      );

      // Replace 'targetImageURL' with the actual URL of the target image
      const targetImageURL = "/times_square_superman.jpg"; // Provide the URL of the target image
      const response = await fetch(targetImageURL);
      const targetImageBlob = await response.blob();
      formData.append(
        "sourceImage",
        new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
      );

      const swapResponse = await fetch(
        "https://elf-positive-kangaroo.ngrok-free.app/api/swap-face/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!swapResponse.ok) {
        throw new Error("Something went wrong with the swap API call");
      }

      const swappedImageBlob = await swapResponse.blob();

      // Convert the swapped image to JPEG
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      // Upload the swapped and converted image to Supabase
      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, convertedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;

      if (publicURL) {
        console.log(publicURL);
        try {
          // Your existing code to get publicURL here...

          // Log publicURL to Firebase Realtime Database
          const publicURLRef = ref(database, "publicURLs");
          push(publicURLRef, publicURL)
            .then(() => {
              console.log("publicURL logged to Firebase successfully!");
              setIsLoading(false);
              setIsDone(true);
            
              // Your existing code to navigate to the result page here...
            })
            .catch((error) => {
              console.error("Error writing publicURL to Firebase:", error);
              navigate("/error");
            });
        } catch (error) {
          console.error("Error:", error);
          navigate("/error");
        }
        // navigate("/result", { state: { resultImageUrl: publicURL } });
      } else {
        console.error("Failed to get public URL");
        alert('URL not found');
        navigate("/error");
      }
    } catch (error) {
      console.error("Error in handleSubmit catch block:", error);
      alert('Error occurred: ' + error.message);
      navigate("/error");
    }
  };

  // Function to convert an image blob to JPEG format
  function convertImageToJPEG(blob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, "image/jpeg"); // Convert the canvas to a blob in JPEG format
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(blob); // Create a URL for the blob and set it as the image source
    });
  }
  const retakeImage = () => {
    setCapturedImage(null);
    setIsClicked(true);
  };

  const submitImage = () => {
    const blob = dataURItoBlob(capturedImage);
    // Add animation before navigation
    const section = document.querySelector(".submit");
    if (section) {
      section.classList.add("animate__animated", "animate__flash");
      setTimeout(() => {
        navigate("/swap", { state: { sourceImage: blob } });
      }, 1000); // Adjust timing as needed
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isForm && (
        <form
          style={{
            textAlign: "center",
            width: "50vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onSubmit={handleForm}
        >
          <input
            style={{ width: "50%", padding: "10px 20px", borderRadius: "16px" }}
            type="text"
            placeholder="Enter your name"
            value={name} // Bind input value to name state
            onChange={handleChange} // Call handleChange function when input changes
          />
          <br />
          <button
            style={{
              width: "50%",
              padding: "10px 20px",
              borderRadius: "16px",
              backgroundColor: "#564915",
            }}
            type="submit"
          >
            SUMIT
          </button>
        </form>
      )}
      {isCameraOn && (
        <video
          ref={videoRef}
          autoPlay
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></video>
      )}
      {isLogo && (
        <img
          src={logo}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: "20px",
            width: "300px",
            zIndex: 999,
          }}
          alt=""
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "80%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3)",
          }}
        />
      )}
      {isClicked && (
        <CaptureButton className="cp" onClick={captureImage}></CaptureButton>
      )}
      {capturedImage && (
        <>
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RetakeButton onClick={retakeImage}></RetakeButton>
            <SubmitButton
              className="submit"
              onClick={handleSubmit}
            ></SubmitButton>
          </div>
        </>
      )}

      {isLoading && <Spinner />}

      {isDone && (
        <h1 style={{ color:'white',fontSize:'20px',fontWeight:'bold'}}> {name} have look in main screen your image is ready!</h1>
      )}
    </section>
  );
}

export default TabCamer;
