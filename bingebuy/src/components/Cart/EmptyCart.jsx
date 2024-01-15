import React from 'react';

const EmptyCart = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img
        src="https://cdn.vectorstock.com/i/1000x1000/00/41/cute-happy-funny-shopping-bag-vector-31730041.webp" 
        alt="Sad Person"
        style={{ width: '250px', height: '250px', marginBottom: '20px' }}
      />
      <p style={{fontSize:'50px'}}>Your Cart is Empty :(</p>
    </div>
  );
};

export default EmptyCart;
