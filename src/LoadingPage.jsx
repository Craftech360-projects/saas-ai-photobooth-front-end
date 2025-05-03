// // eslint-disable-next-line no-unused-vars
// import styled, { keyframes } from 'styled-components';
// const rotation = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// const rotationBack = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(-360deg);
//   }
// `;

// const LoaderWrapper = styled.div`
//   width: 200px; /* Increased size */
//   height: 200px; /* Increased size */
//   border: 16px dotted #FFF; /* Increased size */
//   border-style: solid solid dotted dotted;
//   border-radius: 50%;
//   display: inline-block;
//   position: relative;
//   box-sizing: border-box;
//   animation: ${rotation} 2s linear infinite;
// `;

// const LoaderInner = styled.div`
//   content: '';  
//   box-sizing: border-box;
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   margin: auto;
//   border: 16px dotted #30A6EC; /* Increased size */
//   border-style: solid solid dotted;
//   width: 100px; /* Increased size */
//   height: 100px; /* Increased size */
//   border-radius: 50%;
//   animation: ${rotationBack} .5s linear infinite;
//   transform-origin: center center;
// `;



// function LoadingPage() {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
//       <LoaderWrapper>
//         <LoaderInner />
//       </LoaderWrapper>
//     </div>
//   );
// }

// export default LoadingPage;

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the combined spin and pulse animation
const spinAndPulse = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

// Styled component for the loader container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: transparent; /* No background */
`;

// Styled component for the loader itself
const Loader = styled.div`
  width: 150px; /* Increased size */
  height: 150px; /* Increased size */
  border: 10px solid #fff; /* Primary color */
  border-radius: 50%;
  position: relative;
  animation: ${spinAndPulse} 2s linear infinite;
`;

// Styled component for the inner dot (optional for added effect)
const InnerDot = styled.div`
  width: 20px;
  height: 20px;
  background: #FFC462; /* Primary color */
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

function LoadingPage() {
  return (
    <LoaderContainer>
      <Loader>
        <InnerDot />
      </Loader>
    </LoaderContainer>
  );
}

export default LoadingPage;