import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './components/styles.css'
function Error() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <div  style={{  display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100vw',
    height:'100vh',}}>
        <p>Something went wrong please try agin!</p>
        <button   style={{
            width: '180px', // Adjust width as needed
            height: '40px', // Adjust height as needed
            border: 'none',
            cursor: 'pointer', // Show pointer cursor on hover
            borderRadius: '9px',
            position: 'absolute',
            fontWeight:'bolder',
            fontSize:'16px',
            color:'#fff',
            backgroundColor:'#000',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:'100px'
          }} onClick={goHome}>Go Back To Home </button>
    </div>
  );
}

export default Error;
