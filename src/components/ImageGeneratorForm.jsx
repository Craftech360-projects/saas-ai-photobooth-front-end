

// import React, { useState } from 'react';

// function ImageGeneratorForm({ setGeneratedImage }) {
//   const [promptText, setPromptText] = useState('');
//   const [imageSrc, setImageSrc] = useState('');

//   const handleGenerateImage = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('prompt', promptText);

//     // Use an environment variable or secure method to store and use your API key
//     const YOUR_API_KEY = '2d86573bb2f3c11e617ed6a814bfe12fcab4eb75a451636b99f32533fc63878cf115c41fbacd0298f02d1c2feaaab56a'; // Ensure this is securely handled

//     try {
//       const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
//         method: 'POST',
//         headers: {
//           'x-api-key': YOUR_API_KEY,
//         },
//         body: form,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate image from API');
//       }

//       const buffer = await response.arrayBuffer();
//       const blob = new Blob([buffer], { type: 'image/jpeg' });
//       const imageSrc = URL.createObjectURL(blob);

//       setImageSrc(imageSrc);
//       // Notify parent component about the new image source URL
//       setGeneratedImage(imageSrc);
//     } catch (error) {
//       console.error('Error generating image:', error);
//       alert('Failed to generate image.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleGenerateImage}>
//         <input
//           type="text"
//           value={promptText}
//           onChange={(e) => setPromptText(e.target.value)}
//           placeholder="Enter prompt for image generation"
//           required
//         />
//         <button type="submit">Generate Image</button>
//       </form>
//       {imageSrc && (
//         <div>
//           <h3>Generated Image</h3>
//           <img src={imageSrc} alt="Generated" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageGeneratorForm;









import React, { useState } from 'react';

function ImageGeneratorForm({ setGeneratedImage }) {
  // State for prompt text and generated image source
  const [promptText, setPromptText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  // Function to handle form submission
  const handleGenerateImage = async (e) => {
    e.preventDefault();
    
    // Combining additional text with the input text
    const additionalText = "photorealistic concept art, high quality digital art, cinematic, hyperrealism, photorealism, Nikon D850, 8K., sharp focus, emitting diodes, artillery, motherboard, by pascal blanche rutkowski repin artstation hyperrealism painting concept art of detailed character design matte painting, 4 k resolution, "; // Add your additional text here
    const fullPromptText = additionalText + promptText;
    console.log("Full Prompt Text:", fullPromptText); // Logging the full prompt text

    // Create a FormData object and append the prompt text
    const form = new FormData();
    form.append('prompt', fullPromptText);

    // Use an environment variable or secure method to store and use your API key
    const YOUR_API_KEY = '2d86573bb2f3c11e617ed6a814bfe12fcab4eb75a451636b99f32533fc63878cf115c41fbacd0298f02d1c2feaaab56a'; // Ensure this is securely handled

    try {
      // Send a POST request to the API endpoint
      const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': YOUR_API_KEY,
        },
        body: form,
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to generate image from API');
      }

      // Convert the response to a blob and create an object URL for the image
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: 'image/jpeg' });
      const generatedImageSrc = URL.createObjectURL(blob);

      // Set the generated image source and notify the parent component
      setImageSrc(generatedImageSrc);
      setGeneratedImage(generatedImageSrc);
    } catch (error) {
      // Log and alert if an error occurs during image generation
      console.error('Error generating image:', error);
      alert('Failed to generate image.');
    }
  };

  return (
    <div>
      {/* Form for input and submission */}
      <form onSubmit={handleGenerateImage}>
        {/* Input field for entering prompt text */}
        <input
          type="text"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Enter prompt for image generation"
          required
        />
        {/* Button to submit the form */}
        <button type="submit">Generate Image</button>
      </form>
      {/* Display the generated image if available */}
      {imageSrc && (
        <div>
          <h3>Generated Image</h3>
          <img src={imageSrc} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default ImageGeneratorForm;
