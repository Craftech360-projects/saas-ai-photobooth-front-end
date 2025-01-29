// import React, { useState, useEffect, useRef, forwardRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import QRCode from "qrcode.react";
// import buttonBg from "/assets/pst.png";
// import ReactToPrint from "react-to-print";

// // Forward ref for the component to print
// const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
//   return (
//     <div ref={ref}>
//       <img
//         src={resultImageUrl}
//         alt="Swapped Result"
//         style={{ width: "100%", height: "100%" }}
//       />
//     </div>
//   );
// });

// function Result() {
//   const location = useLocation();
//   const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
//   const navigate = useNavigate();
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const printRef = useRef(); // Ref for the printable component

//   useEffect(() => {
//     if (resultImageUrl) {
//       console.log("resultImageUrl", resultImageUrl);
//       const img = new Image();
//       img.onload = () => {
//         setImageLoaded(true);
//       };
//       img.src = resultIageUrl;
//     }
//   }, [resultImageUrl]);

//   const goHome = () => {
//     navigate("/");
//   };

//   return (
//     <div>
//       {resultImageUrl ? (
//         <div
//           style={{
//             textAlign: "center",
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-end",
//             alignItems: "center",
//           }}
//         >
//           <img
//             className="animate__animated animate__fadeIn animate__slower"
//             src={resultImageUrl}
//             alt="Swapped Result"
//             style={{
//               width: "788px",
//               height: "1042px",
//               objectFit: "cover",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: "16px",
//               border: "16px solid #30A6EC",
//             }}
//           />
//           {imageLoaded && (
//             <div
//               style={{
//                 width: "70%",
//                 height: "25%",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <div
//                 style={{
//                   width: "50%",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <QRCode
//                   value={resultImageUrl}
//                   size={300}
//                   style={{
//                     border: "20px solid #30A6EC",
//                     borderRadius: "16px",
//                     padding: "15px",
//                     backgroundColor: "#fff",
//                   }}
//                 />
//               </div>

//               <div
//                 style={{
//                   width: "35%",
//                   marginLeft: "100px",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     color: "#fff",
//                     textAlign: "left",
//                     backgroundColor: "rgb(0 29 131)",
//                   }}
//                 >
//                   <h1 style={{ fontSize: "42px", lineHeight: "40px" }}>
//                     {" "}
//                     Scan and Download
//                   </h1>
//                   <h1
//                     style={{
//                       fontSize: "20px",
//                       lineHeight: "25px",
//                       marginTop: "-16px",
//                     }}
//                   >
//                     your warrior alter ego.
//                   </h1>
//                 </div>
//                 {/* ReactToPrint with a reference to the rendered PrintableImage */}
//                 <ReactToPrint
//                   trigger={() => (
//                     <button
//                       type="button"
//                       style={{
//                         width: "250px",
//                         height: "80px",
//                         cursor: "pointer",
//                         borderRadius: "10px",
//                         border: "none",
//                         fontSize: "40px",
//                         fontWeight: "bold",
//                         backgroundColor: "#ffffff", // Default color
//                         color: "#000000", // Default text color
//                         transition: "background-color 0.3s ease, color 0.3s ease",
//                         marginBottom: "16px",
//                         marginTop: "16px",
//                       }}
//                     >
//                       Print
//                     </button>
//                   )}
//                   content={() => printRef.current} // Correct reference to PrintableImage
//                 />

//                 {/* The PrintableImage component */}
//                 <div style={{ display: "none" }}>
//                   <PrintableImage
//                     ref={printRef}
//                     resultImageUrl={resultImageUrl}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   style={{
//                     width: "250px",
//                     height: "80px",
//                     cursor: "pointer",
//                     borderRadius: "10px",
//                     border: "none",
//                     fontSize: "40px",
//                     fontWeight: "bold",
//                     backgroundColor: "#ffffff", // Default color
//                     color: "#000000", // Default text color
//                     transition: "background-color 0.3s ease, color 0.3s ease",
//                   }}
//                   onClick={(e) => {
//                     e.target.style.backgroundColor = "#30A6EC"; // Change background
//                     e.target.style.color = "#ffffff"; // Change text color
//                     setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
//                   }}
//                 >
//                   Restart
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>No image found. Please go back and try again.</p>
//       )}
//     </div>
//   );
// }

// export default Result;


import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
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
      console.log("resultImageUrl", resultImageUrl);
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = resultImageUrl; // Corrected typo: resultIageUrl -> resultImageUrl
    }
  }, [resultImageUrl]);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/bg.png')", // Add background image URL here
        backgroundSize: "cover", // Make sure the background covers the entire screen
        backgroundPosition: "center", // Center the background
        flexDirection: "column", // Stack the content vertically

      }}
    >
      {resultImageUrl ? (
        <div
          style={{
            textAlign: "center",
            width: "100%",
            maxWidth: "500px", // Control the max width of QR code and buttons
          }}
        >
          {/* QR Code in the center */}
          <QRCode
            value={resultImageUrl}
            size={300}
            style={{
              border: "20px solid #30A6EC",
              borderRadius: "16px",
              padding: "15px",
              backgroundColor: "#fff",
            }}
          />

          {imageLoaded && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between", // Align buttons in one row
                marginTop: "20px",
              }}
            >
              {/* Print Button */}
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    style={{
                      width: "120px",
                      height: "50px",
                      cursor: "pointer",
                      borderRadius: "10px",
                      border: "none",
                      fontSize: "20px",
                      fontWeight: "bold",
                      backgroundColor: "#ffffff", // Default color
                      color: "#000000", // Default text color
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    Print
                  </button>
                )}
                content={() => printRef.current} // Correct reference to PrintableImage
              />

              {/* Restart/Home Button */}
              <button
                type="button"
                style={{
                  width: "120px",
                  height: "50px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                  backgroundColor: "#ffffff", // Default color
                  color: "#000000", // Default text color
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={(e) => {
                  e.target.style.backgroundColor = "#30A6EC"; // Change background
                  e.target.style.color = "#ffffff"; // Change text color
                  setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
                }}
              >
                Home
              </button>
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
