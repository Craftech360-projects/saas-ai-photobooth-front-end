/**
 * Utility function to handle face swap API calls
 */
import { supabase } from "../database/supabaseClient";

export const swapFaces = async (
  sourceImageBlob,
  targetImageUrl,
  userDetails
) => {
  try {
    // Create a FormData object to send the images
    const formData = new FormData();

    // Add the captured user image as targetImage (from camera)
    formData.append(
      "targetImage",
      new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
    );

    // Fetch the character image and add it as sourceImage
    const response = await fetch(targetImageUrl);
    const targetImageBlob = await response.blob();
    formData.append(
      "sourceImage",
      new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
    );

    // Add user details if available
    if (userDetails) {
      formData.append("name", userDetails.name);
      formData.append("email", userDetails.email);
    }

    // Make API call to your face swap endpoint
    // Update the API endpoint if needed
    const swapResponse = await fetch("http://localhost:8000/api/swap-face/", {
      method: "POST",
      body: formData,
    });

    if (!swapResponse.ok) {
      throw new Error(`API error: ${swapResponse.status}`);
    }

    // Get the swapped image blob
    const swappedImageBlob = await swapResponse.blob();
    const convertedBlob = await convertImageToJPEG(swappedImageBlob);

    // Upload to Supabase storage
    const fileName = `swapped-images/${Date.now()}-result.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("test-bucket")
      .upload(fileName, convertedBlob, {
        contentType: "image/jpeg",
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const publicURL = `https://aimistcqlndneimalstl.supabase.co/storage/v1/object/public/test-bucket/${fileName}`;
    return publicURL;
  } catch (error) {
    console.error("Face swap error:", error);
    throw error;
  }
};

// Helper function to convert image to JPEG format
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
