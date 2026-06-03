import React from 'react';

const SimpleLogin = () => {
  console.log('SimpleLogin component is rendering');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '1rem' 
        }}>
          Simple Login Test
        </h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          If you can see this, the routing is working!
        </p>
        <form style={{ marginTop: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <input 
            type="password" 
            placeholder="Password"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleLogin;