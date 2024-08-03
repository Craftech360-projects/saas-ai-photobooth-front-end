import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import bg00 from "/assets/bg00.png";
import buttonBg from "/assets/reset_btn.png";
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
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img
            className="animate__animated animate__fadeIn"
            src={resultImageUrl}
            alt="Swapped Result"
            style={{
              maxWidth: "100%",
              height: "50vh",
              display: imageLoaded ? "block" : "none",
              border: "5px solid #62D84E",
              borderRadius: "20px",
            }}
          />
          {imageLoaded && (
            <div      style={{
              textAlign: "center",
              width: "20vw",
              height: "50vh",
              display: "flex",
              alignItems:'center',
              flexDirection:'column',
            }}>
              <h2 style={{ color:'#62D84E' }}  className="animate__animated animate__fadeIn">Scan QR Code to View Image</h2>
              <QRCode
                value={resultImageUrl}
                size={200}
                style={{ border: "5px solid #62D84E", borderRadius: "20px",marginTop:'40px' }}
                className="animate__animated animate__fadeIn"
              />
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
                  bottom: "45%",
                  backgroundColor: "transparent",
                  marginTop:'30px'
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
