import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import buttonBg from "/assets/pst.png";
import ReactToPrint from "react-to-print";

// Forward ref for the component to print
const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
  return (
    <div ref={ref}>
      <img
        src={resultImageUrl}
        alt="Swapped Result"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

function Result() {
  const location = useLocation();
  const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const printRef = useRef(); // Ref for the printable component

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
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "600px",
              height: "460px",
              marginBottom: "280px",
            }}
          >
            <img
              className="animate__animated animate__fadeIn animate__slower"
              src={resultImageUrl}
              alt="Swapped Result"
              style={{
                width: "100%",
                objectFit: "cover",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
              }}
            />
          </div>
          {imageLoaded && (
            <div
              style={{
                width: "800px",
                height: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "150px",
              }}
            >
              <QRCode
                value={resultImageUrl}
                size={200}
                style={{
                  border: "15px solid #D9D9D9",
                }}
              />
              <div style={{ color: "#fff" }}>
                <h2> Scan and Download</h2>
                <h3>your superhero alter ego.</h3>
              </div>
              
              {/* ReactToPrint with a reference to the rendered PrintableImage */}
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    style={{
                      background: "#ffcc00",
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginBottom: "20px",
                    }}
                  >
                    Print Image
                  </button>
                )}
                content={() => printRef.current} // Correct reference to PrintableImage
              />

              {/* The PrintableImage component */}
              <div style={{ display: "none" }}>
                <PrintableImage ref={printRef} resultImageUrl={resultImageUrl} />
              </div>

              <button
                type="submit"
                onClick={goHome}
                style={{
                  backgroundImage: `url(${buttonBg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "180px",
                  height: "120px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
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
