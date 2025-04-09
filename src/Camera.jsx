import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import m1 from "/assets/m1.png";
import m2 from "/assets/m2.png";
import m3 from "/assets/m3.png";
import f1 from "/assets/f1.png";
import f2 from "/assets/f2.png";
import f3 from "/assets/f3.png";
import m1l from "/assets/m1l.png";
import m2l from "/assets/m2l.png";
import m3l from "/assets/m3l.png";
import f1l from "/assets/f1l.png";
import f2l from "/assets/f2l.png";
import f3l from "/assets/f3l.png";

const imgStyle = {
  width: "250px",
  height: "300px",
  objectFit: "cover",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "26px",
  border: "3.5px solid", // Base border style
};

const CharacterImage = ({ src, onClick, borderColor }) => (
  <img
    src={src}
    alt="Character"
    style={{ ...imgStyle, borderColor: `#${borderColor}` }}
    onClick={onClick}
  />
);

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isImg, setIsImg] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    if (!userDetails.name || !gender) {
      toast.error("👋 Please fill in all fields!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          backgroundColor: "#323232",
          color: "#FFCE00",
          fontFamily: "UniNeue",
          fontSize: "16px",
          borderRadius: "10px",
        },
      });
      return;
    }

    setIsStarted(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsDropdownOpen(false);
  };

  const renderCharacterSelection = () => {
    // Display images
    const displayImages = gender === "male" ? [m1, m2, m3] : [f1, f2, f3];
    // Images to pass to setIsImg
    const swapImages = gender === "male" ? [m1l, m2l, m3l] : [f1l, f2l, f3l];

    return (
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
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            color: "#fff",
            letterSpacing: "2px",
          }}
        >
          Select your character
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {/* First row - 2 images */}
            <CharacterImage
              src={displayImages[0]}
              borderColor="FF6900"
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => {
                  setIsImg(swapImages[0]); // Pass corresponding swap image
                  setIsCameraOn(true);
                  setGender("");
                }, 500);
              }}
            />
            <CharacterImage
              src={displayImages[1]}
              borderColor="FFCE00"
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => {
                  setIsImg(swapImages[1]); // Pass corresponding swap image
                  setIsCameraOn(true);
                  setGender("");
                }, 500);
              }}
            />
          </div>
          <div>
            {/* Second row - 1 image */}
            <CharacterImage
              src={displayImages[2]}
              borderColor="FFCE00"
              onClick={(e) => {
                e.target.style.boxShadow =
                  "0px 0px 19px 16px rgba(255,255,255,0.5)";
                setTimeout(() => {
                  setIsImg(swapImages[2]); // Pass corresponding swap image
                  setIsCameraOn(true);
                  setGender("");
                }, 500);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <ToastContainer />

      {isStarted && (
        <>
          <style>
            {`
              input::placeholder {
                color: #000;
                font-weight: 500;
                font-size: 32px;
                opacity: 1;
                font-family: UniNeue
              }
              input, .gender-dropdown {
                outline: none;
              }
              button:hover {
                background-color: #000000;
                color: #E6E6E6;
              }
              .dropdown-options {
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
                width: 80%;
                z-index: 1;
                background: #707070;
                border-radius: 0px 0px 30px 30px;
                margin-top: 0px;
              }
              .dropdown-option {
                padding: 10px;
                font-size: 28px;
                color: #000;
                cursor: pointer;
                text-align: center;
                font-family: UniNeue;
                transition: background-color 0.3s ease;
                border-radius: 0px 0px 30px 30px;
              }
              .dropdown-option.male {
                background-color: #323232;
                color: #fff;
              }
              .dropdown-option.female {
                background-color: #707070;
                color: #fff;
              }
              .dropdown-option:hover {
               background-color: #ffdd4d;
              }
                .dropdown-container {
                position: relative;
                width: 65%;
                margin: 0 auto; // Center align the container
                margin-bottom: 20px;
              }
              .gender-dropdown {
                width: 100%;
                box-sizing: border-box; // Important for consistent sizing
              }
              .dropdown-arrow {
                position: absolute;
                right: 30px;
                top: 40%;
                transform: translateY(-50%);
                pointer-events: none;
                border: solid #000;
                border-width: 0 4px 4px 0;
                display: inline-block;
                padding: 8px;
                transform: rotate(45deg);
                transition: transform 0.3s ease;
              }
              .dropdown-arrow.open {
                transform: translateY(-50%) rotate(225deg);
              }
                .required-field::after {
                content: '*';
                color: #FF6900;
                margin-left: 5px;
              }
              .toast-message {
                font-family: UniNeue;
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
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={handleChange}
              style={{
                fontFamily: "UniNeue",
                padding: "10px 10px 10px 30px",
                fontSize: "32px",
                border: "none",
                textAlign: "left",
                color: "#000",
                width: "60%",
                backgroundColor: "#FFCE00",
                borderRadius: "60px",
              }}
              required
            />
            <div
              className="dropdown-container required-field"
              ref={dropdownRef}
            >
              <div
                className="gender-dropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  fontFamily: "UniNeue",
                  padding: "10px 10px 10px 30px",
                  fontSize: "32px",
                  border: "none",
                  textAlign: "left",
                  color: "#000",
                  width: "100%",
                  backgroundColor: "#FFCE00",
                  borderRadius: "60px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {gender || "Select Gender"}
                <span
                  className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
                ></span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-options">
                  <div
                    className="dropdown-option male"
                    onClick={() => handleGenderSelect("male")}
                  >
                    Male
                  </div>
                  <div
                    className="dropdown-option female"
                    onClick={() => handleGenderSelect("female")}
                  >
                    Female
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                width: "200px",
                height: "60px",
                cursor: "pointer",
                fontSize: "40px",
                backgroundColor: "#FFCE00",
                border: "none",
                color: "#000",
                transition: "background-color 0.3s ease, color 0.3s ease",
                position: "absolute",
                top: "60%",
                borderRadius: "40px",
                fontFamily: "UniNeue",
                letterSpacing: "1px",
              }}
            >
              START
            </button>
          </form>
        </>
      )}

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
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxWidth: "350px",
              maxHeight: "500px",
              borderRadius: "26px",
              border: "5px solid #FFCE00",
              outline: "none",
            }}
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            style={{
              width: "200px",
              height: "55px",
              cursor: "pointer",
              fontSize: "30px",
              fontFamily: "UniNeueBold",
              backgroundColor: "#FFF",
              color: "#000",
              transition: "background-color 0.3s ease, color 0.3s ease",
              position: "absolute",
              top: "78%",
              borderRadius: "40px",
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = "#3A49D0";
              e.target.style.color = "#ffffff";
              setTimeout(captureImage, 500);
            }}
          >
            CAPTURE
          </button>
        </div>
      )}

      {(gender === "male" || gender === "female") && renderCharacterSelection()}
    </section>
  );
}

export default Camera;
