
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import m1 from "/london.png"; // Import the PNG image
import m2 from "/nyc.png"; // Import the PNG image
import m3 from "/paris.png"; // Import the PNG image

import f1 from "/london.png"; // Import the PNG image
import f2 from "/nyc.png"; // Import the PNG image
import f3 from "/paris.png"; // Import the PNG image

const imgStyle = {
  width: "312px",
  height: "226px",
  objectFit: "contain",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 270px;
  height: 100px;
  cursor: pointer;
  text-indent: -9999px;
  position: relative;
  margin-top: 90px;
`;

const StyledInput = styled.input`
  padding: 35px;
  font-size: 34px;
  border: none;
  text-align: center;
  color: #5f259d;
  font-weight: bold;
  width: 749px;
  text-transform: capitalize;
  background-color: #ffce00;
  border-radius: 50px;
  font-family: "Inter";

  &::placeholder {
    color: #5f259d;
  }
`;

const StyledSelect = styled.select`
  padding: 35px;
  font-size: 34px;
  border: none;
  text-align: center;
  color: #5f259d;
  font-weight: bold;
  width: 819px;
  text-transform: capitalize;
  background-color: #ffce00;
  border-radius: 50px;
  font-family: "Inter";
  appearance: none;

  &::placeholder {
    color: #5f259d;
  }
`;

function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", gender: "" });
  const [isImg, setIsImg] = useState(false);
  const [isGenderSelected, setIsGenderSelected] = useState(false);

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
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        const section = document.querySelector("section");
        if (section) {
          section.classList.add("animate__animated", "animate__bounceOut");
          setTimeout(() => {
            navigate("/swap", {
              state: { sourceImage: blob, isImg, userDetails },
            });
          }, 1000);
        }
      }, "image/jpeg");
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenderSelected(true); // Show the gender-specific image selection after form submission
  };

  const selectImage = (image) => {
    setIsImg(image);
    setIsCameraOn(true); // Once image is selected, start the camera to capture the image
  };

  return (
    <section style={{ textAlign: "center", width: "100vw", height: "100vh" }}>
      {/* Form Submission Screen */}
      {!isGenderSelected && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledInput
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          <StyledSelect
            name="gender"
            value={userDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </StyledSelect>

          <button
            type="submit"
            style={{
              width: "340px",
              height: "103px",
              cursor: "pointer",
              border: "none",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#ffff",
              color: "#303030",
              position: "absolute",
              top: "61%",
              left: "12%",
              borderRadius: "50px",
            }}
          >
            START
          </button>
        </form>
      )}

      {/* Gender-based Image Selection */}
      {isGenderSelected && (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {userDetails.gender === "male" && (
            <>
              <img
                src={m1}
                alt="Male Option"
                style={imgStyle}
                onClick={() => selectImage("m1.jpg")}
              />
              <img
                src={m2}
                alt="Male Option"
                style={imgStyle}
                onClick={() => selectImage("m2.jpg")}
              />
              <img
                src={m3}
                alt="Male Option"
                style={imgStyle}
                onClick={() => selectImage("m3.jpg")}
              />
            </>
          )}

          {userDetails.gender === "female" && (
            <>
              <img
                src={f1}
                alt="Female Option"
                style={imgStyle}
                onClick={() => selectImage("f1.jpg")}
              />
              <img
                src={f2}
                alt="Female Option"
                style={imgStyle}
                onClick={() => selectImage("f2.jpg")}
              />
              <img
                src={f3}
                alt="Female Option"
                style={imgStyle}
                onClick={() => selectImage("f3.jpg")}
              />
            </>
          )}
        </div>
      )}

      {/* Camera Capture Screen */}
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
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxWidth: "950px",
              maxHeight: "500px",
            }}
          ></video>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <button
            style={{
              width: "250px",
              height: "80px",
              cursor: "pointer",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#3A49D4",
              color: "#fff",
              position: "absolute",
              top: "80%",
            }}
            onClick={captureImage}
          >
            Capture
          </button>
        </div>
      )}
    </section>
  );
}

export default Camer;
