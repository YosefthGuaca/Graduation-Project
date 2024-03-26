'use client';

import React, { useState, useEffect } from 'react';
import axios from '@/axios';
import { Website } from '@prisma/client';

const Websites = () => {
  const [websites, setWebsites] = useState<Website[]>([]);

  useEffect(() => {
    async function fetchWebsites() {
      try {
        const response = await axios.get('/websites');
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
            <a href={`/home/q/${website.slug}/page`}>{website.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Websites;
