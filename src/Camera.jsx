/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import female from "/assets/female.png";
import male from "/assets/male.png";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import two from "/assets/two.png";
import m1 from "/m1.jpeg"; // Import the PNG image
import m2 from "/m2.jpeg"; // Import the PNG image
import m3 from "/m3.jpeg"; // Import the PNG image
import m4 from "/m4.jpeg"; // Import the PNG image
import m5 from "/m5.jpeg"; // Import the PNG image

import f1 from "/f1.jpeg"; // Import the PNG image
import f2 from "/f2.jpeg"; // Import the PNG image
import f3 from "/f3.jpeg"; // Import the PNG image
import f4 from "/f4.jpeg"; // Import the PNG image
import f5 from "/f5.jpeg"; // Import the PNG image
const imgStyle = {
  width: "auto", // Keep the width auto to preserve the aspect ratio
  height: "auto", // Keep the height auto to preserve the aspect ratio
  maxWidth: "400px", // Increase the max-width for a bigger image
  maxHeight: "250px", // Increase the max-height for a bigger image
  objectFit: "contain", // Ensure the image fits within the box without distortion
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "5px solid #FFCE00", // Border around the image
};


const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 270px; /* Adjust width and height according to your image dimensions */
  height: 100px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: relative;
  margin-top: 90px;
`;

const StyledInput = styled.input`
  padding: 35px;
   font-size: 34px;
  border: none;
  text-align: center;
  color: #5F259D;
  font-weight: bold;
  width: 749px;
  text-transform: capitalize;
  background-color: #FFCE00;
  border-radius: 50px;
  font-family: "Inter";

  &::placeholder {
    color: #5F259D; /* Apply placeholder color */
  }
`;

const StyledSelect = styled.select`
  padding: 35px;
  font-size: 34px;
  border: none;
  text-align: center;
  color: #5F259D;
  font-weight: bold;
  width: 819px;
  text-transform: capitalize;
  background-color: #FFCE00;
  border-radius: 50px;
  font-family: "Inter";
  appearance: none; /* Remove default select box styling */
  
  &::placeholder {
    color: #5F259D; /* Apply placeholder color */
  }
`;
function Camer() {
  const maleImages = ["male1", "male1"];
  const femaleImages = ["female1", "female1"];
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [gender, setGender] = useState(null);
  const [isGender, setIsGender] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isGenderShow, setIsGenderShow] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", gender: "" });
  const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const startProcess = (value) => {
    setIsStarted(false);
    setIsGenderShow(false);
    setIsGender(value);
    // setIsCameraOn(true);
    // const selectedImg =
    //   value === "male"
    //     ? getRandomImage(maleImages)
    //     : getRandomImage(femaleImages);
    setGender(value);
   
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
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        // Add animation before navigation
        const section = document.querySelector("section");
        if (section) {
          section.classList.add("animate__animated", "animate__bounceOut");
          setTimeout(() => {
            navigate("/swap", {
              state: { sourceImage: blob, isImg, userDetails },
            });
          }, 1000); // Adjust timing as needed
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(userDetails, "userDetails");
  // };
 const handleSubmit = (e) => {
  e.preventDefault();
//  setIsGenderShow(true);
  setIsStarted(false);

  console.log(userDetails, "userDetails")
  if (userDetails.gender) {
    startProcess(userDetails.gender); // Pass the selected gender (male or female) dynamically
  } else {
    // Handle case when gender is not selected (optional)
    alert("Please select a gender.");
  }
  ;};
 
  // 'animate__animated animate__bounceOut'
  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Start button code  */}
      {isStarted && (
    
    <>
    <style>
      {`
        input::placeholder {
          color: #9A9A9A; /* Placeholder text color */
          font-weight: bold;
        }

        input {
          outline: none;
        }

        button:hover {
          background-color: #2A3AB5; /* Hover background color */
          color: #E6E6E6; /* Hover text color */
        }
      `}
    </style>
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
      
      {/* <input
  type="text"
  name="name"
  placeholder="Enter your name"
  value={userDetails.name}
  onChange={handleChange}
  style={{
    padding: "20px",
    fontSize: "34px",
    border: "none",
    textAlign: "center",
    color: "#5F259D",
    fontWeight: "bold",
    width: "55%",
    textTransform: "capitalize",
    backgroundColor: "#FFCE00",
    borderRadius: "15px",
    fontFamily: "UniNeue", // Apply the custom font
   
  }}
  required
/>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={userDetails.email}
        onChange={handleChange}
        style={{
          padding: "20px",
          fontSize: "34px",
          border: "none",
          textAlign: "center",
          color: "#5F259D",
          fontWeight: "bold",
          width: "55%",
          textTransform: "capitalize",
          backgroundColor: "#FFCE00",
          borderRadius: "15px",
          fontFamily: "UniNeue"
        }}
        required
      /> */}

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

 {/* Gender Selection Dropdown */}
 <StyledSelect
          name="gender"
          value={userDetails.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </StyledSelect>

      <button
        type="submit"
        style={{
          width: "300px",
          height: "80px",
          cursor: "pointer",
          border: "none",
          fontSize: "40px",
          fontWeight: "bold",
          backgroundColor: "#ffff",
          color: "#303030",
          transition: "background-color 0.3s ease, color 0.3s ease",
          // position: "absolute",
          // top: "80%",
        
          borderRadius: "50px",
        }}
      >
        START
      </button>
    </form>
  </>
      )}

      {/* Gender Selcet Code  */}
      {isGenderShow && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundImage: `url(${two})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "720px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${male})`,
                backgroundSize: "cover", // Ensure the image covers the button entirely
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "298px",
                height: "291px",
                border: "none", // Start with no border
                cursor: "pointer",
                backgroundColor: "transparent", // Transparent to show background image
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box",
                marginRight: "20px", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
              }}
            ></button>

            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${female})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "298px",
                height: "291px",
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box", // Ensures the border is included in the button's size
                marginLeft: "20px",
              }}
              onClick={(e) => {
                // e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
              }}
            ></button>
          </div>
        </div>
      )}
      {/* Options Selcet Code  */}
      {isOptions && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundImage: `url(${two})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={two}
            alt=""
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "-100",
            }}
          />
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
                backgroundSize: "cover", // Ensure the image covers the button entirely
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px",
                height: "358px",
                border: "none", // Start with no border
                cursor: "pointer",
                backgroundColor: "transparent", // Transparent to show background image
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box",
                marginRight: "80px", // Ensures the border is included in the button's size
                marginLeft: "165px", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                setTimeout(() => startProcess("male"), 500); // Proceed after 500ms
              }}
            ></button>

            <button
              style={{
                borderRadius: "10px",
                backgroundImage: `url(${female})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "293px", // Adjust width as needed
                height: "358px", // Adjust height as needed
                border: "none",
                cursor: "pointer", // Show pointer cursor on hover
                backgroundColor: "transparent",
                transition: "border 0.3s ease", // Smooth border transition
                boxSizing: "border-box", // Ensures the border is included in the button's size
              }}
              onClick={(e) => {
                e.target.style.border = "5px solid #30A6EC"; // Set a visible border on click
                setTimeout(() => startProcess("female"), 500); // Proceed after 500ms
              }}
            ></button>
          </div>
        </div>
      )}

      {/* Camera Capture Code  */}
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
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: "block",
              boxShadow: isCameraOn ? "0 1px 10px rgba(0, 0, 0, 0.5)" : "none",
              objectFit: "cover", // Ensures the video fills the container while maintaining aspect ratio
              width: "100%", // Makes the video responsive
              height: "100%", // Fills the parent container
              maxWidth: "650px", // Restrict maximum width for better control
              maxHeight: "650px",
              border: "12px solid #FFCE00", // Restrict maximum height for better control
            }}
          ></video>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            style={{
              width: "340px",
              height: "103px",
              cursor: "pointer",
      
               borderRadius: "50px",
              border: "none",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#fff", // Default color
              color: "#303030", // Default text color
              transition: "background-color 0.3s ease, color 0.3s ease",
              position: "absolute",
              top: "73%",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#3A49D0"; // Change background
              e.target.style.color = "#ffffff"; // Change text color
              setTimeout(captureImage, 500); // Correctly invoke captureImage after 500ms
            }}
          >
CAPTURE          </button>
        </div>
      )}
    {isGender === "male" && (
    
  <div
    style={{
      display: "flex", // Use flex for layout
      flexDirection: "column", // Stack items vertically
      justifyContent: "center", // Center items vertically within the container
      alignItems: "center", // Center items horizontally within the container
      height: "100vh", // Make sure it takes full screen height
      width: "100vw", // Make sure it takes full screen width
    }}
  >
     <div
      style={{
        color: "white", // Make text white
        fontWeight: "bold", // Make text bold
        textAlign: "center", // Center the text horizontally
        fontFamily: "UniNeue", // Set the font family to UniNeue
        fontSize: "54px",
        marginBottom: "20px", // Optional: Add spacing below the text
      }}
    >
      Select your template
    </div>
    {/* First row with two images */}
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px",
        marginTop:"20px"  // Adds gap between the images in the first row
      }}
    >
      <img
        src={m1}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`m1.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
      <img
        src={m2}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`m2.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>

    {/* Second row with two images */}
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px", 
        marginTop:"20px" // Adds gap between the images in the second row
      }}
    >
      <img
        src={m3}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`m3.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
      <img
        src={m4}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`m4.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>

    {/* Third row with one image */}
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px",
        marginTop:"20px" // Adds gap to the third row
      }}
    >
      <img
        src={m5}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`m5.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>
  </div>
)}

{isGender === "female" && (
  <div
    style={{
      display: "flex", // Use flex for layout
      flexDirection: "column", // Stack items vertically
      justifyContent: "center", // Center items vertically within the container
      alignItems: "center", // Center items horizontally within the container
      height: "100vh", // Make sure it takes full screen height
      width: "100vw", // Make sure it takes full screen width
    }}
  >
     <div
      style={{
        color: "white", // Make text white
        fontWeight: "bold", // Make text bold
        textAlign: "center", // Center the text horizontally
        fontFamily: "UniNeue", // Set the font family to UniNeue
        fontSize: "54px", // Optional: Add font size for better visibility
        marginBottom: "20px", // Optional: Add spacing below the text
      }}
    >
      Select your template
    </div>
    {/* First row with two images */}
    <div
      style={{
          marginTop:"20px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px", // Adds gap between the images in the first row
      }}
    >
      <img
        src={f1}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`f1.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
      <img
        src={f2}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`f2.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>

    {/* Second row with two images */}
    <div
      style={{
        marginTop:"20px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px", // Adds gap between the images in the second row
      }}
    >
      <img
        src={f3}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`f3.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
      <img
        src={f4}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`f4.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>

    {/* Third row with one image */}
    <div
      style={{
        marginTop:"20px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "16px", // Adds gap to the third row
      }}
    >
      <img
        src={f5}
        alt="Swapped Result"
        style={imgStyle}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
          setTimeout(() => {
            setIsImg(`f5.jpeg`);
            setIsCameraOn(true);
            setIsGender("");
          }, 500);
        }}
      />
    </div>
  </div>
)}

    </section>
  );
}

export default Camer;
