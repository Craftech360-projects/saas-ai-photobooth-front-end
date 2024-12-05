import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px; // Fixed width
  height: auto; // Let the height adjust based on content
  transition: background-color 0.3s ease, color 0.3s ease,
`;


const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.8rem;
  font-size: 1rem;
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
  padding: 0.8rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  &:hover {
    background-color: #0056b3;
  }
`;

function UserFormPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        
        navigate("/camera");
      } else {
        console.error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
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
    }}
  >
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  </section>
  
  );
}

export default UserFormPage;
