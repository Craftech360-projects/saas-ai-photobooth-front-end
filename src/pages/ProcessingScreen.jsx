import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { swapFaces } from "../utils/faceSwapApi";
import "../styles/ProcessingScreen.css";

const ProcessingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processImages = async () => {
      try {
        // Get the necessary data
        const capturedImageBlob = localStorage.getItem("capturedImageBlob");
        const selectedCharacter = localStorage.getItem("selectedCharacter");
        const userDataString = localStorage.getItem("userData");
        const userData = JSON.parse(userDataString);

        if (!capturedImageBlob || !selectedCharacter || !userData) {
          navigate("/capture");
          return;
        }

        // Convert base64 to Blob if needed
        const imageBlob = await fetch(capturedImageBlob).then((r) => r.blob());

        // Call the face swap API with user details
        const swappedImageUrl = await swapFaces(imageBlob, selectedCharacter, {
          name: userData.name,
          email: userData.email,
          contact: userData.contact,
        });

        // Store the result
        localStorage.setItem("swappedImageUrl", swappedImageUrl);

        // Navigate to result screen
        navigate("/result");
      } catch (error) {
        console.error("Face swap failed:", error);
        alert("Failed to process image. Please try again.");
        navigate("/capture");
      }
    };

    processImages();
  }, [navigate]);

  return (
    <div className="screen third-background">
      <div className="processing-container">
        <h1 className="title8">We are creating...</h1>
        <div className="processing-frame">
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
