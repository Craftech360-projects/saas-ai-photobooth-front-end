/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import ImageSelectionForm from "./components/ImageSelectionForm";

function Swap() {
  const [enhance, setEnhance] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [sourceImageUrl, setSourceImageUrl] = useState('');
  const sourceImageBlob = location.state?.sourceImage;
  const [isGender, setIsGender] = useState('');
  const getGender = location.state?.gender;

  useEffect(() => {
    // alert(getGender)
    if (!sourceImageBlob) {
      console.error("Source image is not provided.");
      navigate("/"); // Navigate back to capture if no source image is found
    }
    setIsGender(getGender)
    // Create an object URL for the Blob and update state
    const objectURL = URL.createObjectURL(sourceImageBlob);
    setSourceImageUrl(objectURL);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectURL);
    };

  }, [sourceImageBlob, navigate]);

  const selectImage = (imageSrc) => {
    setTargetImage(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/loading"); // Assume a loading route

    try {
      const formData = new FormData();
      formData.append(
        "targetImage",
        new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
      );
      formData.append("enhance", JSON.stringify(enhance));

      if (targetImage) {
        const response = await fetch(targetImage);
        const targetImageBlob = await response.blob();
        formData.append(
          "sourceImage",
          new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
        );
      }

      const swapResponse = await fetch(
        "http://localhost:8000/api/swap-face/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!swapResponse.ok) {
        throw new Error("Something went wrong with the swap API call");
      }

      const swappedImageBlob = await swapResponse.blob();
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("test-bucket")
        .upload(fileName, convertedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
                      // https://aimistcqlndneimalstl.supabase.co/storage/v1/object/public/test-bucket/swapped-images/1725878255868-result.jpg
      const publicURL = `https://aimistcqlndneimalstl.supabase.co/storage/v1/object/public/test-bucket/${fileName}`;
      console.log(fileName,publicURL);
      
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

  function convertImageToJPEG(blob) {
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
  }

  return (
    <div>
      <ImageSelectionForm
        handleSubmit={handleSubmit}
        enhance={enhance}
        setEnhance={setEnhance}
        selectImage={selectImage}
        setIsGender={getGender}
      />
    </div>
  );
}

export default Swap;
