
import { QRCodeSVG } from "qrcode.react";
import { forwardRef, useEffect, useRef, useState } from "react";
//import { forwardRef, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { supabase } from "./supabaseClient";

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const selectedImage = location.state?.selectedImage;
  const userDetails = location.state?.userDetails;
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    // Add print styles when component mounts - PORTRAIT orientation (4in x 6in)
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          size: 4in 6in;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Check if we have the required data
    if (!sourceImageBlob || !selectedImage || !userDetails) {
      console.error("Missing required data:", { sourceImageBlob, selectedImage, userDetails });
      navigate("/");
      return;
    }
    
    const LoadingAnimation = () => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <LoaderContainer>
            <Bar color="rgb(255 255 255)" delay={0.3} /> {/* Blue */}
            <Bar color="rgb(255 255 255)" delay={0.2} /> {/* Green */}
            <Bar color="rgb(255 255 255)" delay={0.1} /> {/* Yellow */}
            <Bar color="rgb(255 255 255)" delay={0} /> {/* Red */}
          </LoaderContainer>
        </div>
      );
    };
    
    const processImages = async () => {
      setLoading(true);
      try {
        // Create FormData
        const formData = new FormData();
        formData.append(
          "targetImage",
          new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
        );

        // Fetch the selected image and append it
        const response = await fetch(selectedImage);
        if (!response.ok) throw new Error("Failed to fetch selected image");
        
        const targetImageBlob = await response.blob();
        formData.append(
          "sourceImage",
          new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
        );

        // Add user details
        formData.append("name", userDetails.name);
        formData.append("email", userDetails.email);

        // Make API call to swap faces
        const swapResponse = await fetch(
           "http://localhost:8000/api/swap-face/",
          // "https://nielsen-api.herokuapp.com/api/swap-face/",
          //  "http://139.59.22.163:8000/api/swap-face/",
         // "https://nodeshed.com/api/swap-face/",
        //  "https://api.nodeshed.com/api/swap-face/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!swapResponse.ok) {
          throw new Error(`Swap API error: ${swapResponse.statusText}`);
        }

        const swappedImageBlob = await swapResponse.blob();
        const convertedBlob = await convertImageToJPEG(swappedImageBlob);

        // Generate filename with timestamp
        const fileName = `swapped-images/holi${Date.now()}-result.jpg`;

        // Upload to Supabase
        const { error: uploadError } = await supabase.storage
          .from("holi")
          .upload(fileName, convertedBlob, {
            contentType: "image/jpeg",
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/holi/${fileName}`;
        console.log("Public URL:", publicURL);

        // Save user details to database
        const { error: insertError } = await supabase
          .from("holi")
          .insert([{ ...userDetails, publicURL }]);

        if (insertError) throw insertError;

        setResultImageUrl(publicURL);
      } catch (err) {
        console.error("Error processing images:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    processImages();
  }, []);

  // Create a PrintableImage component using forwardRef - PORTRAIT orientation
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

  // Helper function to convert image to JPEG
  const convertImageToJPEG = (blob) => {
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

  // Handle navigation back to home
  const goHome = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-500 p-16 rounded-lg shadow-lg text-center">
          <div className="text-white text-3xl mb-4">Something went wrong: {error}</div>
          <button 
            onClick={goHome}
            className="bg-white text-3xl text-blue-900 px-12 py-4 rounded font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPage />
      </div>
    );
  }

//   if (resultImageUrl) {
//     return (
//       <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
//         <div className="absolute top-[15%] left-40 w-full max-w-[753px]  p-8">
         
            
//           <img
//             src={resultImageUrl}
//             alt="Swapped Result"
//             className="w-[712px] animate__animated animate__zoomIn"
//           />
          
//           <div className="flex justify-start items-center mt-8">
//             <div className="bg-white p-4 border-12 border-sky-950">
//               <QRCodeSVG value={resultImageUrl} size={200} />
//             </div>
            
           
          

// <div className="text-sky-950 flex flex-col items-center ml-10  ">
//   {/* Top Text */}
//   <h1 className=" flex flex-col text-4xl mb-4 font-bold  justify-between">
//     Scan the QR code to <br/>download your image
//   </h1>

 

//   {/* Bottom Button */}
//   <div className="flex flex-col items-center gap-6 mt-10">
//     <button
//       onClick={goHome}
//       className="bg-sky-950 text-white w-[300px] h-[90px] py-4 text-4xl font-bold rounded-[60px]"
//     >
//       Home
//     </button>
//   </div>
// </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
if (resultImageUrl) {
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center p-4">
      <div className="flex flex-row items-start justify-between w-full max-w-[950px] px-8 gap-20">
        {/* Left side - Image */}
        <div className="w-[60%]">
          <img
            src={resultImageUrl}
            alt="Swapped Result"
            className="w-full animate__animated animate__zoomIn"
          />
        </div>

        {/* Right side - QR code, text, and button */}
        <div className="w-[35%] flex flex-col items-center justify-center mt-30 gap-8 ">
          <h1 className="text-4xl font-bold text-sky-950 text-center w-[400px] leading-tight">
            Scan the QR code to<br/>download your image
          </h1>
          
          {/* QR Code */}
          <div className="bg-white p-6 border-12 border-sky-950 shadow-lg mt-9">
            <QRCodeSVG value={resultImageUrl} size={200} />
          </div>

          {/* Button */}
          <button
            onClick={goHome}
            className="bg-sky-950 text-white w-[350px] h-[100px] py-4 text-4xl mt-20 font-bold rounded-[60px] hover:bg-sky-900 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
  return null;
}

export default Swap;