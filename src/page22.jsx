// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ImageGeneratorForm from "./components/ImageGeneratorForm"; // Adjust the import path as necessary
// import { supabase } from "./supabaseClient"; // Ensure this points to your Supabase client initialization

// function Page2() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sourceImageUrl, setSourceImageUrl] = useState("");
//   const [targetImageUrl, setTargetImageUrl] = useState("");
//   const [enhance, setEnhance] = useState(false);

//   useEffect(() => {
//     const sourceImageBlob = location.state?.sourceImage;
//     if (sourceImageBlob) {
//       const objectURL = URL.createObjectURL(sourceImageBlob);
//       setSourceImageUrl(objectURL);
//       return () => URL.revokeObjectURL(objectURL);
//     } else {
//       navigate("/"); // Redirect if no source image is provided
//     }
//   }, [location.state?.sourceImage, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!targetImageUrl) {
//       console.error("No target image URL provided.");
//       return;
//     }

//     try {
//       const response = await fetch(targetImageUrl);
//       if (!response.ok) throw new Error("Failed to fetch the generated image");
//       const targetImageBlob = await response.blob();

//       const formData = new FormData();
//       formData.append(
//         "targetImage",
//         new File([location.state?.sourceImage], "sourceImage.jpg", {
//           type: "image/jpeg",
//         })
//       );
//       formData.append(
//         "sourceImage",
//         new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
//       );
//       formData.append("enhance", JSON.stringify(enhance));

//       const swapResponse = await fetch(
//         "https://2f77-106-51-190-12.ngrok-free.app/api/swap-face/",
//         { method: "POST", body: formData }
//       );

//       if (!swapResponse.ok) throw new Error("Image swap operation failed");

//       const swappedImageBlob = await swapResponse.blob();
//       // Assume the blob is the final image we want to upload to Supabase
//       const fileName = `ai-images/${Date.now()}-result.jpg`;
//       const { error: uploadError } = await supabase.storage
//         .from("images")
//         .upload(fileName, swappedImageBlob, { contentType: "image/jpeg" });

//       if (uploadError) throw uploadError;

//       const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;
//       console.log(publicURL, "public urlllll");

//       if (publicURL) {
//         // Navigate to Page3 with the uploaded image URL
//         navigate("/result", { state: { resultImageUrl: publicURL } });
//       } else {
//         console.error("Failed to get public URL");
//         navigate("/error"); // Handle the error accordingly
//       }// Navigate to Page3 with the public URL
//     } catch (error) {
//       console.error("Error during the process:", error);
//       navigate("/error");
//     }
//   };

//   return (
//     <div>
//       <h2>Edit & Swap</h2>
//       {sourceImageUrl && <img src={sourceImageUrl} alt="Source Preview" />}
//       <ImageGeneratorForm setGeneratedImage={(url) => setTargetImageUrl(url)} />
//       <button onClick={handleSubmit}>Swap Faces</button>
//     </div>
//   );
// }

// export default Page2;




// this is for watermark attaching

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageGeneratorForm from "./components/ImageGeneratorForm"; // Adjust the import path as necessary
import { supabase } from "./supabaseClient"; // Ensure this points to your Supabase client initialization

function Page2() {
  // Hooks for navigation, location, and state management
  const navigate = useNavigate();
  const location = useLocation();
  const [sourceImageUrl, setSourceImageUrl] = useState("");
  const [targetImageUrl, setTargetImageUrl] = useState("");
  const [enhance, setEnhance] = useState(false);

  // Effect to handle source image retrieval
  useEffect(() => {
    // Retrieve the source image blob from location state
    const sourceImageBlob = location.state?.sourceImage;
    if (sourceImageBlob) {
      // Create object URL for the source image blob
      const objectURL = URL.createObjectURL(sourceImageBlob);
      // Set the source image URL state
      setSourceImageUrl(objectURL);
      // Cleanup function to revoke the object URL when component unmounts
      return () => URL.revokeObjectURL(objectURL);
    } else {
      // Redirect if no source image is provided
      navigate("/");
    }
  }, [location.state?.sourceImage, navigate]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if target image URL is provided
    if (!targetImageUrl) {
      console.error("No target image URL provided.");
      return;
    }

    try {
      // Fetch the target image blob
      const response = await fetch(targetImageUrl);
      if (!response.ok) throw new Error("Failed to fetch the generated image");
      const targetImageBlob = await response.blob();

      // Create FormData for image swapping API
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([location.state?.sourceImage], "sourceImage.jpg", {
          type: "image/jpeg",
        })
      );
      formData.append(
        "sourceImage",
        new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
      );
      formData.append("enhance", JSON.stringify(enhance));

      // Send POST request to image swapping API
      const swapResponse = await fetch(
        "https://6cac-124-40-247-18.ngrok-free.app/api/swap-face/",
        { method: "POST", body: formData }
      );

      if (!swapResponse.ok) throw new Error("Image swap operation failed");

      // Retrieve the swapped image blob
      const swappedImageBlob = await swapResponse.blob();

      // Create a canvas element
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = 1024; // Adjust width as needed
      canvas.height = 1024; // Adjust height as needed

      // Draw the swapped image on the canvas
      const image = new Image();
      image.src = URL.createObjectURL(swappedImageBlob);
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Add watermark image
        const watermark = new Image();
        watermark.src = "/logo.png"; // Provide the path to your watermark image
        watermark.onload = () => {
          // Adjust the position of the watermark as needed
          const watermarkX = canvas.width - watermark.width - 20; // Adjust the x-coordinate
          const watermarkY = canvas.height - watermark.height - 20; // Adjust the y-coordinate
          context.drawImage(watermark, watermarkX, watermarkY);

          // Convert canvas content to blob
          canvas.toBlob(async (blob) => {
            // Upload the modified image with watermark to Supabase
            const fileName = `ai-images/${Date.now()}-result.jpg`;
            const { error: uploadError } = await supabase.storage
              .from("images")
              .upload(fileName, blob, { contentType: "image/jpeg" });

            if (uploadError) throw uploadError;

            // Retrieve the public URL of the uploaded image
            const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;

            if (publicURL) {
              // Navigate to Page3 with the uploaded image URL
              navigate("/result", { state: { resultImageUrl: publicURL } });
            } else {
              console.error("Failed to get public URL");
              navigate("/error"); // Handle the error accordingly
            }
          }, "image/jpeg");
        };
      };
    } catch (error) {
      console.error("Error during the process:", error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>Edit & Swap</h2>
      {/* Display the source image preview */}
      {sourceImageUrl && <img src={sourceImageUrl} alt="Source Preview" />}
      {/* Form for generating target image */}
      <ImageGeneratorForm setGeneratedImage={(url) => setTargetImageUrl(url)} />
      {/* Button to trigger image swapping */}
      <button onClick={handleSubmit}>Swap Faces</button>
    </div>
  );
}

export default Page2;
