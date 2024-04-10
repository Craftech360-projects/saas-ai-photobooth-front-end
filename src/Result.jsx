// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';

function Result() {
  const location = useLocation();
  const { resultImageUrl } = location.state; // Retrieve the image URL passed from Page2

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };


  return (
    <div>
      {resultImageUrl ? (
        <div style={{ textAlign: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <img src={resultImageUrl} alt="Swapped Result" style={{ maxWidth: '100%', height: '60vh' }} />
          {/* Additional content or actions related to the result */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{color:'#fff'}}>Scan QR Code to View Image</h3>
            <QRCode value={resultImageUrl} size={228} onClick={goHome} />
          </div>
          {/* <button  style={{ width: '70px', border: 'none', height: '30px', position: 'absolute', bottom: '30px', cursor: 'pointer' }}>HOME</button> */}
        </div>
      ) : (
        <p>No image found. Please go back and try again.</p>
      )}
    </div>
  );
}

export default Result;
