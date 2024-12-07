// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";


// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
  
//   padding: 2rem;
//   border-radius: 8px;
 
//   width: 500px; // Fixed width
//   height: auto; // Let the height adjust based on content
 
// `;


// const Input = styled.input`
//   margin-bottom: 1rem;
//   padding: 0.8rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   outline: none;
//   transition: border-color 0.3s;
//   position: relative;
//   &:focus {
//     border-color: #007bff;
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 0.8rem;
//   font-size: 2rem;
//   color: #fff;
//   background-color: #007bff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   position: relative;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// function UserFormPage() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("http://localhost:8000/api/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, name }),
//       });

//       if (response.ok) {
        
//         navigate("/camera");
//       } else {
//         console.error("Failed to submit the form");
//       }
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   return (
//     <section
//     style={{
//         display: "flex",
//         justifyContent: "center", // Center horizontally
//         alignItems: "center",     // Center vertically
//         height: "100vh",          // Full viewport height
//         width: "100vw",  
//     }}
//   >
//     <Form onSubmit={handleSubmit}>
//       <Input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <Input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <SubmitButton type="submit">SUBMIT</SubmitButton>
//     </Form>
//   </section>
  
//   );
// }

// export default UserFormPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Define a spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled Form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  width: 846px; /* Fixed width */
  height: auto; /* Let the height adjust based on content */
`;

// Styled Input
const Input = styled.input`
  margin-bottom: 2rem;
  padding: 0.8rem;
  font-size: 3rem;

  transition: border-color 0.3s, outline-color 0.3s;
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);   /* Set background to transparent */
  border: 2px solid white; /* White border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  &::placeholder {
    color: rgba(213, 239, 247, 0.8);  /* Set placeholder color to dark gray with transparency */
  }
  color: rgba(213, 239, 247);
  border-top-right-radius: 20px;  /* Top-right corner radius */
  border-bottom-left-radius: 20px;  /* Bottom-left corner radius */

  &:focus {
    border-color: #007bff;  /* Change border color on focus */
    outline: 2px solid #007bff;  /* Add outline color on focus */
  }
`;



// Styled Submit Button
const SubmitButton = styled.button`
  padding: 0.8rem;
  font-size: 3rem;
  color: #01032B;
  font-weight: bold; /* Make the font bold */
  background-color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Set width to 1/3 of the parent form */
  width: 33.33%;
  align-self: center; /* Center the button within the form */
  &:hover {
    background-color: #0056b3;
    color: #FFFFFF;
  }

  /* Disabled style */
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Styled Loader
const Loader = styled.div`
  width: 2rem;  /* Set the loader size */
  height: 2rem;
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
function UserFormPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    const timer = setTimeout(() => setLoading(false), 20000); // Maximum 20 seconds

    try {
      const response = await fetch("http://localhost:8000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      clearTimeout(timer); // Clear timeout if request completes
      setLoading(false); // Stop loader

      if (response.ok) {
        navigate("/camera");
      } else {
        console.error("Failed to submit the form");
      }
    } catch (error) {
      clearTimeout(timer); // Clear timeout if request fails
      setLoading(false); // Stop loader
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh", // Full viewport height
        width: "100vw",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? <Loader /> : "SUBMIT"}
        </SubmitButton>
      </Form>
    </section>
  );
}

export default UserFormPage;
