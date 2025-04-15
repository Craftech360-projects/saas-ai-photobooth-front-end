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
    const formData = new FormData();

    // Add images
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

    // Add user details
    if (userDetails) {
      formData.append("name", userDetails.name || "");
      formData.append("email", userDetails.email || "");
      formData.append("contact", userDetails.contact || "");
    }

    // Make API call
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
    const publicURL = `https://cbjqtfkqfikxbwfetniz.supabase.co/storage/v1/object/public/test-bucket/${fileName}`;

    // Save user details to Supabase if provided
    if (userDetails && userDetails.email) {
      const { error: userError } = await supabase
        .from('userInfo')
        .insert({  // Changed from upsert to insert
          email: userDetails.email,
          name: userDetails.name || '',
          contact: userDetails.contact || '',
          imageUrl: publicURL,
          created_at: new Date().toISOString()
        });

      if (userError) {
        console.error("Error saving user info:", userError);
      }
    }
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
