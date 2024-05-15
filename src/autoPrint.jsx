// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import {  useNavigate } from 'react-router-dom';

// const PrintImageComponent = () => {
//     const location = useLocation();
//     const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
//     const navigate = useNavigate();

//     const handlePrintImage = async () => {
//         try {
//             const response = await fetch(resultImageUrl);
//             const blob = await response.blob();
//             const imgUrl = URL.createObjectURL(blob);

//             // Create an iframe and hide it
//             let iframe = document.createElement('iframe');
//             iframe.style.position = 'absolute';
//             iframe.style.width = '0px';
//             iframe.style.height = '0px';
//             iframe.style.border = 'none';
//             document.body.appendChild(iframe);

//             // Wait for the image to load and then print
//             let img = new Image();
//             img.onload = () => {
//                 const paperWidth = 4.5 * 96; // 4.5 inches in pixels (96 DPI)
//                 const paperHeight = 6.7 * 96; // 6.2 inches in pixels (96 DPI)
//                 let canvas = document.createElement('canvas');
//                 canvas.width = paperWidth;
//                 canvas.height = paperHeight;

//                 let ctx = canvas.getContext('2d');
//                 const xOffset = (canvas.width - img.width) / 2; // Calculate x-offset to center the image
//                 const yOffset = (canvas.height - img.height) / 2; // Calculate y-offset to center the image
//                 ctx.drawImage(img, xOffset, yOffset, img.width, img.height);

//                 // We use the canvas data URL to load the image into the iframe
//                 iframe.contentDocument.write(`<img src="${canvas.toDataURL('image/png')}" style="width: ${paperWidth}px; height: ${paperHeight}px;">`);
//                 iframe.contentDocument.close(); // close document stream
//                 iframe.focus();

                

//                 // Use setTimeout to ensure the iframe content is loaded
//                 setTimeout(() => {
//                     iframe.contentWindow.print();
//                     document.body.removeChild(iframe); // Remove iframe after printing
//                 }, 1000);
//             };

//             img.onerror = () => {
//                 console.error('Error loading image:', resultImageUrl);
//             };

//             img.src = imgUrl;
//         } catch (error) {
//             console.error('Error printing image:', error);
//         }
//     };

//     const handleHomeClick = () => {
//         navigate('/');
//     };

//     return (
//         <div style={{ display: 'flex',right:'150px', gap:"100px", justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '80px', }}>
//                        <button id='home' style={{ width: '300px', height: '100px',             background: 'linear-gradient(to right, #98834D, #FFDA7A)',  fontSize: '32px', borderRadius: '50px',border:"none", color: 'white' }} onClick={handleHomeClick}>Home</button>

//             <button id='print' style={{ width: '300px', height: '100px', backgroundColor: 'black', fontSize: '32px', borderRadius: '50px', color: 'white', marginRight: '20px' }} onClick={handlePrintImage}>Print</button>
//         </div>
//     );
// };

// export default PrintImageComponent;



// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PrintImageComponent = () => {
//     const location = useLocation();
//     const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
//     const navigate = useNavigate();

//     const handlePrintImage = async () => {
//         try {
//             const response = await fetch(resultImageUrl);
//             const blob = await response.blob();
//             const imgUrl = URL.createObjectURL(blob);

//             // Create an iframe and hide it
//             let iframe = document.createElement('iframe');
//             iframe.style.position = 'absolute';
//             iframe.style.width = '0px';
//             iframe.style.height = '0px';
//             iframe.style.border = 'none';
//             document.body.appendChild(iframe);

//             // Wait for the image to load and then print
//             let img = new Image();
//             img.onload = () => {
//                 const paperWidth = 4.5 * 96; // 4 inches in pixels (96 DPI)
//                 const paperHeight = 6.7 * 96; // 6 inches in pixels (96 DPI)
//                 let canvas = document.createElement('canvas');
//                 canvas.width = paperWidth;
//                 canvas.height = paperHeight;

//                 let ctx = canvas.getContext('2d');

//                 // Calculate the aspect ratio
//                 const imgAspectRatio = (img.width / img.height)/1.5;
//                 const canvasAspectRatio = (canvas.width / canvas.height)/1.5;

//                 let drawWidth, drawHeight, xOffset, yOffset;

//                 // Determine the dimensions and position for drawing the image
//                 if (imgAspectRatio > canvasAspectRatio) {
//                     drawWidth = canvas.width;
//                     drawHeight = canvas.width / imgAspectRatio;
//                     xOffset = 0;
//                     yOffset = (canvas.height - drawHeight)/1.2 ;
//                 } else {
//                     drawHeight = canvas.height;
//                     drawWidth = canvas.height * imgAspectRatio;
//                     xOffset = (canvas.width - drawWidth)/1.2 ;
//                     yOffset = 0;
//                 }

//                 ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);

//                 // We use the canvas data URL to load the image into the iframe
//                 iframe.contentDocument.write(`<img src="${canvas.toDataURL('image/png')}" style="width: ${paperWidth}px; height: ${paperHeight}px;">`);
//                 iframe.contentDocument.close(); // close document stream
//                 iframe.focus();

//                 // Use setTimeout to ensure the iframe content is loaded
//                 setTimeout(() => {
//                     iframe.contentWindow.print();
//                     document.body.removeChild(iframe); // Remove iframe after printing
//                 }, 1000);
//             };

//             img.onerror = () => {
//                 console.error('Error loading image:', resultImageUrl);
//             };

//             img.src = imgUrl;
//         } catch (error) {
//             console.error('Error printing image:', error);
//         }
//     };

//     const handleHomeClick = () => {
//         navigate('/');
//     };

//     return (
//         <div style={{ display: 'flex', right: '150px', gap: '100px', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '80px' }}>
//             <button id='home' style={{ width: '300px', height: '100px', background: 'linear-gradient(to right, #98834D, #FFDA7A)', fontSize: '32px', borderRadius: '50px', border: 'none', color: 'white' }} onClick={handleHomeClick}>Home</button>
//             <button id='print' style={{ width: '300px', height: '100px', backgroundColor: 'black', fontSize: '32px', borderRadius: '50px', color: 'white' }} onClick={handlePrintImage}>Print</button>
//         </div>
//     );
// };

// export default PrintImageComponent;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrintImageComponent = () => {
    const location = useLocation();
    const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
    const navigate = useNavigate();

    const handlePrintImage = async () => {
        try {
            const response = await fetch(resultImageUrl);
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);

            // Create an iframe and hide it
            let iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0px';
            iframe.style.height = '0px';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            // Wait for the image to load and then print
            let img = new Image();
            img.onload = () => {
                const paperWidth = 4.5 * 96; // 4.5 inches in pixels (96 DPI)
                const paperHeight = 6.7 * 96; // 6.7 inches in pixels (96 DPI)
                let canvas = document.createElement('canvas');
                canvas.width = paperWidth;
                canvas.height = paperHeight;

                let ctx = canvas.getContext('2d');

                // Calculate the aspect ratio
                const imgAspectRatio = (img.width / img.width);
                const canvasAspectRatio = (canvas.height / canvas.height);

                let drawWidth, drawHeight, xOffset, yOffset;

                // Determine the dimensions and position for drawing the image
                if (imgAspectRatio > canvasAspectRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspectRatio;
                    xOffset = 0;
                    yOffset = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspectRatio;
                    xOffset = (canvas.width - drawWidth) / 2;
                    yOffset = 0;
                }

                ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);

                // We use the canvas data URL to load the image into the iframe
                iframe.contentDocument.write(`<img src="${canvas.toDataURL('image/png')}" style="width: ${paperWidth}px; height: ${paperHeight}px;">`);
                iframe.contentDocument.close(); // close document stream
                iframe.focus();

                // Use setTimeout to ensure the iframe content is loaded
                setTimeout(() => {
                    iframe.contentWindow.print();
                    document.body.removeChild(iframe); // Remove iframe after printing
                }, 1000);
            };

            img.onerror = () => {
                console.error('Error loading image:', resultImageUrl);
            };

            img.src = imgUrl;
        } catch (error) {
            console.error('Error printing image:', error);
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', right: '200px', gap: '100px', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '80px' }}>
            <button id='home' style={{ width: '300px', height: '100px', background: 'linear-gradient(to right, #98834D, #FFDA7A)', fontSize: '32px', borderRadius: '50px', border: 'none', color: 'white' }} onClick={handleHomeClick}>Home</button>
            <button id='print' style={{ width: '300px', height: '100px', backgroundColor: 'black', fontSize: '32px', borderRadius: '50px', color: 'white' }} onClick={handlePrintImage}>Print</button>
        </div>
    );
};

export default PrintImageComponent;
