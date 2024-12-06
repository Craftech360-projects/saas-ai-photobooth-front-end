import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Form = styled.form`
margin-top: 1000px;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  border-radius: 8px;
  width: 700px; // Fixed width
  height: auto; // Let the height adjust based on content
  margin-left: auto;
  margin-right: auto; /* Center the form horizontally */
  align-items: center; /* Center the content inside the form horizontally */
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  position: relative;
  &:focus {
    border-color: #007bff;
  }
`;
const SubmitButton = styled.button`
  padding: 0.9rem;
  font-size: 2rem;
  margin-top:10px;
  width: 500px;
  color: ${(props) => (props.disabled ? "#666" : "#000")}; /* Change text color when disabled */
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")}; /* Change background when disabled */
  border: ${(props) => (props.disabled ? "1px solid #ccc" : "1px solid #0056b3")}; /* Border color when disabled */
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s, color 0.3s; /* Add transition for color change */
  position: relative;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#f0f0f0")}; /* Light background when hovered, only when enabled */
    color: ${(props) => (props.disabled ? "#666" : "#003366")}; /* Darken text when hovered, only when enabled */
  }
`;


const DisclaimerText = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Center the checkbox and text horizontally */
  margin-bottom: 1rem;
`;

const CustomCheckboxWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: white;
`;

const CustomCheckbox = styled.input`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  accent-color: #0056b3; /* Custom checkbox color */
  cursor: pointer;
  /* Custom checkbox styling */
  &:checked {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

function Start() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox
  const navigate = useNavigate();

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You can add any form validation here before navigating
    if (isChecked) {
      navigate("/form"); // Navigate to the '/form' page when "Start" button is clicked
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center",     // Center vertically
        height: "100vh",          // Full viewport height
        width: "100vw",
        backgroundImage: "url('/assets/disclaimer.png')", // Add your background image URL here
        backgroundSize: "cover",  // Ensure the background covers the entire page
        backgroundPosition: "center",  // Center the background image
        backgroundAttachment: "fixed",  // Make the background fixed during scroll
      }}
    >
      <Form onSubmit={handleSubmit}>
        <CheckboxWrapper>
          <CustomCheckboxWrapper>
            <CustomCheckbox
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
           <strong>  I agree to the above  terms and conditions</strong>.
          </CustomCheckboxWrapper>
        </CheckboxWrapper>

        <SubmitButton type="submit" disabled={!isChecked}>START</SubmitButton>
      </Form>
    </section>
  );
}

export default Start;
