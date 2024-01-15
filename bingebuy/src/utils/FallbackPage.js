import React from 'react';
import { useSelector } from "react-redux";


const FallbackPage = ({ resetErrorBoundary }) => {
  const { error } = useSelector((state) => state.search);
    const image ='https://cdn.vectorstock.com/i/1000x1000/40/59/confused-businessman-vector-7574059.webp';
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img
        src={image}
        alt="Thinking Man"
        style={{ maxWidth: '40vh', maxHeight: '30vh', borderRadius: '50%' }}
      />
      <p style={{ marginTop: '20px', fontSize: '18px', color:'red' }}>
         Oops ! {error}
      </p>
    </div>
  );
};

export default FallbackPage;
