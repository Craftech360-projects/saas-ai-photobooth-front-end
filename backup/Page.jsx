import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import imageData from './data.json'; // Adjust path as necessary

function App() {
  const [sourceImage, setSourceImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [enhance, setEnhance] = useState(false);
  const [resultImage, setResultImage] = useState('');
  const [imageCaptured, setImageCaptured] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("error:", err));
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setSourceImage(new File([blob], "webcam.jpg", { type: "image/jpeg" }));
      setImageCaptured(true);
    }, 'image/jpeg');
  };

  const selectRandomImage = (imagesArray) => {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const selectedImage = imagesArray[randomIndex];
    fetch(selectedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `selectedImage_${randomIndex}.jpg`, { type: "image/jpeg" });
        setTargetImage(file);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetImage) {
      alert("Please select a target image first.");
      return;
    }
    const formData = new FormData();
    formData.append('targetImage', sourceImage);
    formData.append('sourceImage', targetImage);
    formData.append('enhance', enhance);

    try {
      const response = await fetch('https://8c66-106-51-185-121.ngrok-free.app/api/swap-face/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setResultImage(imageObjectURL);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Face Swap App</h2>
        <video ref={videoRef} autoPlay style={{ display: 'block' }}></video>
        <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
        <button onClick={captureImage}>Capture Image</button>
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={() => selectRandomImage(imageData.imagesArray1)}>
            ball catch
          </button>
          <button type="button" onClick={() => selectRandomImage(imageData.imagesArray2)}>
          century celebration
          </button>
          <button type="button" onClick={() => selectRandomImage(imageData.imagesArray3)}>
            Use Image Set 3
          </button>
          <div>
            <label>
              <input type="checkbox" checked={enhance} onChange={() => setEnhance(!enhance)} />
              Enhance Image
            </label>
          </div>
          <button type="submit">Swap Faces</button>
        </form>
        {resultImage && <img src={resultImage} alt="Result" style={{ marginTop: '20px' }} />}
      </header>
    </div>
  );
}

export default App;
