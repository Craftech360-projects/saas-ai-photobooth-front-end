// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 90%;
  border-top: 9px solid #000;
  animation: ${spinAnimation} .5s linear infinite;
`;
const LoadingText = styled.h2`
  margin-top: 100px;
`;

function LoadingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw',backgroundColor:'black' }}>
      {/* <Spinner />
      <LoadingText>Processing... Please wait.</LoadingText> */}
      {/* <video style={{ height: '100vh', width: '100%' }} src="/public/loading.mp4" loop autoPlay></video> */}
      <img src="/public/assets/bb.gif" alt="" />
    </div>

  );
}

export default LoadingPage;
