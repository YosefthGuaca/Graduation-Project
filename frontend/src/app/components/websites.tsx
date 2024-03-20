import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Websites = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    async function fetchWebsites() {
      try {
        const response = await axios.get('/api/websites');
        setWebsites(response.data);
      } catch (error) {
        console.error('Error fetching websites:', error);
      }
    }
    fetchWebsites();
  }, []);

  return (
    <div>
      <h1>Websites</h1>
      <ul>
        {websites.map((website) => (
          <li key={website.id}>
            <a href={`/q/${website.slug}/page`}>{website.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Websites;
