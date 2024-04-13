// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import captureImageIcon from '/assets/cp.png'; // Import the PNG image
const CaptureButton = styled.button`
  background-image: url(${captureImageIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  width: 100px; /* Adjust width and height according to your image dimensions */
  height: 100px;
  cursor: pointer;
  text-indent: -9999px; /* Hide text visually but keep it for accessibility */
  position: relative;
  margin-top:40px;
`;
function Camer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);

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
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob(blob => {
        // Add animation before navigation
        const section = document.querySelector('section');
        if (section) {
          section.classList.add('animate__animated', 'animate__bounceOut');
          setTimeout(() => {
            navigate('/swap', { state: { sourceImage: blob } });
          }, 1000); // Adjust timing as needed
        }
      }, 'image/jpeg');
    }, 200);
  };
  
  // 'animate__animated animate__bounceOut'
  return (
    <section style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          opacity: flash ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
        }}
      />
      {isCameraOn && <video ref={videoRef} autoPlay style={{
        display: 'block',
        boxShadow: isCameraOn ? '0 3px 30px rgba(0, 0, 0)' : 'none',
        aspectRatio:'1920 / 1080',
        objectFit:'cover',
        width:'800px',
        boxShadow: '#4cb95f 0px 0px 20px'
      }}></video>}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {isCameraOn && <CaptureButton onClick={captureImage}></CaptureButton>}
    </section>
  );
}

export default Camer;
