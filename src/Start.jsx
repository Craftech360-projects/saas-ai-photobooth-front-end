// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from './assets/background1.jpg'; // Import the image

function Start() {
    const navigate = useNavigate();

    return (
        <div 
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${backgroundImage})`, // Set the background image
                backgroundSize: "cover", // Make sure the image covers the entire viewport
                backgroundPosition: "center", // Center the background image
                backgroundRepeat: "no-repeat", // Prevent image repetition
            }}
        >
            <div>
            {/* //    <h1 style={{ color: "#fff" }}>Welcome to the App</h1> Optional title */}  
                
                <button
                    type="submit"
                    style={{
                        width: "250px",
                        height: "80px",
                        cursor: "pointer",
                        border: "2px solid white",  // Add a border to make it visible
                        fontSize: "40px",
                        backgroundColor: "#fff",  // Transparent background
                        color: "#710100",  // White text color
                        transition: "background-color 0.3s ease, color 0.3s ease",
                        borderRadius: "40px",
                        position: "absolute",
                        bottom: "20%",  // Position 25% from the bottom
                        left: "50%",  // Center horizontally
                        transform: "translateX(-50%)"  // Offset by 50% of its width to center exactly
                    }}
                    onClick={() => navigate("/start")}
                >
                    START
                </button>
            </div>
        </div>
    );
}

export default Start;
