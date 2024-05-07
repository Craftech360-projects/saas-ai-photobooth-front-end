import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';

function Result() {
  const location = useLocation();
  const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (resultImageUrl) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = resultImageUrl;
    }
  }, [resultImageUrl]);

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      {resultImageUrl ? (
        <div style={{ textAlign: 'center', width: '100vw', height: '70vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <img
            src={resultImageUrl}
            alt="Swapped Result"
            style={{ maxWidth: '100%', height: '60vh', display: imageLoaded ? 'block' : 'none', boxShadow: '#e36681 0px 0px 50px' }}
          />
          {imageLoaded && (
            <div style={{  marginTop: '100px' }}>
              <h5 style={{ color: '#fff' }}>Scan QR Code to View Image</h5>
              <QRCode value={resultImageUrl} size={150} onClick={goHome} style={{  border: '20px solid #fff', borderRadius: '10px'  }} />
            </div>
          )}
        </div>
      ) : (
        <p>No image found. Please go back and try again.</p>
      )}
    </div>
  );
}

export default Result;
