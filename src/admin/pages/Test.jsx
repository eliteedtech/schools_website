import React from 'react';

const Test = () => {
  console.log('Test component is rendering');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'red', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      Admin Route Test - This is working!
    </div>
  );
};

export default Test;