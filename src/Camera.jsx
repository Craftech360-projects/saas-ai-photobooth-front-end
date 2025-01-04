/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import female from "/assets/female.png";
import male from "/assets/male.png";
import couple from "/assets/couple.png";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import firstImg from "/firstImg.png";
import two from "/assets/two.png";
import glamour from "/glamour.png"; // Import the PNG image
import outerspace from "/outerspace.png"; // Import the PNG image
import underwater from "/underwater.png"; // Import the PNG image
import scifi from "/scifi.png"; // Import the PNG image
import sports from "/sports.png"; // Import the PNG image

import f1 from "/f1.jpeg"; // Import the PNG image
import f2 from "/f2.jpeg"; // Import the PNG image
import f3 from "/f3.jpeg"; // Import the PNG image
import f4 from "/f4.jpeg"; // Import the PNG image
import f5 from "/f5.jpeg"; // Import the PNG image

import london from "/london.png"; // Import the PNG image
import newyork from "/newyork.png"; // Import the PNG image
import paris from "/paris.png"; // Import the PNG image
import tokyo from "/tokyo.png"; // Import the PNG image
import toronto from "/toronto.png"; // Import the PNG image
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
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #182060;
  font-weight: bold;
  width: 760px;
  height: 110px;
  text-transform: capitalize;
  background-color: #fff;
  border-left: 15px solid #53b5ed;
  border-right: 15px solid #53b5ed;
  &::placeholder {
    color: #182060; /* Apply placeholder color */
  }
`;

const StyledSelect = styled.select`
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #182060;
  font-weight: bold;
  width: 830px;
  height: 110px;
  text-transform: capitalize;
  background-color: #fff;
  border-left: 15px solid #53b5ed;
  border-right: 15px solid #53b5ed;
  appearance: none; /* Remove default select box styling */

  &::placeholder {
    color: #182060; /* Apply placeholder color */
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
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScene, setShowScene] = useState(false);
  const [imageFolder, setImageFolder] = useState(null);

  const startProcess = () => {
    setIsStarted(false);
    setIsGenderShow(false);
    setIsGender(userDetails.gender);
    setGender(selectedOption);
    console.log(selectedOption, gender);
    setSelectedOption(null);
    setShowScene(true);
    setImageFolder(`${selectedOption}/${userDetails.gender}`);
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
          section.classList.add("animate__animated", "animate__fadeOut");
          setTimeout(() => {
            navigate("/swap", {
              state: { sourceImage: blob, userDetails, selectedImage: isImg },
            });
          }, 1000); // Adjust timing as needed
          console.log(isImg, userDetails);
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
    setIsGenderShow(true);
    // setIsGender(userDetails.gender)
    setIsStarted(false);
    console.log(userDetails, "userDetails");
  };

  const handleSelection = (option) => {
    setSelectedOption(option); // Set the selected option
  };

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
            {/* <img
              src={firstImg}
              alt=""
              style={{
                width: "100%",
                position: "absolute",
                zIndex: "-100",
              }}
            /> */}
            <StyledInput
              type="text"
              name="name"
              placeholder="Enter name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />

            <StyledInput
              type="email"
              name="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />

            {/* Gender Selection Dropdown */}
            <StyledSelect
              name="gender"
              value={userDetails.gender || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </StyledSelect>

            <button
              type="submit"
              style={{
                width: "428px",
                height: "104px",
                cursor: "pointer",
                border: "none",
                fontSize: "50px",
                fontWeight: "bolder",
                backgroundColor: "#fff",
                color: "#002992",
                transition: "background-color 0.3s ease, color 0.3s ease",
                position: "absolute",
                top: "70%",
              }}
            >
              Continue
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            src={firstImg}
            alt=""
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "-100",
            }}
          /> */}
          <h1
            style={{
              textAlign: "center",
              fontSize: "48px",
              letterSpacing: "3px",
              color: "#fff",
            }}
          >
            Select your template
          </h1>
          <div
            style={{
              textAlign: "center",
              width: "100vw",
              height: "350px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                margin: "10px",
                backgroundImage: `url(${glamour})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === "glamour"
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection("glamour")}
            ></button>

            <button
              style={{
                margin: "10px",
                backgroundImage: `url(${outerspace})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === "outerspace"
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection("outerspace")}
            ></button>

            <button
              style={{
                margin: "10px",
                backgroundImage: `url(${underwater})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === "underwater"
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection("underwater")}
            ></button>

            {/* Show the continue button only if an option is selected */}
            {selectedOption && isGenderShow && (
              <button
                type="submit"
                style={{
                  width: "286px",
                  height: "80px",
                  cursor: "pointer",
                  border: "none",
                  fontSize: "45px",
                  fontWeight: "bold",
                  backgroundColor: "#FFF",
                  color: "#002992",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  position: "absolute",
                  top: "77%",
                }}
                onClick={() => startProcess()}
              >
                Next
              </button>
            )}
          </div>
          <div
            style={{
              width: "100vw",
              height: "350px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                margin: "10px",
                backgroundImage: `url(${scifi})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === "scifi"
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection("scifi")}
            ></button>

            <button
              style={{
                margin: "10px",
                backgroundImage: `url(${sports})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === "sports"
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection("sports")}
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
              boxShadow: "0 1px 10px rgba(255, 255, 255, 0.5)",
              objectFit: "cover", // Ensures the video fills the container while maintaining aspect ratio
              width: "100%", // Makes the video responsive
              height: "100%", // Fills the parent container
              maxWidth: "650px", // Restrict maximum width for better control
              maxHeight: "650px",
              // border: "12px solid #FFCE00", // Restrict maximum height for better control
            }}
          ></video>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            style={{
              width: "428px",
              height: "104px",
              cursor: "pointer",
              border: "none",
              fontSize: "40px",
              fontWeight: "bold",
              backgroundColor: "#fff", // Default color
              color: "#002992", // Default text color
              transition: "background-color 0.3s ease, color 0.3s ease",
              position: "absolute",
              top: "73%",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#002992"; // Change background
              e.target.style.color = "#ffffff"; // Change text color
              setTimeout(captureImage, 500); // Correctly invoke captureImage after 500ms
            }}
          >
            Capture{" "}
          </button>
        </div>
      )}

      {setShowScene && (
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
          <h1
            style={{
              textAlign: "center",
              fontSize: "48px",
              letterSpacing: "3px",
              color: "#fff",
            }}
          >
            Select your scene
          </h1>
          <div
            style={{
              textAlign: "center",
              width: "100vw",
              height: "350px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="animate__animated animate__fadeIn animate__slower"
              style={{
                margin: "10px",
                backgroundImage: `url(${imageFolder}/1.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === `${imageFolder}/1.png`
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection(`${imageFolder}/1.png`)}
            ></button>

            <button
              className="animate__animated animate__fadeIn animate__slower"
              style={{
                margin: "10px",
                backgroundImage: `url(${imageFolder}/2.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === `${imageFolder}/2.png`
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection(`${imageFolder}/2.png`)}
            ></button>

            <button
              className="animate__animated animate__fadeIn animate__slower"
              style={{
                margin: "10px",
                backgroundImage: `url(${imageFolder}/3.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === `${imageFolder}/3.png`
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection(`${imageFolder}/3.png`)}
            ></button>

            {/* Show the continue button only if an option is selected */}
            {selectedOption && !isGenderShow && (
              <button
                type="submit"
                style={{
                  width: "286px",
                  height: "80px",
                  cursor: "pointer",
                  border: "none",
                  fontSize: "45px",
                  fontWeight: "bold",
                  backgroundColor: "#FFF",
                  color: "#002992",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  position: "absolute",
                  top: "77%",
                }}
                // onClick={() => startProcess()}
                onClick={(e) => {
                  e.target.style.boxShadow =
                    "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                  setTimeout(() => {
                    setIsImg(selectedOption);
                    setIsCameraOn(true);
                    setShowScene(false);
                    setSelectedOption(null);
                  }, 500);
                }}
              >
                Next
              </button>
            )}
          </div>
          <div
            style={{
              width: "100vw",
              height: "350px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="animate__animated animate__fadeIn animate__slower"
              style={{
                margin: "10px",
                backgroundImage: `url(${imageFolder}/4.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === `${imageFolder}/4.png`
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection(`${imageFolder}/4.png`)}
            ></button>

            <button
              className="animate__animated animate__fadeIn animate__slower"
              style={{
                margin: "10px",
                backgroundImage: `url(${imageFolder}/5.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "240px",
                height: "320px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "border 0.3s ease",
                boxSizing: "border-box",
                boxShadow:
                  selectedOption === `${imageFolder}/5.png`
                    ? "0px 0px 19px 16px #3A49D4"
                    : "none", // Shadow when selected
              }}
              onClick={() => handleSelection(`${imageFolder}/5.png`)}
            ></button>
          </div>
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
              fontSize: "54px",
              marginBottom: "20px", // Optional: Add spacing below the text
            }}
          >
            Select your template MALE
          </div>
          {/* First row with two images */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "16px",
              marginTop: "20px", // Adds gap between the images in the first row
            }}
          >
            <img
              src={london}
              alt="Swapped Result"
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/1.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={toronto}
              alt="Swapped Result"
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/2.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={paris}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/3.png`);
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
              marginTop: "20px", // Adds gap between the images in the second row
            }}
          >
            <img
              src={tokyo}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/4.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={newyork}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/5.png`);
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
              fontSize: "54px",
              marginBottom: "20px", // Optional: Add spacing below the text
            }}
          >
            Select your template FEMALE
          </div>
          {/* First row with two images */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "16px",
              marginTop: "20px", // Adds gap between the images in the first row
            }}
          >
            <img
              src={london}
              alt="Swapped Result"
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/1.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={toronto}
              alt="Swapped Result"
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/2.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={paris}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/3.png`);
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
              marginTop: "20px", // Adds gap between the images in the second row
            }}
          >
            <img
              src={tokyo}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/4.png`);
                  setIsCameraOn(true);
                  setIsGender("");
                }, 500);
              }}
            />
            <img
              src={newyork}
              style={imgStyle}
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
                setTimeout(() => {
                  setIsImg(`/${gender}/5.png`);
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
