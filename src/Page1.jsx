import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Page1() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
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
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob(blob => {
      navigate('/edit', { state: { sourceImage: blob } });
    }, 'image/jpeg');
  };

  return (
    <div>
      <h2>Face Swap App</h2>
      {/* <button onClick={() => setIsCameraOn(!isCameraOn)}>
        {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
      </button> */}
      {isCameraOn && <video ref={videoRef} autoPlay style={{ display: 'block' }}></video>}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {isCameraOn && <button onClick={captureImage}>Capture Image</button>}
    </div>
  );
}

export default Page1;
