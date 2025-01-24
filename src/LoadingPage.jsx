// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the rotation animation for the spinner
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

// Styled-component for the outer spinner circle
const LoaderWrapper = styled.div`
  width: 200px; /* Increased size */
  height: 200px; /* Increased size */
  border: 16px dotted #FFF; /* Increased size */
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotation} 2s linear infinite;
`;

// Styled-component for the inner spinner circle
const LoaderInner = styled.div`
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 16px dottedrgb(226, 226, 226); /* Inner circle style */
  border-style: solid solid dotted;
  width: 100px; /* Inner circle size */
  height: 100px; /* Inner circle size */
  border-radius: 50%;
  animation: ${rotationBack} .5s linear infinite;
  transform-origin: center center;
`;

// Centered loader component
function LoadingPage() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100vw',
        backgroundColor: '#000', // Optional background for contrast
      }}
    >
      <LoaderWrapper>
        <LoaderInner />
      </LoaderWrapper>
    </div>
  );
}

export default LoadingPage;
