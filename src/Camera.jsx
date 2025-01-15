/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import female from "/assets/female.png";
import male from "/assets/male.png";
import captureImageIcon from "/assets/pcp.png"; // Import the PNG image
import two from "/assets/two.png";
import m1 from "/m1l.png"; // Import the PNG image
import m2 from "/m2l.png"; // Import the PNG image
import m3 from "/m3l.png"; // Import the PNG image
import m4 from "/m4l.png"; // Import the PNG image
import m5 from "/m5l.png"; // Import the PNG image

import f1 from "/f1l.png"; // Import the PNG image
import f2 from "/f2l.png"; // Import the PNG image
import f3 from "/f3l.png"; // Import the PNG image
import f4 from "/f4l.png"; // Import the PNG image
import f5 from "/f5l.png"; // Import the PNG image

const imgStyle = {
  width: "auto",
  height: "226px",
  objectFit: "contain",
  justifyContent: "center",
  alignItems: "center", 
  gap:"30px",
  // border: '5px solid #fff',
  cursor: "pointer",
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
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenderShow(true);
    setIsStarted(false);
    console.log(userDetails, "userDetails");
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
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={userDetails.name}
        onChange={handleChange}
        style={{
          padding: "20px",
          fontSize: "34px",
          border: "none",
          textAlign: "left",
          color: "#001965",
          fontWeight: "bold",
          width: "55%",
          textTransform: "capitalize",
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
          textAlign: "left",
          color:"#001965",
          fontWeight: "bold",
          width: "55%",
        }}
        required
      />
 <button
  type="submit"
  style={{
    width: "250px",
    height: "80px",
    cursor: "pointer",
    border: " solid white", // White border
    fontSize: "40px",
  
     backgroundColor: "#001965",
    color: "#fff", // White text color
    transition: "background-color 0.3s ease, color 0.3s ease",
    position: "absolute",
    top: "80%",
    borderRadius: "40px", // Makes the button rounded
  }}
>
  Submit
</button>

    </form>
  </>
      )}

      {/* Gender Selcet Code  */}
      {/* {isGenderShow && (
  <div
    style={{
      textAlign: "center",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      style={{
        marginTop: "30px",
        fontSize: "32px", // Adjust the font size
     //   fontWeight: "bold", // Make the text bold
        color: "#fff", // White text color
       // Space between the text and the buttons
        letterSpacing: "2px", // Space out the letters a bit
      }}
    >
      Select Gender
    </div>

    <div
      style={{
        marginTop: "30px",
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "298px",
          height: "291px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          transition: "border 0.3s ease",
          boxSizing: "border-box",
          marginRight: "20px",
          marginTop: "30px",
        }}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)";
          setTimeout(() => startProcess("male"), 500);
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
          cursor: "pointer",
          backgroundColor: "transparent",
          transition: "border 0.3s ease",
          boxSizing: "border-box",
          marginLeft: "20px",
          marginTop: "30px",
        }}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)";
          setTimeout(() => startProcess("female"), 500);
        }}
      ></button>
    </div>
  </div>
)} */}
{isGenderShow && (
  <div
    style={{
      textAlign: "center",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column", // Stack the elements vertically
      justifyContent: "center", // Center the content vertically
      alignItems: "center", // Center the content horizontally
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      style={{
        fontSize: "32px", // Adjust the font size
        color: "#fff", // White text color
        letterSpacing: "2px", // Space out the letters a bit
      }}
    >
      Select Gender
    </div>

    <div
      style={{
        width: "100%",
        height: "auto", // Allow height to adjust based on content
        display: "flex",
        flexDirection: "row", // Place buttons horizontally
        justifyContent: "center", // Center the buttons horizontally
        gap: "20px", // Space between buttons
        marginTop: "30px", // Space between text and buttons
      }}
    >
      <button
        style={{
          borderRadius: "10px",
          backgroundImage: `url(${male})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "298px",
          height: "291px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          transition: "border 0.3s ease",
          boxSizing: "border-box",
        }}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)";
          setTimeout(() => startProcess("male"), 500);
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
          cursor: "pointer",
          backgroundColor: "transparent",
          transition: "border 0.3s ease",
          boxSizing: "border-box",
        }}
        onClick={(e) => {
          e.target.style.boxShadow =
            "0px 0px 19px 16px rgba(255,255,255,0.5)";
          setTimeout(() => startProcess("female"), 500);
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
              maxWidth: "950px", // Restrict maximum width for better control
              maxHeight: "500px", // Restrict maximum height for better control
            }}
          ></video>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            
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
                borderRadius: "40px", // Makes the button rounded
              }}
            
            onClick={(e) => {
              e.target.style.backgroundColor = "#3A49D0"; // Change background
              e.target.style.color = "#ffffff"; // Change text color
              setTimeout(captureImage, 500); // Correctly invoke captureImage after 500ms
            }}
          >
            Capture
          </button>
        </div>
      )}
      {/* {isGender === "male" && (
        <>
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            gap: "8px",
          }}
        >
          <div> <div
        style={{
        
          fontSize: "32px", // Adjust the font size
          fontWeight: "bold", // Make the text bold
          color: "#fff", // White text color
         // Space between the text and the buttons
          letterSpacing: "2px", // Space out the letters a bit
        }}
      >
        Select Gender
      </div></div>
          <img
            src={m1}
            alt="Swapped Result"
            style={imgStyle}
            onClick={(e) => {
              e.target.style.boxShadow =
                "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
              setTimeout(() => {
                // handleSubmit(e, `m1.jpg`);
                setIsImg(`lm.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
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
                // handleSubmit(e, `m2.jpg`);
                setIsImg(`nm.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
          <img
            src={m3}
            alt="Swapped Result"
            style={imgStyle}
            onClick={(e) => {
              e.target.style.boxShadow =
                "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
              setTimeout(() => {
                // handleSubmit(e, `m1.jpg`);
                setIsImg(`pm.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
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
                // handleSubmit(e, `m2.jpg`);
                setIsImg(`sm.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
          <img
            src={m5}
            alt="Swapped Result"
            style={imgStyle}
            onClick={(e) => {
              e.target.style.boxShadow =
                "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
              setTimeout(() => {
                // handleSubmit(e, `m1.jpg`);
                setIsImg(`tm.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
        </div></>
        
      )} */}




      {/* {isGender === "female" && (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            gap: "8px",
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
                // handleSubmit(e, `f1.jpg`);
                setIsImg(`lf.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
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
                // handleSubmit(e, `f2.jpg`);
                setIsImg(`nf.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
          <img
            src={f3}
            alt="Swapped Result"
            style={imgStyle}
            onClick={(e) => {
              e.target.style.boxShadow =
                "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
              setTimeout(() => {
                // handleSubmit(e, `f2.jpg`);
                setIsImg(`pf.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
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
                // handleSubmit(e, `f2.jpg`);
                setIsImg(`sf.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
          <img
            src={f5}
            alt="Swapped Result"
            style={imgStyle}
            onClick={(e) => {
              e.target.style.boxShadow =
                "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
              setTimeout(() => {
                // handleSubmit(e, `f2.jpg`);
                setIsImg(`tf.png`);
                setIsCameraOn(true);
                setIsGender("");
              }, 500); // Wait 50ms then proceed
            }}
          />
        </div>
      )} */}

{(isGender === "male" || isGender === "female") && (
  <div
    style={{
      textAlign: "center",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column", // Stack vertically
      justifyContent: "center", // Center the content vertically
      alignItems: "center", // Center the content horizontally
      backgroundRepeat: "no-repeat",
      gap: "20px", // Space between the text and the images
    }}
  >
    {/* Centered "Select Character" Text */}
    <div
      style={{
        fontSize: "40px", // Adjust the font size
    
        color: "#fff", // White text color
        letterSpacing: "2px", // Space out the letters a bit
        marginBottom:"30px",
      }}
    >
      Select your Character
    </div>

    {/* Images row for Male */}
    {isGender === "male" && (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row", // Place images horizontally
          justifyContent: "center", // Center the images horizontally
          gap: "30px", // Space between images
        }}
      >
        <img
          src={m1}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 16px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`m1.png`);
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
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`m2.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
        <img
          src={m3}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`m3.png`);
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
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`m4.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
        <img
          src={m5}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`m5.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
      </div>
    )}

    {/* Images row for Female */}
    {isGender === "female" && (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row", // Place images horizontally
          justifyContent: "center", // Center the images horizontally
          gap: "30px", // Space between images
        }}
      >
        <img
          src={f1}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`f1.png`);
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
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`f2.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
        <img
          src={f3}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`f3.png`);
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
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`f4.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
        <img
          src={f5}
          alt="Swapped Result"
          style={imgStyle}
          onClick={(e) => {
            e.target.style.boxShadow = "0px 0px 19px 16px rgba(255,255,255,0.5)";
            setTimeout(() => {
              setIsImg(`f5.png`);
              setIsCameraOn(true);
              setIsGender("");
            }, 500);
          }}
        />
      </div>
    )}
  </div>
)}

    </section>
  );
}

export default Camer;
