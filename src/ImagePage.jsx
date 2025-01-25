import React, { useState } from 'react';
import { FiCheckCircle, FiDownload, FiShare2 } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #710100;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ActionBar = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #4a90e2, #3066b1)' : 
    props.green ? 
    'linear-gradient(135deg, #28a745, #218838)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.primary ? 
      'linear-gradient(135deg, #5a9cec, #3a76c1)' : 
      props.green ? 
      'linear-gradient(135deg, #34d058, #28a745)' : 
      'rgba(255, 255, 255, 0.15)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #2d2d2d;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ImagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = new URLSearchParams(location.search).get('imageUrl');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSuccessMessage('Download started!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      const data = { files: [file] };
      
      if (navigator.canShare && navigator.canShare(data)) {
        await navigator.share(data);
      } else {
        alert('Sharing not supported on this device.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={imageUrl} alt="Swapped Result" />
      </ImageContainer>

      <ActionBar>
        <ButtonGroup>
          <ActionButton green onClick={handleDownload}>
            <FiDownload size={18} />
            Download
          </ActionButton>
          <ActionButton primary onClick={handleShare}>
            <FiShare2 size={18} />
            Share
          </ActionButton>
        </ButtonGroup>
      </ActionBar>

      {showSuccess && (
        <SuccessMessage>
          <FiCheckCircle size={16} />
          {successMessage}
        </SuccessMessage>
      )}
    </Container>
  );
};

export default ImagePage;