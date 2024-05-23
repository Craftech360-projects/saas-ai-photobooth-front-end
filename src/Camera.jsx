/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import captureImageIcon from '/assets/cp.png'; // Import the PNG image
import retakeImageIcon from '/assets/x.png'; // Import the PNG image
import rightImageIcon from '/assets/right.png'; // Import the PNG image
import logo from '/assets/cftt.png'; // Import the PNG image

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
  boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
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
boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
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
boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3);
`;

function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isClicked, setIsClicked] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("error:", err);
          setIsCameraOn(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  const captureImage = () => {
    const section = document.querySelector('.cp');
    section.classList.add('animate__animated', 'animate__flash');
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      setIsClicked(false);
    }, 200);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setIsClicked(true);
  };

  const submitImage = () => {
    const blob = dataURItoBlob(capturedImage);
    // Add animation before navigation
    const section = document.querySelector('.submit');
    if (section) {
      section.classList.add('animate__animated', 'animate__flash');
      setTimeout(() => {
        navigate('/swap', { state: { sourceImage: blob } });
      }, 1000); // Adjust timing as needed
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <section style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {isCameraOn && (
          <video ref={videoRef} autoPlay style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}></video>
        )}
          <img src={logo}style={{ position: 'absolute',
            top: 0,
            left: 0,
            margin:'20px',
            width:'300px',
            zIndex:999}} alt="" />
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      
        {capturedImage && (
          <img src={capturedImage} alt="Captured" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            height: '80%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.3)'
          }} />
        )}
        {isClicked && (
          <CaptureButton className='cp' onClick={captureImage} ></CaptureButton>
        )}
        {capturedImage && (
          <>
          <div style={{  width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RetakeButton onClick={retakeImage}></RetakeButton>
            <SubmitButton className='submit' onClick={submitImage}></SubmitButton>
          </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Camer;
