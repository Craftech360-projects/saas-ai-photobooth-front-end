import React from 'react';

function LoadingPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>Processing... Please wait.</h2>
      {/* You can add a spinner or any loading animation here */}
    </div>
  );
}

export default LoadingPage;
