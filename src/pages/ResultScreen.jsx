import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResultScreen.css";

const ResultScreen = () => {
  const navigate = useNavigate();
  const [swappedImage, setSwappedImage] = useState(null);

  useEffect(() => {
    // Get the swapped image URL from localStorage
    const imageUrl = localStorage.getItem("swappedImageUrl");

    if (!imageUrl) {
      navigate("/capture");
      return;
    }

    setSwappedImage(imageUrl);
  }, [navigate]);

  const handleNext = () => {
    navigate("/qr-code");
  };

  return (
    <div className="screen third-background">
      <div className="result-container">
        <h1 className="title9">We are creating....</h1>

        {swappedImage && (
          <div className="result-image-container">
            <div className="result-wrapper">
              <img
                src={swappedImage}
                alt="Face Swap Result"
                className="result-image"
              />
            </div>
          </div>
        )}

        <div className="result-buttons">
          <button className="button next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
