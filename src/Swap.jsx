// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onChildAdded,off  } from "firebase/database";

// function Swap() {
//   const [sourceImageUrl, setSourceImageUrl] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Firebase initialization
    // const firebaseConfig = {
    //   apiKey: "AIzaSyA_GpMgnjA1Em0eway6c0W90i6w4K8o4YE",
    //   authDomain: "sac-project-4b5ab.firebaseapp.com",
    //   databaseURL: "https://sac-project-4b5ab-default-rtdb.firebaseio.com",
    //   projectId: "sac-project-4b5ab",
    //   storageBucket: "sac-project-4b5ab.appspot.com",
    //   messagingSenderId: "413553081982",
    //   appId: "1:413553081982:web:7edf544b047a4f88ab222f"
    // };
//     const firebaseApp = initializeApp(firebaseConfig);
//     const database = getDatabase(firebaseApp);

//     // Listen for new child added to 'images' node in Firebase Realtime Database
//     const databaseRef = ref(database, "images");
//     const handleChildAdded = (snapshot) => {
//       const newImage = snapshot.val();
//       if (newImage && newImage.url) {
//         setSourceImageUrl(newImage.url); // Update the state with the new image URL
//       } else {
//         console.error("New source image URL not found in database.");
//         navigate("/error");
//       }
//     };

//     // Attach the event listener
//     onChildAdded(databaseRef, handleChildAdded);

//     // Clean up the listener when the component unmounts
//     return () => {
//       // Detach the event listener
//       return () => {
//         off(imagesRef, 'child_added', handleChildAdded); // Correct way to remove the listener
//       };
//     };
//   }, [navigate]);


  
//   return (
//     <div>
//       {sourceImageUrl ? (
//         <div>
//           <h1>Image Loaded</h1>
//           <img src={sourceImageUrl} alt="Newly Added" style={{ width: "100%" }} />
//         </div>
//       ) : (
//         <h1>Waiting for image to be added in Firebase realtime DB...</h1>
//       )}
//     </div>
//   );
// }

// export default Swap;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded, off } from "firebase/database";
import { supabase } from "./supabaseClient";

function Swap() {
  const [sourceImageUrl, setSourceImageUrl] = useState("");
  const navigate = useNavigate();
  const targetImage = 'times_square_thor.jpeg'; // Manually set the target image
  const enhance = true; // Example state for enhancing image

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyA_GpMgnjA1Em0eway6c0W90i6w4K8o4YE",
      authDomain: "sac-project-4b5ab.firebaseapp.com",
      databaseURL: "https://sac-project-4b5ab-default-rtdb.firebaseio.com",
      projectId: "sac-project-4b5ab",
      storageBucket: "sac-project-4b5ab.appspot.com",
      messagingSenderId: "413553081982",
      appId: "1:413553081982:web:7edf544b047a4f88ab222f"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);
    const databaseRef = ref(database, "images");

    const handleChildAdded = async (snapshot) => {
      const newImage = snapshot.val();
      if (newImage && newImage.url) {
        setSourceImageUrl(newImage.url);
        console.log(newImage.url);
        performSwap(newImage.url); // Call performSwap function when new image URL is added
      } else {
        console.error("New source image URL not found in database.");
      }
    };

    onChildAdded(databaseRef, handleChildAdded);

    return () => {
      off(databaseRef, 'child_added', handleChildAdded);
    };
  }, [navigate]);

  const performSwap = async (sourceImageUrl) => {
    navigate("/loading");

    try {
      const response = await fetch(sourceImageUrl);
      const sourceImageBlob = await response.blob();

      const formData = new FormData();
      formData.append("targetImage", new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" }));
      formData.append("enhance", JSON.stringify(enhance));

      const targetResponse = await fetch(targetImage);
      const targetImageBlob = await targetResponse.blob();
      formData.append("sourceImage", new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" }));

      const swapResponse = await fetch("http://192.168.1.47:8000/api/swap-face/", {
        method: "POST",
        body: formData,
      });

      if (!swapResponse.ok) {
        throw new Error("Something went wrong with the swap API call");
      }

      const swappedImageBlob = await swapResponse.blob();
      const convertedBlob = await convertImageToJPEG(swappedImageBlob);

      const fileName = `swapped-images/${Date.now()}-result.jpg`;
      const { error: uploadError } = await supabase.storage.from("images").upload(fileName, convertedBlob, { contentType: "image/jpeg" });

      if (uploadError) {
        throw uploadError;
      }

      const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;
      navigate("/result", { state: { resultImageUrl: publicURL } });
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
    }
  };

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

  return (
    <div>
      {sourceImageUrl ? (
        <div>
          <h1>Image Loaded</h1>
          <img src={sourceImageUrl} alt="Newly Added" style={{ width: "100%" }} />
        </div>
      ) : (
        <h1>Waiting for image to be added in Firebase realtime DB...</h1>
      )}
    </div>
  );
}

export default Swap;
