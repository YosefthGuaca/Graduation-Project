'use client';
import React from 'react';
import axios from 'axios';

const CorsTestPage: React.FC = () => {
  const handleRequest = async (method: string) => {
    try {
      const response = await axios.request({
        url: 'cors-test',
        method,
        // data: { message: `${method} request sent` },
      });
      console.log(response.data);
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
