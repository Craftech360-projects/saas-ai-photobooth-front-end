// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useRef, forwardRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import QRCode from "qrcode.react";
// import { supabase } from "./supabaseClient";
// import mn1 from "/assets/neonm1.png"; // Import the PNG image
// import mc1 from "/assets/cyberm1.png"; // Import the PNG image
// import ms1 from "/assets/spacem1.png"; // Import the PNG image
// // import mn2 from "/assets/neonm2.png"; // Import the PNG image
// import mr1 from "/assets/retrom1.png"; // Import the PNG image
// // import mr2 from "/assets/retrom2.png"; // Import the PNG image
// import fn1 from "/assets/neonf1.png"; // Import the PNG image
// import fn2 from "/assets/neonf2.png"; // Import the PNG image
// import fr1 from "/assets/retrof1.png"; // Import the PNG image
// import fr2 from "/assets/retrof2.png"; // Import the PNG image
// import fc1 from "/assets/cyberf1.png"; // Import the PNG image
// import fc2 from "/assets/cyberf2.png"; // Import the PNG image
// import fs1 from "/assets/spacef1.png"; // Import the PNG image
// import fs2 from "/assets/spacef2.png"; // Import the PNG image
// import ReactToPrint from "react-to-print";
// import styled, { keyframes } from "styled-components";


// const maleThemes = {
//   neon: [mn1],
//   retro: [mr1],
//   cyber: [mc1],
//   space: [ms1]
// };

// const femaleThemes = {
//   neon: [fn1, fn2],
//   retro: [fr1, fr2],
//   cyber: [fc1, fc2],
//   space: [fs1, fs2]
// };

// function Swap() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const sourceImageBlob = location.state?.sourceImage;
//   const selectedImage = location.state?.isImg;
//   // const userDetails = location.state?.userDetails;
//   const isGender = ""; // Static gender value from location state
//   const [loading, setLoading] = useState(false); // State to manage loading animation
//   const [resultImageUrl, setResultImageUrl] = useState(null); // Store the result image URL
//   const [imageLoaded, setImageLoaded] = useState(false); // State to check if image has been loaded
//   const printRef = useRef(); // Ref for printable image

//   const [hasFetched, setHasFetched] = useState(false);

//   useEffect(() => {
//     const processSwap = async () => {
//       try {
//         if (!sourceImageBlob || !gender || !selectedTheme) {
//           throw new Error("Missing required data");
//         }

//         // Get random image from selected theme
//         const themeImages = gender === 'male'
//           ? maleThemes[selectedTheme]
//           : femaleThemes[selectedTheme];

//         const randomImage = themeImages[Math.floor(Math.random() * themeImages.length)];

//         // Prepare form data
//         const formData = new FormData();
//         formData.append(
//           "targetImage",
//           new File([sourceImageBlob], "source.jpg", { type: "image/jpeg" })
//         );

//         // Fetch and add source image
//         const response = await fetch(randomImage);
//         const sourceBlob = await response.blob();
//         formData.append(
//           "sourceImage",
//           new File([sourceBlob], "target.jpg", { type: "image/jpeg" })
//         );

//         // API call
//         const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
//           method: "POST",
//           body: formData,
//         });

//         if (!swapResponse.ok) throw new Error("Swap failed");

//         // Process result
//         const swappedBlob = await swapResponse.blob();
//         const convertedBlob = await convertToJPEG(swappedBlob);

//         // Upload to storage
//         const fileName = `swapped/${Date.now()}.jpg`;
//         const { error } = await supabase.storage
//           .from("deloitte")
//           .upload(fileName, convertedBlob);

//         if (error) throw error;

//         setResultImageUrl(
//           `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/deloitte/${fileName}`
//         );

//       } catch (error) {
//         console.error("Processing error:", error);
//         navigate("/error", { state: { error: error.message } });
//       } finally {
//         setLoading(false);
//       }
//     };

//     processSwap();
//   }, [sourceImageBlob, gender, selectedTheme, navigate]);


//   // Function to handle image submission and swapping
//   const handleSubmit = async (e, selectedImage) => {
//     e.preventDefault();
//     setLoading(true); // Show loading animation

//     try {
//       if (!selectedImage || !sourceImageBlob) {
//         throw new Error("Missing required images");
//       }
//       const formData = new FormData();
//       formData.append(
//         "targetImage",
//         new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
//       );

//       const response = await fetch(selectedImage);

//       if (!response.ok) throw new Error("Failed to fetch target image");

//       const targetImageBlob = await response.blob();
//       formData.append(
//         "sourceImage",
//         new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
//       );

//       const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!swapResponse.ok) {
//         throw new Error("Something went wrong with the swap API call");
//       }

//       const swappedImageBlob = await swapResponse.blob();
//       const convertedBlob = await convertImageToJPEG(swappedImageBlob);

//       const fileName = `swapped-images/${Date.now()}-result.jpg`;
//       const { error: uploadError } = await supabase.storage
//         .from("deloitte")
//         .upload(fileName, convertedBlob, {
//           contentType: "image/jpeg",
//         });

//       if (uploadError) {
//         throw uploadError;
//       }

//       const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/deloitte/${fileName}`;
//       if (publicURL) {
//         setResultImageUrl(publicURL); // Set the result image URL
//         setLoading(false); // Hide loading animation
//       } else {
//         console.error("Failed to get public URL");
//         navigate("/error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       navigate("/error");
//     }
//   };

//   // Convert image to JPEG format
//   function convertImageToJPEG(blob) {
//     return new Promise((resolve, reject) => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       const img = new Image();

//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//         canvas.toBlob(resolve, "image/jpeg");
//       };

//       img.onerror = reject;
//       img.src = URL.createObjectURL(blob);
//     });
//   }
//   // Function to reset state and show image selection
//   const resetSelection = () => {
//     setResultImageUrl(null); // Reset the result image URL
//     setLoading(false); // Reset loading state
//     setImageLoaded(false); // Reset image loaded state
//   };

//   // Component to render the image selection (Male/Female)
//   const ImageSelectionForm = () => {
//     return (
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           alignItems: "center",
//           paddingTop: "800px",
//         }}
//       >
//         {isGender === "male" ? (
//           <>
//             <img
//               src={m1}
//               alt="Swapped Result"
//               style={{
//                 width: "70%",
//                 objectFit: "cover",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "16px",
//                 marginBottom: "42px",
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
//                 setTimeout(() => {
//                   handleSubmit(e, `m1.jpg`);
//                 }, 500); // Wait 50ms then proceed
//               }}
//             />

//             <img
//               src={m2}
//               alt="Swapped Result"
//               style={{
//                 width: "70%",
//                 objectFit: "cover",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "16px",
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
//                 setTimeout(() => {
//                   handleSubmit(e, `m2.jpg`);
//                 }, 500); // Wait 50ms then proceed
//               }}
//             />
//           </>
//         ) : (
//           <>
//             <img
//               src={f1}
//               alt="Swapped Result"
//               style={{
//                 width: "70%",
//                 objectFit: "cover",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "16px",
//                 marginBottom: "42px",
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
//                 setTimeout(() => {
//                   handleSubmit(e, `f1.jpg`);
//                 }, 500); // Wait 50ms then proceed
//               }}
//             />

//             <img
//               src={f2}
//               alt="Swapped Result"
//               style={{
//                 width: "70%",
//                 objectFit: "cover",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "16px",
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 e.target.style.boxShadow =
//                   "0px 0px 19px 16px rgba(255,255,255,0.5)"; // Change background
//                 setTimeout(() => {
//                   handleSubmit(e, `f2.jpg`);
//                 }, 500); // Wait 50ms then proceed
//               }}
//             />
//           </>
//         )}
//       </div>
//     );
//   };

//   const animloader = keyframes`
//     0% { height: 48px; }
//     100% { height: 4px; }
//   `;

//   const LoaderContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 10px; /* Spacing between bars */
//   `;

//   const Bar = styled.div`
//     width: 8px;
//     height: 40px;
//     border-radius: 4px;
//     background-color: ${(props) => props.color};
//     animation: ${animloader} 0.3s ${(props) => props.delay}s linear infinite alternate;
//   `;

//   const LoadingAnimation = () => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           width: "100vw",
//         }}
//       >
//         <LoaderContainer>
//           <Bar color="rgb(31 187 238)" delay={0.3} /> {/* Blue */}
//           <Bar color="rgb(176 210 55)" delay={0.2} /> {/* Green */}
//           <Bar color="rgb(255 202 7)" delay={0.1} /> {/* Yellow */}
//           <Bar color="rgb(212 58 42)" delay={0} /> {/* Red */}
//         </LoaderContainer>
//       </div>
//     );
//   };



//   // Create a PrintableImage component using forwardRef
//   const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
//     return (
//       <div ref={ref}>
//         <img
//           src={resultImageUrl}
//           alt="Swapped Result"
//           style={{ width: "100%", height: "100%" }}
//         />
//       </div>
//     );
//   });

//   // Component to display result image and download/print options
//   const ResultDisplay = () => {
//     const [imageLoaded, setImageLoaded] = useState(false);

//     useEffect(() => {
//       if (resultImageUrl) {
//         const img = new Image();
//         img.onload = () => {
//           setImageLoaded(true);
//         };
//         img.src = resultImageUrl;
//       }
//     }, [resultImageUrl]);

//     const goHome = () => {
//       navigate("/");
//     };

//     return (
//       <div>
//         {imageLoaded && (
//           <div
//             style={{
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               paddingTop: "200px",
//             }}
//           >
//             <div
//               style={{
//                 width: "25%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <QRCode
//                 value={resultImageUrl}
//                 size={200}
//                 style={{
//                   // border: "20px solid #30A6EC",
//                   // borderRadius: "16px",
//                   padding: "15px",
//                   backgroundColor: "#fff",
//                   marginBottom: "25px",
//                 }}
//               />
//               <h1
//                 style={{
//                   fontSize: "30px",
//                   lineHeight: "40px",
//                   fontWeight: "bold",
//                   color: "#fff",
//                 }}
//               >
//                 {" "}
//                 Scan QR code
//               </h1>
//               <h1
//                 style={{
//                   fontSize: "20px",
//                   lineHeight: "25px",
//                   marginTop: "-16px",
//                   color: "#fff",
//                 }}
//               >
//                 to download image
//               </h1>
//             </div>
//             <img
//               className="animate__animated animate__zoomIn animate__delay-2s"
//               src={resultImageUrl}
//               alt="Swapped Result"
//               style={{
//                 width: "50%", // Set to 100% to fill the container
//                 height: "auto", // Use auto for height to maintain aspect ratio
//                 objectFit: "cover", // Ensure the image covers the container
//                 // borderRadius: "16px",
//                 // border: "16px solid #30A6EC",
//               }}
//             />
//             <div
//               style={{
//                 width: "25%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {/* <div
//                 style={{
//                   color: "#fff",
//                   textAlign: "left",
//                   backgroundColor: "rgb(0 29 131)",
//                 }}
//               >
//                 <h1 style={{ fontSize: "42px", lineHeight: "40px" }}>
//                   {" "}
//                   Scan and Download
//                 </h1>
//                 <h1
//                   style={{
//                     fontSize: "20px",
//                     lineHeight: "25px",
//                     marginTop: "-16px",
//                   }}
//                 >
//                   your warrior alter ego.
//                 </h1>
//               </div> */}
//               {/* ReactToPrint with a reference to the rendered PrintableImage */}
//               <ReactToPrint
//                 trigger={() => (
//                   <button
//                     type="button"
//                     style={{
//                       width: "250px",
//                       height: "80px",
//                       cursor: "pointer",
//                       // borderRadius: "10px",
//                       border: "none",
//                       fontSize: "40px",
//                       fontWeight: "bold",
//                       backgroundColor: "#3A49D4", // Default color
//                       color: "#fff", // Default text color
//                       transition: "background-color 0.3s ease, color 0.3s ease",
//                       marginBottom: "16px",
//                       marginTop: "16px",
//                     }}
//                   >
//                     Print
//                   </button>
//                 )}
//                 content={() => printRef.current} // Correct reference to PrintableImage
//               />

//               {/* The PrintableImage component */}
//               <div style={{ display: "none" }}>
//                 <PrintableImage
//                   ref={printRef}
//                   resultImageUrl={resultImageUrl}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 style={{
//                   width: "250px",
//                   height: "80px",
//                   cursor: "pointer",
//                   border: "none",
//                   fontSize: "40px",
//                   fontWeight: "bold",
//                   backgroundColor: "#3A49D4", // Default color
//                   color: "#fff", // Default text color
//                   transition: "background-color 0.3s ease, color 0.3s ease",
//                 }}
//                 onClick={(e) => {
//                   e.target.style.backgroundColor = "#30A6EC"; // Change background
//                   e.target.style.color = "#ffffff"; // Change text color
//                   setTimeout(goHome, 500); // Correctly invoke captureImage after 500ms
//                 }}
//               >
//                 Home
//               </button>
//               {/* <button
//                 type="submit"
//                 style={{
//                   width: "250px",
//                   height: "80px",
//                   cursor: "pointer",
//                   borderRadius: "10px",
//                   border: "none",
//                   fontSize: "40px",
//                   fontWeight: "bold",
//                   backgroundColor: "#ffffff", // Default color
//                   color: "#000000", // Default text color
//                   transition: "background-color 0.3s ease, color 0.3s ease",
//                 }}
//                 onClick={(e) => {
//                   e.target.style.backgroundColor = "#30A6EC"; // Change background
//                   e.target.style.color = "#ffffff"; // Change text color
//                   setTimeout(resetSelection(), 500); // Correctly invoke captureImage after 500ms
//                 }}
//               >
//                 Try Again
//               </button> */}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Show loading animation if loading, else show result, else show image selection */}
//       {loading ? (
//         <LoadingAnimation />
//       ) : resultImageUrl ? (
//         <ResultDisplay />
//       ) : (
//         <ImageSelectionForm />
//       )}
//     </div>
//   );
// }

// export default Swap;





/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { supabase } from "./supabaseClient";

import ReactToPrint from "react-to-print";
import styled, { keyframes } from "styled-components";

// Importing Neon Male Images
import mn1 from "/assets/neonmale/neonm1.png";
import mn2 from "/assets/neonmale/neonm2.png";
import mn3 from "/assets/neonmale/neonm3.png";
import mn4 from "/assets/neonmale/neonm4.png";
import mn5 from "/assets/neonmale/neonm5.png";

// Importing Retro Male Images
import mr1 from "/assets/retromale/retrom1.png";
import mr2 from "/assets/retromale/retrom2.png";
import mr3 from "/assets/retromale/retrom3.png";
import mr4 from "/assets/retromale/retrom4.png";
import mr5 from "/assets/retromale/retrom5.png";

// Importing Cyber Male Images
import mc1 from "/assets/cybermale/cyberm1.png";
import mc2 from "/assets/cybermale/cyberm2.png";
import mc3 from "/assets/cybermale/cyberm3.png";
import mc4 from "/assets/cybermale/cyberm4.png";
import mc5 from "/assets/cybermale/cyberm5.png";

// Importing Space Male Images
import ms1 from "/assets/spacemale/spacem1.png";
import ms2 from "/assets/spacemale/spacem2.png";
import ms3 from "/assets/spacemale/spacem3.png";
import ms4 from "/assets/spacemale/spacem4.png";
import ms5 from "/assets/spacemale/spacem5.png";

// Importing Neon Female Images
import fn1 from "/assets/neonfemale/neonf1.png";
import fn2 from "/assets/neonfemale/neonf2.png";
import fn3 from "/assets/neonfemale/neonf3.png";
import fn4 from "/assets/neonfemale/neonf4.png";
import fn5 from "/assets/neonfemale/neonf5.png";

// Importing Retro Female Images
import fr1 from "/assets/retrofemale/retrof1.png";
import fr2 from "/assets/retrofemale/retrof2.png";
import fr3 from "/assets/retrofemale/retrof3.png";
import fr4 from "/assets/retrofemale/retrof4.png";
import fr5 from "/assets/retrofemale/retrof5.png";

// Importing Cyber Female Images
import fc1 from "/assets/cyberfemale/cyberf1.png";
import fc2 from "/assets/cyberfemale/cyberf2.png";
import fc3 from "/assets/cyberfemale/cyberf3.png";
import fc4 from "/assets/cyberfemale/cyberf4.png";
import fc5 from "/assets/cyberfemale/cyberf5.png";

// Importing Space Female Images
import fs1 from "/assets/spacefemale/spacef1.png";
import fs2 from "/assets/spacefemale/spacef2.png";
import fs3 from "/assets/spacefemale/spacef3.png";
import fs4 from "/assets/spacefemale/spacef4.png";
import fs5 from "/assets/spacefemale/spacef5.png";


// Theme configuration
// Theme configuration for males
const maleThemes = {
  neon: [mn1, mn2, mn3, mn4, mn5],
  retro: [mr1, mr2, mr3, mr4, mr5],
  cyber: [mc1, mc2, mc3, mc4, mc5],
  space: [ms1, ms2, ms3, ms4, ms5]
};

// Theme configuration for females
const femaleThemes = {
  neon: [fn1, fn2, fn3, fn4, fn5],
  retro: [fr1, fr2, fr3, fr4, fr5],
  cyber: [fc1, fc2, fc3, fc4, fc5],
  space: [fs1, fs2, fs3, fs4, fs5]
};


// Loading animation components
const animloader = keyframes`
  0% { height: 48px; }
  100% { height: 140px; }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Bar = styled.div`
  width: 16px;
  height: 180px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  animation: ${animloader} 0.3s ${(props) => props.delay}s linear infinite alternate;
`;

// Update the LoadingAnimation component with a background image
const LoadingAnimation = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundImage: "url('/bg.png')", // Add the image URL here
      backgroundSize: "cover", // This ensures the background image covers the entire screen
      backgroundPosition: "center", // Adjust to center the image
    }}
  >
    <LoaderContainer>
      <Bar color="rgb(31 187 238)" delay={0.3} />
      <Bar color="rgb(176 210 55)" delay={0.2} />
      <Bar color="rgb(255 202 7)" delay={0.1} />
      <Bar color="rgb(212 58 42)" delay={0} />
    </LoaderContainer>
  </div>
);


// Printable component
const PrintableImage = forwardRef(({ resultImageUrl }, ref) => (
  <div ref={ref}>
    <img
      src={resultImageUrl}
      alt="Swapped Result"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
));

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedAvatar  // This was missing
  } = location.state || {};
  const {
    sourceImageBlob,
    gender = "male",
    selectedTheme = "neon"
  } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const printRef = useRef();

  const convertToJPEG = (blob) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, "image/jpeg");
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  };

  useEffect(() => {
    const processSwap = async () => {
      try {
        if (!sourceImageBlob) throw new Error("No source image provided");
        if (!gender || !selectedTheme) throw new Error("Theme not selected");

        console.log("Gender:", gender);
        console.log("Selected Theme:", selectedTheme);

        // Get theme images based on gender
        const themeImages = gender === 'male'
          ? maleThemes[selectedTheme]
          : femaleThemes[selectedTheme];

        console.log("Available images:", themeImages);

        const randomIndex = Math.floor(Math.random() * themeImages.length);
        const randomImage = themeImages[randomIndex];
        console.log("Selected random image:", randomImage);
        // Select random image from theme

        const formData = new FormData();

        // Add theme image as source (base image)
        const themeResponse = await fetch(randomImage);
        const themeBlob = await themeResponse.blob();
        formData.append(
          "sourceImage",
          new File([themeBlob], "theme-image.jpg", { type: "image/jpeg" })
        );

        // Add user photo as target (where to apply face)
        formData.append(
          "targetImage",
          new File([sourceImageBlob], "user-face.jpg", { type: "image/jpeg" })
        );

        // Rest of the swap process remains the same...
        const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
          method: "POST",
          body: formData,
        });

        if (!swapResponse.ok) {
          const errorData = await swapResponse.json();
          throw new Error(errorData.message || "Face swap failed");
        }

        const swappedBlob = await swapResponse.blob();
        const convertedBlob = await convertToJPEG(swappedBlob);

        const fileName = `swapped/${Date.now()}.jpg`;
        const { error } = await supabase.storage
          .from("deloitte")
          .upload(fileName, convertedBlob);

        if (error) throw error;

        setResultImageUrl(
          `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/deloitte/${fileName}`
        );
      } catch (error) {
        console.error("Processing error:", error);
        navigate("/error", {
          state: {
            error: error.message,
            details: error.stack || "Unknown error occurred"
          }
        });
      } finally {
        setLoading(false);
      }
    };
    processSwap();
  }, [sourceImageBlob, gender, selectedTheme, navigate]);

  const ResultDisplay = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      if (resultImageUrl) {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = resultImageUrl;
      }
    }, [resultImageUrl]);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/bg.png')", // Add background image URL here
          backgroundSize: "cover", // Make sure the background covers the entire screen
          backgroundPosition: "center", // Center the background
          flexDirection: "column", // Stack the content vertically
        }}
      >
        {imageLoaded && (
          <>
            {/* Display Result Image */}
            <img
              src={resultImageUrl}
              alt="Swapped Result"
              style={{
                width: "60%",
                height: "auto",
                objectFit: "cover",
                marginBottom: "40px", // Add space between image and QR code section
                marginTop: "100px", // Add space between image and buttons
              }}
            />

            {/* QR code and buttons container */}
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Center the items horizontally
                alignItems: "center", // Align the items vertically
                width: "500px", // Container width slightly adjusted for the larger QR code
                height: "500px", // Container height slightly adjusted for the larger QR code
              }}
            >
              {/* QR Code Container with Gradient Background */}
              <div
                style={{
                  width: "500px", // Increased width to fit the larger QR code
                  height: "500px", // Increased height to fit the larger QR code
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center", // Center the QR code within the container
                  marginRight: "20px", // Optional space between QR code and buttons
                  background: "linear-gradient(90deg, #4c00ff, #ff007a)", // Gradient background
                  borderRadius: "10px", // Optional border radius for a rounded effect
                }}
              >
                <QRCode
                  value={resultImageUrl}
                  size={390} // Increased size of the QR code to 350px
                  style={{
                    padding: "15px",
                    backgroundColor: "#fff", // QR code background is white
                    borderRadius: "10px", // Optional: rounded corners for the QR code
                  }}
                />
              </div>


              {/* Print and Home buttons stacked vertically */}
            </div>

            {/* Hidden PrintableImage Component */}
            <div style={{ display: "none" }}>
              <PrintableImage ref={printRef} resultImageUrl={resultImageUrl} />
            </div>

            <div
              style={{
                width: "400px", // Adjusted width to keep buttons close together but separate from QR code
                height: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center", // Center buttons vertically
                alignItems: "center", // Center buttons horizontally
                marginTop: "60px", // Optional space between QR code and buttons
                gap: "20px"

              }}
            >


              <button
                onClick={() => navigate("/")}
                style={{
                  width: "350px", // Increased width for bigger button
                  height: "80px", // Increased height for bigger button
                  fontSize: "32px", // Larger font size for better visibility
                  background: "white", // Gradient background
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Home
              </button>
              <ReactToPrint
                trigger={() => (
                  <button
                    style={{
                      width: "350px", // Increased width for bigger button
                      height: "80px", // Increased height for bigger button
                      fontSize: "32px", // Larger font size for better visibility
                      background: "white", // Gradient background
                      color: "black",
                      border: "none",
                      margin: "16px 0",
                      cursor: "pointer",
                    }}
                  >
                    Print
                  </button>
                )}
                content={() => printRef.current}
              />
            </div>

          </>
        )}
      </div>




    );
  };

  return (
    <div>
      {loading ? (
        <LoadingAnimation />
      ) : resultImageUrl ? (
        <ResultDisplay />
      ) : (
        <div>No result available</div>
      )}
    </div>
  );
}

export default Swap;