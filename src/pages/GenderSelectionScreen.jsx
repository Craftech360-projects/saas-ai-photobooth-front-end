import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GenderSelectionScreen.css";

const GenderSelectionScreen = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    if (selectedGender) {
      // Store gender in localStorage
      localStorage.setItem("selectedGender", selectedGender);
      navigate("/character-selection");
    } else {
      alert("Please select a gender to continue");
    }
  };

  return (
    <div className="screen content-background">
      <div className="gender-selection-container">
        <h1 className="title3">Select your Gender</h1>

        <div className="gender-options">
          <div
            className={`gender-option ${
              selectedGender === "male" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelect("male")}
          >
            <div className="gender-icon male-icon"></div>
            <span>Male</span>
          </div>

          <div
            className={`gender-option ${
              selectedGender === "female" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelect("female")}
          >
            <div className="gender-icon female-icon"></div>
            <span>Female</span>
          </div>
        </div>

        <button
          className="gender-button"
          onClick={handleNext}
          disabled={!selectedGender}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenderSelectionScreen;
