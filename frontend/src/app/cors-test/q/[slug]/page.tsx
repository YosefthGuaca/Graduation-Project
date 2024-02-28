'use client';
import React from 'react';

const CorsTestPage: React.FC = () => {
  const handleRequest = async (method: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cors-test`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ message: `${method} request sent` }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>CORS Test Page</h1>
      <button onClick={() => handleRequest('GET')}>GET</button>
      <button onClick={() => handleRequest('POST')}>POST</button>
      <button onClick={() => handleRequest('DELETE')}>DELETE</button>
      <button onClick={() => handleRequest('PATCH')}>PATCH</button>
      <button onClick={() => handleRequest('PUT')}>PUT</button>
    </div>
  );
};

export default CorsTestPage;
