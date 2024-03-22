import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";// Ensure this path matches the location of your data.json file
import { supabase } from "./supabaseClient";
import ImageSelectionForm from "./components/ImageSelectionForm";
import ImageGeneratorForm from "./components/ImageGeneratorForm";


function Page2() {
  const [enhance, setEnhance] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [sourceImageUrl, setSourceImageUrl] = useState('');
  const sourceImageBlob = location.state?.sourceImage;

  useEffect(() => {
    if (!sourceImageBlob) {
      console.error("Source image is not provided.");
      navigate("/"); // Navigate back to capture if no source image is found
    }

    // Create an object URL for the Blob and update state
    const objectURL = URL.createObjectURL(sourceImageBlob);
    setSourceImageUrl(objectURL);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectURL);
    };

  }, [sourceImageBlob, navigate]);

  const selectRandomImage = (imagesArray) => {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const selectedImage = imagesArray[randomIndex];
    setTargetImage(selectedImage);
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!targetImage) {
  //       alert("Please select a target image first.");
  //       return;
  //     }

  //     const formData = new FormData();

  //     if (sourceImageBlob) {
  //       formData.append('targetImage', new File([sourceImageBlob], "targetImage.jpg", { type: "image/jpeg" }));
  //     } else {
  //       alert("Target image is missing.");
  //       return;
  //     }

  //     navigate('/loading');

  //     try {
  //       const targetImageResponse = await fetch(targetImage);
  //       if (!targetImageResponse.ok) throw new Error("Failed to fetch target image.");
  //       const targetImageBlob = await targetImageResponse.blob();
  //       formData.append('sourceImage', new File([targetImageBlob], "sourceImage.jpg", { type: "image/jpeg" }));
  //     } catch (error) {
  //       console.error('Error fetching target image:', error);
  //       return;
  //     }

  //     formData.append('enhance', JSON.stringify(enhance));

  //     try {
  //       const response = await fetch('https://8c66-106-51-185-121.ngrok-free.app/api/swap-face/', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (!response.ok) {
  //         throw new Error('Something went wrong with the API call');
  //       }
  //     //   const blob = await response.blob();
  //     const convertedBlob = await convertImageToJPEG(sourceImageBlob);

  //       // Upload the blob to Supabase
  //     //   const fileName = `${Date.now()}-result.jpg`;
  //     //   console.log(fileName)
  //     //   const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, blob);

  //     // Upload the converted image to Supabase
  //     const fileName = `swapped-images/${Date.now()}-result.jpg`; // Generate a unique file name
  //     const { error: uploadError } = await supabase.storage.from('images').upload(fileName, convertedBlob, {
  //       contentType: 'image/jpeg', // Explicitly set the MIME type
  //     });

  //       if (uploadError) {
  //         throw uploadError;
  //       }

  //       // Retrieve the URL of the uploaded file
  //       const { publicURL, error: urlError } = supabase.storage.from('images').getPublicUrl(fileName);

  //       if (urlError) {
  //         throw urlError;
  //       }

  //       navigate('/result', { state: { resultImageUrl: publicURL } });

  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/loading"); // Assume a loading route

    // Assuming targetImage is the result from selecting a random image and not the original blob
    try {
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
      );
      formData.append("enhance", JSON.stringify(enhance));

      // Replace 'targetImage' with the actual image URL or path you intend to swap with
      if (targetImage) {
        const response = await fetch(targetImage);
        const targetImageBlob = await response.blob();
        formData.append(
          "sourceImage",
          new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
        );
      }

      const swapResponse = await fetch(
        "https://6cac-124-40-247-18.ngrok-free.app/api/swap-face/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!swapResponse.ok) {
        throw new Error("Something went wrong with the swap API call");
      }

      const swappedImageBlob = await swapResponse.blob();

      // Convert the swapped image to JPEG
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      // Upload the swapped and converted image to Supabase
      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, convertedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      // After successfully uploading the image, get the public URL
      //    const { publicURL } = supabase.storage.from('images').getPublicUrl(fileName);

      const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;
      console.log(publicURL, "public urlllll");

      if (publicURL) {
        // Navigate to Page3 with the uploaded image URL
        navigate("/result", { state: { resultImageUrl: publicURL } });
      } else {
        console.error("Failed to get public URL");
        navigate("/error"); // Handle the error accordingly
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/error"); // Adjust based on your error handling
    }
  };

  // Function to convert an image blob to JPEG format
  function convertImageToJPEG(blob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, "image/jpeg"); // Convert the canvas to a blob in JPEG format
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(blob); // Create a URL for the blob and set it as the image source
    });
  }

  return (
    <div>
      <h2>Edit & Swap</h2>
      {sourceImageUrl && <img src={sourceImageUrl} alt="Captured" style={{ maxWidth: "100%", height: "auto" }} />}
      <ImageSelectionForm
        handleSubmit={handleSubmit}
        enhance={enhance}
        setEnhance={setEnhance}
        selectRandomImage={selectRandomImage}
      />
      {/* <ImageGeneratorForm /> */}
    </div>
  );
}

export default Page2;
