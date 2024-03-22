import React from 'react';
import { useLocation } from 'react-router-dom';
import  QRCode  from 'qrcode.react'; 

function Page3() {
  const location = useLocation();
  const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2


  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Swapped Image Result</h2>
      {resultImageUrl ? (
        <div>
          <img src={resultImageUrl} alt="Swapped Result" style={{ maxWidth: '100%', height: 'auto' }} />
          {/* Additional content or actions related to the result */}
          <div style={{ marginTop: '20px' }}>
            <h3>Scan QR Code to View Image</h3>
            <QRCode value={resultImageUrl} size={228} />
          </div>
        </div>
      ) : (
        <p>No image found. Please go back and try again.</p>
      )}
    </div>
  );
}

export default Page3;
