// /* eslint-disable no-unused-vars */
// import { QRCodeSVG } from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
// import { useRef, useState } from "react";
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
  const [resultImageUrl, setResultImageUrl] = useState();
  const [error, setError] = useState(null);
  const printRef = useRef();
  const restart = "/home.png";
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
        const fileName = `swapped-images/${Date.now()}-result.jpg`;

        // Upload to Supabase
        const { error: uploadError } = await supabase.storage
          .from("nimhans")
          .upload(fileName, convertedBlob, {
            contentType: "image/jpeg",
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nimhans/${fileName}`;
        console.log("Public URL:", publicURL);

        // // Save user details to database
        // const { error: insertError } = await supabase
        //   .from("nimhans")
        //   .insert([{ ...userDetails, publicURL }]);

        // if (insertError) throw insertError;

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
  
  // // Empty dependency array since we want this to run once on mount

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
          className="bg-[#FFC462] text-3xl  text-black px-12 py-4 rounded font-bold"  style={{ fontFamily: 'Oswald, sans-serif' }}
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


  if (resultImageUrl) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="w-full max-w-4xl mt-8 p-8">
          <div className="flex justify-between items-center pt-20">
            <div className="text-3xl text-white">&nbsp;</div>
          </div>
  
          {/* Centered Image */}
          <div className="flex justify-center">
            <img
              src={resultImageUrl}
              alt="Swapped Result"
              className="w-full p-10 animate__animated animate__zoomIn max-h-[80vh]"
              style={{ objectFit: "contain" }}
            />
          </div>
  
          <div className="flex justify-start items-center mt-8 px-10">
            <div className="bg-white p-4 border-12 border-orange-400">
              <QRCodeSVG value={resultImageUrl} size={180} />
            </div>
  
            <div className="text-white flex flex-col ml-50">
              <h1
                className="text-4xl mb-4 font-semibold text-center"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                Scan the QR Code to download image
              </h1>
  
              <button
                onClick={goHome}
                className="w-[365px] h-[102px] text-black px-8 py-4 text-4xl font-bold rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${restart})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  fontFamily: 'Oswald, sans-serif',
                }}
              >
                RESTART
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
    return null;
  }
  

export default Swap;
