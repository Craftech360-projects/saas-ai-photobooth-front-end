import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imageData from './data.json'; // Ensure this path matches the location of your data.json file
import { supabase } from './supabaseClient';

function Page2() {
  const [enhance, setEnhance] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;

  useEffect(() => {
    if (!sourceImageBlob) {
      console.error('Source image is not provided.');
      navigate('/'); // Navigate back to capture if no source image is found
    }
  }, [sourceImageBlob, navigate]);

  const selectRandomImage = (imagesArray) => {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const selectedImage = imagesArray[randomIndex];
    setTargetImage(selectedImage);
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!targetImage) {
//       alert("Please select a target image first.");
//       return;
//     }
  
//     const formData = new FormData();
  
//     // Assuming sourceImageBlob is the blob you got from Page1
//     if (sourceImageBlob) {
//       formData.append('sourceImage', new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" }));
//     } else {
//       alert("Source image is missing.");
//       return;
//     }
  
//     // Assuming targetImage is a URL from your imageData and needs to be fetched
//     // If targetImage is supposed to be a file or blob, ensure you have the correct data type here
//     try {
//       const targetImageResponse = await fetch(targetImage);
//       if (!targetImageResponse.ok) throw new Error("Failed to fetch target image.");
//       const targetImageBlob = await targetImageResponse.blob();
//       formData.append('targetImage', new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" }));
//     } catch (error) {
//       console.error('Error fetching target image:', error);
//       return;
//     }
  
//     // Ensure the enhance value is correctly interpreted by your server
//     formData.append('enhance', JSON.stringify(enhance));
  
//     try {
//       const response = await fetch('https://8c66-106-51-185-121.ngrok-free.app/api/swap-face/', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error('Something went wrong with the API call');
//       }
//       const blob = await response.blob();
//       const imageObjectURL = URL.createObjectURL(blob);
//       navigate('/result', { state: { resultImage: imageObjectURL } });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };


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
  
    if (!targetImage) {
      alert("Please select a target image first.");
      return;
    }
  
    const formData = new FormData();
  
    // Correcting the append lines to match expected server parameters
    if (sourceImageBlob) {
      formData.append('targetImage', new File([sourceImageBlob], "targetImage.jpg", { type: "image/jpeg" })); // sourceImageBlob is now targetImage
    } else {
      alert("Target image is missing.");
      return;
    }
  
    // Fetch and append the selected target image as sourceImage
    try {
      const targetImageResponse = await fetch(targetImage);
      if (!targetImageResponse.ok) throw new Error("Failed to fetch target image.");
      const targetImageBlob = await targetImageResponse.blob();
      formData.append('sourceImage', new File([targetImageBlob], "sourceImage.jpg", { type: "image/jpeg" })); // selected targetImage is now sourceImage
    } catch (error) {
      console.error('Error fetching target image:', error);
      return;
    }
  
    formData.append('enhance', JSON.stringify(enhance));
  
    try {
      const response = await fetch('https://8c66-106-51-185-121.ngrok-free.app/api/swap-face/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Something went wrong with the API call');
      }
      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      navigate('/result', { state: { resultImage: imageObjectURL } });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

// Function to convert an image blob to JPEG format
function convertImageToJPEG(blob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
  
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, 'image/jpeg'); // Convert the canvas to a blob in JPEG format
      };
  
      img.onerror = reject;
      img.src = URL.createObjectURL(blob); // Create a URL for the blob and set it as the image source
    });
  }
  
  

  return (
    <div>
      <h2>Edit & Swap</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(imageData).map((key, index) => (
          <button key={index} type="button" onClick={() => selectRandomImage(imageData[key])}>
            Select Random Image from Set {index + 1}
          </button>
        ))}
        <div>
          <label>
            <input type="checkbox" checked={enhance} onChange={(e) => setEnhance(e.target.checked)} />
            Enhance Image
          </label>
        </div>
        <button type="submit">Swap Faces</button>
      </form>
    </div>
  );
}

export default Page2;








