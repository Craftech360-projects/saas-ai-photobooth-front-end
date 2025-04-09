import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GenderConfirmationScreen.css";

const GenderConfirmationScreen = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");

  useEffect(() => {
    const storedGender = localStorage.getItem("selectedGender");
    if (storedGender) {
      setGender(storedGender);
    } else {
      // If no gender is stored, go back to gender selection
      navigate("/gender-selection");
    }
  }, [navigate]);

  const handleNext = () => {
    navigate("/character-selection");
  };

  const handleBack = () => {
    navigate("/gender-selection");
  };

  return (
    <div className="screen content-background">
      <div className="gender-confirmation-container">
        <h1 className="title">CONFIRM YOUR SELECTION</h1>

        <div className="confirmation-content">
          <div className="gender-display">
            <span>You selected:</span>
            <h2>{gender?.toUpperCase()}</h2>
          </div>

          <p className="confirmation-message">
            You'll be shown characters based on your gender selection.
          </p>
        </div>

        <div className="button-group">
          <button className="button back-button" onClick={handleBack}>
            BACK
          </button>
          <button className="button next-button" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderConfirmationScreen;
