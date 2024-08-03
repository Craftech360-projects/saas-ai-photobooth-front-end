import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import bg00 from "/assets/bg00.png";
import buttonBg from "/assets/pst.png";
function Result() {
  const location = useLocation();
  const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (resultImageUrl) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = resultImageUrl;
    }
  }, [resultImageUrl]);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      {resultImageUrl ? (
        <div
          style={{
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent:'flex-end',
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "600px",
              height: "460px",
               marginBottom:'20px'
            }}
          >
            <img
              className="animate__animated animate__fadeIn"
              src={resultImageUrl}
              alt="Swapped Result"
              style={{
                width: "100%",
                objectFit: "cover",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
          {imageLoaded && (
            <div
              style={{
                width: "800px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom:'50px'
              }}
            >
              <QRCode
                value={resultImageUrl}
                size={150}
                style={{
                  border: "15px solid #D9D9D9",
                }}
                className="animate__animated animate__fadeIn"
              />
              <div
                style={{ color: "#fff" }}
                className="animate__animated animate__fadeIn"
              >
                <h2> Scan and Download</h2>
                <h3>your superhero alter ego.</h3>
              </div>
              <button
                type="submit"
                onClick={goHome}
                style={{
                  backgroundImage: `url(${buttonBg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "180px", // Adjust width as needed
                  height: "120px", // Adjust height as needed
                  border: "none",
                  cursor: "pointer", // Show pointer cursor on hover
                  backgroundColor: "transparent",
                }}
                className="animate__animated animate__fadeIn"
              ></button>
            </div>
          )}
        </div>
      ) : (
        <p>No image found. Please go back and try again.</p>
      )}
    </div>
  );
}

export default Result;
