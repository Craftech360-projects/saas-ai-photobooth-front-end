import { supabase } from "../supabaseClient";

export async function swapFace(sourceImageBlob, targetImageBlob, userDetails) {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append(
      "targetImage",
      new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
    );
    
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
    
    // Generate filename with timestamp
    const fileName = `swapped-images/nielsen${Date.now()}-result.jpg`;

    // Upload to Supabase
    const { error: uploadError, data } = await supabase.storage
      .from("nielsen")
      .upload(fileName, swappedImageBlob, {
        contentType: "image/jpeg",
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${fileName}`;
    
    // Save user details to database
    const { error: insertError } = await supabase
      .from("nielsen")
      .insert([{ ...userDetails, publicURL }]);

    if (insertError) throw insertError;

    return publicURL;
  } catch (error) {
    console.error("Error in face swap process:", error);
    throw error;
  }
}