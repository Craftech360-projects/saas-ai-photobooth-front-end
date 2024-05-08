import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import bg00 from '/assets/bg00.png'

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
        <div style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',  backgroundImage: `url(${bg00})` }}>
          <img
            src={resultImageUrl}
            alt="Swapped Result"
            style={{ maxWidth: '100%', height: '50vh', display: imageLoaded ? 'block' : 'none', border:"30px solid #1B0048", borderRadius:"20px" }}
          />
          {imageLoaded && (
            <div style={{  marginTop: '0px' }}>
              {/* <h5 style={{ color: '#fff' }}>Scan QR Code to View Image</h5> */}
              <QRCode value={resultImageUrl} size={300} onClick={goHome} style={{  border: '20px solid #1B0048', borderRadius: '20px'  }} />
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
