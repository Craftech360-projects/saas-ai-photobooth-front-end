import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProcessingScreen.css";

const ProcessingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the necessary data
    const capturedImage = localStorage.getItem("capturedImageBlob");
    const selectedCharacter = localStorage.getItem("selectedCharacter");

    if (!capturedImage || !selectedCharacter) {
      navigate("/capture");
      return;
    }

    // Simulate processing with a delay
    const timeout = setTimeout(() => {
      // Store a fake result URL for demo purposes
      localStorage.setItem("swappedImageUrl", selectedCharacter);
      navigate("/result");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="screen third-background">
      <div className="processing-container">
        <h1 className="title">We are creating...</h1>

        <div className="processing-frame">
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        </div>

        <button className="button next-button" onClick={() => navigate("/result")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProcessingScreen;
