import React, { useEffect, useState, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import f1 from "/assets/1.png";
import f2 from "/assets/2.png";
// Define the PrintableImage component using forwardRef
const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "600px",
        height: "550px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Ensures that the overflowed part of the image is hidden
        position: "relative", // This enables absolute positioning for child elements
      }}
    >
      {/* Main Image */}
      <img
        src={resultImageUrl}
        alt="Swapped Result"
        style={{
          width: "120%", // Increase the width to 120% so that 20% from both sides is cut off
          height: "100%",
          objectFit: "cover", // Ensures that the image covers the div without distortion
          objectPosition: "center", // Keeps the image centered while cropping the sides
        }}
      />

      {/* Overlay Image 1 (Top Left Corner) */}
      <img
        src={f1} // Replace with your overlay image URL
        alt="Overlay Image 1"
        style={{
          position: "absolute", // Position the image on top of the result image
          top: "10px", // Position near the top
          left: "20px", // Position near the left
          width: "50px", // Set the size of the overlay image
          height: "50px", // Set the size of the overlay image
          zIndex: 1, // Ensure the overlay image appears above the main image
        }}
      />

      {/* Overlay Image 2 (Top Right Corner) */}
      <img
        src={f2} // Replace with your second overlay image URL
        alt="Overlay Image 2"
        style={{
          position: "absolute", // Position the image on top of the result image
          top: "10px", // Position near the top
          right: "20px", // Position near the right
          width: "100px", // Set the size of the overlay image
          height: "50px", // Set the size of the overlay image
          zIndex: 1, // Ensure the overlay image appears above the main image
        }}
      />
    </div>
  );
});

const ResultDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultImageUrl = location.state?.resultImageUrl;
  const [imageLoaded, setImageLoaded] = useState(false);
  const printRef = React.createRef();

  useEffect(() => {
    if (!resultImageUrl) {
      navigate("/"); // Redirect if no result
    }
  }, [resultImageUrl, navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Display the image */}
      <img
        src={resultImageUrl}
        alt="Swapped Result"
        style={{
          width: "700px", // Halved the original width (788px / 2)
          height: "720px",
          objectFit: "cover",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "16px",
        }}
        onLoad={() => setImageLoaded(true)}
      />

     

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30%",
          marginTop: "32px",
          paddingLeft: "40px",
        }}
      >
        <QRCode
          value={resultImageUrl}
          size={200}
          style={{
            padding: "15px",
            backgroundColor: "#fff",
          }}
        />

        <h1 style={{ textAlign: "center", color: "#fff" , marginBottom:'50px'}}>
          Scan the QR Code
          <br /> to Download Image
        </h1>

        {imageLoaded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <ReactToPrint
            trigger={() => (
              <button
                type="button"
                style={{
                  width: "200px",
                  height: "40px",
                  cursor: "pointer",
                  borderRadius: "16px",
                  border: "none",
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                Print
              </button>
            )}
            content={() => printRef.current}
          />
          <button
            onClick={() => navigate("/")}
            style={{
              width: "200px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "16px",
              border: "none",
              fontSize: "25px",
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              color: "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
              marginBottom: "16px",
              marginTop: "16px",
            }}
          >
            Restart
          </button>
        </div>
      )}
      </div>

      {/* Hidden Printable Image Component */}
      <div style={{ display: "none" }}>
        <PrintableImage ref={printRef} resultImageUrl={resultImageUrl} />
      </div>

      {/* Print Button */}
    </div>
  );
};

export default ResultDisplay;
