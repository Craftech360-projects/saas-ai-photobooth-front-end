import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ThankYouScreen.css";

const ThankYouScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Clear localStorage data
    localStorage.removeItem("userData");
    localStorage.removeItem("selectedGender");
    localStorage.removeItem("selectedCharacter");
    localStorage.removeItem("capturedImageBlob");
    localStorage.removeItem("swappedImageUrl");

    // Auto-redirect to welcome screen after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div className="screen welcome-background">
      <div className="thank-you-container">
        <h1 className="title7">Thank You!</h1>

        <div className="thank-you-content">
          <p className="thank-you-message">
            We hope you enjoyed our photobooth experience!
          </p>

          <div className="countdown-container">
            <p>Returning to start in</p>
            <div className="countdown-timer">{countdown}</div>
            <p>seconds</p>
          </div>
        </div>

        <button className="start-over-button" onClick={handleStartOver}>
          START OVER
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;
