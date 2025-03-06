import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import female from "/assets/female.png";
import male from "/assets/male.png";
import captureImageIcon from "/assets/pcp.png";

const imgStyle = {
  width: "auto",
  height: "auto",
  maxWidth: "400px",
  maxHeight: "250px",
  objectFit: "contain",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "5px solid #FFCE00",
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
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #0F2C4E;
  border: 4px solid #0F2C4E;
  border-radius: 44px;
  font-weight: bold;
  width: 760px;
  height: 110px;
  text-transform: capitalize;

  

  &::placeholder {
    color: #0F2C4E;
  }
`;

const StyledSelect = styled.select`
  padding-left: 35px;
  font-size: 34px;
  border: none;
  text-align: left;
  color: #0F2C4E;
  font-weight: bold;
  width: 830px;
  height: 110px;
  text-transform: capitalize;
  

  border-radius: 44px; /* Adjust the value as needed */

  appearance: none;
  &::placeholder {
    color: #0F2C4E;
  }
`;

const backgroundImage = "/background2.jpg";

function Camer() {
  const [imageFolder, setImageFolder] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const navigate = useNavigate();
  
  const [gender, setGender] = useState(null);
  const [isGender, setIsGender] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isGenderShow, setIsGenderShow] = useState(false);
 
  const [isImg, setIsImg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "rahul",
    email: "rahul@gmail.com",
    gender: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
const [showPreview, setShowPreview] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [showWarning, setShowWarning] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
const [isFormValid, setIsFormValid] = useState(false);
const [capturedBlob, setCapturedBlob] = useState(null);

  const camera= "/camera.png";
  const submit= "/submit.png";
 ;

  // Modify the startProcess function to randomly select an image
const startProcess = (selectedGender) => {
  console.log(selectedGender);
  userDetails.gender = selectedGender;
  setIsStarted(false);
  setIsGenderShow(false);
  setIsGender(selectedGender);
  setGender(selectedOption);
  setSelectedOption(null);
  
  // Set up image folder path
  const folderPath = `holi/${selectedGender}`;
  setImageFolder(folderPath);
  
  // Randomly select one of the 5 images
  const randomImageNumber = Math.floor(Math.random() * 5) + 1;
  const selectedImage = `${folderPath}/${randomImageNumber}.jpg`;
  
  // Set the selected image and turn on camera
  setIsImg(selectedImage);
  setIsCameraOn(true);
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
    setTimeout(() => setIsPressed(false), 300);
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        setCapturedBlob(blob); // Store the blob
        setPreviewImage(URL.createObjectURL(blob));
        setShowPreview(true);
      }, "image/jpeg");
    }, 500);
  };
  const handleRetake = () => {
    setShowPreview(false);
    setPreviewImage(null);
    setIsCameraOn(true); // Turn the camera back on
  
    // Ensure camera stream is restarted
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error restarting camera:", err);
      });
  };
  const handleFinalSubmit = () => {
    if (!capturedBlob) {
      console.error("No image captured");
      return;
    }
  
    const section = document.querySelector("section");
    if (section) {
      section.classList.add("animate__animated", "animate__fadeOut");
      navigate("/swap", {
        state: { 
          sourceImage: capturedBlob, 
          userDetails, 
          selectedImage: isImg 
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  
    // Validate name
    if (name === 'name') {
      if (value.trim().length < 2) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }
  
    // Validate email
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  
    // Check if form is valid
    setTimeout(() => {
      const isValid = userDetails.name.trim().length >= 2 && 
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email);
      setIsFormValid(isValid);
    }, 0);
  
    setShowWarning(false);
  };

  const handleSubmit = (e) => {
    console.log("here")
    e.preventDefault();
    if (!userDetails.name || !userDetails.email || emailError) {
      setShowWarning(true); // Show warning message if name or email is empty or email is invalid
    } else {
      setIsGenderShow(true);
      setIsStarted(false);
      console.log(userDetails, "userDetails");
    }
  };

  
  return (
    <section
      className="text-center w-screen h-screen"
      style={{  backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
  
{isStarted && (
  <>
    <div
      className="flex flex-col gap-5 w-full h-full rounded-lg items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute top-[40%] flex flex-col gap-8 items-center w-full">
        <div className="flex flex-col items-center">
          <StyledInput
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          {nameError && (
            <div className="text-red-500 text-2xl mt-2">Name must be at least 2 characters long</div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <StyledInput
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          {emailError && (
            <div className="text-red-500 text-2xl mt-2">Please enter a valid email address</div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-[428px] h-[104px] mt-16 cursor-pointer border-none transition-all ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <img
            src={submit}
            alt="Submit"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain",
              filter: !isFormValid ? 'grayscale(100%)' : 'none'
            }}
          />
        </button>

        {showWarning && (
          <div className="text-red-500 text-3xl mt-4">
            Please fill in all fields correctly before proceeding
          </div>
        )}
      </div>
    </div>
  </>
)}
      {isGenderShow && (
        <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-no-repeat">
          <div className="text-6xl font-bold text-sky-950 tracking-wide mb-4">Select Your Gender</div>

          <div className="flex  items-center justify-center gap-5 mt-6">
            <button
              className="rounded-lg p-2 bg-cover bg-center bg-no-repeat w-[363px] h-[454px] border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${male})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(15,44,78,0.5)]");
                setTimeout(() => startProcess("male"), 500);
              }}
            ></button>

            <button
              className="rounded-lg p-2 bg-cover bg-center bg-no-repeat w-[363px] h-[454px]  border-none cursor-pointer bg-transparent transition-shadow duration-300"
              style={{ backgroundImage: `url(${female})` }}
              onClick={(e) => {
                e.target.classList.add("shadow-[0px_0px_19px_16px_rgba(15,44,78,0.5)]");
                setTimeout(() => startProcess("female"), 500);
              }}
            ></button>
          </div>
        </div>
      )}


      {isCameraOn && !showPreview && (
        <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
          <div className="text-center text-7xl font-bold mb-2 text-sky-950">Color Up with</div>
          <div className="text-center text-7xl font-bold mb-8 text-sky-950">Just a Smile</div>
          <video
            ref={videoRef}
            autoPlay
            className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>
          <button
  onClick={(e) => {
    e.target.classList.add("shadow-[0_0_19px_16px_rgba(15,44,78,0.5)]");
    setIsPressed(true);
     setTimeout(captureImage, 500);
  }} 
  className={`w-[358px] h-[103px] cursor-pointer absolute top-[76%] left-1/2 -translate-x-1/2   bg-sky-950 text-white  py-4 text-4xl font-bold rounded-[60px] ${
    isPressed ? 'scale-95 opacity-75' : ''
    
  }`}
>Capture

</button>
        </div>
      )}

{showPreview && (
  <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
    <div className="text-center text-7xl font-bold mb-8 text-sky-950">Preview</div>
    <img 
      src={previewImage} 
      alt="Preview" 
      className="block shadow-md object-cover w-full h-full max-w-[670px] max-h-[670px]"
    />
    <div className="flex  gap-4 mt-16 px-3">
      <button
        onClick={handleRetake}
        className="bg-sky-950 w-[350px] h-[100px]    text-white  py-4 text-4xl font-bold rounded-[60px]"
      >
        Retake
      </button>
      <button
        onClick={handleFinalSubmit}
        className="bg-sky-950 w-[350px] h-[100px]  text-white  py-4 text-4xl font-bold rounded-[60px]"
      >
        Submit
      </button>
    </div>
  </div>
)}

    </section>
  );
}

export default Camer;