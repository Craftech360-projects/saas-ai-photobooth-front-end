/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";// Ensure this path matches the location of your data.json file
import { supabase } from "./supabaseClient";
import ImageSelectionForm from "./components/ImageSelectionForm";

function Swap() {
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

  const selectImage = (imagesSrc) => {
    console.log('imagesSrcccccccccccc', imagesSrc);
    setTargetImage(imagesSrc);
  };


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
        "http://192.168.1.103:8000/api/swap-face/",
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

      const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;

      if (publicURL) {
        navigate("/result", { state: { resultImageUrl: publicURL } });
      } else {
        console.error("Failed to get public URL");
        navigate("/error"); 
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/error"); 
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
      <ImageSelectionForm
        handleSubmit={handleSubmit}
        enhance={enhance}
        setEnhance={setEnhance}
        selectImage={selectImage}
      />
    </div>
  );
}

export default Swap;