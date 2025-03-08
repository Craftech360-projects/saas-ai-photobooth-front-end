import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CameraView({ videoRef, canvasRef, onCapture, userDetails, selectedImage }) {
  const camera = "/camera.png";
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);
  const previewRef = useRef(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  // Initialize camera when component mounts or when retaking photo
  useEffect(() => {
    if (!capturedImage) {
      const initCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
      
      initCamera();
    }
    
    // Cleanup function to stop the stream when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  const handleCapture = () => {
    setIsCapturing(true);
    
    // Get the canvas context and draw the current video frame
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to data URL for preview
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);
    
    // Also get the blob for navigation
    canvas.toBlob((blob) => {
      setCapturedBlob(blob);
    }, "image/jpeg");
    
    setIsCapturing(false);
  };

  const handleSubmit = () => {
    if (capturedBlob) {
      // Add animation class to the container
      const section = document.querySelector(".text-center");
      if (section) {
        section.classList.add("animate__animated", "animate__fadeOut");
      }
      
      // Log the data being passed to help debug
      console.log("Navigating with data:", {
        sourceImage: capturedBlob,
        selectedImage,
        userDetails
      });
      
      // Navigate to swap page after animation
      setTimeout(() => {
        navigate("/swap", {
          state: { 
            sourceImage: capturedBlob, // Changed back to sourceImage to match what Swap.jsx expects
            selectedImage: selectedImage || {}, 
            userDetails: userDetails || {}
          },
        });
      }, 1000);
    } else {
      console.error("No image captured");
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setCapturedBlob(null);
  };

  return (
    <div className="text-center w-screen h-screen flex flex-col justify-center items-center bg-no-repeat">
      <div className="text-center text-6xl font-semibold mb-2 text-white">Smile for the</div>
      <div className="text-center text-6xl font-semibold mb-8 text-white">camera</div>
      
      {!capturedImage ? (
        // Camera view
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>
          <div className="w-[194px] h-[194px] cursor-pointer absolute top-[70%] left-1/2 -translate-x-1/2 z-20">
            {isCapturing && (
              <div className="absolute inset-0 animate-ping-once rounded-full bg-white opacity-50 z-10"></div>
            )}
            <button
              onClick={handleCapture}
              className={`w-full h-full transition-transform duration-300 ease-in-out ${isCapturing ? 'scale-110' : 'hover:scale-105'}`}
            >
              <img src={camera} alt="Capture" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </button>
          </div>
        </>
      ) : (
        // Preview with submit/retake buttons
        <>
          <div className="relative">
            <img 
              src={capturedImage} 
              alt="Preview" 
              className="block shadow-md object-cover w-full h-full max-w-[650px] max-h-[650px]" 
              ref={previewRef}
            />
          </div>
          
          <div className="flex gap-12 mt-12">
            <button 
              onClick={handleRetake}
              className="bg-white text-violet-600 px-12 py-6 rounded-full text-3xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              Retake
            </button>
            
            <button 
              onClick={handleSubmit}
              className="bg-violet-600 text-white px-12 py-6 rounded-full text-3xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}